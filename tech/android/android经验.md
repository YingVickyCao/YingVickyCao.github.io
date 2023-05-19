# Android 经验

- login page  
  phone：左右 margin 是 40dp  
  tablet：内容居中，不按百分比
- Android button 有 3 种状态：Disable、正常、按下。  
  没有 类似 Web 的 focus 和 hover 状态
  [Button](widget/Button.md)

- 防止用户重复点击 button/icon button  
  button 要有 disable 状态，防止用户重复点击。  
  当按下后，从正常变为 disable，1 到 2 秒后，自动变为正常，用户才能点击。
- Android EditText 有 3 种状态，disable、正常、选中(Focus)。  
  没有 类似 Web 的 hover 状态  
   [EditText](widget/EditText.md)
- 防止 button 误触  
   扩大点击区域
  https://material.io/design/layout/spacing-methods.html#baseline-grid

- API changes

  https://developer.android.google.cn/sdk/api_diff/30/changes/android.view.View

  https://developer.android.com/sdk/api_diff/30/changes/android.view.View
