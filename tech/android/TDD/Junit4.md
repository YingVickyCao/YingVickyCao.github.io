# Junit4
## [TBD]Multithreaded code and Concurrency

---

## [TBD]Rules

---

## Assumptions with assume  
`TestAssumptions.java` .    
对传入单元测试用例的变量值设计假设条件，如果不满足假设，则跳出该测试用例，执行下一个测试用例；满足则继续执行该测试用例后续语句。  
`assumeThat,assumeTrue,assumeNotNull ,assumeNoException` .   

---

## Matchers and assertThat
`TestMatchersAssertThat.java`   
### JUnit的jar包和hamcrest的jar包关系 .  
junit和hamcrest是两个不同的框架，不同的东西。只不过是junit使用了hamcrest框架而已。   

###
- More readable and typeable.    
- Combinations:    
any matcher statement s can be negated (`not(s))`, combined (`either(s).or(t)`), mapped to a collection (`each(s)`), or used in custom combinations (`afterFiveSeconds(s)`).   
- Readable failure messages 
- Custom Matchers(TODO). 
By implementing the Matcher interface yourself, you can get all of the above benefits for your own custom assertions.   

---

## Ignoring Tests 
If for some reason, you don't want a test to fail, you just want it ignored, you temporarily disable a test.

`@Ignore`    

`TestIgnore.java`  
`TestIgnore2.java`  

- 一个含有 @Ignore 注释的测试方法将不会被执行。
- 一个测试方法同时含有@Test 和 @Ignore 时，@Ignore无效,@Test 有效。  
- ***@Ignore 标记 class后，class 中所有含有@Test的测试方法仍然可以运行。   
该结果与w3cschool中说明不同。***

When:
- 代码未准备好，这时测试用例去测试这个方法或代码会造成失败。  

---

## Exception testing 
verify that code throws exceptions as expected.   
`TestException.java`   

- 测试代码是否它抛出了想要得到的异常。  
- 只有测试代码抛出了指定异常，Junit 才标记为success。  

When:
- 给出一个异常条件，测试代码是否能处理了异常情况。   


---

## Timeout for Tests  
Tests that 'runaway' or take too long, can be automatically failed.   
若测试用例比起指定的毫秒数花费了更多的时间，Junit 将自动将它标记为失败。

### Timeout parameter on @Test Annotation (applies to test method)  
`TestTimeout.java`  
`@Test(timeout = 1000)` => ms  

## Timeout Rule (applies to all test cases in the test class)   
`TestTimeout2.java`  
```
@Rule
public Timeout globalTimeout = Timeout.millis(1000); // Two choice:millis or seconds
```  

---

## Lifecycle
Lifecycle for one test class   

`TestLifecycle.java`

```
@BeforeClass2
@BeforeClass1

@Before2
@Before1
@Test
@After2
@After1

@Before2
@Before1
@Test2
@After2
@After1

@AfterClass2
@AfterClass1
```

### @Test  
- 标注 一个public void 方法 是一个 testCase  
- @Test  标注的方法必须是public 方法，否则报错：`void add() throws Exception =>ERROR:java.lang.Exception: Method add() should be public`.  
-  @Test  标注的方法必须是void 方法，否则报错：`public void add(int a) throws Exception => ERROR： java.lang.Exception: Method add should have no parameters`.     
- @Test  标注的方法不能是 static 方法，否则报错：`public static void add() throws Exception => ERROR:java.lang.Exception: Method add() should not be static`

### @Before
- 每个test case 运行前执行。
- public void 方法
- 可以有多个@Before 方法，运行顺序 = 上 -> 下 函数声明顺序。
- 外部资源在 Before 方法中分配。

### @After
- 每个test case 运行后执行。 => 多次
- public void 方法
- 可以有多个@After 方法，运行顺序 = 上 -> 下 函数声明顺序。
- 如果将外部资源在 Before 方法中分配，则要在测试运行后释放。
- 在 before() 方法和 after() 方法之间，执行每一个测试用例。

### @BeforeClass
- 该方法需要在类中所有方法前运行。 => 1次
-  public static void 方法，否则报错：     
`ERROR: java.lang.Exception: Method AfterClass() should be static`
- 可以有多个@BeforeClass 方法，运行顺序 = 上 -> 下 函数声明顺序。
- 用来进行初始化活动。

### @AfterClass
- 该方法在所有测试结束后执行。=> 1次
-  public static void 方法，否则报错：     
`ERROR: java.lang.Exception: Method AfterClass() should be static`
- 可以有多个@AfterClass 方法，运行顺序 = 上 -> 下 函数声明顺序。
- 用来进行清理活动。

---

## Test execution order
### `@FixMethodOrder(MethodSorters.DEFAULT) `   
From version 4.11, From version 4.11, JUnit will by default use a deterministic, but not predictable, order (MethodSorters.DEFAULT).
`@FixMethodOrder(MethodSorters.DEFAULT)`  = 默认不写 = 函数声明的顺序    
`TestMethodOrder1.java`  , `TestMethodOrder2.java`  

### `@FixMethodOrder(MethodSorters.JVM)`
Leaves the test methods in the order returned by the JVM. This order may vary from run to run.    
`TestMethodOrder3.java`  

### `@FixMethodOrder(MethodSorters.NAME_ASCENDING)`  
 Sorts the test methods by method name, in lexicographic order `TestMethodOrder4.java`  
 
 ---
 
## JUnit - 使用断言
`TestAssertions.java`  

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
---

## 导入assertEquals的 packgage 时，有两个选择`org.junit` VS `junit.framework`?

Since version 4 of JUnit,Use 
`import static org.junit.Assert.*;`

[StackOverflow - differences between 2 JUnit Assert classes
](https://stackoverflow.com/questions/291003/differences-between-2-junit-assert-classes)

---

## Test Runners

![TestRunner](https://yingvickycao.github.io/img/android/tdd/testruner.png)

###@RunWith annotation
- The default runner is BlockJUnit4ClassRunner which supersedes the older JUnit4ClassRunner   
```
public final class JUnit4 extends BlockJUnit4ClassRunner 
```
- When a class is annotated with `@RunWith` or extends a class annotated with `@RunWith`, JUnit will invoke the class it references to run the tests in that class instead of the runner built into JUnit.
- Annotating a class with `@RunWith(JUnit4.class)` will always invoke the default JUnit 4 runner in the current version of JUnit, this class aliases the current default JUnit 4 class runner.

- Junit4 的默认 runner 是自带的JUnit4。     
- 一个 test class 不写 runner ，就是默认 runner。   
- 如果用`@RunWith`指定了runner，那么使用指定的，而不是默认的。  

### Runners in Junit4   
####   Console based Test runner
 使用Test Runner 来运行测试用例     
`TestRunner.java`   

```
JUnitCore.runClasses
```
```
public class TestRunner {
    public static void main(String[] args) {
        Result result = JUnitCore.runClasses(TestJunit1.class);
        for (Failure failure : result.getFailures()) {
            System.out.println(failure.toString());
        }
        System.out.println(result.wasSuccessful());
    }
}
```

#### Suite     
使用套件测试 。  
`TestSuite.java`       

```
//JUnit Suite Test
@RunWith(Suite.class)
@Suite.SuiteClasses({TestJunit1.class, TestJunit2.class})
public class TestSuite {
}
```

#### Parameterized 
- 参数测试  
Parameterized的测试运行期允许使用者使用不同参数多次运行同一个测试  
- `TestParameterized.java`      

RULE:
- class 以@RunWith(Parameterized.class)   标记。 否则出错：
`java.lang.Exception: Test class should have exactly one public zero-argument constructor`   
根据 error 提示,加上无参构造函数，出错：       
`java.lang.IllegalArgumentException: Test class can only have one constructor`    

- class 不能有多个构造方法，否则报错：
`java.lang.IllegalArgumentException: Test class can only have one constructor`    

-  Test class 必须提供@Parameterized.Parameters 标记的public static parameters method，否则出错：
``
java.lang.Exception: No public static parameters method on class com.example.hades.tdd.api.test_parameters.TestParameterized
``
- @Parameterized.Parameters 标记的函数，其函数名任意。

- @Parameterized.Parameters 标记的函数,不能有参数,否则报错：
`ERROR: java.lang.IllegalArgumentException: wrong number of arguments`

- ***【TODO】有两个@Parameterized.Parameters标记时测试函数时，网上说会ERROR。但实际运行结果为：测试运行正常，没有出错，打印 log 相同，不知道时哪个生效。***

- @Parameterized.Parameters 标记的函数, 数组的长度必须与唯一的公共构造函数的参数数量相匹配，否则报错：   
`ERROR: java.lang.IllegalArgumentException: wrong number of arguments`   
在本例中，我们数组的长度是2，构造方法的参数数量也是2，并且类型匹配。   

When:     
- 使用不同的值反复测试同一个方法或功能。  

#### Theories   
- 参数测试    
提供了除Parameterized之外的另一种参数测试解决方案——似乎更强大。   
- Theories extends BlockJUnit4ClassRunner    
- Theories不再需要使用带有参数的Constructor而是接受有参的测试方法，
-  支持三种方式
`@RunWith(Theories.class) , @DataPoint(代表一个数据),  @Theory`   - `TestTheories1.java`
`@RunWith(Theories.class) , @Datapoints(代表一组数据),  @Theory`   - `TestTheories2.java`   
`@RunWith(Theories.class) , @ParametersSuppliedBy(自定义参数),  @Theory`    - `TestTheories3.java`  
- case 的个数 = 组合 

#### Categories   
> Marks a test class or test method as belonging to one or more categories of tests. 

`@RunWith(Categories.class)`      
`TestCategory1.java`   
`TestCategory2.java`   

#### Enclosed（TODO）
`TestEnclosed.java`
- `Enclosed` - If you put tests in inner classes, Ant, for example, won't find them. By running the outer class with Enclosed, the tests in the inner classes will be run. You might put tests in inner classes to group them for convenience or to share constants.

### Third Party Runners
- [MockitoJUnitRunner](https://static.javadoc.io/org.mockito/mockito-core/2.18.3/org/mockito/runners/MockitoJUnitRunner.html)
- [HierarchicalContextRunner](https://github.com/bechte/junit-hierarchicalcontextrunner/wiki)

---
## Junit 执行测试   
略.  

---
## JUnit 执行过程  
- 多个@Test test case，其中一个失败了，其他 test case不受影响，继续执行。  
- 一个@Test test case的内部代码，只要ERROR，不再继续执行。   
`RuntimeException + AssertionError`  
- 只能运行Java 代码，运行 android 代码报错。=> 使用各种 mock library 来运行 android 代码。  

```
ERROR:java.lang.RuntimeException: Method d in android.util.Log not mocked. See http://g.co/androidstudio/not-mocked for details.
```

```
Log.d(TAG, "before assert");

```
---
## 介绍 Junit  
- Java  unit test framework.     
- 一般默认版本号
   ``` testImplementation 'junit:junit:4.12' ```  

---

## 使用 junit 的好处  ：
- Push View 和 Logic 逻辑分离 => MVP
- Push refactor.   
- 速度快，高效。   
- 测试各种 If 和异常情况。  
- 测试先行（代码架构），代码在后（具体逻辑）。  => 很难

---
## 编写规则   
1. 为了提高可读性，尽量代码与测试代码的路径一致， 名称Calculator  -> CalculatorTest，函数名一致。  
- [MAC]   Alt + Enter -> Create Test  
- 代码重构后，路径不再一致。   

2. @Test 注解函数为一个 test case.   

## References:
- [Java内存机制和内存地址](https://www.cnblogs.com/dudefu/p/7977717.html)
- [Java内存模型](https://www.cnblogs.com/BangQ/p/4045954.html)
- [java中的各种数据类型在内存中存储的方式](https://blog.csdn.net/sinat_29255093/article/details/52556449)
- [判断java中两个对象是否相等](https://www.cnblogs.com/hujingwei/p/5322330.html)
- [同步和Java内存模型 (二)原子性](http://ifeve.com/syn-jmm-atomicity/)
- [判断两个对象相等](https://bbs.csdn.net/topics/380125991)
- [junit4](https://junit.org/junit4/)  
- [Junit4.8之Category](http://fansofjava.iteye.com/blog/556839)
- [Java 重写Object类的常见方法](https://blog.csdn.net/zheng0518/article/details/11836127)
- [测试工具学习笔记 - JUnit4](https://www.cnblogs.com/qianmin/p/6049409.html)
- [w3cschool.cn - junit](https://www.w3cschool.cn/junit)
- [JUNIT(Parameterized运行参数化测试)](https://blog.csdn.net/hxq_793034963/article/details/46431857)
- [w3cschool - JUnit - 参数化测试 ](https://www.w3cschool.cn/junit/uhyr1hvd.html)
- JUnit的jar包和hamcrest的jar包关系   https://blog.csdn.net/hanpompy/article/details/7622251
- Hamcrest CoreMatchers   https://junit.org/junit4/javadoc/latest/org/hamcrest/CoreMatchers.html
- JUnit4之Assertion、Assumption和Theory机制   https://www.jianshu.com/p/dea8426bad2c
- 探索JUnit4扩展：假设机制（Assumption）  
http://www.it610.com/article/776389.htm
- [Theories]JUnit框架功能详细——JUnit学习（一）   https://my.oschina.net/pangyangyang/blog/144495