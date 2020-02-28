# Junit4

## Assert.java  => TestAssertions.java
### Assert 常见函数
-  **void assertEquals(boolean expected, boolean actual) // 各种参数**
**void assertNotEquals(boolean expected, boolean actual) // 各种参数**

- void assertTrue(boolean expected, boolean actual)      
void assertFalse(boolean condition)

-  void assertNotNull(Object object)     
void assertNull(Object object)    

- void assertSame(boolean condition)     
void assertNotSame(boolean condition)   

- **void assertArrayEquals(expectedArray, resultArray)  // 各种参数**

- void fail(String message) 

### Assert.fail
直接使得测试不通过

### Assert.assertArrayEquals
Check whether two arrays are equal to each other.   
判断的两个 array 的tem 内容是否相等。  
如果 item 重写了 euqal（）方法，item 内容相同，则相等。item 是否重写 hashCode()方法，对此结论没有影响。  
如果 item 没有重写 euqal（）方法，item 内容相同，则不相等。item 是否重写 hashCode()方法，对此结论没有影响。  

```
/Check whether two arrays are equal to each other.
    @Test
    public void testAssertArrayEquals() {
        String[] expectedArray = {"one", "two", "three"};
        String[] resultArray = {"one", "two", "three"};
        Assert.assertArrayEquals(expectedArray, resultArray);

        Assert.assertArrayEquals(expectedArray, resultArray);

        Stu[] list1 = getStuList();
        Stu[] list2 = getStuList();
        Assert.assertArrayEquals(list1, list2);

        Calculator[] c1 = getCalculatorList();
        Calculator[] c2 = getCalculatorList();
        /**
         * ERROR:arrays first differed at element [0];
         Expected :com.example.hades.tdd.Calculator@32a1bec0
         Actual   :com.example.hades.tdd.Calculator@22927a81
         */
        Assert.assertArrayEquals(c1, c2);
    }

    private Stu[] getStuList() {
        return new Stu[]{new Stu("A", 10), new Stu("B", 20)};
    }

    private Calculator[] getCalculatorList() {
        return new Calculator[]{new Calculator(), new Calculator()};
    }
```

### Assert.assertSame  
- assertSame  检查两个相关对象是否指向同一个对象，即是否指向同一块 内存。
- Assert.assertSame 最终调用的是==判断。   

`Assert.java` 
```
static public void assertSame(Object expected, Object actual) 

 static public void assertSame(String message, Object expected, Object actual) {
        if (expected == actual) {
            return;
        }
        failNotSame(message, expected, actual);
    }
```

`TestAssertions.java`
```
      /**
     * 检查两个相关对象是否指向同一个对象
     **/

    /**
     * str2 hashcode=96354,str5 hashcode=96354
     * Calculator1 hashcode=1463801669,Calculator2 hashcode=355629945
     * stu1 hashcode=75,str2 hashcode=75
     */
    @Test
    public void testAssertSame() {
        String str2 = new String("abc");
        String str3 = null;

        String str4 = "abc";
        String str5 = "abc";

        String[] expectedArray = {"one", "two", "three"};
        String[] resultArray = {"one", "two", "three"};

        assertSame(str4, str5);
        assertNotSame(str2, str5);
        System.out.println("str2 hashcode=" + str2.hashCode() + "," + "str5 hashcode=" + str5.hashCode());
        assertNotSame(str5, str3);
        assertNotSame(expectedArray, resultArray);

        Calculator c1 = new Calculator();
        Calculator c2 = new Calculator();
        Assert.assertNotSame(c1, c2);
        System.out.println("c1 hashcode=" + c1.hashCode() + "," + "c2 hashcode=" + c2.hashCode());

        Stu stu1 = new Stu("A", 10);
        Stu stu2 = new Stu("A", 10);
        Assert.assertNotSame(stu1, stu2);
        System.out.println("stu1 hashcode=" + stu1.hashCode() + "," + "str2 hashcode=" + stu2.hashCode());
        System.out.println("stu1 vS stu2 hashCode=" + (stu1.hashCode() == stu2.hashCode()));
        System.out.println("stu1 vS stu2 ==" + (stu1 == stu2));
    }
```


