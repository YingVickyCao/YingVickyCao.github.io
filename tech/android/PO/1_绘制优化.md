# 绘制优化


# 1 卡顿的场景

卡顿的场景，分成4类： UI 绘制、应用启动、页面跳转、事件响应。

<img src="https://yingvickycao.github.io/img/android/po/绘制优化_卡顿场景.svg" width = 50%/>


# 2 卡顿的原因
上面4 种场景的根本原因可以分为2大类。

<img src="https://yingvickycao.github.io/img/android/po/绘制优化_卡顿原因.svg" width = 50%/>

上面的原因，会产生（1）和（2），从而导致卡顿：    
（1）绘制任务太重了，绘制一侦内容耗时太长。  
（2）主线程太忙了，导致VSync信号来时还没有准备好数据导致丢帧。  
卡顿的本质是VSync信号到来时，不能及时处理绘制事件导致。

# 3 Rule
- Do not block the [UI Thread](../process_and_thread/UI_Thread.md) by using background work：  
disk I/O /  DB Access / network calls / long-running operations    
- Do not access the Android UI toolkit from outside the UI thread

    如何切换到主线程？  
    Activity.runOnUiThread(Runnable)   
    EventBus ：小心  
    Handle  
    RxJava：  
        subsribeOn - 切换之前的线程      
        observeOn - 切换之后的线程。   
        observeOn之后再次调用subsribeOn不能切换线程    
    View.post(Runable)  
    View.postDelayed(Runbable)    
    AsyncTask(Depressed)  

# 4 UI 线程
为了解决 2-(2)的问题。

所有的绘制工作由主线程（UI线程）来负责。
主线程的关键职责是    
1)处理用户交互     
2)在屏幕上绘制像素     
3)加载显示相关的数据。      

主线程应该做什么？  
1）UI 生命周期控制  
2) 系统事件处理  
3) 消息处理  
4) 界面布局  
5) 页面刷新  
除了这些，不能把其他处理放在主线程中，特别是复杂的数据计算和网络请求。  


# 5 Android 系统显示原理          
Android 的显示过程可以简单概括为:   
Android 应用程序把经过测量、布局、绘制后的surface 缓存数据，通过 SurfaceFlinger 把数据渲染到显示屏幕上，通过 Android 的刷新机制 来刷新数据。也就是说应用层负责绘制，系统层负责渲染，通过进程间通信把应用层需要 绘制的数据传递到系统层服务，系统层服务通过刷新机制把数据更新到屏幕。

Android 的图形显示系统采用的是 Client/Server 架构。  
SurfaceFlinger(Server)由 C++代码编写。Client 端代码分为两部分，一 部分是由 Java 提供给应用使用的 API，另一部分则是由 C++写成的底层具体实现。

## 5.2 绘制原理

###  应用层
一个UI 界面是由很多view组成的树结构。   
如何完整地显示所有数据？通过递归，对每一个view进行一次绘制工作。多叉树的遍历时间与树的高度h相关，时间复杂度是O(h) 。

任何时候 View 中的绘制内容发生变化时，都需要重新创建 DisplayList、渲染 DisplayList， 更新到屏幕上等一系列操作。这个流程的表现性能取决于 View 的复杂程度、View 的状态变化以及渲染管道的执行性能。例如，假设某个 Button 的大小需要增大到目前的两倍，在增 大 Button 大小之前，需要通过父 View 重新计算并摆放其他子 View 的位置。修改 View 的大 小会触发整个 HierarcyView 的重新计算大小的操作。如果是修改 View 的位置，则会触发 HierarchView 重新计算其他 View 的位置。如果布局很复杂，就很容易导致严重的性能问题。    


