# Animation
- 过意不及——应该避免使用太多的动画效果
# 1. View Animation
![animator](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/resources/animator.png)

ValueAnimator：不会对UI造成改变，不能直接实现动画效果。
它本身并不会作用与任何一个属性，它可以产生你想要的各种数值。
不会对UI造成改变，不能直接实现动画效果。需要通过对动画的监听去做一些操作，在监听中将这个值设置给对应的属性，对应的属性才会改变。
ValueAnimator是针对值进行动画，支持整形，浮点型，颜色，对象等类型。

## 1.1 Tween animation（补间动画）
- Creates an animation by performing a series of transformations on a single image with an Animation
- 这个也不直接实现动画效果，只是提供一个监听回调，返回动画执行的总时间，距离上次动画执行的时间等。
- 思路：  
1). 设置一个开始状态（fromXxx）  
2). 一个结束状态（toXxx）。  
3). 变化中心点：scale / `rotate`  
4). 变换速度 `android:interpolator`  
5). <set>使用同一个变换速度 `android:shareInterpolator`  
6). repeat times after showed. `android:repeatCount="2"`  
7). After finish, 是否停在最后变化状态？

```
 android:interpolator="@android:anim/accelerate_interpolator"： 指定动画的变化速度
 android:shareInterpolator="true":让<set></set> 元素下的所有变换效果使用相同的动画速度。
 android:fillAfter="true"   -  动画结束后保留变化后结果。
 android:fillBefore="false" -  动画结束保留变化前效果 。
```

## 1.2 Frame animation
- creates an animation by showing a sequence of images in order with an AnimationDrawable.
AnimationDrawable

- `android:oneshot`  
true = once  
false = loop animation 

### 如何多次播放 Frame Animation ？
```
AnimationDrawable.start(); 
// `android:oneshot=true`,即使播放结束后，isRunning() = true。必须先stop()才能再次start()
AnimationDrawable.isRunning() 
AnimationDrawable.stop();
```
# 2. Property Animation
- modifying an object's property values over a set period of time with an Animator
- 支持自定义View的属性设置

## 为什么会有Property Animation？  
在3.0系统之前，Android提供了逐帧动画Frame Animation和补间动画Tween Animation两种动画：  
逐帧动画：将一个完整的动画拆分成一张张单独的图片，然后将它们连贯起来进行播放。

补间动画：专门为View提供的动画，可以实现View的透明度、缩放、平移和旋转四种效果。  
补间动画有两个个缺陷：
- 补间动画只能对View设置动画，对非View的对象不能设置动画；  
- 补间动画只是改变了View的显示效果而没有真正的改变View的属性。  
例如，使用补间动画将一个按钮从一个位置移动到一个新的位置，那么当移动完成之后我们点击这个按钮，是不会触发其点击事件的，而当我们点击移动前的位置时，会触发其点击事件，   
即补间动画只是在另一个地方重新绘制了这个View，其他的东西都没有改变。    

***补间动画 => 不改变实际属性，重新绘制***

在3.0系统之后，Android提供了一种新的动画——Animator属性动画。  
属性动画可以像补间动画那样设置控件的透明度、缩放、平移或旋转的动画，还可以做到将这些动画联合起来播放、将一组动画按顺序播放、控制动画的播放速度，甚至可以对非View设置动画等等。  

属性动画：对对象的属性设置的动画。  只要一个对象的某个属性有set和get方法，就可以对其设置属性动画。  

属性动画就是不断的改变一个对象的某个属性。只需要告诉系统动画的运行时长，需要执行哪种类型的动画，以及动画的初始值和结束只，剩下的工作就可以全部交给系统去完成了。    
正是因为属性动画是对属性的动画，因此补间动画的第二个缺陷就不复存在了。使用属性动画移动一个按钮，那么这个按钮就是真的被移动了，而不仅仅是在另一个地方重新绘制了自己那么简单。  

***属性动画 => 改变实际属性，重新绘制***  

## 属性动画的原理
ValueAnimator是整个属性动画最核心的类, ObjectAnimator类就是ValueAnimator类的一个子类.  
通过不断改变对象的属性值来实现过渡的.这种过渡就是通过ValueAnimator类来负责计算的。  
ValueAnimator还负责管理动画的播放次数、播放模式和动画监听等。    

## Type
### Type 1: ObjectAnimator
直接动画所给的对象,会调用对象对应属性的get/set方法吧属性的值设置给对象的属性，直接实现动画效果。

![ObjectAnimator.jpg](https://yingvickycao.github.io/img/android/resources/ObjectAnimator.jpg)

### Type 2: ValueAnimator

![ValueAnimator.jpg](https://yingvickycao.github.io/img/android/resources/ValueAnimator.jpg)

- ofFloat() ： 开始和结束参数是float
- ofPropertyValuesHolder()
- ofObject()
- ofInt() ： 开始和结束是int

### Type 3: 组合动画
- 使用PropertyValuesHolder
- 使用AnimatorSet
- animator.addListener(new AnimatorListenerAdapter())
- animator.addListener(new Animator.AnimatorListener()) 

## Interpolators
- 动画变化速度，android系统中默认为提供了多种已经实现好的Interpolator
 
```
1)  BounceInterpolator：弹跳效果；
2)  AccelerateInterpolator：逐渐加速；
3)  DecelerateInterpolator：逐渐减速；
4)  AccelerateDecelerateInterpolator：先加速后减速；
5)  OvershootInterpolator：到达目标点时“跑过头了”，再返回到目标点；
6)  AnticipateInterpolator：移动之前先向后“助跑”；
7)  AnticipateOvershootInterpolator：OvershootInterpolator和AnticipateInterpolator的组合效果；
8)  CycleInterpolator：对于指定的动画，正向做一遍，反响做一遍；
```
https://blog.csdn.net/pzm1993/article/details/77926373

- Menu Page 动画
```
time = 300ms
Enter：减速  // decelerate_interpolator 效果不明显，看不出来减速
Exit： 加速  // accelerate_interpolator 效果不明显，看不出来加速
```
## ViewPropertyAnimator
- 使多个属性同时做动画
- API >=12   

优点?  
- 链式写法：简洁、可读性强
- 性能提升  

性能提升1： 内部只使用一个 Animator，避免多个 Animator 的额外开销。  

性能提升2： ***把计算完的属性值 设给目标View 并 invalidate View对象，=> 将动画添加到将在下一帧开始的动画的列表中。***

    自动开始， 不用显式调用过 start() 方法。在新的 API 中，启动动画是隐式的。    
    它计算完这些属性的值之后，它直接把那些值赋给目标 View 并 invalidate 那个对象，而它完成这些的方式比普通的 ObjectAnimator 更加高效。  
    当声明完，动画就开始了。这些动画会在下一次界面刷新的时候启动。      
    如果继续声明动画，它就会继续将这些动画添加到将在下一帧开始的动画的列表中。    
    当声明完毕并结束对 UI 线程的控制之后，事件队列机制开始起作用（kicks in）动画也就开始了。  

## 多个属性同时做动画？  
方式1：ViewPropertyAnimator, Recommend

方式2： PropertyValuesHolder, Recommend
把多个属性动画放到一个 Animator 中,避免多个 Animator 的额外开销

方式2：使用AnimatorSet同时播放？, Not Recommend  
额外创建一个 AnimatorSet 并且在同时执行多个动画，因此处理上存在着额外的开销

## References:

- https://developer.android.google.cn/guide/topics/resources/animation-resource
- https://www.cnblogs.com/itgungnir/p/6211380.html
- https://blog.csdn.net/zhaoshecsdn/article/details/46673821