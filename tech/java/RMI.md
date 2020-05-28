# RMI

- RMI, is short for Remote remothod invocation
- remote communucation

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

---

# QA

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

https://docs.oracle.com/javase/tutorial/rmi/overview.html
https://docs.oracle.com/javase/6/docs/platform/rmi/spec/rmiTOC.html
https://docs.oracle.com/javase/6/docs/technotes/guides/rmi/hello/hello-world.html
