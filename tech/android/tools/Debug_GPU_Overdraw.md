# Debug GPU overdraw


过度绘制(Overdraw)是指在屏幕上的某个像素在同一帧的时间内被绘制了多次。在多 层次重叠的 UI 结构(如带背景的 TextView)中，如果不可见的 UI 也在做绘制的操作，就会 导致某些像素区域被绘制了多次，从而浪费多余的 CPU 以及 GPU 资源。  

导致过度绘制的主要原因是:   
(1) XML 布局->控件有重叠且都有设置背景  
(2) View 自绘->View.OnDraw 里面同一个区域被绘制多次  

## Usage
- Visualize GPU overdraw
- Inspect GPU rendering  overdraw   
通过界面的颜色判断界面重绘的严重程度。

## 使用

开后可以根据不同的颜色观察 UI 上的 Overdraw 情况，蓝色、淡绿、淡红、深红代表
4 种不同程度的 Overdraw 情况，不同颜色的含义如下: ·无色:没有过度绘制，每个像素绘制了 1 次。  
·蓝色:每个像素多绘制了 1 次。大片的蓝色还是可以接受的。如果整个窗口是蓝色的，
可以尝试优化减少一次绘制。  
·绿色:每个像素多绘制了 2 次。  
·淡红:每个像素多绘制了 3 次。一般来说，这个区域不超过屏幕的 1/4 是可以接受的。   
·深红:每个像素多绘制了 4 次或者更多。严重影响性能，需要优化，避免深红色区域。     
目标是尽量减少红色 Overdraw，看到更多的蓝色区域。  

### How to open?
![open_Debug_GPU_Overdraw.png](https://yingvickycao.github.io/img/tools/Debug_GPU_Overdraw/open_Debug_GPU_Overdraw.png)  

## Effect

![Debug_GPU_Overdraw_Effect](https://yingvickycao.github.io/img/tools/Debug_GPU_Overdraw/Debug_GPU_Overdraw_Effect.png)    

## Color Meaning
![Debug_GPU_Overdraw_Color_Meaning.png](https://yingvickycao.github.io/img/tools/Debug_GPU_Overdraw/Debug_GPU_Overdraw_Color_Meaning.png)  

# Refs
- [Visualize GPU overdraw](https://developer.android.google.cn/studio/profile/inspect-gpu-rendering#debug_overdraw)
- [Inspect GPU rendering speed andoverdraw](https://developer.android.google.cn/studio/profile/inspect-gpu-rendering)