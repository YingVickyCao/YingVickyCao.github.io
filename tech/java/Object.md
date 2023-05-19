# Object

# 1 打印成员：

https://blog.csdn.net/qq_21383435/article/details/79569665

方法 1：重写 toString
`{c1 = c1}{flag=false, mNames=null}`

方法 2： ToStringBuilder.reflectionToString(this):
`com.example.hades.java._object._overload._tostring.C1@2503dbd3[c1=c1,flag=false,mNames=<null>]`

# 2 Sort in List

Way 1 : Recommended

```java
public class DownloadItem implements Comparable {
@Override
    public int compareTo(Object o) {
    }
}

Collections.sort(list)
```

Way 2 :

```java
Collections.sort(list, new Comparator<DownloadItem>() {
    @Override
    public int compare(DownloadItem o1, DownloadItem o2) {
    }
});
```
