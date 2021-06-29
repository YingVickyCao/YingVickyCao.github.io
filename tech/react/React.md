# React

Facebook.  
React is the view layer of an MVC application(Mode View Controller)

# 1 Create a New React App

```
// Create a New React App
npx create-react-app my-app
cd my-app

// Run a React App
npm start
```

http://localhost:3000/

# 2 package.json VS package-lock.json

After npm install ,auto create package-lock.json.  
package-lock.json: keep dependencies are same in different environment.

```
# package.json
"dependencies": {
    "react": "^16.11.0",
    "react-dom": "^16.11.0",      // ^ : supprot any higher version with magor version. e.g. 16.15.2
    "react-scripts": "3.2.0"
  }
```

```
# package-lock.json
// many dependicies for package.json
```

# 3 Babel

Babel is a Javascript compiler that lets us use ES6+ in old browser.  
Babel generates JS which can be recongized by browser.

https://babeljs.io/repl/#?presets=react&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA

# 4 Compoent

(1) Class Component: extends React.Component  
(2) Simple Component  
(2) Function Compoent

# 5 How t0 handle data ?

props,state

Parent -> Child: use props  
Child -> Parent:use props.onClick()  
Child -> Child = Child -> Parent + Parent -> Child

## props

belongs to parent  
不变的数据。是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。

## State

state: private, belongs to Square Component itself  
 state：用于动态修改组件,存放改变的数据  
 State 的工作原理和 React.js 完全一致，所以对于处理 state 的一些更深入的细节，可以参阅 React.Component API。  
 一切界面变化都是状态 state 变化。  
 state 的修改必须通过 setState()方法。  
 this.state.likes = 100; // 这样的直接赋值修改无效！  
 setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性  
 setState 是异步操作，修改不会马上生效

state is immutable.  
Good :    
Complex features becomes simple:Jump back in Game;
Detecting changes: object is being referenced different is same or different;
Determining when to re-render in React.

(1) Do Not Modify State Directly  
`Lifecycle_4.html`

- setState 接受的是一个对象。

```js
constructor(props) {
    super(props);
    // The only place to assign this.state.
    this.state = { date: new Date() };
}

// Don't modify State directly.
// Wrong : not re-render a component
// this.state.date = new Date();

// Right
this.setState({
    date: new Date()
});
```

- setState 接受的是一个函数。

```js
  /*
  render:this.state.num=1

  onClickBtn,this.state.num[1]=1
  onClickBtn,this.state.num[2]=1
  render:this.state.num=2
  */
  onClickBtn() {
      console.log("onClickBtn,this.state.num[1]=" + this.state.num);
      // Wrong
      this.setState({
          num: this.state.num + this.props.increment,
      });
      console.log("onClickBtn,this.state.num[2]=" + this.state.num);
  }

  /*
  render:this.state.num=1

  onClickBtn,this.state.num[1]=1
  render:this.state.num=2
  onClickBtn,this.state.num[2]=2
    */
  onClickBtn2() {
      console.log("onClickBtn,this.state.num[1]=" + this.state.num);

      // Correct：常规函数
      // this.setState(function (state, props) {
      //     return {
      //         num: state.num + props.increment,
      //     }
      // }, () => {
      //     console.log("onClickBtn,this.state.num[2]=" + this.state.num);
      // });

      // Correct: 箭头函数
      this.setState((state, props) => {
          return { num: state.num + props.increment, }
      }, () => {
          console.log("onClickBtn,this.state.num[2]=" + this.state.num);
      });
  }
```

(2) State Updates May Be Asynchronous

`State_2_1.html`,`State_2_2.html`,`State_2_3.html`,`State_2_4.html`,`State_2_5.html`

- 如何证明 State 的更新是异步和延迟的？

```js
// React State Updates may be Asynchronous;
// 证明React State的更新是异步。
// 原因：因为每次setState都会触发更新。异步是为了提高性能，将多个状态合并一起更新，较少re-render调用。
/*
    render:this.state.name=Tom
    onClickBtn，this.state.name=Tom
    onClickBtn，this.state.name=Tom
    render:this.state.name=Jerry
    */
onClickBtn() {
  console.log("onClickBtn，this.state.name=" + this.state.name);   // Tom
  this.setState({
      name: "Jerry"
  });
  console.log("onClickBtn，this.state.name=" + this.state.name);   // Tom
}
```

- 如何解决 setState 的异步问题 ？

```js
// 如何解决setState的异步问题？后面跟一个回调方法：先保存，后调用
/*
    render:this.state.name=Tom
    onClickBtn，this.state.name=Tom
    render:this.state.name=Jerry
    onClickBtn，this.state.name=Jerry
*/
onClickBtn2() {
  console.log("onClickBtn，this.state.name=" + this.state.name);   // Tom
  this.setState({
      name: "Jerry"
  }, () => {
      // 在回调函数中，实时获取到更新之后的数据
      console.log("onClickBtn，this.state.name=" + this.state.name);   // Jerry
  });
}
```

- 如何越过 React 的机制，令 setState 以同步形式出现？

```js
// 使用SetTimeout，越过React的机制，令setState以同步形式出现
/*
render:this.state.num=1
onClickBtn,this.state.num[1]=1
onClickBtn,this.state.num[2]=2
render:this.state.num=2
*/
onClickBtn2() {
  setTimeout(() => {
      console.log("onClickBtn,this.state.num[1]=" + this.state.num);
      this.setState({
          num: this.state.num + 1,
      });
      console.log("onClickBtn,this.state.num[2]=" + this.state.num);
  }, 0);
}
```

