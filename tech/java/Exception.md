# Exception

# 1 return in `try-catch-finally`

```java
// code_4
private String sum(int num, int num2) {
    try {
        int result = doSum(num, num2);
        if (result > 10) {
            System.out.println("Step code_1");
            return "code_1";   // go 1
        } else {
            System.out.println("Step code_2");
            return "code_2";
        }
    } catch (Exception ex) {
        System.out.println("Step code_3");
        return "code_3";
    } finally {
        System.out.println("Step code_4");
        return "code_4";    // go 2
    }
}

private int doSum(int num, int num2) {
    return num + num2;
}
```

```java
// code_4
private String sum(int num, int num2) {
    try {
        int result = doSum(num, num2);
        if (result > 10) {
            System.out.println("Step code_1");
            return "code_1";
        } else {
            System.out.println("Step code_2");
            return "code_2";
        }
    } catch (Exception ex) {
        System.out.println("Step code_3");    // go 1
        return "code_3";                      // go 2
    } finally {
        System.out.println("Step code_4");
        return "code_4";                      // go 3
    }
}

private int doSum(int num, int num2) throws Exception {
    throw new Exception("throw ex in doSum");
}
```

```java
// code_3
private String sum(int num, int num2) {
    try {
        int result = doSum(num, num2);
        if (result > 10) {
            System.out.println("Step code_1");
            return "code_1";
        } else {
            System.out.println("Step code_2");
            return "code_2";
        }
    } catch (Exception ex) {
        System.out.println("Step code_3");  // go 1
        return "code_3";                    // go 2,go 4
    } finally {
        System.out.println("Step code_4");  // go 3
    }
}

private int doSum(int num, int num2) throws Exception {
    throw new Exception("throw ex in doSum");
}
```

```java
// code_1
private String sum(int num, int num2) {
    try {
        int result = doSum(num, num2);
        if (result > 10) {
            System.out.println("Step code_1");
            return "code_1";                    // go 1, go 3
        } else {
            System.out.println("Step code_2");
            return "code_2";
        }
    } catch (Exception ex) {
        System.out.println("Step code_3");
        return "code_3";
    } finally {
        System.out.println("Step code_4");      // go 2
    }
}

private int doSum(int num, int num2) throws Exception {
    return num + num2;
}
```

总结：

```java
// Lastly 从函数返回返回哪个 return statement？
// 优先级从高到低：finnaly > catch > try block
try{
    return statement
}catch(ex){
    return statement
}finally{
    return statement
}
```
