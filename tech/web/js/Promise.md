# Promise

## then

- 返回一个 promise
- then(onFulfilled,onRejected)
- throw error -> onlky last catch (+ finally)

## catch

- 返回一个 promise
- 放最后面，不放中间。

- promise 的 then 三种状态  
  resolve == then(onFulfilled)  
  reject == then(onRejected)  
  go on = 不会写出来
