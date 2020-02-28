# Redux

- reduct 不需要安装@types/redux，因为 Redux 已经自带了声明文件（.d.ts 文件）。
- `npm install -dev--save @types/react-redux`

# 1 State

State 是只读。只能通过 action 改变 state。

# 2 Action

描述`发生了什么？`  
action 是 a normal js object。

# 3 Reducer

根据 action 更新 state。

- Reducer 是纯函数。作用仅仅是接受 action 和 state，返回新 state。不做其他操作。
- 单一的数据源

## unique store <=> unique state tree <=> a unique object

```
state/store  is one json object:
{
	num: 0,
}
```

## unique store <=> Sum( small state tree )<=> a unique object

big reducer 按功能拆分成 small reducers，每一个 small reducer 独立操作 state tree 的不同部分。

```
# 用 combineReducers 关联到唯一的 store
# 当action后，combineReducers返回 reducer 会负责 调用 两个reducer：secondReducer, counterReducer， 然后把两个结果集合并成一个 big state tree
# Redux store 保存了根 reducer 返回的完整 state 树（即下一个 state）
# 所有订阅 store.subscribe(listener) 的监听器都将被调用
let reducer = combineReducers({ secondReducer, counterReducer });
let store = createStore(reducer);
```

```
state/store  is one json object:
# big state tree
{
	counterReducer: {num: 0}
	secondReducer: {second: 0}
}

get value：
store.getState();
```

- when `store.dispatch(action);` counterReducer and secondReducer 均接受。  
  所有 reducer 的结果合并成一个大的对象，默认 key 等于 reducer 函数名  
  https://www.redux.org.cn/docs/basics/Reducers.html  
  https://www.redux.org.cn/docs/basics/DataFlow.html

# 4 Store

联系 state 和 action

# 5 数据流

严格的单向数据流  
数据范式化

# 6 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

https://www.redux.org.cn/docs/basics/UsageWithReact.html  
https://blog.csdn.net/mingzznet/article/details/53695924

|                | 展示组件                   | 容器组件                           |
| -------------- | -------------------------- | ---------------------------------- |
| 作用           | 描述如何展现（骨架、样式） | 描述如何运行（数据获取、状态更新） |
| 直接使用 Redux | 否                         | 是                                 |
| 数据来源       | props                      | 监听 Redux state                   |
| 数据修改       | 从 props 调用回调函数      | 向 Redux 派发 actions              |
| 调用方式       | 手动                       | 通常由 React Redux 生成            |

## 容器组件

- 不使用 store.subscribe() 来编写容器组件。原因是无法使用 React Redux 带来的性能优化。
- 不要手写容器组件，而使用 React Redux 的 connect() 方法来生成。
