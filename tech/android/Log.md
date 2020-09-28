# Log

| Log Level ( High -> Low ) | Log in Android | DESC                                                                                                   |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| Assert                    | Log.wtf()      | "What a terrible Failure".断言失败后的错误消息：不应该出现却出现了，属于极为严重的错误类型             |
| Error                     | Log.e()        | 应用执行时无法处理的严重错误：程序无法继续运行、业务中断等。需要由用户处理                             |
| Warn                      | Log.w()        | 警告信息：执行出现了一些的错误，它不会导致 crash，但可能导致用户一些业务不能正常执行。需要用户重点关注 |
| Info                      | Log.i()        | 用户关注的信息                                                                                         |
| Debug                     | Log.d()        | debug                                                                                                  |
| Verbose                   | Log.v()        | 不重要、一般。用户不需要关注                                                                           |

Log.i(tag, msg, Throwable)

Android.util.log
