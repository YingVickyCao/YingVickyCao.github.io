# Hardware acceleration

- Android >=3.0 (API level 11), Android 2D rendering pipeline supports hardware acceleration.
- `Target API level >=14, Hardware acceleration is enabled by default`.
- hardware acceleration is not supported for all of the 2D drawing operations, turning it on might affect some of your custom views or drawing calls.
  > application performs custom drawing, test application on actual hardware devices with hardware acceleration turned on to find any problems.

# 1 Hardware acceleration level

**Application level**

```xml
<application android:hardwareAccelerated="true" ...>
```

**Activity level**

```xml
<application android:hardwareAccelerated="true">
    <activity ... />
    <activity android:hardwareAccelerated="false" />
</application>
```

**Window level**

```java
getWindow().setFlags(
    WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
    WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
```

**View level**

```
myView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
```

# 2 Determine if a view is hardware accelerated

```java
// returns true if the View is attached to a hardware accelerated window.
View.isHardwareAccelerated()

// returns true if the Canvas is hardware accelerated
Canvas.isHardwareAccelerated()
```

# 3 Android drawing models

| Software-based drawing model | Hardware accelerated drawing model |
| ---------------------------- | ---------------------------------- |
| Software                     | GPU => RAM ↑                       |
| View.LAYER_TYPE_SOFTWARE     | View.LAYER_TYPE_HARDWARE           |

## Software-based drawing model

- Steps

```
1. Invalidate the hierarchy
2. Draw the hierarchy
```

- `When` needs to update a part of its UI:  
  invokes `invalidate() (or one of its variants)` on any view that has changed content.

- dirty region

- Drawbacks:  
  (1) Executing the drawing commands immediately  
  (2) 多余的绘制  
  e.g., button invorks `invalidate()`, 位于 view A 之上。 即使 A 没有任何改变，A 也被绘制了。  
  (3) can hide bugs  
  Since the Android system redraws views when they intersect the dirty region, a view whose content you changed might be redrawn even though invalidate() was not called on it. When this happens, you are relying on another view being invalidated to obtain the proper behavior. This behavior can change every time you modify your application.  
  Because of this, you should always call `invalidate()` on your custom views whenever you modify data or state that affects the view’s drawing code.

> Android views automatically call invalidate() when their properties change, such as the background color or the text in a TextView.

## Hardware accelerated drawing model

- `Steps`

```
1. Invalidate the hierarchy
2. Record and update display lists
3. Draw the display lists
```

Advantages:  
(1) Android system records them inside display lists, which contain the output of the view hierarchy’s drawing code.  
(2) Android system only needs to record and update display lists for views marked dirty by an invalidate() call. Views that have not been invalidated can be redrawn simply by re-issuing the previously recorded display list.  
The view is not redrawn unless you change the view's properties, which calls invalidate(), or if you call invalidate() manually.

- E.g.

For example, assume there is a LinearLayout that contains a ListView above a Button. The display list for the LinearLayout looks like this:

```
DrawDisplayList(ListView)
DrawDisplayList(Button)
```

Change ListView's opacity.
After invoking setAlpha(0.5f) on the ListView.

```
SaveLayerAlpha(0.5)
DrawDisplayList(ListView)
Restore
DrawDisplayList(Button)
```

The complex drawing code of ListView was not executed. Instead, the system only updated the display list of the much simpler LinearLayout.  
In an application without hardware acceleration enabled, the drawing code of both the list and its parent are executed again.

# 4 Unsupported drawing operations

e.g.:  
Custom view `ShadowedViewGroup.java` use Paint.setShadowLayer() to draw shadow color.  
In Hardware acceleration, Paint.setShadowLayer() min supoort API level is 28.

| API Level            | getLayerType()      | Test Result             |
| -------------------- | ------------------- | ----------------------- |
| Android 9 (API=28)   | LAYER_TYPE_NONE = 0 | Shadow is displayed     |
| Android 8.1 (API=27) | LAYER_TYPE_NONE = 0 | Shadow is not displayed |
| Android 8 (API=26)   | LAYER_TYPE_NONE = 0 | Shadow is not displayed |

| -                                      | First supported API level |
| -------------------------------------- | ------------------------- |
| **Canvas**                             |
| drawBitmapMesh() (colors array)        | 18                        |
| drawPicture()                          | 23                        |
| drawPosText()                          | 16                        |
| drawTextOnPath()                       | 16                        |
| drawVertices()                         | ✗                         |
| setDrawFilter()                        | 16                        |
| clipPath()                             | 18                        |
| clipRegion()                           | 18                        |
| clipRect(Region.Op.XOR)                | 18                        |
| clipRect(Region.Op.Difference)         | 18                        |
| clipRect(Region.Op.ReverseDifference)  | 18                        |
| clipRect() with rotation/perspective   | 18                        |
| **Paint**                              |
| setAntiAlias() (for text)              | 18                        |
| setAntiAlias() (for lines)             | 16                        |
| setFilterBitmap()                      | 17                        |
| setLinearText()                        | ✗                         |
| setMaskFilter()                        | ✗                         |
| setPathEffect() (for lines)            | 28                        |
| setShadowLayer() (other than text)     | 28                        |
| setStrokeCap() (for lines)             | 18                        |
| setStrokeCap() (for points)            | 19                        |
| setSubpixelText()                      | 28                        |
| **Xfermode**                           |
| PorterDuff.Mode.DARKEN (framebuffer)   | 28                        |
| PorterDuff.Mode.LIGHTEN (framebuffer)  | 28                        |
| PorterDuff.Mode.OVERLAY (framebuffer)  | 28                        |
| **Shader**                             |
| ComposeShader inside ComposeShader     | 28                        |
| Same type shaders inside ComposeShader | 28                        |
| Local matrix on ComposeShader          | 18                        |

