# Dimen

## `getResource().getDimen()`

`RectView.java`

- dp auto -> px:`300dp -> 1050`
- px -> px: 300px -> 300

## getDimension vs getDimensionPixelSize vs getDimensionPixelOffset

TestDimensionFragment.java

- getDimension 返回值是 float。  
  getDimensionPixelSize 返回值是 int，四舍五入  
  getDimensionPixelOffset 返回值是 int，只保留整数部分。

- getDimension，getDimensionPixelSize，getDimensionPixelOffset 返回为实际值。  
  若为 dp/sp，则返回 xml 中定义的 value `*` 屏幕密度。  
  若为 px，则返回 xml 中定义的 value。
