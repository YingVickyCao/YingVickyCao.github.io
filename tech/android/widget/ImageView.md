# ImageView

# 1. 通过分析图片的大小和宽度比，加入Ken Burns特效

Ken Burns特效是视频产品中使用的一种平移和缩放静态图片的特效。     
使用Nine Old Androids库可以让我们在旧版本上使用Android 3.0的动画API。  
要创建Ken Burns 特效，需要预设一些动画。这些动画将随机应用到ImageView，当一个动画显示完毕，就开始显示另一个动画和图片。

# 2. ScaleType

## CENTER
1 不缩放，原始大小  
2 图片大于ImageView时，截取中间部分  
3 图片小于ImageView时，直接居中显示  

## CENTER_CROP
1 等比例缩放，居中显示，图片长（宽）>= ImageView的长（宽）  

## CENTER_INSIDE
1 图片大于ImageView时，等比例缩小，整幅图显示在ImageView中  
2 图片小于ImageView时，不缩放，直接居中显示

## FIT_START,FIT_CENTER,FIT_END
1 等比例缩放 （缩放后宽度 = ImageView的宽度 ）  
2 图片大于ImageView时，等比例缩小，整幅图显示在ImageView中  
3 图片小于Imageview时，等比例放大，整幅图显示在ImageView中  

FIT_START:	左方或上方  
FIT_CENTER:居中，默认  
FIT_END：右方或下方  
	
## FIT_XY
非等比例缩放，宽高=ImageView相同，充满ImageView

## MATRIX
1 图片大于ImageView时，根据一个3x3的矩阵对其中进行缩小  
2 图片小于ImageView时，直接左上显示  

# 3. ImageView `android:src` vs `android：background`

-           | src                       | background
---         |---                        |---
xml         | android:src               | android:background
Java        | ImageView.setImageResource()| View.setBackgroundResource()
Java        | getDrawable()             | getBackground()
是否拉伸？  | 存放原图，不拉伸。        | 根据长宽进行拉伸
scaleType？ | 起作用，控制图片缩放方式  | 不起作用
前景/背景？ | 前景                      | 背景
padding？   | 生效                      | 不生效。background=不生效，src + background=有效
透明度？    | 可设置，生效              | 可设置，生效



android:src
```
setImageResource()
setImageDrawable()
setImageBitmap()
setImageIcon()
```

android:background
```
setBackground(Drawable background)  <= setBackgroundDrawable(Drawable background) deprecated
setBackgroundResource(int resid)
setBackgroundColor(int color)
```

# Refs
- [NineOldAndroids](http://nineoldandroids.com/)
- [Nine Old Androids » 2.4.0](https://mvnrepository.com/artifact/com.nineoldandroids/library/2.4.0)
- [GitHub Nine Old Androids](https://github.com/JakeWharton/NineOldAndroids)