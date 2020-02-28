# ViewPort
引入原因：css 1px != 设备的1px。       
css中像素是一个抽象单位。  
不同设备上，css中1px代表的物理像素不同。  
桌面浏览器可以忽略，不考虑，但移动端浏览器不行。    

- ViewPort:Web页面上用户看见的区域。  

- 分类： 
```
LayoutViewPort：浏览器默认的ViewPort   
VisualViewPort：
IdealViewPort
```

## 1 LayoutViewPort  
浏览器默认的ViewPort.  
对应css像素。   
width = `document.documentElement.clientWidth `

![layout_view_port.png](https://yingvickycao.github.io/img/html/layout_view_port.png)  

## 2 VisualViewPort  
用户通过屏幕看到的ViewPort。    
width = `window.innerWidth`

![visual_view_port.png](https://yingvickycao.github.io/img/html/visual_view_port.png)     

## 3 IdealViewPort  
完美匹配移动设备的ViewPort：在任何分辨率下，不用缩放和横向滚动，网页可完美显现；元素在移动设备显示无明显差异。比如：大小、清晰度。   
不同移动设备，IdealViewPort大小不固定。  
类比dp。  
```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

width:正整数,or width-device
height:很少使用
user-scalable:是否允许用户进行缩放.no-不允许，yes-允许
target-densitydpi:android,Derepssed. 数值/high-dpi 、 medium-dpi、 low-dpi、 device-dpi 	
```

![Ideal_view_port_1.png](https://yingvickycao.github.io/img/html/Ideal_view_port_1.png)  

![Ideal_view_port_2.png](https://yingvickycao.github.io/img/html/Ideal_view_port_2.png)  

# 4 devicePixelRatio
```
window.devicePixelRatio
```
- devicePixelRatio = 当前设备的物理像素分辨率 / (CSS 像素分辨率/设备独立像素(device-independent pixels (dips))  
解释：  
像素大小的比率：一个 CSS像素的大小与一个物理像素的大小的比值。  
即：告诉浏览器应该使用多少个屏幕的实际像素来绘制单个 CSS 像素。 
- devicePixelRatio的值为2：1个css像素相当于2个物理像素

# Ref
- https://www.cnblogs.com/2050/p/3877280.html
- https://blog.csdn.net/Cipuzp/article/details/83958273
- https://www.w3cschool.cn/mobile_web_note/v8x4iozt.html