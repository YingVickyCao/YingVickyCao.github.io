# WebP

## Usage
- Google发明
- 替代PNG，JPEG

## 单独的工具
- [WebP site](https://developers.google.cn/speed/webp/)

## Convert images to WebP
### good
1. Better compression
2. Reduce size
3. Do not perform build-time compression

### bad   
GPU increases smally

### 兼容性
- API (-, 14]，不支持
- API (14 , 17]  支持不透明
- API [18 , +]  支持不透明 + 透明

### 支持
- PNG  <=> WebP
- JPG  <=> WebP
- JPEG <=> WebP
- Static GIF  <=> WebP

### 不支持
.9.PNG

## 数据
- PNG  =>  WebP, lossless, 26%
- PNG  =>  WebP, transparency + lossy, 22%
- JPEG  =>  WebP, lossy, 25~34%

# Refs
- [Create WebP images](https://developer.android.google.cn/studio/write/convert-webp)
- [Reducing image download sizes](https://developer.android.google.cn/topic/performance/network-xfer)
- [WebP site](https://developers.google.cn/speed/webp/)
- [WebP Support](https://optimus.keycdn.com/support/webp-support)