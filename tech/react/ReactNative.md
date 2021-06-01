# React Native

关键字：原则，规则，设计，性能

# 要学的东西

- ES5,ES6
- HTML,CSS,JS
- DOM
- Redux or flux
- React : Babel, Webpack,JSX,components, props,state, lifecycle
- React Native
- native
- instal Node.js,npm
- ESLint

## 学习网站

- https://egghead.io
- https://github.com/crazycodeboy/RNStudyNotes

# 2. 组件（ Component）

- 界面 = SUM 组件
- 在 render 方法中返回一些用于渲染结构的 JSX 语句。

# 3 Props（属性）

```
<TextInput
   style={styles.input}
   placeholder="Input pwd"
   secureTextEntry={true}
/>
```

- style/placeholder/secureTextEntry 都是组件 TextInput 的属性
- 向某个组件指定的属性，在组建内部可以访问到。也是父->子传递消息的方式·
- 组件的属性是组件内部的一个常量，它的值在组件内部是不可以改变的。

# 4 Image 地址不能显示

在 iOS 上使用 http 链接的图片地址可能不会显示

- https://segmentfault.com/a/1190000002933776
- https://blog.csdn.net/qq_40347548/article/details/86766932

# 6. componentDidMount ?

# 7. 样式：style

- 样式名遵循 Web CSS 命名 = JS 语法 background-color -> 驼峰 backgroundColor
- 间接实现样式的继承：数组位置靠后的样式 比 居前的样式优先级更高。
- 常见的做法是按顺序声明和使用 style 属性，以借鉴中的“层叠”做法（即后声明的属性会覆盖先声明的同名属性）。
- StyleSheet.create 来集中定义组件的样式  
  https://reactnative.cn/docs/text/

# 8. Layout

# 9 flexDirection === Oriation

- 子元素的排列方向:column 垂直排列 (defalut), row 水平排列 。

```
flexDirection: 'column',

row
column
```

# 10 Justify Content === grivity in 主轴

决定子元素沿着主轴的的排列方式

```
justifyContent: 'space-between',

flex-start( defalult)
center
flex-end

space-around
space-between
space-evenly
```

![RN_flexDirection_justifyContent.jpg](https://yingvickycao.github.io/img/react_native/RN_flexDirection_justifyContent.jpg)

# 11 Align Items === grivity in 次轴

- 决定子元素沿着次轴的的排列方式
- 次轴？  
  与主轴垂直的轴，比如若主轴方向为 row，则次轴方向为 column

```
alignItems: 'stretch'

flex-start
center
flex-end
stretch
```

## 12 Align Self === layout_grivity

- alignItems vs alignSelf ？  
  alignSelf ： child 设置。 change its alignment within its parent.  
  alignItems： parent 设置。 affecting the children within the container.
- alignSelf overrides alignItems.

# 13 Align Content

# 14 Flex Wrap

# 15 Flex Basis

# 16 Flox Grow

# 17 Flex Shrink

# 18 Flex == layout_weight

child view 占据 parent 剩余尺寸的比例

```
flex: 1
```

# 19 Width and Height

- = dp
- 弹性（Flex）宽高 =layout_weight  
  子组件设置 flex，按分配比例占据 parent 剩余的空间
- View = Viewgroup = parent.
- use window to get width and height

```
/**
 * androdi:float
 * float -> int. parseInt(width)
 *
 * ios:int
 const { height, width } = Dimensions.get("window");

 export default class TestWindowComponent extends Component {
    <Text style={styles.text}>手机屏幕 宽={parseInt(width)}逻辑像素</Text>
 }
 */
```

# 19 Relative Layout

# 20 Absolute

# 21 PixelRatio-像素密度

- PixelRatio.get()

```
// Android
1dp = scale * px = PixelRatio.get() * px
PixelRatio.get() = scale
```

```
PixelRatio.get() === 1      mdpi Android (160 dpi)
PixelRatio.get() === 1.5    hdpi Android (240 dpi)
PixelRatio.get() === 2      iPhone 4, 4S iPhone 5, 5c, 5s iPhone 6 | xhdpi Android 设备 (320 dpi)
PixelRatio.get() === 3      iPhone 6 plus | xxhdpi Android 设备 (480 dpi)
PixelRatio.get() === 3.5    Nexus 6
```

RN 中设置的是 dp（逻辑像素，PT，Pixel Point），不是实际像素 px

- dp -> px  
  `int px= PixelRatio.getPixelSizeForLayoutSize(dp)`

- `PixelRatio.getFontScale()`  
  返回字体大小缩放比例  
  如果没有设置字体大小，它会直接返回设备的像素密度。  
  目前这个函数仅仅在 Android 设备上实现了，它会体现用户选项里的“设置 > 显示 >字体大小”。  
  在 iOS 设备上它会直接返回默认的像素密度。

# 22 console

```
// console.warn("warm");    // Yellow
// console.error("error");  // Red
// console.log("log");      // 影响应能，仅仅打印必须的
```

# 23 React Native 中 API vs Component

- Component：被显示，在 render()中返回
- API：RN 提供的类。通常是调用各种静态函数以实现各种控制. e.g. Dimensions

# 24 style

```
import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({});
等价形式
const styles = {};
```

```
<TextInput
   style={styles.input}
/>
```

- `const styles = StyleSheet.create({});`  
  是一条语句。它定义了一个名为 styles 的对象。  
  在 styles 内部定义了样式,返回 reference from the given object。  
  对样式进行语法检查

- `const styles = {};`
  不对样式进行语法检查 。但 VS Code 的提示功能很强大，基本上也能提示

# 25 密码

密码 = TextInput ----属性 `secureTextEntry={true}`

```
<TextInput
   placeholder="Input pwd"
   secureTextEntry={true}
/>
```

# 26 log?

RN logger -> NativeModules.Logger -> app scope native logger(Listener => 1) file + 2) JobService send every log)

