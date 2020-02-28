# Drawable resources

- `ClipDrawableActivity`
- `LayerDrawableActivity`
- `ShapeDrawableActivity`
- `StateListDrawableActivity`

# 1. `drawable-v21` : API >= 21

# 2. [StateListDrawable](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/doc/android/resource/StateListDrawable.md#statelistdrawable)

# 3. LayerDrawable
- LayerDrawable包含一个 Drawable 数组，按照Drawable对象的数组顺序来绘制它们，索引最大的Drawable 对象将会被绘制在最上面。
- android:id：为 Drawable 对象指定一个标识。
- android:buttom/top/left/right：用于指定一个长度，用于指定将 Drawable 绘制到 目标组件的指定位置。  

# 4. ShapeDrawable
- 定义一个几何形状（如矩形、圆形、线形等）。
![ShapeDrawable](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/resources/shape_drawabe.png)

# 5. ClipDrawable
- ClipDrawable代表从其他位图上截取的一个“图片片段”。
![ClipDrawable](https://github.com/YingVickyCao/YingVickyCao.github.io/blob/master/img/android/resources/clip_drawable.png)

# 6. LevelListDrawable 

# 7. BitmapDrawable

- 在res资源文件夹    
同样的图片放在不同像素密度folder的情况下size不同

```

int scale = sdensity/indensity 
size = (width * scale) * (height * scale)

其中，
sdensity = 机器像素密度
indensity = indensity由图片所在的文件夹决定（例如在drawable-mdpi下的 indensity=160）。
```

- 不在res资源文件夹    
默认生成的Bitmap像素跟原图片的像素一样.  
通过优化措施缩小生成的BitmapDrawable



# 9. 两个ImageView使用同一个资源，对一个ImageView 使用Drawable.setColorFilter() 来改变颜色，另一个颜色也变了？
Reason：            
这是因为Drawable使用在Android系统中使用范围比较广，系统对此作了优化，同一资源的drawable共享一个状态，叫做ConstantState.例如R.drawable.ic_launcher,每次新建一个drawable都是一个不同的drawable实例,但他们共享一个状态ConstantState。所以所有的R.drawable.ic_launcher都共享一个bitmap,这就是两个ImageView都改变颜色原因。  
> ConstantState is used by Drawables to store 
shared constant state and data between Drawables.BitmapDrawables created from the same resource will for instance share a unique bitmap stored in their ConstantState.

Solution:   
`Drawable.mute()`:   
使得这个drawable变成可变的，这个操作不可逆转。    
调用了mutate方法，使得该与drawable使用同一个资源的所有Drawable之间不共享状态。  

```
Drawable.java

Make this drawable mutable. This operation cannot be reversed. 
A mutable drawable is guaranteed to not share its state with any other drawable. This is especially useful when you need to modify properties of drawables loaded from resources. 
By default, all drawables instances loaded from the same resource share a common state; if you modify the state of one instance, all the other instances will receive the same modification. 
Calling this method on a mutable Drawable will have no effect.

public @NonNull Drawable mutate() {
        return this;
}



VectorDrawable.java
@Override
    public Drawable mutate() {
        if (!mMutated && super.mutate() == this) {
            mVectorState = new VectorDrawableState(mVectorState);
            mMutated = true;
        }
        return this;
    }
```

Refs:  
- https://www.imooc.com/article/281573
- https://developer.android.google.cn/reference/android/graphics/drawable/Drawable.html

# TBD
- TBD:BitmapDrawable，其尺寸由getIntrinsicWidth和getIntrinsicHeight给出.   
BitmapDrawable.getIntrinsicWidth()和getIntrinsicHeight()理解. https://yezimianbao.iteye.com/blog/2068655

# Refs:
- Android 样式的开发：drawable 汇总篇 https://blog.csdn.net/kite30/article/details/52554309
- [StateListDrawable](https://developer.android.google.cn/reference/android/graphics/drawable/StateListDrawable?hl=en)
- [Drawable resources](https://developer.android.google.cn/guide/topics/resources/drawable-resource.htm)