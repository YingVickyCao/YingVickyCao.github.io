# PopupWindow

# 1. 2种 显示方式
方式1：下拉 
```
PopupWindow.showAsDropDown(View anchor, int xoff, int yoff, int gravity)
```
默认是PopupWindow的左上角对其控件的左下角     

方式2： 指定位置   
```
PopupWindow.showAtLocation(View parent, int gravity, int x, int y);

```
![Popupwindpw_vertical.png](https://yingvickycao.github.io/img/android/other_ui/popupwindow/Popupwindpw_vertical.png)  

![Popupwindpw_horizontal.png](https://yingvickycao.github.io/img/android/other_ui/popupwindow/Popupwindpw_horizontal.png)


# 2. PopupWindow 弹窗外区域设置 shadow color？
- 与Dialog类似：不能设置shadow color，只能更改黑色的透明度。  
- 默认创建有一个透明的背景
- 可使用DialogFragment 代替 PopupWindow

# 3. Hide PopupWindow?
```
// Must invorked after show(), or crash.
PopupWindow.dismiss();  

// 点击空白区域， dismiss 
popup.setOutsideTouchable(true); PopupWindow
```

# Refs:
- https://www.jianshu.com/p/799dbb86f908
- https://www.cnblogs.com/jzyhywxz/p/7039503.html
- https://developer.android.google.cn/reference/android/widget/PopupWindow.html?hl=en
- https://www.cnblogs.com/jzyhywxz/p/7039503.html