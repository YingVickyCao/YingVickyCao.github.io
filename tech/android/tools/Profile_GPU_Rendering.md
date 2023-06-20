# 卡顿监测工具 - Profile GPU Rendering

**不要超过绿色横线(16.67ms,约等于16ms, 60 frames/second).**   
把耗时操作输出到中“db shell dumpsys gfxinfo com.**.**（包名）”

## Usage
Inspect GPU rendering speed    
发现渲染有问题的页面。  

## 打开？
Settings -> Developer Options -> Monitoring -> Profile GPU Rendering or Profile HWUI rendering->  On screen as bars

## 功能
- 它是一个动态的图形检测工具，能是是反应当前绘制的耗时（ms）
- 横轴表示时间
- 纵轴表示每一帧的耗时（ms）
- 随着时间的推移，从左到右的刷新。
- 若高于标准耗时，表示当前这一帧丢失    
标准高度 = 绿色 = 警戒线 : 16ms   

# Refs
- [Visualize GPU overdraw](https://developer.android.google.cn/studio/profile/inspect-gpu-rendering#debug_overdraw)
- [Inspect GPU rendering speed and overdraw](https://developer.android.google.cn/studio/profile/inspect-gpu-rendering)

- https://developer.android.google.cn/topic/performance/rendering/inspect-gpu-rendering#profile_rendering
- https://developer.android.google.cn/topic/performance/rendering/profile-gpu?hl=en