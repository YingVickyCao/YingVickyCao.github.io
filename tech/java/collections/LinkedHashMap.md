# LinkedHashMap

- 顺序  
  插入顺序  
  访问顺序
- 线程不安全
- key 和 value 允许 null
- Key 允许重复。  
  Key 重复 => Key 覆盖 => Value 更新

# 1 原理

## HashMap + 双向链表

双向链表如何实现？  
重写 Entry，包含自身、前、后 Node

```java
/**
  * HashMap.Node subclass for normal LinkedHashMap entries.
  */
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

## LRU 算法

least recently used  
![LRU of LinkedHashMap](https://yingvickycao.github.io/img/LinkedHashMap_LRU.png)
