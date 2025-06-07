# UI Optimization(绘制优化)

# 1 Rule ： Don't block the UI thread

<br/>

# 2 Rule ： Refesh UI only needed

## 2.1 Reduce the fresh time : Comobine the needed refreshes , and reduce the no need freshes.

### 2.1.1 Check if need refresh.   
E.g., if view is already visible, not set visible again。  

### 2.1.2 Reduce the refresh frequency.   
E.g., Update progress view when progress is 10%, 20%,... instead of 1%, 2%,...


## 2.2 Reduce the amount of data that is refreshed at once.
E.g., refresh a part of page instead of the whole page.    
E.g., refresh a item of RecycleView instead of the whole RecycleView.

## 2.3 Don't modify shapes too often        
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips 

## 2.4 Don't modify bitmaps too often     
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips

# 3 Optimize layout hierarchies 
## 3.1 Revise the layout
To flattern view hierarchy, use ConstraintLayout(better) or RelativeLayout, to replace linearLayout.

Bad - 
```xml
<LinearLayout>
    <ImageView/>
        <LinearLayout>
            <TextView/>
            <TextView/>
        </LinearLayout>
</LinearLayout>
```


Good - 
```xml
<ConstraintLayout>
    <ImageView/>
    <TextView/>
    <TextView/>
</ConstraintLayout>
```

## 3.2 Use compound drawables.   
You can handle a LinearLayout that contains an ImageView and a TextView more efficiently as a compound drawable.

Bad - 
```xml
<LinearLayout>
    <ImageView/>
    <TextView/>
</LinearLayout>
```

Good - 
```xml
<TextView 
    android:drawableLeft
    android:text/>
```
## 3.3  `<merge>` - Merge root frame.
 If the root of a layout is a FrameLayout that doesn't provide background or padding, you can replace it with a merge tag.


## 3.4 Remove useless leaves.

Remove useless leaves. You can remove a layout that has no children or no background—since it's invisible—for a flatter and more efficient layout hierarchy.

## 3.5 Remove useless parents. 
You can remove a layout with a child that has no siblings, isn't a ScrollView or a root layout, and doesn't have a background. You can also move the child view directly into the parent for a flatter and more efficient layout hierarchy.

## 3.5 Avoid deep layouts. 
The view hierarchy of a page should <= 10, if >=16, should be optimized, 

### 3.6 Reduce the number of views.
The more views the system has to draw, the slower it will be.    
The num of page views should <= 80.


## 3.6 If same view hierarchy，use LinearLayout ,not use RelativeLayout.
RelativeLayout will measure the children views twice.  


# 4 Reducing views
https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips   


## 4.1 Use android:windowNoTitle to remove title bar.

- Remove useless parents. 
You can remove a layout with a child that has no siblings, isn't a ScrollView or a root layout, and doesn't have a background. You can also move the child view directly into the parent for a flatter and more efficient layout hierarchy.

## 4.2 `<ViewStub>` - Load views on demand


#  5 Reduce overdraw  
overdraw - 过度绘制

- Remove unnecessary backgrounds in layouts.
- [Flattern view hierarchy](#3-Reducing-views) 
- [Reduce transparency](#8-reduce-transparency)  

Ref - https://developer.android.google.cn/guide/topics/graphics/hardware-accel#tips  

## 4.1 Remove unneeded backgrounds in layouts     

## 4.2 Remove unneeded window default background     
getWindow().setBackgroundDrawable(null);       

## 4.3 按需显示占位背景图片。   

## 4.4 Custom View              
 Canvas.quickReject():判断区域是否在canvas的剪切域内。  
 Canvas.clipRect():指定要绘制的矩形区域。 


# 5 Don't create render objects,e.g., `Paint`,`Path`, in draw methods

```java
@Override
protected void onDraw(Canvas canvas) {
    super.onDraw(canvas);
    // In instead, new Paint in constructor
    // Paint paint = new Paint();
}
```

# 6 `<include>` - Reuse layouts

# 7 ListView  

## 7.1 ViewHolder  

## 7.2 Use RecyclerView to replace ListView  

## 7.3 Three level cache：Memory <- Local <- Network  

# 8 Reduce transparency
https://developer.android.google.cn/guide/topics/graphics/hardware-accel     

## 8.1 Reduce transparent animations   

## 8.2 Reduce transparent colors       

## 8.3 Reduce transparent view        

When you make a view translucent using setAlpha(), AlphaAnimation, or ObjectAnimator, it is rendered in an off-screen buffer which doubles the required fill-rate.   
When applying alpha on very large views, consider setting the view's layer type to LAYER_TYPE_HARDWARE.


## 8.4 Reduce transparent background        

## 8.5 Reduce fade-outs    


# 9 Startup optimization
## 9.1 Split UI init and non-UI init(necessay? delay? async task?)          
    Example :  Activity start and it's UI render is very slow.          
    Split UI init and non-UI init in activity onCreate().           
    In activity onCreate, delay 5 seconds before non-UI init.          

# 10 Improve the animation performance

# 11 Use wrap_content as little as possible.
Using wrap_content will increate the cost of layout measurement. If width is fxied，not use wrap_content.

# 13 Delete the unused attributes of view.

# Tools

## Appdome 
E.g., If Appdome detects that show or hide a view manyt time at short time, Appdome will combine the show / hide ui update request to reduce the not necessary update.

## Android Studio - Lint

## Android Studio - Run analysis 

## Android Studio - Layout Inspector
https://developer.android.com/studio/debug/layout-inspector

## Android Studio - Editor : layout