# Map

# 1 PO

<h2 id="po_loop_HashMap">Loop HashMap</h2>

`TestLoopHashMap.java`

```java
/**
* Way 1 : Foreach - map.entrySet()
* key and value
* Recommend, especially when map capacity is large
*/
private void forEach() {
    for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
    // System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
    }
}

/**
* Way 2 : Foreach only for key - map.keySet()
*/
private void forEach_key() {
    // Key
    for (Integer key : map.keySet()) {
    //  System.out.println("Key = " + key);
    }
}

/**
* Way 3 : Foreach only for value - map.values()
*/
private void forEach_value() {
    // Value
    for (Integer value : map.values()) {
    // System.out.println("Value = " + value);
    }
}

/**
* Way 4 : Iterator
* key and value
*/
private void iterator() {
    Iterator<Map.Entry<Integer, Integer>> entries = map.entrySet().iterator();
    while (entries.hasNext()) {
        Map.Entry<Integer, Integer> entry = entries.next();
        // System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
    }
}

/**
* Way 5 : Java8 Lambda
* key and value
*/
private void java8Lambda() {
    map.forEach((k, v) -> {
    // System.out.println("key: " + k + " value:" + v);
    });
}
```

- Test Data
  | Map Size | 10,000 | 100,000 | 1,000,000 | 2,000,000 |
  | -------- | ------ | ------- | --------- | --------- |
  | Way 1 - key + value | 1 ms | 6 ms | 14 ms | 25 ms |
  | Way 2 - key| 4 ms | 5 ms | 12 ms | 24 ms |
  | Way 3 - value | 1 ms | 4 ms | 11 ms | 22 ms |
  | Way 4 - key + value | 1 ms | 3 ms | 11 ms | 21 ms |
  | Way 5 - key + value| 41 ms | 44 ms | 56 ms | 62 ms |

- How to choose ？

  | Usage       | Choose                      |
  | ----------- | --------------------------- |
  | Key + Value | Way 1: 可读性 / Way 4：性能 |
  | Key         | Way 2: 可读性 / Way 4：性能 |
  | Value       | Way 3: 可读性 / Way 4：性能 |

# Refs

- HashMap 循环遍历方式及其性能对比 https://www.trinea.cn/android/hashmap-loop-performance/
