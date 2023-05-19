# Log

## 1 Log level

| Log Level ( High -> Low ) | Log in Android | DESC                                                                                                   |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| Assert                    | Log.wtf()      | "What a terrible Failure".断言失败后的错误消息：不应该出现却出现了，属于极为严重的错误类型             |
| Error                     | Log.e()        | 应用执行时无法处理的严重错误：程序无法继续运行、业务中断等。需要由用户处理                             |
| Warn                      | Log.w()        | 警告信息：执行出现了一些的错误，它不会导致 crash，但可能导致用户一些业务不能正常执行。需要用户重点关注 |
| Info                      | Log.i()        | 用户关注的信息                                                                                         |
| Debug                     | Log.d()        | debug。                                                                                                |
| Verbose                   | Log.v()        | 用户不需要关注                                                                                         |

Log.i(tag, msg, Throwable)
Android.util.log

# 2 使用规范

- info 和 warn 级别 log 要少打。系统打印 exception 级别，用的是 warn。
- release app 中存入 log 之前要加密。
- release app 中要关闭调试代码。
- log 中不打印太多具体实现的代码。一是会导致 log 文件很大。二是容易暴漏架构设计和代码实现。
- log 不打印核心算法和核心部分，比如算法相关信息、框架信息
- log 不打印隐私信息。例如密码、手机号、银行卡号等。
- 控制 log 频率，影响 app 性能。例如循环条件、递归、事件、频繁操作、频繁调用的接口。
- 只打印必要的堆栈信息。

# 3 如何打印 log

- Way 1 ： TAG 为类名，以功能模块命名；方法名为前缀。

```java
 private void test() {
 Log.v("classname", "function name,log info");
 }
```

- Way 2 ：TAG 为 model 名；类型和方法名为前缀。
  好处：即使 log 很少，也能定位到这个信息哪个功能相关。

```java
 private void test() {
    Log.v("module_name", "class name,function name,log info");
 }
```

# 4 查看 log

![androidlog](https://gitee.com/YingVickyCao/img/raw/main/android/androidlog.png)

![androidlog](https://gitee.com/YingVickyCao/img/raw/main/android/androidlog2.png)
