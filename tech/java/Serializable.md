# Serializable

- 序列化？
  Java 对象转换为字节序列。这里的字节序列是指存储在文件中一段二进制表示的文本
- 反序列化？
  为字节序列 转换为 Java 对象。
   [Serialization](./Serialization.svg)

# Java - Serializable

- Serializable 是 Java 提供的序列化接口，是一个空接口，为对象提供标准的序列化与反序列化操作.  
  e.g., IO，网络传输
- serialVersionUID  
  作用：版本兼容  
  不是必须的，但最好使用。

- 工作机制：
  序列化时将 serialVersionUID 写入文件中。当反序列时先检测文件中 serialVersionUID 与类 serialVersionUID 是否一致。如果不一致或类结构发生不兼容的变化，则序列化失败，否则序列化成功。

- Test

| NO.          | Serialization       | Deserialization                         | Result                                               |
| ------------ | ------------------- | --------------------------------------- | ---------------------------------------------------- |
| 1            | No serialVersionUID | No serialVersionUID                     | ✔, {id=1, name='name_1'}                             |
| 2            | No serialVersionUID | serialVersionUID=1                      | ✗                                                    |
| 3            | serialVersionUID=1  | serialVersionUID=1                      | ✔ {id=1, name='name_1'}                              |
| 4,Base on 3  | serialVersionUID=1  | serialVersionUID=2                      | ✗                                                    |
| 5,Base on 3  | serialVersionUID=1  | serialVersionUID=1,+ num                | ✔, {id=1,num=0} 读取不到新增的字段，新增字段为默认值 |
| 6,Base on 3  | serialVersionUID=1  | serialVersionUID=1,- name               | ✔, {id=1} 读取不到减少的字段                         |
| 7,Base on 3  | serialVersionUID=1  | serialVersionUID=1,+static var          | ✔, value is same                                     |
| 8,Base on 3  | serialVersionUID=1  | serialVersionUID=1,+transient var       | ✔, value is same                                     |
| 9,Base on 3  | serialVersionUID=1  | serialVersionUID=1,+ change package     | x                                                    |
| 10,Base on 3 | serialVersionUID=1  | serialVersionUID=1,+ change class name  | x                                                    |
| 11,Base on 3 | serialVersionUID=1  | serialVersionUID=1,+ change method name | ✔,value is same                                      |

No.2

```
java.io.InvalidClassException: com.hades.example.java.\_3_serializable.User; local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = -922661802714223540
```

# JAVA - Externalizable 自定义序列化

```
package java.io;

import java.io.ObjectOutput;
import java.io.ObjectInput;


public interface Externalizable extends java.io.Serializable {

    void writeExternal(ObjectOutput out) throws IOException;

    void readExternal(ObjectInput in) throws IOException, ClassNotFoundException;
}`
```

https://cloud.tencent.com/developer/article/1130025

- Externalizable 继承 Serializable。
- 序列化的细节由开发实现。如果不实现，那么，序列化行为不回保存/读取任何一个字段。
- 使用 Externalizable 进行序列化时，必须要有默认的构造方法,否则 序列化成功但反序列化会失败：`java.io.InvalidClassException: serializable._4_externalizable.User; no valid constructor。`
  这是因为 Externalizable 通过反射先创建出该类的实例，然后再把解析后的属性值，通过反射赋值。
- 序列化机制  
  (1）Externalizable 的序列化机制优先级要高于 Serializable。使用该接口之后，之前基于 Serializable 接口的序列化机制就将失效。

## Serializable vs Externalizable

| Serializable                 | Externalizable                   |
| ---------------------------- | -------------------------------- |
| 反序列化是深拷贝             | 同                               |
| 反序列化不调用构造函数       | 反序列化调用 public 默认构造函数 |
| static field 不参与序列化    | static field 可定义参与序列化    |
| transient field 不参与序列化 | static field 可定义参与序列化    |
| 序列化机制优先级高           | 序列化机制优先级低               |

# Android - Parcel