## Canvas scaling

The hardware accelerated 2D rendering pipeline was built first to support unscaled drawing, with some drawing operations degrading quality significantly at higher scale values.  
 These operations are implemented as textures drawn at scale 1.0, transformed by the GPU.

Below table: All drawing operations can scale without issue,correctly handling large scales

| **Drawing operation to be scaled** | First supported API level |
| ---------------------------------- | ------------------------- |
| drawText()                         | 18                        |
| drawPosText()                      | 28                        |
| drawTextOnPath()                   | 28                        |
| Simple Shapes\*                    | 17                        |
| Complex Shapes\*                   | 28                        |
| drawPath()                         | 28                        |
| Shadow layer                       | 28                        |

> Note:  
> 'Simple' shapes are drawRect(), drawCircle(), drawOval(), drawRoundRect(), and drawArc() (with useCenter=false) commands issued with a Paint that doesn't have a PathEffect, and doesn't contain non-default joins (via setStrokeJoin() / setStrokeMiter()).  
> Other instances of those draw commands fall under 'Complex,' in the above chart.

# 5 View layers

| Items                          | LAYER_TYPE_NONE   | LAYER_TYPE_HARDWARE                           | LAYER_TYPE_SOFTWARE                |
| ------------------------------ | ----------------- | --------------------------------------------- | ---------------------------------- |
| Default behavior               | Yes               | No                                            | No                                 |
| Backed by an off-screen buffer | not backed        | backed                                        | backed                             |
| Rendered                       | rendered normally | rendered in hardware into a hardware texture. | rendered in hardware into a bitmap |
| Performance                    | -                 | First choose                                  | Second Choose                      |
| Visual effects                 | -                 | Same                                          | Same                               |
| Compatibility                  | -                 | Second Choose : May have rendering problems   | First Choose                       |

- Android >=3.0 (API level 11) , View.setLayerType()

- LAYER_TYPE_HARDWARE  
  If the application is not hardware accelerated, this layer type behaves the same as LAYER_TYPE_SOFTWARE.

- Performance  
  Use a hardware layer type to render a view into a hardware texture. Once a view is rendered into a layer, its drawing code does not have to be executed until the view calls invalidate(). Some animations, such as alpha animations, can then be applied directly onto the layer, which is very efficient for the GPU to do.
- Layer
  Off-screen buffers, or layers, have several uses.  
  Use them to get better performance when animating complex views or to apply composition effects.  
  For instance, you can implement fade effects using Canvas.saveLayer() to temporarily render a view into a layer and then composite it back on screen with an opacity factor.

<h2 id="View_layers_and_animations">View layers and animations</h2>

使用硬件加速，来提供更流畅的动画效果。  
use hardware layers to render the view to a hardware texture.  
The hardware texture can then be used to animate the view, eliminating the need for the view to constantly redraw itself when it is being animated. The view is not redrawn unless you change the view's properties, which calls invalidate(), or if you call invalidate() manually.

When a view is backed by a hardware layer, some of its properties are handled by the way the layer is composited on screen. Setting these properties will be efficient because they do not require the view to be invalidated and redrawn.

- `alpha`: Changes the layer's opacity
- `x, y, translationX, translationY`: Changes the layer's position
- `scaleX, scaleY`: Changes the layer's size
- `rotation, rotationX, rotationY`: Changes the layer's orientation in 3D space
- `pivotX, pivotY`: Changes the layer's transformations origin

```java
view.setLayerType(View.LAYER_TYPE_HARDWARE, null);
ObjectAnimator animator = ObjectAnimator.ofFloat(view, "rotationY", 180);
animator.addListener(new AnimatorListenerAdapter() {
    @Override
    public void onAnimationEnd(Animator animation) {
        // Because hardware layers consume video memory,disable them after the animation is done
        view.setLayerType(View.LAYER_TYPE_NONE, null);
    }
});
animator.start();
```

# Refs

- [setLayerType](<https://developer.android.google.cn/reference/android/view/View#setLayerType(int,%20android.graphics.Paint)>)
- [Hardware acceleration](https://developer.android.google.cn/guide/topics/graphics/hardware-accel)
