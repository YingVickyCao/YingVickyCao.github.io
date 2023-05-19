# Matrix - 矩阵，用于图形特效处理，控制图形和组件的变换

Matrix 是矩阵工具类，通过控制 canvas 的坐标轴，实现图形或 View 进行位移、旋转、缩放、倾斜等。

# 常见用法

```java
// MatrixOnBitmapFragment.java
// MatrixOnBitmapView.java
// TestBitmapFragment.java
```

- 缩放

```java
// 缩放.
// sx、sy是X、Y方向上的缩放比例
void setScale(float sx, float sy)
// 以（px，py）为轴心进行缩放。sx、sy是X、Y方向上的缩放比例
void setScale(float sx, float sy, float px, float py)
```

```java
// 缩放
matrix.setScale(2.0f, 2.0f);
canvas.drawBitmap(bitmap, matrix, paint);
```

- 倾斜

```java
// 倾斜
// kx、ky是X、Y方向上的缩放比例
void setSkew(float kx, float ky)
// 以（px，py）为轴心进行倾斜。kx、ky是X、Y方向上的缩放比例
void setSkew(float kx, float ky, float px, float py)
```

- 位移

```java
//位移
void setTranslate(float dx, float dy)\
```

- 旋转

```java
// 旋转
//以（0，0）为轴心进行旋转。degree是旋转角度
void setRotate(float degrees)
//以（px，py）为轴心进行旋转。degree是旋转角度
void setRotate(float degrees, float px, float py)
```

# preXXX vs setXXX vs postXXX

**TODO, 矩阵算法是难点**

Matrix 是一个矩阵，参数(P0) 也是一个矩阵。pre/set/post 的运算结果(P)是两个矩阵相互运算后的结果。  
图形的变换，实质上就是图形上点的变换。

![Matrix](https://yingvickycao.github.io/img/android/widget/Matrix.jpeg)

```java
matrix.preScale(0.5f, 1);  // [0.5f,1] * 原始矩阵
matrix.setScale(1, 0.6f);  // [1,0.6f] （ Set 操作，不会进行运算，直接重置所有值）
matrix.postScale(0.7f, 1); // 原始矩阵 * [0.7f,1]
```

# Refs

https://www.cnblogs.com/tianzhijiexian/p/4298660.html
