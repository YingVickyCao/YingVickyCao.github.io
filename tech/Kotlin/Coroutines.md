# Coroutines

https://developer.android.google.cn/codelabs/kotlin-coroutines?hl=zh-cn    
https://kotlinlang.org/docs/coroutines-overview.html  
https://kotlinlang.org/docs/coroutines-guide.html



- Debug Coroutines
```
-Dkotlinx.coroutines.debug
```

# 类比  
- block -> suspend  
- thread -> coroutine  

# cortoutine builder
- main cortoutine builder : launch , async, runBlocking.  
- default libraries can define additional coroutines builders.  

## actor
https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.channels/actor.html  
https://github.com/Kotlin/kotlinx.coroutines/blob/master/ui/coroutines-guide-ui.md

- The actor coroutine builder accepts an optional capacity parameter that controls the implementation of the channel that this actor is using for its mailbox. 
- ignoring events while we were busy processing the previous one.


# suspend
- suspend 用于暂停执行当前协程，并保存所有局部变量，被标记为 suspend 的函数只能运行在协程或者其他 suspend 函数。 


# runBlocking method vs  coroutineScope function 

- runBlocking method / coroutineScope function :wait for their body and all its children to complete.  

- runBlocking method:  
is a regulation function,     
blocks the current thread for waiting  


- coroutineScope function:   
is a suspend function,   
releasing the underlying thread for other usages.     
coroutineScope can be used for any suspend function.



# launch vs async  
- launch and async are declared as extensions to CoroutineScope, so an implicit or explicit receiver must always be passed when you call them.


## launch
- launch starts a new coroutines and returns a Job object (not expected to return a specific result).     

## async  
- async- starts a new coroutines and returns a Deffered object (Future / Promise,promieses the result in the future).  

- When launch { ... } is used without parameters, it inherits the context (and thus dispatcher) from the CoroutineScope it is being launched from. 

- Lazily started async: CoroutineStart.LAZY, job.await(),job.start

## Job
- job.cancelAndJoin() / job.join() wait for all finalization actions to complete

## Deferred
- Deffered - a generic type that extends a job.
- Deferred values provide a convenient way to transfer a single value between coroutines. 

# runBlocking    
- runBlocking is used as a bridge between regular and suspending functions, or between the blocking and non-blocking worlds. It works as an adaptor for starting the top-level main coroutine. It is intended primarily to be used in main() functions and tests.

- The coroutine started by runBlocking is the only exception because runBlocking is defined as a top-level function. But because it blocks the current thread, it's intended primarily to be used in main() functions and tests as a bridge function.

# CoroutineDispatcher    
- CoroutineDispatcher determines what thread or threads the corresponding coroutine should be run on. If you don't specify one as an argument, async will use the dispatcher from the outer scope.

## Dispatchers.Main   
Android

## Dispatchers.Default  
- Dispatchers.Default represents a shared pool of threads on the JVM. This pool provides a means for parallel execution. It consists of as many threads as there are CPU cores available, but it will still have two threads if there's only one core.

- The default dispatcher is used when no other dispatcher is explicitly specified in the scope. It is represented by Dispatchers.Default and uses a shared background pool of threads.


# withContext()     
- withContext() calls the given code with the specified coroutine context, is suspended until it completes, and returns the result. 


# coroutine scope  
- The coroutine scope is responsible for the structure and parent-child relationships between different coroutines. New coroutines usually need to be started inside a scope.

- When launch, async, or runBlocking are used to start a new coroutine, they automatically create the corresponding scope. (CoroutineScope)

- New coroutines can only be started inside a scope.

- create a new scope without starting a new coroutine? by using the coroutineScope function.

- start a new coroutine from the global scope using GlobalScope.async or GlobalScope.launch. This will create a top-level "independent" coroutine.

