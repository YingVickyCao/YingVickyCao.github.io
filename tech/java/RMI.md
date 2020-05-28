# RMI

- RMI, is short for Remote remothod invocation
- remote communucation
- 使用场景：  
  远程服务器 如何知道 自动饮料贩卖机的剩余数量、位置等信息。

# 1 RMI system

The illustration also shows that the RMI system uses an existing web server to load class definitions, from server to client and from client to server, for objects when needed

![rmi-2](https://docs.oracle.com/javase/tutorial/figures/rmi/rmi-2.gif)

## Remote objects

Objects with methods that can be invoked across Java virtual machines.

An object becomes remote by implementing a remote interface, which has the following characteristics:  
(1) A remote interface extends the interface `java.rmi.Remote`.  
(2) Each method of the interface declares `java.rmi.RemoteException` in its throws clause, in addition to any application-specific exceptions.

## Advantages of Dynamic Code Loading

- Download the definition of an object's class if the class is not defined in the receiver's Java virtual machine
- his capability enables new types and behaviors to be introduced into a remote Java virtual machine, thus dynamically extending the behavior of an application.

# 2 Build a RMI System Example

## Package

| Class                                | Package | Desc   |
| ------------------------------------ | ------- | ------ |
| `Compute` interfaces                 | compute | JAR    |
| `Task` interfaces                    | compute | JAR    |
| `ComputeEngine` implementation class | engine  | server |
| `ComputePi` client code              | client  | client |
| `Pi` task implementation             | client  | client |

## RMI Server

- Designing a Remote Interface  
  Remote interfaces is protocol having remote method.  
   `Compute.java`  
   `Task.java`

```
public interface Compute extends Remote {
    //  remote method: 执行在Server，执行代码在Client Pi class
    //  变量和返回值必须是java.io.Serializable / Primitive Type
    <T> T executeTask(Task<T> t) throws RemoteException;

    //  remote method：执行在Server，执行代码在Sever ComputeEngine class
    int sum(int num1, int num2) throws RemoteException;
}
```

- Implementing a Remote Interface  
  `ComputeEngine`

![rmi-3](https://docs.oracle.com/javase/tutorial/figures/rmi/rmi-3.gif)

## RMI Client

`Task`: non-remote  
`ComputePi`:main client class  
`Pi`:class that implements the Task interface

![rmi-4](https://docs.oracle.com/javase/tutorial/figures/rmi/rmi-4.gif)

compute: build the interface JAR file to provide to server and client developers

<h2 id="rmi_compile_and_run">Compiling and Running the Example</h2>

### First Starting the Server

- Step 1: Add server.policy

```
grant  {
    permission java.security.AllPermission;
};
```

- Step 2: VM Options of ComputePi:

```
-Djava.security.policy=server.policy
```

- Step 3: Run ComputePi  
  Server 缺省运行端口为 1099.

### Then Starting the Client

`ComputePi`  
 Do policy operation jsut like in Server

# 3 Test

- Run server, run client

| -      | Compute            | Task            |
| ------ | ------------------ | --------------- |
| Server | Compute@1995265320 | Task@2124102451 |
| Client | Compute@-926240114 | Task@1494279232 |

- Then close client, run client

| -      | Compute            | Task            |
| ------ | ------------------ | --------------- |
| Server | Compute@1995265320 | Task@2056428620 |
| Client | Compute@-926240114 | Task@1494279232 |

# 4 RMI 底层原理

## 远程代理

远程代理：“远程对象的本地代表”  
远程对象：一种对象，活在不同的 Java 虚拟机 .  
本地代表：一种可以在本地方法调用的对象，其行为会转发到远程对象中。

## `远程方法` 调用是如何发生的？

客户端：  
客户对象调用客户辅助辅助对象，客户辅助对象会联系服务器，传送（序列化）方法调用信息（方法名、参数、返回值等），然后等待服务器返回。  
看起来像是客户对象调用的是远程服务上的方法，但客户辅助对象并不是真正的远程服务。

服务器端：  
服务器辅助对象从客户辅助对象中接受请求（透过 Socket 连接），将调用的信息解包（反序列化），然后调用真正服务对象上真正的方法。  
对于服务对象，调用的是本地，来自服务辅助对象，而不是远程客户。

服务辅助对象从服务中得到返回值，将它打包（序列化），然后返回到客户辅助对象（通过网络 Socket 的输出流），客户辅助对象对信息解包，最后将返回值交给客户对象。

![RMI_1](https://yingvickycao.github.io/img/RMI_1.png)

![RMI_2](https://yingvickycao.github.io/img/RMI_2.png)

![RMI_3](https://yingvickycao.github.io/img/RMI_3.png)

![RMI_7](https://yingvickycao.github.io/img/RMI_7.png)

## 如何利用 RMI 进行远程方法调用

![RMI_4](https://yingvickycao.github.io/img/RMI_4.png)

RMI 提供了客户辅助对象和服务辅助对象，为客户辅助对象创建和服务对象相同的方法。  
RMI 好处：不用些任何网络或 I/O 代码，这些在 Java API 已经实现了。客户程序调用远程方法（即真正）和在运行它自己的本地 JVM 上对对象进行正常方法调用一样。

- RMI Registry：  
  提供了服务名到服务的映射。  
  服务对象运行时，服务实现类实例化一个服务的对象，并将服务注册到 RMI registry。注册之后，客户使用 RMI Registry 通过 host 、 port 、name 查找该服务，这个服务可以给客户使用了。

### Old API （Depressed）

- Stub 和 Skeleton  
  都是代理。  
  客户段和服务器的名字不同。屏蔽了远程方法调用的细节，e.g, socket 连接等。  
  RMI 将客户辅助对象称为 stub（桩），服务辅助对象称为 skeleton（骨架）。

利用 rmic 产生 stub 和 skeleton  
![RMI_5](https://yingvickycao.github.io/img/RMI_5.png)

![RMI_6](https://yingvickycao.github.io/img/RMI_6.png)

### New API

新版 Java API 不需要一个 skeleton 对象 。  
Example 用的也是 New API，在 IDEA 运行起来一点 RUN 就可以了，不用命令。

```
客户堆							           服务器堆
客户对象		Stub	     ｜		Stub    服务对象
```

```
// log of Server Registry registry
Proxy[Compute,RemoteObjectInvocationHandler[UnicastRef [liveRef: [endpoint:[192.168.0.103:57580](local),objID:[618a3fc9:1725b38ddd9:-7fff, -2991751866471534858]]]]]

// log of Client Registry registry
RegistryImpl_Stub[UnicastRef [liveRef: [endpoint:[localhost:1099](remote),objID:[0:0:0, 0]]]]
```

## 概括原理

socket 连接，序列化与反序列化

# 5 TODO RMI 源码

# 6 QA

## Q : `IllegalArgumentException: illegal remote method encountered`

```
Caused by: java.lang.IllegalArgumentException: illegal remote method encountered:
public abstract int com.hades.example.java._4_rmi.compute.Compute.sum(int,int)
```

A : Remote method should throws RemoteException

## Q : `java.rmi.ConnectException: Connection refused to host: localhost`

```
ComputePi exception:
java.rmi.ConnectException: Connection refused to host: localhost; nested exception is:
java.net.ConnectException: Connection refused (Connection refused)
at sun.rmi.transport.tcp.TCPEndpoint.newSocket(TCPEndpoint.java:619)
at sun.rmi.transport.tcp.TCPChannel.createConnection(TCPChannel.java:216)
at sun.rmi.transport.tcp.TCPChannel.newConnection(TCPChannel.java:202)
at sun.rmi.server.UnicastRef.newCall(UnicastRef.java:338)
at sun.rmi.registry.RegistryImpl_Stub.lookup(RegistryImpl_Stub.java:116)
at com.hades.example.java.\_4_rmi.client.ComputePi.main(ComputePi.java:21)
Caused by: java.net.ConnectException: Connection refused (Connection refused)
```

A : Before run Client, Server should run first

## Q : `AccessControlException`

```

java.security.AccessControlException: access denied ("java.net.SocketPermission" "127.0.0.1:1099" "connect,resolve")

```

A :  
客户端不能访问服务器。  
RMI 有安全限制. 在服务器和客户端使用 policy 策略文件.  
Ref to [Compiling and Running the Example](#rmi_compile_and_run)

## Q : `UnmarshalException`

```
java.rmi.UnmarshalException: Error unmarshaling return header; nested exception is
```

A :  
服务器能提供服务，但客户端无权访问。  
RMI 有安全限制. 在服务器和客户端使用 policy 策略文件.  
Ref to [Compiling and Running the Example](#rmi_compile_and_run)

# Refs

- https://docs.oracle.com/javase/tutorial/rmi/overview.html
- https://docs.oracle.com/javase/6/docs/platform/rmi/spec/rmiTOC.html
- https://docs.oracle.com/javase/6/docs/technotes/guides/rmi/hello/hello-world.html
- Old RMI 《Head First 设计模式 》- 11 代理模式，P433 - P499
- https://blog.csdn.net/sinat_34596644/article/details/52599688
