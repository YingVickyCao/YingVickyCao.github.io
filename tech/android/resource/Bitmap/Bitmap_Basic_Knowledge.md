# Bitmap

# 1. Android 选择 drawable 时查找 drawable 文件夹的顺序？

假如目标 Phone 匹配 drawable-xxhpi?

1. => drawable-anydpi: 不显示/很模糊 => 不建议使用
2. => drawable-xxhdpi 假如没找到，先向上找，后向下找
3. => drawable-xxxhdpi
4. => drawable-xhdpi
5. => drawable-nodpi
6. => drawable-hdpi
7. => drawable-mdpi
8. => drawable
9. => drawable-lhpi

![Figure 2. Relative sizes for bitmaps at different density sizes](https://developer.android.google.cn/images/screens_support/devices-density_2x.png)

## mdpi

- 160 pixels per square inch （160ppi）
- drawable = 默认 = drawable-mhpi
- drawable 和 drawable-mhpi 同时出现时，先使用 drawable-mhpi

`TestBitmapMemoryAndScreenDensityFragment.java`

```
same image
in /drawable:
checkDrawableMemory: bitmapWidth=384,bitmapHeight=384,byteCount=589824,width=384,height=384

in /drawable-mdpi:
checkDrawableMemory: bitmapWidth=384,bitmapHeight=384,byteCount=589824,width=384,height=384
```

## 只有一套图

```
drawable-xxhdpi
drawable-nohdpi
```

## [比重](https://developer.android.google.cn/about/dashboards)

> hdpi 25.7%  
> xhdpi 42.2%  
> xxhdpi 25.9%

## drawable-nodpi

- 像素密度无关，不放缩
- not scale：不同分辨率显示大小是一样的
- 放仅仅有一份的图片
- height and width = wrap_content， 不能是 dp

## drawable-anydpi

- 资源优先于任何 dpi 得到使用

# 2. 容易混淆的概念

## 图像

- 点阵图像  
  小方格的颜色、位置以及个数，决定了图像

- 矢量图  
  svg

## 屏幕尺寸

![screen_size](https://yingvickycao.github.io/img/android/resources/screen_size.png)

- 屏幕的对角线长度，单位是 inch
- 设备的物理尺寸

### inch

- 英寸／寸
- 生活中手机 5 寸 = 5 inch
- Inch = 2.54cm

## 屏幕 resolution（分辨率）

- Screen Resolution,又叫 显示分辨率  
  Win7 中的分辨率 1920 x 1080  
  图片在 AS 中显示： 270 x 480（32-bit color）  
  UI 给的图片大小是指分辨率 = 所有的像素点

- 整个显示器所能显示的像素的个数，不是一个英寸的个数
  显示分辨率固定时，显示器大小越小，图像越清晰  
  显示器大小固定时，显示分辨率越大，图像越清晰

- 屏幕分辨率 = 横向像素 _ 纵向像素 = X _ Y  
  `android.xls` - Page `drawable_dpi`  
  ![dpi](https://yingvickycao.github.io/img/android/resources/dpi.png)

## 像素(像素点)

- 像素 = pixel 图像元素 = px = pix + el,有时又成为 pel（picture element）  
  pix 是 picture 的缩写  
  l = element
- 图像的最小方格：最小的不可分割的单位
- 屏幕上一个发光的最小点，对应着一个 pixel（像素）点。  
  ![pixel](https://yingvickycao.github.io/img/android/resources/pixel2.png)  
  ![pixel](https://yingvickycao.github.io/img/android/resources/pixel.png)

- 以像素为单位设置尺寸，会怎么样？  
  图上的每一个小格子代表了一个像素（pixel）。  
  假设下面三个矩形，代表三个屏幕大小一样的设备，但是，它们拥有的分辨率（resolution）不同:一个像素点的大小，在这个三个物理尺寸一样但拥有不同分辨率的设备上，是不一样的。

图 1.相同尺寸的设备 不同的分辨率  
![set_size_with_px_1.png](https://yingvickycao.github.io/img/android/resources/set_size_with_px_1.png)

图 2.不同分辨率下的 2px 实际高度  
以像素为单位来设置一个界面元素的大小，比如 2px 的高度，2px 的长度上面的设备中真实显示出的长度是不一样的。  
![set_size_with_px_2.png](https://yingvickycao.github.io/img/android/resources/set_size_with_px_2.png)

## dip = dp

- density-independent pixels 密度独立像素:  
  在同样物理尺寸大小的屏幕上（不论分辨率谁高谁低，只要物理尺寸大小一样即可），1 个单位的长度所代表的物理尺寸是一样的。这种单位就应该是独立于分辨率的.
- 以 dp 为单位设置尺寸，会怎么样？  
  2dp 宽，2dp 高的内容，在不同分辨率但屏幕尺寸一样的设备上所显示出的物理大小是一样的.

图 3. 2dp \* 2dp 大小的内容 在同样尺寸的屏幕中所占据的物理大小一致.  
![set_size_with_dp.png](https://yingvickycao.github.io/img/android/resources/set_size_with_dp.png)

- dip != dpi
- 安卓开发
- 1dp 等于 屏幕点密度为 ppi 为 160 的 1px 的长度,即在 160ppi 的屏幕上，1dp = 1px

```
1dp : 1 inch
1ppi = 160px / 1 inch
=>
1px = dp * (ppi/160)
```

## ppi

- pixels per inch,每英寸的像素  
  在图像中，每英寸的像素个数

- 图像分辨率的单位 ／ 光学分辨率
- 适用
  显示器  
  手机屏幕  
  图像
- PPI 值越高，画面的细节就会越丰富
- PPI = 分辨率／尺寸

### 手机屏幕的 PPI

- 屏幕像素密度
- PPI = 对角线分辨率／对角线尺寸  
  ![PPI](https://yingvickycao.github.io/img/android/resources/ppi_1.png)

  3.5 英寸、分辨率 960\*640  
  ![PPI2](https://yingvickycao.github.io/img/android/resources/ppi_2.png)

## dpi

- dot per inch,每英寸的点数  
  每英寸所能打印的点数

- 打印分辨率／打印精度

- 适用  
  输出设备:  
  Case 1. 打印机打印:150dpi ～ 300dpi  
  Case 2. 冲印照片

## 手机的屏幕密度

- Android 中，将 ppi／dpi 看作一致。因为手机屏幕的点和像素是一个东西。  
  ppi 计算公式 = dpi 计算公式  
  屏幕像素密度 == 屏幕密度

- 实际屏幕密度  
  对手机计算出来的密度，是实际的屏幕像素密度

- 图像真正显示时，只关心要显示的点数，不管实际大小（kb）和 ppi 的大小

### 系统屏幕密度

- 出厂预置
- 由于手机碎片化，导致实际屏幕密度碎片化。密度是安卓进行缩放的依据，所以，android 给出了屏幕适配的规则：
  得到实际密度，一般会选择一个最近的密度作为系统屏幕密度
- 对应最先查找的 drawable 文件夹
- 可以修改

## 1K

1024 像素

## byte VS bit

byte

- 字节
- 1byte = 8 bit = 256 个颜色
- 1 个英文 = 1byte = 8 bit
- 1 个中文 = 2byte = 16 bit

bit

- 位
- 0／1

# 3. 占用内存测试

`TestBitmapMemoryAndScreenDensityFragment.java`

## 图片占用内存的公式

- 图片占用内存 = 横向像素(长) _ 纵向像素（宽） _ 一个元素占的字节数

横向像素(长) \* 纵向像素（宽）?

1. 原始像素
2. 系统屏幕密度
3. drawable 位置

一个元素占的字节数?  
默认 Config.ARGB_8888 =4 个字节

## 计算图片占用内存

图片大小:270 X480

- 目标  
  系统屏幕密度 = xxhdpi = 480dpi

### Case1 : 文件夹 mdpi = 160 dpi

- 放缩倍数 = 目标／提供

- 提供  
  文件夹 mdpi = 160 dpi

- 放缩倍数 = 目标／位置 =3

- 放缩后的图片大小  
  （270 _ 放缩倍数 ） X （480 _ 放缩倍数 ）= （270 _3） X （480 _ 3）

- 占用内存  
  放缩后的图片大小 _ ARGB ／1024 ／ 1024 =（270 _ 3） X （480 _3） _ 4 ／1024 ／ 1024 = 4.45MB

### Case2 : 文件夹 xxhdpi=480dpi

270 _ 480 _ 4 ／ 1024 ／ 1024 = 0.49

## 结论

`android.xls` - Page `bitmap_use_memory`  
![bitmap_use_memory](https://yingvickycao.github.io/img/android/resources/bitmap_use_memory.png)

- 同一个图片，放在不同文件夹，会生成不同的 Bitmap。bitmap 的长和宽越大，内存越大
- 同一张图片，文件夹对应密度越高，占用内存越小
- 图片在内存占用，不等于硬盘内存占用
- 放到低于最佳匹配文件夹时，放大，内存占用增加
- 放到低于最佳匹配文件夹时，缩小，内存占用变小

## 图片放入与之分辨率不匹配的文件夹会如何？

`android.xls` - Page `drawable_scale`

- 图像分辨率 =像素 \* 尺寸  
  分辨率不变  
  像素和尺寸改变

### 图片缩放

![drawable_scale](https://yingvickycao.github.io/img/android/resources/drawable_scale.png)

放大图片

- 白色像素差值填充
- 清晰度不高

缩小图片

- 对图像采样生成缩略图
- 清晰度提高
- 平滑度提高

# 4. 套图位置

XML / Vector / WebP（Android>=4.0）/ NinePatch > png > jpg > 动态图 gif

## App 不建议使用 jpg，使用 png

- 同样的尺寸，png 比 jpg 大

1. png 有透明通道
2. png 是无损压缩，jpg 是有损压缩

- 对比

1. 内存：跟格式无关
2. 解码速度：png 解码速度快
3. 流量：png 比 jpg 大
4. apk 大小：png 比 jpg 大

- 要不要把所有 jpg 换成 png？  
  加载速度快 ？ 大小？更偏重哪一个？

## 放图片考虑哪些因素？

- apk 大小
- 占用内存
- 查找速度
- 缩放 -> 清晰度
- at least:xxhdpi

# 5 通过修改手机/模拟器的显示分辨率和密度来进行测试屏幕和密度兼容性

## 屏幕分辨率

```
adb shell dumpsys window displays
adb shell wm size
adb shell wm size 1920x2048
adb shell wm size reset
```

## 默认密度

```
adb shell wm density
adb shell wm density 640
adb shell wm density reset
```

# Refs

- [Support different pixel densities](https://developer.android.google.cn/training/multiscreen/screendensities)
- [dashboards](https://developer.android.google.cn/about/dashboards)
- [PPI（手机屏幕的 PPI 和计算方法）](https://baike.baidu.com/item/PPI/9910558)
- [drawable 微技巧](https://blog.csdn.net/guolin_blog/article/details/50727753)
- [APK 瘦身](https://blog.csdn.net/shuhui_csh/article/details/75729644)
- [Drawable 适配](https://blog.csdn.net/wrg_20100512/article/details/51295317)
