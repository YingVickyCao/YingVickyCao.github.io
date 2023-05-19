# 1 String,StringBuilder, StringBuffer

| Item            | String             | StringBuilder                         | StringBuffer                           |
| --------------- | ------------------ | ------------------------------------- | -------------------------------------- |
| Is mutable      | Unmutable          | Mutable                               | Mutable                                |
| Thead safe      | thread-safe        | not thread-safe:used by single thread | thread-safe:xused by multiple threads. |
| Used memoery    | 最多               | 最少                                  | 少                                     |
| 运行速度        | 最慢               | 最快                                  | 快                                     |
| synchronization | no synchronization | no synchronization                    | synchronization                        |

# 2 String

- `TestString.java`
- 'String.java `

```
public final class String  implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];

    /** The offset is the first index of the storage that is used. */
    private final int offset;

    /** The count is the number of characters in the String. */
    private final int count;

    /** Cache the hash code for the string */
    private int hash; // Default to 0

    /** use serialVersionUID from JDK 1.0.2 for interoperability */
    private static final long serialVersionUID = -6849794470754667710L;
     ......

    public String substring(int beginIndex, int endIndex) {
    if (beginIndex < 0) {
        throw new StringIndexOutOfBoundsException(beginIndex);
    }
    if (endIndex > count) {
        throw new StringIndexOutOfBoundsException(endIndex);
    }
    if (beginIndex > endIndex) {
        throw new StringIndexOutOfBoundsException(endIndex - beginIndex);
    }
    return ((beginIndex == 0) && (endIndex == count)) ? this :
        new String(offset + beginIndex, endIndex - beginIndex, value);
    }

 public String concat(String str) {
    int otherLen = str.length();
    if (otherLen == 0) {
        return this;
    }
    char buf[] = new char[count + otherLen];
    getChars(0, count, buf, 0);
    str.getChars(0, otherLen, buf, count);
    return new String(0, count + otherLen, buf);
    }

 public String replace(char oldChar, char newChar) {
    if (oldChar != newChar) {
        int len = count;
        int i = -1;
        char[] val = value; /* avoid getfield opcode */
        int off = offset;   /* avoid getfield opcode */

        while (++i < len) {
        if (val[off + i] == oldChar) {
            break;
        }
        }
        if (i < len) {
        char buf[] = new char[len];
        for (int j = 0 ; j < i ; j++) {
            buf[j] = val[off+j];
        }
        while (i < len) {
            char c = val[off + i];
            buf[i] = (c == oldChar) ? newChar : c;
            i++;
        }
        return new String(0, len, buf);
        }
    }
    return this;
  }
}
```

- final -> 不能继承 -> 不能覆盖/重写
- constant
  Strings are constant; their values cannot be changed after they are created.  
  Java 中的 String 具有不变性。  
  无论是 sub 操、concat 还是 replace 操作都不是在原有的字符串上进行的，而是重新生成了一个新的字符串对象。也就是说进行这些操作后，最原始的字符串并没有被改变。  
  即： 所有对 String 对象的修改操作（包括 append，substring，concat，replace，trim 等），在具体实现中返回的都是一个全新的 string 对象副本，这些中间和最终副本都会放到运行时常量区中。  
  “对 String 对象的任何改变都不影响到原对象，相关的任何 change 操作都会生成新的对象” 。
- String 类其实是通过 char 数组来保存字符串的
- A String represents a string in the UTF-16 format

## TestString2->test() 的字节码分析

- https://github.com/YingVickyCao/AndroidAboutDemos/blob/master/doc/java_memory.xlsx
- `TestString2.java`

```
public class TestString2 {
    public void test() {
        String str1 = new String("abc");
        String str2 = "abc";
        // 中间创建的对象：1个StringBuffer ， 1 个 String
        String str3 = "ab" + new String("c");
    }
}
```

