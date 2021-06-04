# React

Facebook.  
React is the view layer of an MVC application(Mode View Controller)

**1 Create a New React App**

```
// Create a New React App
npx create-react-app my-app
cd my-app

// Run a React App
npm start
```

http://localhost:3000/

**2 package.json VS package-lock.json**

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

**3 Babel**

Babel is a Javascript compiler that lets us use ES6+ in old browser.  
Babel generates JS which can be recongized by browser.

https://babeljs.io/repl/#?presets=react&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA

**4 Compoent**  
(1) Class Component: extends React.Component  
(2) Simple Component  
(2) Function Compoent

**5 How ti handle data ?**  
props,state

Parent -> Child: use props  
Child -> Parent:use props.onClick()  
Child -> Child = Child -> Parent + Parent -> Child

- (1) props  
  props : belongs to parent  
  props：不变的数据。是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。

- (2) State  
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

**6 ES2015 =ES6， 对 JavaScript 语法改进的官方标准。**

- 语法：import、from、class、extends、以及() =>箭头函数
- http://es6.ruanyifeng.com/
- http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8

**7 render()**
render() is used to render DOM nodes.

**8 JSX**

JSX : JS + XML .
JSX  
在 JavaScript 中嵌入 XML 结构的语法

```xml
<View><Text>Hesllo world!</Text></View>
```

React 框架发明了 JSX，利用 HTML 语法来创建虚拟 DOM。render()返回值是一个 JSX 元素。

**9 Create a single React App**

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


# Refs  
- JavaScript Fetch API    
https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/  
TODO : https://www.cnblogs.com/sanhuamao/p/13606997.html  

- 