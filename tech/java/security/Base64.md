# Base64

- Java 8 Base64 = 8 (sun.mis c) = 3(Apache Commons Codec)

- QA : `warning: BASE64Encoder is internal proprietary API and may be removed in a future release`  
  https://blog.csdn.net/Cha0DD/article/details/87794268

  Reason:  
  sun.misc 包都是 sun 公司的内部类，并没有在 java api 中公开过，不建议使用，所以使用这些方法是不安全的，将来随时可能会从中去除，所以相应的应该使用替代的对象及方法.

  A:

  ```
  import sun.misc.BASE64Decoder;
  import sun.misc.BASE64Encoder;
  ->
  import java.util.Base64.Encoder
  import java.util.Base64.Decoder
  ```

# Refs

- [Java Base64 encode and decode](https://blog.csdn.net/zhou_kapenter/article/details/62890262)
