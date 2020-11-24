# 2019-11-28 Universal React Application

# Concept

- SSR（Server Side Rendering）服务端渲染:JS render 后端
- Universal React Application JS 控制前端和后端

# Contents

- 首屏：花费时间较长
  同一份代码，前后端的运行结果要一致。  
  同构环境搭建：nextjs.org

- ReactDomServer
- 服务器端渲染的难点:  
   CSS:node 处理不了 css  
   Cookie：  
   前端有 session alive，所以下次请求会快一点。  
   后端请求本身没有前端请求快。优化：后端使用 user agent，下次请求会快一点。  
  user agent。
- h2=http2
- flushToHtml
- react_router_dom
  Router  
  StaticRouter  
  ProviderRouter
- SSR 也是前端 OP 的一种方式
- Chrome Audit  
  FMP：评估真正有用的内容
- node 没有 window。怎么办？  
  global.this 存数据 ->自动转换，window
- 绑定 click 是前端的事情。直到全部加载完成，用户才能点击
