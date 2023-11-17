# MVVM

![MVC VS MVP VS MVVM](https://s2.51cto.com/images/blog/202308/22172305_64e47e79364be13990.jpg)

# MVC（Model-View-Controller）：
- 视图（View）：用户界面。  
- 控制器（Controller）：业务逻辑层。大部分逻辑在此层。    
做哪些操作？  
数据校验、      
让Module保存或获取数据。    
- 模型（Model）：数据层。    
做哪些操作？  
数据保存。      
提供数据。  
数据来自于I/O、DB、网络请求等，包括得到数据后进行`数据转化`最终得到POJO类。          
包含定义POJO类。     
通知View层更新UI。    


    Way 1 :  
    View ：xml，Activity  
    Controller ： Activity  
    Model：LoginModel  
    可以看出，Android 即是View 也是 Controller。  

    Way 2 :  
    View ：Activity    
    Controller ： LoginController    
    Model：LoginModel    

- MVC的延伸框架有 MVP 和 MVVM。

# MVP（Model - View - Presenter） :
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。  

# MVVC（Model - ViewModel - View）:  
MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。  
唯一的区别是，它采用双向绑定（data-binding）：View的变动，自动反映在 ViewModel，反之亦然。

- ViewModel：负责业务逻辑，实现View与Model的双向绑定。        
ViewModel中“Model”指的是View的Model，它包含View的一些数据属性和操作的东西。

# Conclusion  
由此可见，MVC、MVP、MVVP三个模型差不多，最大区别在于通信方面不同。

# Ref：
- https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
- https://www.jianshu.com/p/2a21e9b4a9f6
- https://blog.51cto.com/u_14850/6852160
- https://www.jianshu.com/p/e4b5d22732e9