# VideoView

## 转屏技巧
Question:  
当切换横竖屏时，如何显示更改VideoView的大小和位置？

Solution:  
`VideoView + portrait position View`  

- mPortraitPosition.getLocationOnScreen(locationArray)
- VideoView 与 portrait content (包含portrait position）的view层次同级。
- 增加一个白色背景的portrait position视图名，位于视图树中较深的位置。
- 当横屏时，全屏显示VideoView。  
- 当竖屏时，设置VideoView 与 portrait position的位置大小相同。  
- 当视屏大小改变时，默认的VideoView会维持屏幕宽高比。若让视屏填充整个可用空间，覆盖自定义 View 中的 onMeasure()方法。

# Ref
- [Android中播放MP4文件](https://blog.csdn.net/u012975705/article/details/49047975)