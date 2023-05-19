# Exception

https://gitee.com/YingVickyCao/test-Java/tree/main/src/main/java/com/hades/java/test/exception

## 1 为什么会有异常处理？

程序在运行时，有时会发生错误，此时 Java 虚拟机会抛出错误。  
我们捕捉到错误并进行处理，就能让程序继续运行，避免程序终止运行。

```java
try{
    // 可能会发生异常的语句
}catch(ex){
    // 处理异常语句
}finally{
     // 清理代码块
     // 除退出虚拟机一种情况外，不管如何，都会执行。
}
```

![try catch finally 语句执行流程图](https://gitee.com/YingVickyCao/img/raw/main/java/exception_flow.jpg)

```java
public class CatchExample {
    public static void main(String[] args) {
        CatchExample example = new CatchExample();
        example.test();
    }

    /**
     * java.security.InvalidParameterException: This is an example of invalid param exception
     */
    private void test() {
        try {
            throw new InvalidParameterException("This is an example of invalid param exception");
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
}
```

## 2 错误的原因

用户错误/程序错误/物理错误等引起。

## 3 异常处理的目标:

1） 避免程序终止  
2） 把程序异常恢复过来，不要影响接下来的场景。

## 4 关键字：try,catch, finally, throw, throws

## 5 异常类的种类

![Exception Type](https://gitee.com/YingVickyCao/img/raw/main/java/exception_type.jpg)

- Error（错误），则属于严重错误,不需要捕捉。
  一般不可处理的。
  错误不是异常，而是脱离程序员控制的问题。  
  由 JVM（java 虚拟机）抛出的严重性的问题。这种问题发生，一般不处理，直接修改程序。

- Exception（异常） 分为 Runtime Exception（运行时异常） 和 Checked Exception（非运行时异常/编译时异常）

- Checked Exception ：Java 编译器强制 catch 这种异常，如果不捕捉，编译不通过。

- Runtime Exception ：不强制捕捉。直接编译通过，编译器检测不出来，只能运行时发现。

  main 方法运行 JVM（Java 虚拟机）上。当 JVM 调用程序时发现指令错误就抛出一个 Runtime Exception 到出异常的地方，给程序处理。
  如果不处理，JVM 会把异常一直往上层抛，一直遇到处理代码。如果没有处理块，到最上层。  
   到了最上层还没有捕捉的地方，会发生什么？  
   多线程由 Thread.run() 抛出，该线程终止，但程序不终止。  
   单线程由 main() 抛出，程序终止。

Example :

```java
public class ThrowExceptionExample {
    /**
    JVM 把异常抛给 test，test 不处理，JVM 继续往上抛抛给了 main。
    test 不处理，JVM 继续往上抛抛给了 main。
    main 不处理，又自动向上抛给了 JVM 虚拟机。
    JVM 发现它创建的对象又回到这里后，它的处理方案是中断程序。
    **/
    /**
     * 到了最上层还没有捕捉的地方，会发生什么？
     * 单线程由 main() 抛出，程序终止。
     *
     * Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 3
     * 	at com.hades.java.test.exception.ThrowExceptionExample.test(ThrowExceptionExample.java:16)
     * 	at com.hades.java.test.exception.ThrowExceptionExample.main(ThrowExceptionExample.java:11)
     */
    public static void main(String[] args)  {
        ThrowExceptionExample example = new ThrowExceptionExample();
        example.test();
    }

    private void test() {
        int[] nums = {2, 3};
        int data = nums[3]; // ArrayIndexOutOfBoundsException
        System.out.println(data);
    }
}
```

```java
public class ThrowExceptionExample2 {
    /**
     * 到了最上层还没有捕捉的地方，会发生什么？
     * 多线程由 Thread.run() 抛出，该线程终止，但程序不终止。
     *
     * Exception in thread "Thread-0" java.lang.ArrayIndexOutOfBoundsException: 3
     * at com.hades.java.test.exception.ThrowExceptionExample2.test(ThrowExceptionExample2.java:35)
     * at com.hades.java.test.exception.ThrowExceptionExample2.access$000(ThrowExceptionExample2.java:3)
     * at com.hades.java.test.exception.ThrowExceptionExample2$1.run(ThrowExceptionExample2.java:14)
     * at java.lang.Thread.run(Thread.java:748)
     * 1640266255994
     * 1640266256997
     * 1640266257997
     * 1640266259000
     * 1640266260002
     * 1640266261003
     * 1640266262004
     */
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                ThrowExceptionExample2 example = new ThrowExceptionExample2();
                example.test();
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    try {
                        System.out.println(System.currentTimeMillis());
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();
    }

    private void test() {
        int[] nums = {2, 3};
        int data = nums[3];
        System.out.println(data);
    }
}
```

## 6 常见的 Java 预定义的异常类

![Exception examples](https://gitee.com/YingVickyCao/img/raw/main/java/exception_3.jpg)

![exception_2.jpeg](https://gitee.com/YingVickyCao/img/raw/main/java/exception_2.jpeg)

Error 类的常见子类：
![Error](https://gitee.com/YingVickyCao/img/raw/main/java/error.png)

Exception 类的常见子类：
![Exception Subclass](https://gitee.com/YingVickyCao/img/raw/main/java/exception_subclass.png)

RuntimeException 类的常见的子类:
[RuntimeException.html](https://docs.oracle.com/javase/8/docs/api/java/lang/RuntimeException.html)

![Runtime Exception](https://gitee.com/YingVickyCao/img/raw/main/java/exception_runtime_exception.png)

## 7 如何抛出异常？

抛出异常有三种形式，一是 throw,一个 throws，还有一种系统自动抛异常。

形式 1 : 系统自动抛异常  
形式 2 : throw 抛出异常，一定会发生。  
形式 3 : throws 声明方法可能抛出的异常，但不一定会发生。

## 8 Java 中 finally 与 return 的执行顺序

```java
try{
    return statement
}catch(ex){
    return statement
}finally{
    return statement
}
```

- 优先级从高到低：finnaly > catch > try block. 只能调用其中一个 return 语句。
- 函数退出要么 return 语句，要么抛出异常，要么系统直接挂掉。
- try 中有 return,finally 没有 return。try 会先将值暂存另一个临时变量，无论 finally 语句中对该值做什么处理，最终返回的都是 try 语句中的暂存值。
- 当 try 与 finally 语句中均有 return 语句，会忽略 try 中 return。

https://blog.csdn.net/mxd446814583/article/details/80355572  
https://www.cnblogs.com/xichji/p/12009222.html

```java
public class TryCatchFinally1 {
    public static void main(String[] args) {
        String result = TryCatchFinally1.test();
        System.out.println(result);
    }

    /**
     * 在try语句 中遇到return，java 会创建一个临时变量空间来存储新的临时变量t'，并把值try 拷贝进去。
     * 即使在finally语句中把引用t指向了值finally，因为return的返回引用已经不是t ，所以引用t的对应的值和try语句中的返回值无关了。
     */
    /**
     * ---->try
     * ---->finally
     * try
     */
    public static final String test() {
        String t = "";

        try {
            System.out.println("---->try");
            t = "try";
            return t;
        } catch (Exception e) {
            System.out.println("---->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("---->finally");
            t = "finally";
        }
    }
}
```

```java
public class TryCatchFinally2 {
    public static void main(String[] args) {
        System.out.println(TryCatchFinally2.test());
    }


    /**
     * 由于try语句里面抛出异常，程序转入catch语句块，catch语句在执行return语句之前执行finally，而finally语句有return,则直接执行finally的语句值，返回finally
     */
    /**
     * ----->try
     * ----->catch
     * ----->finally
     * finally
     *
     * @return
     */
    public static final String test() {
        String t = "";

        try {
            System.out.println("----->try");
            t = "try";
            Integer.parseInt(null); // NumberFormatException
            return t;
        } catch (Exception e) {
            System.out.println("----->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("----->finally");
            t = "finally";
            return t;
        }
    }
}
```

```java
public class TryCatchFinally3 {
    public static void main(String[] args) {
        System.out.println(TryCatchFinally3.test());
    }

    /**
     * try抛出 java.lang.NumberFormatException，所以程序会先执行catch语句中的逻辑.
     * t赋值为catch，在执行return之前，会把返回值保存到一个临时变量t'.
     * 执行finally的逻辑，t赋值为finally，但是返回值和t'，所以变量t的值和返回值已经没有关系了，返回的是catch
     */
    /**
     * ----->try
     * ----->catch
     * ----->finally
     * catch
     */
    public static final String test() {
        String t = "";

        try {
            System.out.println("----->try");
            t = "try";
            Integer.parseInt(null); // NumberFormatException
            return t;
        } catch (Exception e) {
            System.out.println("----->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("----->finally");
            t = "finally";
        }
    }
}
```

```java
public class TryCatchFinally4 {
    public static void main(String[] args) {
        String result = TryCatchFinally4.test();
        System.err.println(result);
    }

    /**
     * try 遇到return 语句，copy try 值到新建临时变量t1指向新开辟的临时空间space1。然后跳转到finally。
     * finally t指向finally，遇到return 语句，copy finally 值到新建临时变量t2指向新开辟的临时空间space2。最后返回t2的值即finally。
     */
    /**
     * ----->try
     * ----->finally
     * finally
     */
    public static String test() {
        String t = "";

        try {
            System.out.println("----->try");
            t = "try";
            return t;
        } catch (Exception e) {
            System.out.println("----->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("----->finally");
            t = "finally";
            return t;
        }
    }
}
```

```java
public class TryCatchFinally5 {
    public static void main(String[] args) {
        System.out.println(TryCatchFinally5.test());
    }

    /**
     * Exception in thread "main" java.lang.NumberFormatException: null
     * 	at java.lang.Integer.parseInt(Integer.java:542)
     * 	at java.lang.Integer.parseInt(Integer.java:615)
     * 	at com.hades.java.test.exception.return_in_exception.ReturnInExceptionExample2_Simple3.test(ReturnInExceptionExample2_Simple3.java:16)
     * 	at com.hades.java.test.exception.return_in_exception.ReturnInExceptionExample2_Simple3.main(ReturnInExceptionExample2_Simple3.java:5)
     */
    /**
     * 这个例子在catch语句块添加了Integer.parser(null)语句，强制抛出了一个异常。然后finally语句块里面没有return语句。
     * 继续分析一下，由于try语句抛出异常，程序进入catch语句块，catch语句块又抛出一个异常，说明catch语句要退出，则执行finally语句块，对t进行赋值。
     * 然后catch语句块里面抛出异常。结果是抛出java.lang.NumberFormatException异常
     */
    public static String test() {
        String t = "";

        try {
            t = "try";
            Integer.parseInt(null);
            return t;
        } catch (Exception e) {
            t = "catch";
            Integer.parseInt(null);
            return t;
        } finally {
            t = "finally";
            //return t;
        }
    }
}
```

```java
public class TryCatchFinally6 {
    public static void main(String[] args) {
        System.out.println(TryCatchFinally6.test());
    }

    /**
     * finally
     */

    /**
     * 当catch语句块里面抛出异常之后，进入finally语句快，然后返回t。则程序忽略catch语句块里面抛出的异常信息，直接返回t对应的值 也就是finally。方法不会抛出异常
     */
    public static String test() {
        String t = "";
        try {
            t = "try";
            Integer.parseInt(null);
            return t;
        } catch (Exception e) {
            t = "catch";
            Integer.parseInt(null);
            return t;
        } finally {
            t = "finally";
            return t;
        }
    }
}
```

```java
public class TryCatchFinally7 {
    public static void main(String[] args) {
        System.out.println(TryCatchFinally7.test());
    }

    /**
     * catch语句里面catch的是NPE异常，而不是java.lang.NumberFormatException异常，所以不会进入catch语句块，直接进入finally语句块，finally对s赋值之后，由try语句抛出java.lang.NumberFormatException异常
     */
    /**
     * ----->try
     * ----->finally
     * Exception in thread "main" java.lang.NumberFormatException: null
     * at java.lang.Integer.parseInt(Integer.java:542)
     * at java.lang.Integer.parseInt(Integer.java:615)
     * at com.hades.java.test.exception.return_in_exception.TryCatchFinally7.test(TryCatchFinally7.java:14)
     * at com.hades.java.test.exception.return_in_exception.TryCatchFinally7.main(TryCatchFinally7.java:5)
     */
    public static String test() {
        String t = "";

        try {
            System.out.println("----->try");
            t = "try";
            Integer.parseInt(null);
            return t;
        } catch (NullPointerException e) {
            System.out.println("----->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("----->finally");
            t = "finally";
        }
    }
}
```

```java
public class TryCatchFinally8 {
    public static void main(String[] args) {
        System.err.println(TryCatchFinally8.test());
    }

    /**
     * catch 捕捉的是NullPointerException，不是NumberFormatException。
     * try语句执行完成执行finally语句，finally赋值s。finally 有返回s，忽略抛出异常不是NumberFormatException，最后结果返回finally
     */
    /**
     * ---->try
     * ---->finally
     * finally
     */
    public static String test() {
        String t = "";

        try {
            System.out.println("---->try");
            t = "try";
            Integer.parseInt(null); // NumberFormatException
            return t;
        } catch (NullPointerException e) {
            System.out.println("---->catch");
            t = "catch";
            return t;
        } finally {
            System.out.println("---->finally");
            t = "finally";
            return t;
        }
    }
}
```

```java
public class TryCatchFinally9 {
    public static void main(String[] args) {
        System.err.println(TryCatchFinally9.test());
    }

    /**
     执行try语句，在返回执行，执行finally语句块，finally语句抛出NullPointerException异常，整个结果返回NullPointerException异常
     */

    /**
     * Exception in thread "main" java.lang.NullPointerException
     * at java.lang.String.<init>(String.java:166)
     * at java.lang.String.valueOf(String.java:3008)
     * at com.hades.java.test.exception.return_in_exception.TryCatchFinally9.test(TryCatchFinally9.java:19)
     * at com.hades.java.test.exception.return_in_exception.TryCatchFinally9.main(TryCatchFinally9.java:5)
     */
    public static String test() {
        String t = "";

        try {
            t = "try";
            return t;
        } catch (Exception e) {
            t = "catch";
            return t;
        } finally {
            t = "finally";
            String.valueOf(null); // NullPointerException
            return t;
        }
    }
}
```

## 9 把资源释放或状态还原的代码放到 finally 块，否则每个 catch 语句都要设置它们。

[FinallyExample.java](https://gitee.com/YingVickyCao/test-Java/blob/main/src/main/java/com/hades/java/test/exception/FinallyExample.java)

```java
public class FinallyExample {
    int count = 0;

    public static void main(String[] args) {
        FinallyExample example = new FinallyExample();
        example.test_depressed();
        example.test_recommended();
    }

    /**
     * finally：
     * 把资源释放或状态还原的代码放到finally块，否则每个catch 语句都要设置它们。
     */
    private void test_depressed() {
        count = 0; //初始化资源
        try {
            count++;
            // do something
            sum(1, 3);
            minus(2, 5);
        } catch (InvalidParameterException ex) {
            count = 0; // 状态还原
            System.out.println(ex);
        } catch (NullPointerException ex) {
            count = 0; // 状态还原
            System.out.println(ex);
        } catch (Exception ex) {
            count = 0; // 状态还原
            System.out.println(ex);
        }
    }

    private void test_recommended() {
        count = 0; //初始化资源
        try {
            count++;
            // do something
            sum(1, 3);
            minus(2, 5);
        } catch (InvalidParameterException ex) {
            System.out.println(ex);
        } catch (NullPointerException ex) {
            System.out.println(ex);
        } catch (Exception ex) {
            System.out.println(ex);
        } finally {
            count = 0; // 状态还原
        }
    }

    private void sum(int num1, int num2) throws InvalidParameterException {
        System.out.println(num1 + num2);
    }

    private void minus(int num1, int num2) throws NullPointerException {
        System.out.println(num1 - num2);
    }
```

## 10 final、finalize 和 finally 之间的联系？

没有什么联系

## 11 通过继承 Exception 类，自定义异常类

```java
/**
     * 自定义异常抛出不要丢掉原始的Throwable cause 信息
     */
    private static void test() throws MyException {
        try {
            int[] nums = {2, 3};
            int data = nums[3]; // ArrayIndexOutOfBoundsException
            System.out.println(data);
        } catch (Exception exception) {
            /**
             * com.hades.java.test.exception.MyException: accessed array index is out of bonds
             * 	at com.hades.java.test.exception.ThrowExceptionExample3.test(ThrowExceptionExample3.java:22)
             * 	at com.hades.java.test.exception.ThrowExceptionExample3.main(ThrowExceptionExample3.java:7)
             */
            // bad
//            throw new MyException("accessed array index is out of bonds");
            /**
             * com.hades.java.test.exception.MyException: accessed array index is out of bonds
             * 	at com.hades.java.test.exception.ThrowExceptionExample3.test(ThrowExceptionExample3.java:26)
             * 	at com.hades.java.test.exception.ThrowExceptionExample3.main(ThrowExceptionExample3.java:7)
             * Caused by: java.lang.ArrayIndexOutOfBoundsException: 3
             * 	at com.hades.java.test.exception.ThrowExceptionExample3.test(ThrowExceptionExample3.java:16)
             */
            // good
            throw new MyException("accessed array index is out of bonds", exception);
        }
    }
```

## 12 使用建议

- 异常捕捉，不能滥用，否则会让程序可读性变差、性能变差。  
  应该先优先使用代码判断，处理不了再考虑用异常捕捉，例如：对象为空。
- 常用的异常对象处理的方式： ① String getMessage() ② printStackTrace()
- 可以只有 try,catch，也可以 try,catch,finally 一起用。
- 多个 catch 块.
  如果一个功能抛出了多个异常，有对应多个 catch 进行针对性的处理。  
  catch 中的异常类型如果没有子父类关系，则谁声明在上，谁声明在下无所谓。  
  catch 中的异常类型如果满足子父类关系，则要求子类一定声明在父类的上面。否则，报错.  
  最后面加上一个 Exception 来处理可能被漏掉的异常。
- 对于不确定的代码，要加上 try-catch，处理可能的异常。
- 使用 finally 资源释放或状态还原的代码
- 捕捉到异常，该怎么办？不能什么都不做，至少打 log。还可以资源释放、状态还原、保存数据等。
- 异常早发现早处理。一直 throws 异常会降低代码结构的清晰度：Dao/Service/UI/Action
- 自定义异常抛出不要丢掉原始的 Throwable cause 信息.没有 Caused by log 不要排查 bug。
- 根据不同的业务需要和异常类型，决定如何处理异常。  
  例如，login in 相关，定义一个 loginInException 去处理 login in 相关的异常。
