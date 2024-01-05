# SnakeBar

# 1 Dialog vs SnakeBar vs Toast


| Component | 场景                  | 获取焦点      | 消息量级    |
|-----------|---------------------|-----------|---------|
| Dialog    | 重要性提示信息，需要用户做出选择、响应 | 获取当前屏幕焦点  | 轻量级/重量级 |
| SnakeBar  | 不重要的提示信息、不重要的交互响应   | 不获取当前屏幕焦点 | 轻量级     |
| Toast     | 不重要的提示性信息           | 不获取当前屏幕焦点 | 轻量级     |



# 2 Toast vs SnakeBar


| Item                | Toast             | SnakeBar              |
|---------------------|-------------------|-----------------------|
| 自动消失                | Y                 | Y                     |
| 手动控制隐藏              | N                 | Y                     |
| 交互响应                | N                 | Y                     |
| 同一时间只能出现一个 Snackbar | Y                 | Y                     |
| show 多个实例           | 按添加顺序依次显示         | 取消前一个，显示当前            |
| 跨Page显示             | Y                 | N                     |
| 方向                  | 屏幕底部              | 从屏幕底部向上移动             |
| 不获取当前屏幕焦点           | Y                 | Y                     |
| 是否改变布局              | Toast 不会改变已有控件的布局 |  Snackbar 常常把悬浮按钮往上推  |
| View层次              | 展示在当前屏幕内所有控件之外    | 在控件的最顶层               |
| Context             | Application       | Activity              |
| 设置时间                | SHORT/LONG        | SHORT/LONG/INDEFINITE |



-  LENGTH_SHORT 和 LENGTH_LONG 两个状态，测试后分别为约1.8s和 3s



# Ref
- https://developer.android.google.cn/training/snackbar/showing?hl=zh-cn
- https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar
- https://www.jianshu.com/p/f4ba05d7bbda
- https://gitee.com/mengpeng920223/SnackbarUtils
- https://github.com/material-components/material-components-android/blob/master/docs/components/Snackbar.md
- https://github.com/material-components/material-components-android/blob/master/docs/getting-started.md