图：页面构成结构      
![viewgroup_2x](https://yingvickycao.github.io/img/android/widget/viewgroup_2x.png)

图：View 绘制流程   
  ![view_draw_process](https://yingvickycao.github.io/img/android/widget/view_draw_process.png)


每一个view绘制由三个核心步骤：Measure、Layout、Draw。通过 Measure 和 Layout 来 确定当前需要绘制的 View 所在的大小和位置，通过绘制(Draw)到 surface.      
ViewRootImp 类的 performTraversals()方法，通过这个方法可以 看出 Measure 和 Layout 都是递归来获取 View 的大小和位置，并且以深度作为优先级。=> 层级越深，元素越多，耗时也就越长。  
(1) Measure : 用深度优先原则递归得到所有视图(View)的宽、高。  
(2) Layout ： 用深度优先原则递归得到所有视图(View)的位置。    
(3) Draw ： 支持两种绘制方式：软件绘制(CPU)和硬件加速(GPU)。  

硬件加速的优点： 
UI 的显示和绘制的效率较高。  

硬件加速的缺点：  
耗电:GPU 的功耗比 CPU 高。  
兼容问题:某些接口和函数不支持硬件加速。  
内存大:使用 OpenGL 的接口至少需要 8MB 内存。
   
### 系统层
把需要显示的数据渲染到屏幕上，是通过系统级进程中的 SurfaceFlinger 服务来实现的。 

- SurfaceFlinger 主要干什么工作？  
(1) 响应客户端事件，创建 Layer 与客户端的 Surface 建立连接。  
(2) 接收客户端数据及属性，修改 Layer 属性，如尺寸、颜色、透明度等。  
(3) 将创建的 Layer 内容刷新到屏幕上。  
(4) 维持 Layer 的序列，并对 Layer 最终输出做出裁剪计算。  

- app 进程与 系统进程中SurfaceFlinger 如何通信？
使用了 Android 的匿名共享内存:SharedClient，它是一个跨进程的通信机制来实现数据传输。  
每一个应用  和 SurfaceFlinger 之间都会创建一个 SharedClient；
在每个 SharedClient 中，最多可以创建 31 个 SharedBufferStack；
每个 Surface 都对应一个 SharedBufferStack，也就是一个 window;  
每个 SharedBufferStack 中又包含了两个(低于 4.1 版本)或者三个(4.1 及以上版本)缓 冲区，即在后面的显示刷新机制中会提到的双缓冲和三重缓冲技术。    
<img src="https://yingvickycao.github.io/img/android/po/Android显示框架.png" width = 50%/>    

  整体流程分为三个模块:应用层绘制到缓存区，SurfaceFlinger 把缓存区数据渲染到屏幕，由于是两个不同的进程，所以使用 Android 的匿名共享内存 SharedClient 缓存需要显示的数据来达到目的。  

- SurfaceFlinger 把缓存区数据渲染到屏幕(流程如图 2-5 所示)，主要是驱动层的事情.  
绘制过程首先是 CPU 准备数据，通过 Driver 层把数据交给 CPU 渲染，其中 CPU 主要负责 Measure、Layout、Record、Execute 的数据计算工作，GPU 负责 Rasterization(栅格化)、渲染。由于图形 API 不允许 CPU 直接与 GPU 通信，而是通过中间 的一个图形驱动层(Graphics Driver)来连接这两部分。图形驱动维护了一个队列，CPU 把 display list 添加到队列中，GPU 从这个队列取出数据进行绘制，最终才在显示屏上显示出来。

<img src="https://yingvickycao.github.io/img/android/po/渲染数据流程图.png" width = 50%/>    

- FPS  
FPS(Frames Per Second)表示每秒传递的帧数。在理想情况下，60 FPS 就感觉 不到卡 - 每个绘制时长应该在 16ms 以内.    
<img src="https://yingvickycao.github.io/img/android/po/理想状态下的绘制操作.png" width = 50%/>       
Android 系统每隔16ms 发出 VSYNC 信号，触发对 UI 进行渲染，如果每次渲染都成功，这样就能够达到流畅的 画面所需的 60FPS。即为了实现60FPS，程序的大多数绘制操作都必须在 16ms 内完成。        
某个操作花费的时间是 24ms，系统在得到 VSYNC 信号时就无法进行正常渲染，这样就发生了丢帧现象。      
那么用户在 32ms 内看到的会是同一帧画面。主要场景在执行动画或 者滑动 ListView 时更容易感知到卡顿不流畅，是因为这里的操作相对复杂，容易发生丢帧的现象，从而感觉卡顿。      
有很多原因可以导致 CPU 或者 GPU 负载过重从而出现丢帧现象:可 能是Layout 太过复杂，无法在 16ms 内完成渲染;可能是 UI 上有层叠太多的绘制单元; 还有可能是动画执行的次数过多。      
最终的数据是刷新机制通过系统去刷新数据，刷新不及时也是引起卡顿的一个主要原因。      


##  5.3 刷新机制
为了解决 UI 流畅性差的问题，Android 4.1 。推出的 Project Butter。Project Butter 对 Android Display 系统进行了重构，引入三个核心元素:VSYNC 、Triple Buffer 和 Choreographer。 其中，VSYNC 是理解 Project Buffer 的核心。核心目的就是解决刷新不同步的问题。

- 双缓冲:显示内容的数据内存，为什么要用双缓冲，在 Linux 上通常使用 Framebuffer 来做显示输出，当用户进程更新Framebuffer 中的数据后，显示驱动会把 Framebuffer 中每个像素点的值更新到屏幕，但这样会带来一个问题，如果上一帧的数据还 没有显示完，Framebuffer 中的数据又更新了，就会带来残影的问题，给用户直观的感觉就 会有闪烁感，所以普遍采用了双缓冲技术。双缓冲意味着要使用两个缓冲区(在 SharedBufferStack 中)，其中一个称为 Front Buffer，另外一个称为 Back Buffer。UI 总是先在 Back Buffer 中绘制，后台绘制好，然后再和 Front Buffer 交换，渲染到显示设备中。即只有 当另一个 buffer 的数据准备好后，通过 io_ctrl 来通知显示设备切换 Buffer。  
双缓冲介绍中可以了解到，只有当另一个 buffer 准备好后，才能 通知刷新，这就需要 CPU 以主动查询的方式来保证数据是否准备好，因为这种机制效率很 低，所以引入了 VSYNC。  

- VSYNC ： Vertical Synchronization(垂直同步) .把它认为是一种定时中断，一旦收到 VSYNC 中断，CPU 就开始处理各帧数据。   
- horeographer 起调度的作用，将绘制工作统一到 VSYNC 的某个时间点上，使应用的绘制工作有序。     
CALLBACK_INPUT:优先级最高，与输入事件有关。   
CALLBACK_ANIMATION:第二优先级，与动画有关。   
CALLBACK_TRAVERSAL:最低优先级，与 UI 控件绘制有关。  

根据理想的 60FPS，以 16ms 为一个 显示周期。  


# 5 工具
做性能优化时，最直接有效的方式是，尽可能地复现存在性能问题的场景，并监控此过程中程序的执行流程。分析程序中函数的调用关系和执行时间，找出性能瓶颈。 

卡顿能监控吗？  

## 5.1 性能分析工具

- 卡顿检测工具 Profile GPU Rendering or Profile HWUI rendering
用处：发现渲染有问题的页面。
还需要使用另一个耗时工具和代码来具体分析，找出性能的瓶颈，并进行优化。  

- 分析性能问题  "Profiler" -> CPU -> System Trace  
https://developer.android.google.cn/studio/profile/jank-detection?hl=zh-cn  
对 Android 的应用程序以及 Framework 层的代码进行性能分析。      
提供性能数据采样和分析工具。  
`.trace`

## 5.3 布局优化        
将通过减少 Layout 层级，减少测量、绘制时间，提高复用性三个方面来优化布局。      
优化的目的就是减少层级，让布局扁平化，以提高绘制的时间，提高布局的复用性节省开发和维护成本。  

提高布局效率的方法总体来说就是减少层级，提高绘制速度和布局复用。影响布局效率 主要有以下几点:  
（1）布局的层级越少，加载速度越快。  
（2）减少同一层级控件的数量，加载速度会变快。  
（3）一个控件的属性越少，解析越快。  

- Layout Inspector and Layout Validation    
https://developer.android.google.cn/studio/debug/layout-inspector?hl=zh-cn#select-view  
分析布局，Reduce hierarchy

- 分析应用布局的渲染速度 -  Window.OnFrameMetricsAvailableListener  
https://android-developers.googleblog.com/2017/08/understanding-performance-benefits-of.html

- 布局层级检查 Android Lint   
https://developer.android.google.cn/studio/write/lint?hl=zh_cn  

- 检测 OverDraw - [Debug GPU Overdraw](../tools/Debug_GPU_Overdraw.md)

## 卡顿监控方案