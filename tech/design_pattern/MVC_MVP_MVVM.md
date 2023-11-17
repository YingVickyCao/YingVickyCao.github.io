# MVVM

# MVC（Model-View-Controller）：
- 视图（View）：用户界面。  
- 控制器（Controller）：业务逻辑层。大部分逻辑在此层。    
做哪些操作？  
数据校验、可以有数据转化。      
让Module保存数据。    
- 模型（Model）：数据层。    
做哪些操作？  
数据保存。      
提供数据。  
数据来自于I/O、DB、网络请求等。包含网络请求返回值后进行数据转化最终得到POJO类。          
包含定义POJO类。     
通知View层更新UI。  

MVC的延伸框架有 MVP 和 MVVM。


Way 1 :  
View ：xml，Activity  
Controller ： Activity  
Model：LoginModel  
可以看出，Android 即是View 也是 Controller。  

Way 2 :  
View ：Activity    
Controller ： LoginController    
Model：LoginModel    



# MVP（Model - View - Presenter） :
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。  
# MVVC（Model - ViewModel - View）:  
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。  
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。

Model：它仅仅关注数据本身，不关心任何行为。  
View：负责接收用户输入、发起数据请求以及展示结果页面  
ViewModel：负责业务逻辑，实现View与Model的双向绑定  


# Conclusion  
由此可见，MVC、MVP、MVVP三个模型干的活差不多，区别在于通信方面不同。

# Ref：
- https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
- https://www.jianshu.com/p/2a21e9b4a9f6
- https://blog.51cto.com/u_14850/6852160