```
   //0 ~ 9 对应的是第一行的java语句：String str1 = "abc";
       0: new           #21                 // class java/lang/String
       3: dup
       /*
       **装载一个常量字符串 ，符号#23代表的字符串对象就是 “abc”,
       **常量字符串在程序运行之前就已经被创建
       */
       4: ldc           #23                 // String abc
       /*str1不指向常量字符串“abc”,
       **而是将这个常量字符串作为构造函数的实参传入
       **在java堆中重新创建了一个全新的对象
       */
       6: invokespecial #25                 // Method java/lang/String."<init>":(Ljava/lang/String;)V
       9: astore_1


      //从这里开始到12 都是第二行的Java代码: String str2 = "abc";
      /*
      ** 直接调用运行时常量池中的对象
      */
      10: ldc           #23                 // String abc
      12: astore_2

     //从此处开始到最后对应第三行的Java代码:String str3 = "ab" + new String("c");
      /*
      **对于这种new 对象与 常量字符串相结合的方式，
      **JAVA编译器在处理过程中创建了一个StringBuilder对象用于处理异构字符串的拼接工作
      ** "ab"对应另一个常量字符串 “c”则运行时动态创建的String对象

       中间创建的对象：1个StringBuffer ， 1 个 String
      **/
      // StringBuffer
      13: new           #28                 // class java/lang/StringBuffer
      16: dup
      17: ldc           #30                 // String ab
      19: invokespecial #32                 // Method java/lang/StringBuffer."<init>":(Ljava/lang/String;)V

      // c -> new String
      22: new           #21                 // class java/lang/String
      25: dup
      26: ldc           #33                 // String c
      28: invokespecial #25                 // Method java/lang/String."<init>":(Ljava/lang/String;)V
      31: invokevirtual #35                 // Method java/lang/StringBuffer.append:(Ljava/lang/String;)Ljava/lang/StringBuffer;

      // toString:() -> new String
      34: invokevirtual #39                 // Method java/lang/StringBuffer.toString:()Ljava/lang/String;
      37: astore_3
      38: return
```

- 编译器默认用的字符串拼接器是 StringBuffuer 类
- 通常情况下动态的 string 对象做拼接用的都是 StringBuilder 类。
- 字节码中的符号含义：

```
new 创建一个对象
dup = duplicate
LDC  = LoaD Constant 将int,float或String型常量值从常量池中推送至栈顶
invokespecial调用构造函数、实例化方法
invokevirtual 调用实例方法
getfield 获取对象的一个实例属性(field)，push到操作数栈
putfield通过对象的引用和指向常量池CONSTANT_Fieldref_info类型的索引，给对象的属性赋值
```

## JDK `String.java` / `StringBuffer.java`源码？

android SDK `StringBuffer` - `append` and `toString()`方法被屏蔽掉了。 =>> JDK

- Mac 下查看已安装的 jdk 版本及其安装目录:  
  `/usr/libexec/java_home -V` -> Finder , “Go to finder” -> "src.zip" -> "java.lang.String.java"

- `StringBuffer.java -> append() -> (native)System.arraycopy()`
- `StringBuffer.java -> toString() -> new String(toStringCache, true)`

## jvm--Java 中 init 和 clinit

TODO

# 3 StringBuilder

- not thread safe  
  StringBuilder are not safe for use by multiple threads.  
  a single thread:  
  designed for use by a single thread.
- mutable
- no synchronization
- faster
- API compatible with StringBuffer
- This class is designed for use as a drop-in replacement for StringBuffer in places where the string buffer was being used by a single thread (as is generally the case).
- append and insert methods
- Every string buffer has a capacity. If the internal buffer overflows, it is automatically made larger.
- Unless otherwise noted, passing a null argument to a constructor or method in this class will cause a NullPointerException to be thrown.

# 4 StringBuffer

- thread-safe  
   multiple threads  
   StringBuffer is designed to be safe to use concurrently from multiple threads, if the constructor or the append or insert operation is passed a source sequence that is shared across threads, the calling code must ensure that the operation has a consistent and unchanging view of the source sequence for the duration of the operation. This could be satisfied by the caller holding a lock during the operation's call, by using an immutable source sequence, or by not sharing the source sequence across threads.
- synchronization
- mutable
- A string buffer is like a String, but can be modified
- it contains some particular sequence of characters, but the length and content of the sequence can be changed through certain method calls.
- Every string buffer has a capacity. If the internal buffer overflows, it is automatically made larger.
- The principal operations on a StringBuffer are the append and insert methods,
- Unless otherwise noted, passing a null argument to a constructor or method in this class will cause a NullPointerException to be thrown.

