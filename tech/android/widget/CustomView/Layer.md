# Layer (图层)

```java
canvas.getSaveCount()
//saveLayer()restoreToCount()一般成对出现
canvas.saveLayer() / canvas.saveLayerAlpha()
canvas.restoreToCount(count);
```

```java
// save()和restore()一般成对出现.也可以不成对出现
canvas.save()
canvas.restore()
```

- Canvas 看作是一张画布。  
  Canvas 默认下只有一个 Layer。canvas.getSaveCount() = 1.  
  CanvasLayerExample0View.java
  <br>
- `canvas.getSaveCount()`  
  查看当前 View 的 Layer 数量
  <br>
- `canvas.saveLayer() / canvas.saveLayerAlpha()`  
  记录当前 Layer 的 index，然后创建新 Layer、入栈它，此时 count=count +1。  
  CanvasLayerExample1View.java
  <br>
- `canvas.restoreToCount()`  
  Layer 执行退栈，index=count-1。  
  CanvasLayerExample3View / CanvasLayerExample4View / CanvasLayerExample5View  
  当形参 count 大于 实际 count 时，调用失败，仍旧停留在当前图层。CanvasLayerExample2View

- Layer 的主要作用：  
  通过绘制各个 Layer，实现效果图。

- 不论有多少个 Layer， x 和 y value 都是指相对于当前 View。因此，想要通过 Layer 得到效果图。  
  要设置 Layer 的偏移量 x 和 y，否则最上面 Layer 会覆盖到下面 Layer 的绘制。
- Layer 使用栈结构管理。
  <br/>
  ![custom_view_canvas_layer](https://yingvickycao.github.io/img/android/widget/custom_view_canvas_layer.webp)
- 案例分析

```java
// CanvasLayerExample6View.java
  @Override
    protected void onDraw(Canvas canvas) {
        canvas.drawColor(Color.WHITE);
        canvas.translate(10, 10);

        paint.setColor(Color.RED);
        paint.setStyle(Paint.Style.FILL);
        canvas.drawCircle(75, 75, 75, paint);
        Log.d(TAG, "onDraw: " + canvas.getSaveCount()); // 1
        int count = canvas.saveLayerAlpha(0, 0, 220, 220, 0x88);
        canvas.drawColor(getResources().getColor(R.color.color_green_alpha_10, getContext().getTheme()));
        Log.d(TAG, "onDraw: " + canvas.getSaveCount());// 2

        paint.setColor(Color.BLUE);
        canvas.drawCircle(125, 125, 75, paint);

//        canvas.restore();
//        canvas.restoreToCount(count);
        Log.d(TAG, "onDraw: " + canvas.getSaveCount());
        paint.setColor(Color.YELLOW);
        canvas.drawCircle(165, 200, 75, paint);// 1
    }
```

绿色是 index=1 的 Layer。  
 对于是否调用 canvas.restore()/canvas.restoreToCount() 退栈到 index=0 操作？  
 不调用？黄色圆圈仍然绘制在 Layer index=1。

![custom_view_canvas_layer_1](https://yingvickycao.github.io/img/android/widget/custom_view_canvas_layer_1.jpg)

调用？黄色圆圈绘制在 Layer index=0。  
 ![custom_view_canvas_layer_2](https://yingvickycao.github.io/img/android/widget/custom_view_canvas_layer_2.jpg)

- `canvas.save()`  
  用来保存坐标轴的状态。  
  canvas.save()之后，canvas 执行平移、放缩、旋转、裁剪（ matrix/clip）等操作。  
  matrix：translate,scale,rotate,skew,concat  
  clip：clipRect，clipPath

![custom_view_canvas_save](https://yingvickycao.github.io/img/android/widget/custom_view_canvas_save.webp)

- `canvas.restore()`
  remove all modifications to the matrix/clip state since the last save call，避免影响后续绘制。  
  restore() 和 save() 调用次数要匹配。  
  restore()次数大于 save() 次数会报错：java.lang.IllegalStateException: Underflow in restore - more restores than saves. CanvasLayerExample6View.java

## `canvas.save()` vs `canvas.saveLayer()`

- vs
  (1) saveLayer()比 save() 更耗性能.  
   (2) saveLayer()类似 save()方法，但是它会生成一个 offscreen bitmap, 之后的所有操作都是在这个新的 offscreen bitmap 上。  
   (3) saveLayer()可以保存特定的区域。save() 方法保存的是 整个 Canvas.  
  (4) 在使用混合模式 setXfermode 时会产生不同的影响。TODO
  <br/>

- 怎么选择 save() 和 saveLayer()？  
  (1)当形状很大时，很耗费性能，禁止使用 saveLayer()。  
  (2) 自定义 View 使用硬件加速时推荐使用 xfermode ,color filter 或者 alpha 时，不推荐使用 saveLayer()方法。

## `canvas.restore()` vs `canvas.restoreToCount()`

- restore()一次弹出一个 save()方法的状态栈。 restoreToCount()可以指定一次性弹出 saveCount 个栈。

# Refs

- Layer  
  https://www.yimipuzi.com/1139.html