- When using GlobalScope.async, there is no structure that binds several coroutines to a smaller scope. Coroutines started from the global scope are all independent – their lifetime is limited only by the lifetime of the whole application. It's possible to store a reference to the coroutine started from the global scope and wait for its completion or cancel it explicitly, but that won't happen automatically as it would with structured concurrency.When you write code with coroutines for UI applications, for example Android ones, it's a common practice to use CoroutineDispatchers.Main by default for the top coroutine and then to explicitly put a different dispatcher when you need to run the code on a different thread.

- CoroutineScope.isActive:Returns true when the current Job is still active

- When a coroutine is launched in the CoroutineScope of another coroutine, it inherits its context via CoroutineScope.coroutineContext and the Job of the new coroutine becomes a child of the parent coroutine's job. When the parent coroutine is cancelled, all its children are recursively cancelled, too.

# coroutine context
- The coroutine context stores additional technical information used to run a given coroutine, like the coroutine custom name, or the dispatcher specifying the threads the coroutine should be scheduled on.

- The coroutine context is a set of various elements. The main elements are the Job of the coroutine, and its dispatcher


## newSingleThreadContext
- newSingleThreadContext: applicatiin level (top - level),close after no longer needed.

- uses the use function from the Kotlin standard library to release threads created with newSingleThreadContext when they are no longer needed.

# Coroutine cancellation

- Coroutine cancellation is cooperative. A coroutine code has to cooperate to be cancellable. All the suspending functions in kotlinx.coroutines are cancellable. They check for cancellation of coroutine and throw CancellationException when cancelled. However, if a coroutine is working in a computation and does not check for cancellation, then it cannot be cancelled.

- Cancellable suspending functions throw CancellationException on cancellation

- CancellationException

# Channels
- Channels provide a way to transfer a stream of values.
- channel can suspend send()and receive() operations. This happens when the channel is empty or full. The channel can be full if the channel size has an upper bound.
- Several types of channels are defined in the library. They differ in how many elements they can internally store and whether the send() call can be suspended or not. For all of the channel types, the receive() call behaves similarly: it receives an element if the channel is not empty; otherwise, it is suspended.
- Unlimited channel:
OutOfMemoryException

# Flow
- Flow  ->  collections / sequences  :map / filter

- collections / sequences  -> Flow  :emit / collection

- flow.flowOn(Dispatchers.Default) :  Right way to change context for  CPU-consuming code in flow builder

- Conflation is one way to speed up processing when both the emitter and collector are slow. It does it by dropping emitted values.The other way is to cancel a slow collector and restart it every time a new value is emitted. 

- onCompletion vs catch :   
The onCompletion operator, unlike catch, does not handle the exception. As we can see from the above example code, the exception still flows downstream. It will be delivered to further onCompletion operators and can be handled with a catch operator.  
Another difference with catch operator is that onCompletion sees all exceptions and receives a null exception only on successful completion of the upstream flow (without cancellation or failure).

- suspending function vs Flow 
A suspending function asynchronously returns a single value. Kotlin Flows return multiple asynchronously computed values

# SupervisorJob: 
- cancellation is propagated only downwards.
-- supervisorJob.cancel()
 
# supervisorScope:
- Instead of coroutineScope, we can use supervisorScope for scoped concurrency. It propagates the cancellation in one direction only and cancels all its children only if it failed itself. It also waits for all children before completion just like coroutineScope does.
- Every child should handle its exceptions by itself via the exception handling mechanism.


# Shared mutable state and concurrency:

- Thread-safe data structures  
Use a thread-safe (aka synchronized, linearizable, or atomic) data structure that provides all the necessary synchronization for the corresponding operations that needs to be performed on a shared state.   
AtomicInteger: Not easily scale to complex state or to complex operations that do not have ready-to-use thread-safe implementations.

- Mutual exclusion  
Mutual exclusion solution to the problem is to protect all modifications of the shared state with a critical section that is never executed concurrently.   
Java synchronized or ReentrantLock VS Coroutine Mutex
Mutex.lock() is a suspending function. It does not block a thread.  
Mutex.unlock()  
Mutex.withLock(): mutex.lock(); try { ... } finally { mutex.unlock() } pattern  