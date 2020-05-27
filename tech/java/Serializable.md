# Serializable

- Serializable 是 Java 提供的序列化接口，是一个空接口，为对象提供标准的序列化与反序列化操作.  
  e.g., IO，网络传输
- serialVersionUID  
  作用：版本兼容  
  不是必须的，但最好使用。

  工作机制：  
  序列化时将 serialVersionUID 写入文件中。当反序列时先检测文件中 serialVersionUID 与类 serialVersionUID 是否一致。如果不一致或类结构发生不兼容的变化，则序列化失败，否则序列化成功。

- static 成员变量不参与序列化
- transient 成员变量不参与序列化

# Test

| NO.         | Serialization       | Deserialization                   | Result                         |
| ----------- | ------------------- | --------------------------------- | ------------------------------ |
| 1           | No serialVersionUID | No serialVersionUID               | ✔, {id=1, name='name_1'}       |
| 2           | No serialVersionUID | serialVersionUID=1                | ✗                              |
| 3           | serialVersionUID=1  | serialVersionUID=1                | ✔, {id=1, name='name_1'}       |
| 4,Base on 3 | serialVersionUID=1  | serialVersionUID=1,+ num          | ✔, {id=1, name='name_1',num=0} |
| 5,Base on 3 | serialVersionUID=1  | serialVersionUID=1,- name         | ✔, {id=1}                      |
| 6,Base on 3 | serialVersionUID=1  | serialVersionUID=2                | ✗                              |
| 7,Base on 3 | serialVersionUID=1  | serialVersionUID=1,+static var    | ✔, {id=1, name='name_1'}       |
| 8,Base on 3 | serialVersionUID=1  | serialVersionUID=1,+transient var | ✔, {id=1, name='name_1'}       |

No.2

```
java.io.InvalidClassException: com.hades.example.java.\_3_serializable.User; local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = -922661802714223540
```

No.4  
读取不到新增的字段，新增字段为默认值

No.5  
读取不到减少的字段

No.6

```
java.io.InvalidClassException: com.hades.example.java.\_3_serializable.User; local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2
```