# 27 `Text` text center

`textAlign: "center"`

# 28 注释

```
JS - // ,/**/
JSX: {}
```

# 29 ReactNative 代码执行逻辑 [2.4] // TODO:

# 30 UI 框架工作基本机制 [2.5]

## 状态机(state machine)思维

状态机 = 状态转移图 （状态 + 触发条件）  
状态在不同的条件下跳转到自己或不同状态的图

e.g.
人有三个状态：健康，感冒，康复中。
触发的条件有：淋雨（c1），吃药（c2），打针（c3），休息（c4）。

所以状态机就是
健康-（c1）->感冒；
感冒-（c3）->健康；
感冒-（c2）->康复中；
康复中-（c4）->健康，

![state_machine.jpg](https://yingvickycao.github.io/img/react_native/state_machine.jpg)

## React 框架 use `state machine`

- React 使用 state machine 实现数据与状态一致  
  把所有的 UI 视为一个简单的状态机.  
  任意一个 UI 场景是状态机中的一个状态。  
  根据决定状态的状态机变量的值，React 框架渲染出状态机的当前状态，即当个 UI 场景被渲染出来了。  
  随着状态机变量的改变，UI 状态机也在不停地改变状态。UI 场景也随之不停地被重新渲染.  
  这样的一个过程保证数据与 UI 保持一致。

- 我的理解
  状态机 | state
  ---|---
  状态机的一个状态 | state 的一个变量
  条件触发 -> 状态机的状态改变 | state 的一个变量的值改变 -> state 状态改变
  状态改变 -> 行为变化 | 状态改变-> 刷新某个 UI 场景

## 如何判断 state 的一个变量 改变了？

```
_onChangeText_4_phone(newValue) {
  this.setState(state => {
    return {
      phone: newValue
      /**
       * 即使state 变量 的值不变，同样render(). 因此推测，React 框架在比较state时，比较的是state 变量的地址，而非值。
       * render(),  state:{phone: 123, pwd: ""}
         render(),  state:{phone: 123, pwd: ""}
       */
      // phone: 123
    };
  });
}
```

## RN 的 2 条重要的开发原则

- 只能使用 setState 函数来改变状态机变量  
   1)new state 根据 old state 的 key，实现 modi fy 和 Add key 对应的 value

  | setState(key->**==value==**) vs old state | value      |
  | ----------------------------------------- | ---------- |
  | +                                         | +          |
  | Modify                                    |
  | Not change                                | not chagne |

  2)即使 设置 state 变量 的值不变，同样 render(). 因此推测，React 框架在比较 state 时，比较的是 state 变量的地址，而非值。只要 setState，不管 key 对应的 value 是否和以前一样了，就是改变了 state。

