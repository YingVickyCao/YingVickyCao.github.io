# MVC

MVC is short for Model（模型）-View（视图）-Controller（控制器）

# 1 MVC
- 如何学习 MVC？  
  MVC 由多个设计模式结合起来，清楚 MVC 内部的各个模式，MVC 也清楚好懂了。

![MVC_1](https://yingvickycao.github.io/img/book/design_pattern/MVC_1.png)

![a-common-mvc-implementation](https://www.oracle.com/a/tech/img/a-common-mvc-implementation.gif)  
Figure1. A Common MVC Implementation

## 1.1 Interaction Between MVC Components

![a-java-se-application-using-mvc](https://www.oracle.com/a/tech/img/a-java-se-application-using-mvc.gif)  
Figure 2. A Java SE Application Using MVC

![multiple-views-using-the-same-model](https://www.oracle.com/a/tech/img/multiple-views-using-the-same-model.gif)  
Figure 3. Multiple Views Using the Same Model

## 1.2 结构

### Model

- Q : 模型可以变成模型的观察者？   
A :  
可以  
在某些设计中，控制器向模型注册。  
Model -> Controller -> View:界面中某些按钮变成有效或无效

### View  
- Q : How does View get model data?

```
// push mode
View <--- Model

// pull mode
View ————> Model
View <———— Model
```

  - Q : How does View set model data?

```
View  ————> Controller ————>  Model
```

### Controller  
协调 Model 和 View 之间的数据流动.    
控制 Model 和 View 之间状态的改变，数据的同步，负责将每个改变的状态送进送出。
控制器把控制逻辑从视图中分离，让模型和视图之间解耦。通过保持视图和控制器之间的松耦合、设计更有弹性而容易扩展。

  Q : 控制器做的事是把用户的输入从视图发送到模型。那么控制器是否有必要存在，把代码放在视图也可以？      
  控制器做的事：发送给模型，解读输入，并根据输入操作模型。  

  Q: 为什么不把代码放在视图中？  
  原因 1，视图会有 2 个责任：管理用户界面、处理如何控制模型的逻辑。    
  原因 2:模型和视图之间紧耦合，那么视图不能处理其他模型。  

## 1.3 Example ： MP3 播放器, DJView

![MVC_2](https://yingvickycao.github.io/img/book/design_pattern/MVC_2.png)

---

![MVC_3](https://yingvickycao.github.io/img/book/design_pattern/MVC_3.png)

---

![MVC_4](https://yingvickycao.github.io/img/book/design_pattern/MVC_4.png)

## MVC 是复合模式，结合了：观察者模式、组合模式、策略模式。

![MVC_5](https://yingvickycao.github.io/img/book/design_pattern/MVC_5.png)

---

![MVC_6](https://yingvickycao.github.io/img/book/design_pattern/MVC_6.png)

### 观察者模式

模型使用观察者模式，以便观察者更新，同时保持两者之间的解耦。  
Model 利用“观察者”让控制器和视图能随着状态改变而更新。

```
Model -> Controller -> View
/
Model -> View 1 / View2 / View 3
```

### 策略模式

视图和控制器实现了“策略模式”
控制器 是 View 的策略和行为。视图使用不同的控制器实现，得到不同的行为。

```
View ——————>Controller 1

     ——————>Controller 2
```

### 组合模式

视图使用组合模式实现用户界面。  
视图内部使用组合模式来管理窗口、按钮等。

### `+`适配器模式：

将新的 Model 适配成已有的视图和控制器。

# 2 Modifying the MVC Design (Deprecated)
![an-mvc-design-placing-the-controller-between-the-model-and-the-view](https://www.oracle.com/a/tech/img/an-mvc-design-placing-the-controller-between-the-model-and-the-view.gif)  
Figure 4. An MVC Design Placing the Controller Between the Model and the View : Apple Cocoa framework

> Why adopt this design?  
> Using this modified MVC helps to more completely decouple the model from the view. In this case, the controller can dictate the model properties that it expects to find in one or more models registered with the controller.  
> In addition, it can also provide the methods that effect the model's property changes for one or more views that are registered with it.

```
View 1      Controller      Model 1
View N                      Model N
```

## 2.2 结构

### View

```
// push mode
View <--- Controller <--- Model

// pull mode
View ————> Controller ————> Model
View <———— Controller <———— Model
```

## 2.3 `Model 2`:MVC 与 Web,Mode 2 是 MVC 在 Web 上的调整

- “Model 2”  
   Web 也使用 MVC，使它符合浏览器/服务器模型。称这样的适配为“Model 2”。  
   e.g., 使用 Servlet 和 JSP 技术结合，来达到 MVC 的分离效果。  
   `仔细观察 Model 2 发现：与 Apple Cocoa framework 是一样的`

  Model 2 是 MVC 在 Web 上的应用。  
  在 Model 2 中，控制器实现成 Servlet，而 JSP/HTML 实现视图。

  ![MVC_7](https://yingvickycao.github.io/img/book/design_pattern/MVC_7.png)

---


![MVC_8](https://yingvickycao.github.io/img/book/design_pattern/MVC_8.png)

- Model 2 的好处：  
  帮助网站避免限于混乱。  
  Model 2 不仅仅提供了设计上的组件分割，也提供了“制作责任”的分割。  
  此处的`业务逻辑`就是后面的`应用逻辑`

  ```
  网页：前端
  控制器：后端
  模型：数据库
  ```

## 2.4 Example ： DJView 的手机 Web 版本。

创建 Servlet 控制器

## 2.5 Model 2 的差异在哪里？

### 观察者

视图是 JSP 产生的的 HTML。  
此视图不再是 Model 的监听者 。
但当 Model 变化时，视图间接地从控制器收到了通知的通知。

### 策略

控制器是 Servlet，它会接受 HTTP 请求，但策略模式好像不见了。  
控制器不像传统的做法那样直接和视图结合。  
控制器提供了视图的行为。想要不同的行为，则直接替换控制器:在.html 中配置。

- `Q : 控制器会实现应用逻辑吗？`  
  A ：不。  
  控制器为视图实现行为，将来自视图的动作转成模型的动作。  
  模型实现应用逻辑，并决定如何响应动作。  
  控制器也要做一些决定：调用哪个 model 的哪个方法，但这不能算是“应用逻辑” 。  
  应用逻辑指的是管理与操作 Model 中的数据的代码。

  我的理解：  
  应用逻辑：表结构、如何操作和更改表等；数据或 Bean、Bean 的 set 等

  判断金额合法后，设置金额： View -> Controll -> Model。  
  判断可以在 View / Controll.  
  不可以在 Model。因为 Control -> Model 是单向的，如果在 Model 判断，不合适，无法通知 control 作出反应。

- Q : 有人把 MVC 中的控制器描述成视图和模型之间的中间者(Mediator）。控制器实现了“中介者模式(Mediator Pattern)”吗?  
  A :  
  中介者的目的是封装对象之间的交互，不让两个对象之间互相显式引用，以达到松耦合的目的。  
  https://www.runoob.com/design-pattern/mediator-pattern.html  
  在某种程度上，控制器可以被视为中介者，视图不会直接设置 Model 状态(cannot set)，而是通过控制器进行。但视图持有能访问 Model 状态的模型引用(can get)。  
  If 控制器是彻底的中介者，视图必须是通过控制器才能取得模型的状态。

- Q : 有 View >=2 个,是否一定需要 >=2 的控制器？  
  A : 一般一个 View 搭配 一个控制器。 但也可以一个控制器管理多个 View。

### 组合模式

由网页浏览器呈现 HTML 描述。内部是类似一个形成组合的对象系统。

# Refs

- https://www.oracle.com/technical-resources/articles/javase/mvc.html