(3) State Updates are Merged
`State_3.html`

```js
constructor(props) {
    super(props);
    this.state = {
        postId: 1,
        comment: "XYZ",
    };
}

/*
onClickPostId,[1] postId=1,comment=XYZ
onClickPostId,[2] postId=1,comment=XYZ
render,postId=2,comment=XYZ

onClickComment,[1] postId=2,comment=XYZ
onClickComment,[2] postId=2,comment=XYZ
render,postId=2,comment=XYZ + ABC
*/
onClickPostId() {
    console.log("onClickPostId,[1] postId=" + this.state.postId + ",comment=" + this.state.comment);
    this.setState({
        postId: this.state.postId + 1,
    });
    console.log("onClickPostId,[2] postId=" + this.state.postId + ",comment=" + this.state.comment);
}

onClickComment() {
    console.log("onClickComment,[1] postId=" + this.state.postId + ",comment=" + this.state.comment);
    this.setState({
        comment: this.state.comment + " + ABC",
    });
    console.log("onClickComment,[2] postId=" + this.state.postId + ",comment=" + this.state.comment);
}
```

(4) The Data Flows Down
`State_4.html`  
A component can pass its state down as props to its child components:

```js
render() {
  return (<MyButton data={this.state.data} />);
}

render() {
    // render,num1=2,num2=2
    console.log("render,num1=" + this.props.data.num1 + ",num2=" + this.props.data.num1);
    return (
        <p> This is a example of Data Flows Down</p >
    );
}
```

# 6 Lifecycle

# 6 ES2015 =ES6， 对 JavaScript 语法改进的官方标准。

- 语法：import、from、class、extends、以及() =>箭头函数
- http://es6.ruanyifeng.com/
- http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8

# 7 render()

render() is used to render DOM nodes.

# 8 JSX

JSX : JS + XML .
JSX  
在 JavaScript 中嵌入 XML 结构的语法

```xml
<View><Text>Hesllo world!</Text></View>
```

React 框架发明了 JSX，利用 HTML 语法来创建虚拟 DOM。render()返回值是一个 JSX 元素。

# 9 Create a single React App

- libs
  React - the React top level API  
  React DOM - adds DOM-specific methods  
  Babel - a JavaScript compiler that lets us use ES6+ in old browsers

  ```xml
  <script src="https://unpkg.com/react@^16/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@16.13.0/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
  ```

- dir  
  /public : index.html, build apkage input dir  
  /src : contain all our React code.

- React Example  
  use className instead of class.  
  className is used instead of class for adding CSS classes, as class is a reserved keyword in JavaScript

  Properties and methods in JSX are camelCase - onclick will become onClick.

  This is our first hint that the code being written here is JavaScript, and not actually HTML.

  ```js
  class App extends React.Component {
    render() {
      return (
        <div className="App">
          <h1>Hello, React!</h1>
        </div>
      );
    }
  }
  ```

  Finally, we'll render the App to the root as before.

  ```js
  ReactDOM.render(<App />, document.getElementById("root"));
  ```

- JSX

  ```js
  // JSX
  const heading = <h1 className="site-heading">Hello, React</h1>;

  // No JSX
  const heading = React.createElement(
    "h1",
    { className: "site-heading" },
    "Hello, React!"
  );
  ```

# 10 React components are immutable

# 11 pure

`pure.js`
pure function: not change its own inputs. (Recommended)  
impure function : change its own input. (Depressed)

All React components must act like pure functions with respect to their props.

# 12 React DOM

```
              only changes node
 React DOM    ----------------->   DOM
```

# 13 Lifecycle

TODO

# 14 Handling Events

`react\events`

DOM Event    
`events\Dom_Event.html`  
(1) DOM events are named using lowercase.  
(2) you pass a string as the event handler.  
(3) Return false to prevent default behavior in DOM.   
(4) call addEventListener to add listeners to a DOM element after it is created.  

React Event  
`events\React_Event.html`    
(1) React events are named using camelCase.  
(2)With JSX you pass a function as the event handler.  

```js
ReactDOM.render(
  <button onClick={clickBtn}>Click this button</button>,
  document.getElementById("root")
);
```

(3)Return false to prevent default behavior in React.    
(4) Provide a listener when element is inited by rendered.  
In JavaScript class methods are not bound by default. If not bind this.handClick and pass it to onClick, this will be undefined when this function invoked.

`events\React_Event_bind_function_1.html` 
`events\React_Event_bind_function_2.html` 
`events\React_Event_bind_function_3.html` 
`events\React_Event_bind_function_4.html` 

(5) Passing Arguments to Event Handlers  
`events\React_pass_arguments_to_event_handlers_1.html`  
`events\React_pass_arguments_to_event_handlers_2.html`  
`events\React_pass_arguments_to_event_handlers_3.html` 
`events\React_pass_arguments_to_event_handlers_4.html` 

# 11 Conditional Rendering
`react\conditional_rendering`

# Refs
- https://codepen.io/gaearon/pen/Xjoqwm?editors=0010
- JavaScript Fetch API  
  https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/  
  TODO : https://www.cnblogs.com/sanhuamao/p/13606997.html