```
_onChangeText_4_phone(newValue) {
	this.setState(state => {
		return {
			render(),  state:{phone: 123, pwd: ""}
		};
	});
}
```

(3) 通过 setState()修改状态机变量的值，所有与状态机变量的值有关系的组件都会被刷新？

```
class ParnetComponent{
    render(){
        <phone> -> setState{phone:newValue}  => ParnetComponent + phone+ pwd all render()
        <pwd> ->
    }
}
```

(4)执行顺序:setState -> render() -> callback in setState()

```
_onChangeText_4_pwd(newValue) {
	// setState is before render();
	this.setState(oldState => {
		for (var item in oldState) {
			console.log(item, oldState[item]);
		}
		return {
			pwd: newValue,
			a_var_brand_in_newState: 'I am  a new var'
		};
	}, this._changePwdDone);
}
_changePwdDone() {
	// after render();
	console.log('Pwd changed.');
}
```

- 尽一切可能让 UI 中可变的数据来源是状态机变量和属性。

## 状态机变量是“不可变的常量”

```
访问状态机变量：this.state.状态机变量名

更改状态机变量：
this.setState函数  ✓
this.state.状态机变量=newValue ✗ // 语法不错。但根据React Native 的开发原则，是不合法。
```

## 有状态的组件、没有状态的组件

- 根据有无装填变量，React Native 把组件分为有状态的组件、没有状态的组件

| -        | 有状态的组件                                                         | 没有状态的组件             |
| -------- | -------------------------------------------------------------------- | -------------------------- |
| 定义     | 有状态机变量                                                         | 没有状态机变量             |
| 数据来源 | state（状态机变量） + props                                          | props                      |
| 设计原则 | 在不影响程序结构的情况下，尽可能减少有状态的 React Native 组件的数目 | 尽可能设计组件是无状态组件 |
| 设计思路 | 封装 UI 的交付逻辑                                                   | 只负责根据数据渲染 UI      |

PS：  
props 是属性  
状态机变量 = `this.state.name`  
状态 = state

- 设计思路的好处：  
  让状态机变量放在一个最合理的地方，减少冗余代码，让程序架构更清晰

- 哪些 React Native 组件必须有状态机变量？  
  任何 RN 模块中动态的输入都应当被设计为状态机变量。 输入包括：  
  ① 处理用户的输入，包括文本输入、麦克风输入，摄像头输入等  
  ② 处理网络端给 app 的数据  
  ③ 处理定时器超时事件  
  ④ 处理订阅的事件等不可未知的输入型事件

## 减少状态机变量的数量

状态机变量的改变会导致状态机组件的重新渲染。提高 React Native app 性能的一种方法是：减少状态机变量的数量。

做法：  
从状态机变量备选名单中删除重复数据吗，得到状态机变量的最小集合。

重复的数据：间接得来的  
1)该数据由备选名单中其他数据通过某种规则计算得出。  
2)该数据由组件属性中的数据通过某种规则计算得出。  
3)该数据由备选名单中其他数据和组件属性中的数据通过某种规则计算得出。

好处？  
1） 减少有关系的变量之间的数据同步的难度，并减少出错。  
错误做法：  
手动修改。假如修改一个变量名，却没有修改另外一个有关系的变量 => 很容易出错。

正确的做法：  
在状态机变量中保存最少的变量，其他有关系的数据都在 rendder()函数中写出这种关系的计算方法，然后由 React Native 框架来保证同步。=>更不容易出错  
2） 开发代码更少

【规则】：  
不能把一个 React Native 组件放在状态机变量中，而是放在 render()中，让它成为一个组件的子组件。

# 31 组件间通信

https://blog.csdn.net/colinandroid/article/details/77947447  
https://blog.csdn.net/colinandroid/article/details/77943111

## 父组件向子组件传递信息

