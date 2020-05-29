# RMI

- RMI, is short for Remote remothod invocation
- remote communucation
- 使用场景：  
  公司（client） 如何知道 饮料机（server）的剩余数量、位置等信息。

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

# 2 Java RMI 概观

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

## 客户如何取得 stub 对象？

使用 RMI Registry。客户从 Registry 中寻找（lookup）代理（stub 对象）。

### Old API （Depressed）

![RMI_8](https://yingvickycao.github.io/img/RMI_8.png)

- Stub 和 Skeleton  
  都是代理。  
  客户段和服务器的名字不同。屏蔽了远程方法调用的细节，e.g, socket 连接等。  
  RMI 将客户辅助对象称为 stub（桩），服务辅助对象称为 skeleton（骨架）。

- 利用 rmic 产生 stub 和 skeleton  
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

# 3 Build a RMI System Example

## Package

| Example Class                        | Package | Desc   | 对应 Book                                  |
| ------------------------------------ | ------- | ------ | ------------------------------------------ |
| `Compute` interfaces                 | compute | JAR    | 远程接口 : MyService.java                  |
| `Task` interfaces                    | compute | JAR    |                                            |
| `ComputeEngine` implementation class | engine  | server | 远程实现:MyServiceImol.java,GumballMachine |
| `ComputePi` client code              | client  | client | -                                          |
| `Pi` task implementation             | client  | client | -                                          |

## 制作远程服务

### Step 1 : Designing a Remote Interface

Remote interfaces is protocol having remote method.  
远程接口定义了让客户远程调用的方法。  
客户将它作为服务的类类型。  
Stub 和实际的服务都实现此接口。

![RMI_9](https://yingvickycao.github.io/img/RMI_9.png)

![rmi-3](https://docs.oracle.com/javase/tutorial/figures/rmi/rmi-3.gif)

`Compute.java`

```java
public interface Compute extends Remote {
    // 1 remote method: 执行在Server，执行代码在Client Pi class
    // 2 变量和返回值必须是java.io.Serializable(序列化后让网络传送) / Primitive Type
    // 3 客户会调用远程接口的Stub上的方法，而Stub低层用到了网络和I/O,因此 must  RemoteException。
    <T> T executeTask(Task<T> t) throws RemoteException;

    //  remote method：执行在Server，执行代码在Sever ComputeEngine class
    int sum(int num1, int num2) throws RemoteException;
}
```

`Task.java`

```java
public interface Task<T> {
    T execute();
}
```

### Step 2 : Implementing a Remote Interface

这是实际工作的类，为远程接口中定义的远程方法提供真正的实现

![RMI_10](https://yingvickycao.github.io/img/RMI_10.png)

```java
public class ComputeEngine implements Compute {
}

// Deprssed API
// public class ComputeEngine extends UnicastRemoteObject implements Compute {
// }
```

- 用 RMI Registry 注册此服务  
  RMI 注册的是 stub，这是客户需要的：when rebind/bind，RMI 把服务换成 stub，然后把 stub 放到 registry 中。  
  Default port is 1099

```java
// Depressed API:
GumballMachineRemote gumballMachine = new GumballMachine("RemoteURl", count);
Naming.rebind("localhost", gumballMachine);
```

```java
// New API
Compute engine = new ComputeEngine();
Compute stub = (Compute) UnicastRemoteObject.exportObject(engine, 0);

Registry registry = LocateRegistry.createRegistry(1099);
registry.rebind(name, stub);
```

### Step 3 : 利用 rmic 产生 stub 和 skeleton

stub:客户辅助类  
skeleton:服务辅助类  
rmic 是 JDK 工具。运行它，自动创建和处理 stub 和 skeleton。

![RMI_11](https://yingvickycao.github.io/img/RMI_11.png)

**When in New API, iggnore this step.**

### Step 4 : 启动 RMI registry(rmiregistry)

rmiregistry 像电话簿，客户可以从中查到代理服务的位置（客户的 stub helper 对象）

```
// Terminal
%rmiregistry
```

**When in New API, ignore this step.**

### Step 5 : Start Serve（启动远程服务）

运行服务对象。  
服务实现类去实例化一个服务的实例，并将该服务注册到 RMI registry。注册后，服务就能让客户调用。

#### Old API

```
%java MyServiceImpl
```

#### Java 1.2

- Q : Java 1.2 已经摆脱 skeleton，为什么还要使用 skeleton  
  A : Java 1.2 的 RMI 利用 reflection API 直接将客户调用分派给远程服务，不需要真的产生 skeleton。
  书中呈现 skeleton，是为了帮助从概念上理解内部的机制。

#### Java 5 , IDEA

- Q : Java 5 连 stub 都不需要产生了？  
  A : Java 5 的 RMI 和动态代理搭配使用。  
  动态代理动态产生 stub，远程对象的 stub 是 java.lang.reflec.Proxy 实例（连同一个调用处理器），它是自动产生的，来处理所有把客户的本地调用变成远程调用的细节。  
  所以，不需要使用 rmic，客户和远程对象沟通的一切在幕后处理掉了。

* Step 1: Add server.policy

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

### Step 6 : Start Client

Client 使用远程接口调用 Server 提供的远程服务。

#### Old API

```java
// Old API
// Naming.lookup("rmi://127.0.0.1/RemoteURl");
GumballMachineRemote machine = (GumballMachineRemote) Naming.lookup("RemoteURl");
GumballMonitor monitor = new GumballMonitor(machine);
monitor.report();
```

#### Java1.2

#### Java>=5 , IDEA

- RMI Client

`Task`: non-remote  
`ComputePi`:main client class  
`Pi`:class that implements the Task interface

![rmi-4](https://docs.oracle.com/javase/tutorial/figures/rmi/rmi-4.gif)

compute: build the interface JAR file to provide to server and client developers

`ComputePi`  
 Do policy operation jsut like in Server

# 4 Test

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
