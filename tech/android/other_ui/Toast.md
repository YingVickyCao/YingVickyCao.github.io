# Toast
`ToastFragment.java`

- 点击Toast会加速 Toast 消失。
- Toast 可以自定义：位置、add click、add image
- 显示时间
Toast.LENGTH_SHORT : 2s     
Toast.LENGTH_LONG : 3.5s    
(1) < 3.5s  
handler  
(2) > 3.5s  
重写代码，否则不能  

## Toast shadow color？
Toast 不分层，直接平铺，没有遮盖层，故没有shadow color，设置不了。