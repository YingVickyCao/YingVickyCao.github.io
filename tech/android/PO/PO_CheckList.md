# 性能优化清单

# 1 绘制优化

## 1 Don't create render objects,e.g., `Paint`,`Path`, in draw methods

```java
@Override
protected void onDraw(Canvas canvas) {
    super.onDraw(canvas);
    // In instead, new Paint in constructor
    // Paint paint = new Paint();
}
```

## 2 When make a view translucent,use Hardware acceleration.

When make a view translucent using `setAlpha()`, `AlphaAnimation`, or `ObjectAnimator`, it is rendered in an off-screen buffer which doubles the required fill-rate.  
When applying alpha on very large views, consider setting the view's layer type to LAYER_TYPE_HARDWARE.

See [View_layers_and_animations](../Hardware_Acceleration.md#View_layers_and_animations)  
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 3 When animate the view,use Hardware acceleration.

See [View_layers_and_animations](../Hardware_Acceleration.md#View_layers_and_animations)  
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 3 Reduce overdraw

https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 4 Reducing views

https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 5 Don't modify shapes too often

https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 6 Don't modify bitmaps too often

https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

## 7 Activity start and it's UI render is very slow.

- Split UI init and non-UI init in activity onCreate().
- In activity onCreate, delay 5 seconds before non-UI init.

# 7 安全性优化

## 7.1 `tools:remove`:移除 app 中由第三方 sdk 引入的权限