- 通过对子组件的属性赋值来实现。  
  e.g. 属性 style,placeholder,text,props.
- 自定义属性如何向自定义 React Native 组件传递消息？  
  父组件通过向子组件传递 props，子组件得到 props 后从 props 取值。

## 子组件向父组件传递信息

通过回调父组件传给子它的回调函数来实现。回调函数由父组件定义，被保存在子组件的某个属性中，等待需要向父组件传递消息的时机到来。  
e.g. 属性 onChangeText

## 无直接关系的组件传递消息

最终都可以转为这两种通信方式

对于比较复杂的项目，这样实现组件间通信未免过于繁琐，所以引入了 redux.

跨级通信

![rn_component_communicate_4_no_direct_relationship_1.png](https://yingvickycao.github.io/img/react_native/rn_component_communicate_4_no_direct_relationship_1.png)

非嵌套组件通信

![rn_component_communicate_4_no_direct_relationship_2.png](https://yingvickycao.github.io/img/react_native/rn_component_communicate_4_no_direct_relationship_2.png)

# 32 RN method

- `shouldComponentUpdate(nextProps, nextState)`

```
// 决定是否渲染组件？false = not
shouldComponentUpdate(nextProps, nextState) {
		super(nextProps, nextState);
		if(XXX){
		    return ture/false.
		}
	}


```

- forceUpdate(callback)

```
// 强制启动渲染
// 1) 强制将所有级别的UI组件重新读取、计算和渲染，且所有UI组件的生命周期函数按生命周期规则执行。
// 2) 不调用shouldComponentUpdate来检查是否允许重新渲染？
// 3) 应该避免使用
This.forceUpdate();
```

- `ReactComponent render()`  
  (1)任何 RN 组件必须有 render()  
  (2)只返回一个可渲染的组件描述  
  (3)开发者不应该在代码中直接调用次函数来重刷组件，应该用修改组件的状态机变量或属性来触发 RN 框架的重新渲染过程。

# 33 组件的变量类型

| 组件的变量类型 | 作用                                       | 访问              |
| -------------- | ------------------------------------------ | ----------------- |
| 状态变量       | 本组件显示相关                             | this.state.变量名 |
| 属性变量       | 父组件传递下来的属性                       | 属性名            |
| 成员变量       | 与组件逻辑控制相关，但与组件显示无关的变量 | this.变量名       |
| 静态成员变量   | same C++/Java                              | Class.变量名      |
| 静态成员函数   | same C++/Java                              | Class.静态函数名  |

JS 中函数也中一种变量。

## 成员变量:

- e.g.  
  1)订阅事件-取消订阅  
  2)mount 保存资源 - ummount 释放资源

- 为什么不能保存在 state 中？  
  导致 React Native 无必要判断是否需要重新渲染 UI，导致应用性能下降。
- 在构造函数中 init default value.

# 34 bind func

- 作用：
  让回调函数能正常解析出 this。 否则"this state is not a function".

- When not need?  
  1)回调函数用箭头函数书写.
  2)invoke 回调函数 by 箭头函数

- How?

```
// Recommended
constructor(props) {
    super(props);
    // only bind one time
    this._onChangeText_4_pwd = this._onChangeText_4_pwd.bind(this);
}

// PO: Depressed: once render(), bind
render(){
  onChangeText={this._onChangeText_4_pwd.bind(this)}
}
```

# 35 RN bundle 升级

1）assert version  
2）remote version  
3）cached downloaded version  
3）min support version  
4）ON version

download ？  
1）remote version > cached downloaded version  
2）remote version > min support version  
2）remote version > ON version  
3）RN library version == RN library support version

## 36 JavaScript engine

- New : Hermes, since 0.60.2, is a JavaScript engine optimized for running React Native on Android

```
// node_modules/hermes-engine/android/
hermes-debug.aar
hermes-release.aar
```

TBD: https://www.jianshu.com/p/17d6f6c57a5c

- Old : jsc(JavaScriptCore)

```
// node_modules/jsc-android/
include (cpp and C++ files)
->
android-jsc-cppruntime
android-jsc-intl
android-jsc
README.md
https://github.com/react-native-community/jsc-android-buildscripts
```

# 37 Hooks