### Assert.assertEquals
- Assert.assertEquals支持很多参数类型：long，float，double，object（包括string）。
- Assert.assertEquals 参数为 float和double时，允许有一个最大上下浮动差值delta,只要差异在浮动值内就认为相等。

```
 /**
     * @param delta the maximum delta between <code>expected</code> and
     * <code>actual</code> for which both numbers are still
     * considered equal.
     */
    static public void assertEquals(double expected, double actual, double delta) {
        assertEquals(null, expected, actual, delta);
    }
```

- Assert.assertEquals 参数为 object, 情况最复杂。     
Assert.assertEquals 参数为 string时，不管是不new出来的，只要内容相同，就 equal。     
Assert.assertEquals 参数为 其他 object时，若重写了 equal()且内容相同，就 equal。       
Assert.assertEquals 参数为 其他 object时，若没有重写了 equal()且内容相同，仍然 not equal。     
查看Assert.assertEquals，发现最终调用的是Object.equals().     

`Assert.java`
```
static public void assertEquals(Object expected, Object actual) 
private static boolean isEquals(Object expected, Object actual) {
        return expected.equals(actual);
    }
```

测试代码：
```
 String str1 = new String("abc");
        String str2 = new String("abc");
        String str3 = null;
        String str4 = "abc";
        String str5 = "abc";

 // OBJECT_START
        Assert.assertEquals(str1, str2);
        /**
         * ERROR:java.lang.AssertionError:
         Expected :abc
         Actual   :null
         */
//        Assert.assertEquals(str1, str3);
        Assert.assertEquals(str1, str4);
        Assert.assertEquals(str4, str5);

        Assert.assertEquals(new Stu("A", 10), new Stu("A", 10));
        Assert.assertEquals(new Stu(null, 10), new Stu(null, 10));

        Assert.assertNotEquals(new Stu("A", 10), new Stu("A", 20));
        Assert.assertNotEquals(new Stu("A", 10), new Stu("B", 10));
        Assert.assertNotEquals(new Stu("A", 10), new Stu("B", 20));
        Assert.assertNotEquals(new Stu(null, 10), new Stu("A", 10));
        Assert.assertNotEquals(new Stu("A", 10), new Stu(null, 20));
        Assert.assertNotEquals(new Stu(null, 10), new Stu(null, 20));

        /**
         *ERROR:java.lang.AssertionError:
         Expected :com.example.hades.tdd.Calculator@573fd745
         Actual   :com.example.hades.tdd.Calculator@15327b79
         */
//        Assert.assertEquals(new Calculator(), new Calculator());
        Assert.assertNotEquals(new Calculator(), new Calculator());
        // OBJECT_END
```

`Stu.java`
```
public class Stu {
    String name;
    int id;

    public Stu(String name, int id) {
        this.name = name;
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        Stu stu = (Stu) obj;
        if (id != stu.id) {
            return false;
        }

        if ((null == name && null != stu.name) || (null != name && null == stu.name)) {
            return false;
        }

        if (null == name && null == stu.name) {
            return true;
        }
        return name.equalsIgnoreCase(stu.name);
    }

    @Override
    public int hashCode() {
        return (name == null) ? id : (id + name.hashCode());
    }
}

```

`Calculator.java`
```
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}
```

## 导入assertEquals的 packgage 时，有两个选择`org.junit` VS `junit.framework`?

Since version 4 of JUnit,Use 
`import static org.junit.Assert.*;`

[StackOverflow - differences between 2 JUnit Assert classes
](https://stackoverflow.com/questions/291003/differences-between-2-junit-assert-classes)


## References:
- [Java内存机制和内存地址](https://www.cnblogs.com/dudefu/p/7977717.html)
- [Java内存模型](https://www.cnblogs.com/BangQ/p/4045954.html)
- [java中的各种数据类型在内存中存储的方式](https://blog.csdn.net/sinat_29255093/article/details/52556449)
- [判断java中两个对象是否相等](https://www.cnblogs.com/hujingwei/p/5322330.html)
- [同步和Java内存模型 (二)原子性](http://ifeve.com/syn-jmm-atomicity/)
- [判断两个对象相等](https://bbs.csdn.net/topics/380125991)