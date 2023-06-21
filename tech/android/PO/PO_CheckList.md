# 性能优化清单

# 1 绘制优化
## Don't block the UI thread  
## Don't create render objects,e.g., `Paint`,`Path`, in draw methods

```java
@Override
protected void onDraw(Canvas canvas) {
    super.onDraw(canvas);
    // In instead, new Paint in constructor
    // Paint paint = new Paint();
}
```

## Hardware acceleration  
- When make a view translucent,use Hardware acceleration.

When make a view translucent using `setAlpha()`, `AlphaAnimation`, or `ObjectAnimator`, it is rendered in an off-screen buffer which doubles the required fill-rate.  
When applying alpha on very large views, consider setting the view's layer type to LAYER_TYPE_HARDWARE.

See [View_layers_and_animations](../Hardware_Acceleration.md#View_layers_and_animations)  
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

- When animate the view,use Hardware acceleration.  
See [View_layers_and_animations](../Hardware_Acceleration.md#View_layers_and_animations)  
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips


## Reducing views （Flattern view hierarchy） 
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips   
- 使用LinearLayout嵌套层次太多时，应该使用 RelativeLayout或ConstraintLayout，使界面尽量扁平化。
- RelativeLayout 会对子 View 做两次测量，因此在布局层级相同的情况下，使用 LinearLayout， 不使用RelativeLayout。
- ConstraintLayout 比 RelativeLayout效率高。  
- Merge
- Use android:windowNoTitle来移除标题栏   
- 层数不能超过10层。超过15层一定要优化。  
- Remove unneeded view from XML Layout

## Reduce overdraw  
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips  

[Flattern view hierarchy](#flattern-view-hierarchy)    
[Reduce transparency](#reduce-transparency)  
- Remove unneeded backgrounds in layouts     
- Remove unneeded Window default background    
getWindow().setBackgroundDrawable(null);   
- 按需显示占位背景图片。   
- Custom View             
 Canvas.quickReject():判断区域是否在canvas的剪切域内。  
 Canvas.clipRect():指定要绘制的矩形区域。    
  

## Reduce transparency    
- Reduce transparent animations
- Reduce transparent colors    
- Reduce / Delay transparent ImageView    
- Reduce transparent background    
- Reduce fade-outs

## 避免没有必要的刷新
- 判断是否需要刷新。比如，已经是visible，不用再设置可见。
- progress 的降低更新频率，比如10的倍数。
- ViewStub ： 仅仅在需要时才显示
- Don't modify shapes too often      
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips
- Don't modify bitmaps too often    
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## Include

## ListView  
- ViewHolder  
- 使用RecyclerView代替 ListView  
- 三级缓存：Memory -> Local -> Network  

## 控件不能超过80个

## 启动优化
- Split UI init and non-UI init(必要?延迟?)    
- non-UI init 用多线程

    Example :  Activity start and it's UI render is very slow.          
    Split UI init and non-UI init in activity onCreate().           
    In activity onCreate, delay 5 seconds before non-UI init.          

## 合理的刷新机制
- 减少刷新次数： 合并必要、减少不必要     
- 减少一次性刷新的数据量：局部刷新    

## 提升动画性能

## 尽可能少用 wrap_content，wrap_content 会增加布局 measure 时的计算成本，已
知宽高为固定值时，不用 wrap_content。

## 删除控件中的无用属性。

# 7 安全性优化

## 7.1 `tools:remove`:移除 app 中由第三方 sdk 引入的权限