# 5 String VS StringBuffer VS StringBuilder

`TestAppend.java`

```
public class TestAppend {
    /*
     String +, time=2484
     StringBuffer append, time=7
     StringBuilder append, time=6
     */
    public void test() {
        long startTime = System.currentTimeMillis();
        testStringAppend();

        long endTime = System.currentTimeMillis();
        System.out.println("String +, time=" + (endTime - startTime));

        startTime = System.currentTimeMillis();
        testStringBufferAppend();
        endTime = System.currentTimeMillis();
        System.out.println("StringBuffer append, time=" + (endTime - startTime));

        startTime = System.currentTimeMillis();
        testStringBuilderAppend();
        endTime = System.currentTimeMillis();
        System.out.println("StringBuilder append, time=" + (endTime - startTime));
    }

    private void testStringAppend() {
        String str = new String();
        for (int i = 0; i < 10000; i++) {
            str += "hello";
        }
    }

    private void testStringBufferAppend() {
        StringBuffer str = new StringBuffer();
        for (int i = 0; i < 10000; i++) {
            str.append("hello");
        }
    }

    private void testStringBuilderAppend() {
        StringBuilder str = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            str.append("hello");
        }
    }
}

```

```
str+="hello"
// 等价于 str = str  + "hello"
```

会自动被 JVM 优化成 =>

```
StringBuffer str2 = new StringBuffer(str);
str2.append("hello");
str2.toString();
```

## String、StringBuffer 以及 StringBuilder 的区别

- String 不可变。字符拼接等操作会自动被 JVM 优化 - 借助 StringBuffer。
- 与 StringBuilder 相比，StringBuffer 类的成员方法前面多了一个关键字：synchronized.  
  即 StringBuffer 是线程安全的，StringBuilder 是非线程安全。  
  其他没有区别。

```
public StringBuilder insert(int index, char str[], int offset, int len)  {
       super.insert(index, str, offset, len);
return this;
  }
```

```
public synchronized StringBuffer insert(int index, char str[], int offset,  int len) {
        super.insert(index, str, offset, len);
        return this;
    }
```

## String、StringBuffer 以及 StringBuilder 的执行效率

- StringBuilder > StringBuffer > String
- 排序是相对的，不一定在所有情况下都是这样。
  比如 String str = "hello"+ "world"的效率就比 StringBuilder st = new StringBuilder().append("hello").append("world")要高。

## String、StringBuffer 以及 StringBuilder 的选择

- 当字符串相加操作或者改动较少的情况下，使用 String str
- 当字符串相加操作较多的情况下，使用 StringBuilder
- 当字符串相加操作较多的情况下 + 多线程，使用 StringBuffer。

# 6 格式化输出字符串

```java
format(String format, Object... args)
format(Locale locale, String format, Object... args)
```

