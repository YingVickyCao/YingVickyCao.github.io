# Class

# 1 不可变类

将类声明为 final，所以它不能被继承；  
将所有的成员声明为私有的，这样就不允许直接访问这些成员；  
对变量不要提供 setter 方法；  
将所有可变的成员声明为 final，这样只能对它们赋值一次；  
通过构造器初始化所有成员，进行深拷贝（deep copy）；  
在 getter 方法中，不要直接返回对象本身，而是克隆对象，并返回对象的拷贝；

```java
public final class Immutable {  
    private final int id;  
    private final String name;  
    private final HashMap map;  
    
    public int getId() {  
        return id;  
    }  
    
    public String getName() {  
        return name;  
    }  
    
    /** 
     * 可变对象的访问方法 
     */  
    public HashMap getMap() {  
        return (HashMap) testMap.clone();  
    }  
    
    /** 
     * 实现深拷贝的构造器*/  
    public Immutable(int i, String n, HashMap hm){this.id=i;  
        this.name=n;  
        HashMap tempMap=new HashMap();  
        String key;  
        Iterator it = hm.keySet().iterator();  
        while(it.hasNext()){  
            key=it.next();  
            tempMap.put(key, hm.get(key));  
        }  
        this.map = tempMap;  
    }  
   
}
```
