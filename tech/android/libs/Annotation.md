# Annotation·

```java
// AnimatorRes.java
@Documented
@Retention(CLASS)
@Target({METHOD, PARAMETER, FIELD, LOCAL_VARIABLE})
public @interface AnimatorRes {
}
```

# 1 `java.lang.annotation`

- `Annotation`
  所以的注解都默认继承该类。
  <br/>
- `Documented`
  描述其他类型的注解是被作为 open API，可以工具文档化。
  <br/>
- @Retention : 定义被它所注解的注解保留多久，一共有三种策略，定义在 RetentionPolicy 枚举中.

  | RetentionPolicy | Specify how long annotations are to be retained.<br/> Lifecycle form low to high | When use?                                                 |
  | --------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------- |
  | SOURCE          | Only Source file                                                                 | 只是做一些检查性的操作,e.g., @Override, @SuppressWarnings |
  | CLASS (Default) | Only .class file                                                                 | 在编译时进行一些预处理操作，比如生成一些辅助代码          |
  | RUNTIME         | Source + .class file                                                             | 在运行时去动态获取注解信息                                |

  ```java
  //  Specify how long annotations are to be retained.
  public enum RetentionPolicy {
      SOURCE,
      CLASS,
      RUNTIME
  }
  ```

  Q: 注解可以通过反射获取吗？ 可以。https://blog.csdn.net/m0_37840000/article/details/80921775  
  <br/>

- `AnnotationFormatError extends Error`  
  This error can be thrown by the API used to read annotations reflectively
  <br/>

- `AnnotationTypeMismatchException / IncompleteAnnotationExceptionextends RuntimeException`  
  This exception can be thrown by the API used to read annotations reflectively
  <br/>

- `Inherited`

- `@Target`:表示注解用在哪里？由 ElementType 决定。

  ```java
  public enum ElementType {
      /** Class, interface (including annotation type), or enum declaration */
      TYPE,

      /** Field declaration (includes enum constants) */
      FIELD,

      /** Method declaration */
      METHOD,

      /** Formal parameter declaration */
      PARAMETER,  // 参数声明

      /** Constructor declaration */
      CONSTRUCTOR,

      /** Local variable declaration */
      LOCAL_VARIABLE, // ->用于描述局部变量  e.g., 循环变量、catch参数

      /** Annotation type declaration */
      ANNOTATION_TYPE,

      /** Package declaration */
      PACKAGE,

      /**
       * Type parameter declaration
       *
       * @since 1.8
       */
      TYPE_PARAMETER,

      /**
       * Use of a type
       *
       * @since 1.8
       */
      TYPE_USE,

      /**
       * Module declaration.
       *
       * @since 9
       */
      MODULE
  }
  ```

  - 结论：
    类实现 - 实现类中包括被@Inherited 修饰的注解  
    类继承 - 子类会继承父类的被@Inherited 修饰的注解。  
    接口继承 - 子接口不继承父接口的任何注解。

- `Native`  
  Q : 哪些类型可以用注解？

- 基本类型
- String
- Class
- enum
- Annotation
- 以上类型的数组  
  其他类型。编译报错

# 2

```
@Documented
@Retention(CLASS)
@Target({METHOD, CONSTRUCTOR, TYPE, PARAMETER})
public @interface AnyThread {
}
```