![占位符](https://gitee.com/YingVickyCao/img/raw/main/java/4g8zgkj7xm.png)

![占位符](https://gitee.com/YingVickyCao/img/raw/main/java/8dnwqwohwz.png)

(1) Locale 值为 language_region.

(2) format 输出结果是 Locale 的 language 和 region、以及转换符设置，三者共同决定。

```java
// Date date = new Date();
// System.out.println(date.getTime()); // 1640072573407

Date date = new Date(1640072573407L);
System.out.println(date);                                                   // Tue Dec 21 15:42:53 CST 2021

// %tc : 包括全部的日期和时间格式
// Locale:en_CN     当前程序的JVM默认值 language_region
System.out.println(String.format("%tc", date));                             // Tue Dec 21 15:42:53 CST 2021
// Locale:zh_CN
System.out.println(String.format(Locale.SIMPLIFIED_CHINESE, "%tc", date));  // 星期二 十二月 21 15:42:53 CST 2021
// Locale:en_US
System.out.println(String.format(Locale.US, "%tc", date));                  // Tue Dec 21 15:42:53 CST 2021

// %tF : 年-月-日格式
System.out.println(String.format("%tF", date));  // 2021-12-21
```

（3）哪些用法  
https://www.cnblogs.com/zengming/p/9674972.html  
https://cloud.tencent.com/developer/article/1607231

[StringFormatExample.java](https://gitee.com/YingVickyCao/test-Java/blob/main/src/main/java/com/hades/java/test/string/StringFormatExample.java)

# 7 QA about string

- `StringQA.java`

## Java 常量池

- 类在加载完成之后，会在内存中存储类中的一些字面量（本身即是值如 10，“abc”）。
- 对于字符串常量来说，Java 会保证常量池中的字面量不会有多个副本，但是 Java 代码中可能不同的变量的值是相同的。
- 在编译期间，这两个变量值所在地址是相同的。而且 Java 在编译期间会对字符串进行一定的处理。
- 如果一个字符串采用拼接的方式，并且拼接的内容都是字面量的话，那么会自动将字符串先拼接完再赋值。
- 如果常量池中已经有了拼接完成之后的字面量，那么此变量的值的地址就是常量池中的完整字符串的地址。
- String 在赋值完成之后修改，是会产生新的变量的。比如：

```
String str = "reeves";
str = "abc";
```

那么实际上在常量池中存储了"reeves"和"abc"两个字面值，在字符串变量赋予新的值的时候并不会改变原先存储的值，它会再新建一个字符串，而在栈中变量存储的值的地址是变了的。

## QA：String s = new String("xyz"); 创建了几个 String Object？

提示方式不合理。

## QA：String s = new String("xyz"); 在运行时涉及几个 String 实例？

答案：两个，一个是字符串字面量"xyz"所对应的、驻留（intern）在一个全局共享的字符串常量池中的实例，另一个是通过 new String(String)创建并初始化的、内容与"xyz"相同的实例，在堆中，并指向字符串常量池中的“xyz”。

```
0: new     #3; //class java/lang/String //只调用了一次new
3: dup
4: ldc     #4; //String xyz
6: invokespecial #5;//Method java/lang/String."<init>":（Ljava/lang/String;)V
9:   astore_1

```

## QA：`String s = new String("xyz");` 涉及用户声明的几个 String 类型的变量？

答案：一个，就是 String s。

## QA：`String s = null;` 涉及用户声明的几个 String 类型的变量？

答案：一个，就是 String s。

## QA:`String s1 = new String("xyz");  String s2 = new String("xyz");` 创建几个 String 实例？

答案：2 个。

引用类型的变量:

- Java 里变量就是变量，引用类型的变量只是对某个对象实例或者 null 的引用，不是实例本身。
- 声明变量的个数跟创建实例的个数没有必然关系。
- 在 Java 语言里，“new”表达式是负责创建实例的，其中会调用构造器去对实例做初始化。并不是“构造器返回了新创建的对象的引用”，而是 new 表达式的值是新创建的对象的引用。

```
String s1 = "a";
String s2 = s1.concat("");
String s3 = null;
new String(s1);
```

这段代码会涉及 3 个 String 类型的变量：  
1、s1，指向下面 String 实例的  
2、s2，指向与 s1 相同  
3、s3，值为 null，不指向任何实例  
以及 3 个 String 实例，
1、"a"字面量对应的驻留的字符串常量的 String 实例  
2、""字面量对应的驻留的字符串常量的 String 实例  
（String.concat()是个有趣的方法，当发现传入的参数是空字符串时会返回 this，所以这里不会额外创建新的 String 实例）  
3、通过 new String(String)创建的新 String 实例；没有任何变量指向它。

## 例子:

```
  public void sample1() {
        String str1 = "reeves";
        String str2 = "reeves";
        System.out.println(str1 == str2); // true
   }
```

在编译期间变量 str1 和 str2 值得地址都可以确定，因为两个变量的值相同，指向常量池中的地址也相同，因此使用“==”符号来判断两者值得地址是否相同时，返回的是 true。

## 例子：

```
public void sample2() {
        String str1 = "reeves";
        String str2 = "ree" + "ves";
        System.out.println(str1 == str2); // true
    }
```

Java 语言在编译期间，对于字符串拼接且拼接元素都是字面量的情况，会自动将拼接字符串拼接完整之后再赋值，因此 String str2 = "ree"+"ves"; 就相当于 String str2 = "reeves"; 而“reeves”字面量在常量池中存在，因此 str2 的引用地址和 str1 相同。

## 例子

```
public void sample3() {
        String s = new String("reeves");
 }
```

第 1 步：使用 new 关键字新建 String 对象时，会在堆中新创建一个字符串对象。  
第 2 步：然后，Java 也会监测常量池中是否有“reeves”字面量。如果没有，那么在常量池中再新建一个“reeves”的字面量。  
第 3 步：传递常量池中字符串给 string 构造函数。String 对象中存储了指向了常量池中“reeves”的地址。  
第 4 步：赋值，s 指向 String 对象的地址。

## 例子

```
public void sample4() {
        String str1 = "reeves";
        String str2 = str1.intern();
        System.out.println(str1 == str2); //true
 }
```

String 的 intern()方法会监测常量池中是否有该字符串的值的字面量，如果有，返回字面量的地址，如果没有，则新建字面量并返回新建字面量的地址。

## 例子

```
public void sample6() {
        String a = "hello2";
        String b = "hello" + 2;
        System.out.println((a == b)); // true
  }
```

"hello"+2 在编译期间就已经被优化成"hello2" ， 因此，均指向常量池中的"hello2"。

## 例子

```
public void sample7() {
        String a = "hello2";
        String b = "hello";
        String c = b + 2;
        System.out.println((a == c)); // false
}
```

有符号引用(c 中的 b)的存在，所以 String c = b + 2;不会在编译期间被优化，不会把 b+2 当做字面常量来处理的，因此这种方式生成的对象保存在堆上的。因此 a 和 c 指向的并不是同一个对象。

##

```
public void sample8() {
        String a = "hello2";
        final String b = "hello";
        String c = b + 2;
        System.out.println((a == c)); // false
 }
```

对于被 final 修饰的变量，对 final 变量的访问在编译期间都会直接被替代为真实的值。String c = b + 2;在编译期间就会被优化成：String c = "hello" + 2; -> String c = "hello2";

## 例子

```
public void sample9() {
        String a = "hello2";
        final String b = getHello();
        String c = b + 2;
        System.out.println((a == c)); // false
 }
private String getHello() {
        return "hello";
}
```

虽然将 b 用 final 修饰了，但是由于其赋值是通过方法调用返回的，那么它的值只能在运行期间确定，因此 a 和 c 指向的不是同一个对象。

## 代码 1）和 2）的区别是什么？

```
public void sample10() {
        String str1 = "I";
        //str1 += "love"+"java";        1)
        str1 = str1 + "love" + "java";      //2)
 }
```

- 1）的效率比 2）的效率要高，1）中的"love"+"java"在编译期间会被优化成"lovejava"，而 2）中的不会被优化。
- 在 1）中只进行了一次 append 操作，而在 2）中进行了两次 append 操作。

# References:

- String 对象 http://rednaxelafx.iteye.com/blog/774673
- Java String 直接赋值和 new 对象的相关问题 https://www.jianshu.com/p/01ad56dd8978
- 探秘 Java 中 String、StringBuilder 以及 StringBuffer https://www.cnblogs.com/dolphin0520/p/3778589.html
- StringBuffer https://developer.android.com/reference/java/lang/StringBuffer
- https://developer.android.com/reference/java/lang/StringBuilder
- https://developer.android.com/reference/java/lang/String
- Java 杂谈 4——Java 中的字符串存储 https://www.cnblogs.com/yahokuma/p/3677576.html
- Java 中字符串内存位置浅析 https://www.cnblogs.com/holten/p/5782596.html
- java 中 String 和 new String 还有对象中的 String 字符串在内存中的存储 https://blog.csdn.net/penyoudi1/article/details/79163567
- java clinit
  https://blog.csdn.net/u013309870/article/details/72975536  
  https://www.cnblogs.com/diyunpeng/archive/2010/07/11/1775200.html
- java class 文件常量区 https://blog.csdn.net/w3045872817/article/details/73251068
