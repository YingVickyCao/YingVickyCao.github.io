# MVP


 M(model) : 数据层。  
 （1）、提供数据给P。  
 （2）、数据来自于I/O、DB、网络请求等。  
 
 
 P(presenter)：中间层。逻辑层。  
 （1）、决定是否显示View，  
 （2）、决定如何去实现业务逻辑。  
 （3）、决定如何调用model  
 （4）、大部分逻辑都会在Presenter，包括进行数据校验，数据转化。  
 
 V(View)：视图层。  
 （1）、传递用户事件  
 （2）、接受来自P层的数据并显示。  

Ref ：
https://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
