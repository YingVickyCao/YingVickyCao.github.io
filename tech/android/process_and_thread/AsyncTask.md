# AsyncTask
`Android 28`

## 规则
- Must create AsyncTask instance  on UI Thread.
- Must invoke AsyncTask.execute() on UI Thread.   
=> Handle:thread to UI Thread, Looper -> MessageQueue  
- onPreExecute(),onProgressUpdate(), onPostExecute(),doInBackground() must be invoked by android OS, not by programmer.
- AsyncTask instance must be invoked only once, or throw exception
```
java.lang.IllegalStateException: Cannot execute task: the task has already been executed (a task can be executed only once)
```

## Common functions
### `AsyncTask.execute()`

### `AsyncTask<Params, Progreess, Result>`  
Params： 输入参数，可变长参数    
- 与`Long doInBackground(Type... Params)`的 Params保持一致
- 在execute() 传入，可变长参数
- 没有传参数=Void

Progreess：执行的进度  
- 与`void onProgressUpdate(Integer... progress =  Progreess)`中progress类型一致，一般情况为Integer

Result：Task 完成后返回结果的类型  
- 与`void onPostExecute(Long result)`要返回的result的类型一致

### onPreExecute()      // UI Thread
### doInBackground - publishProgress    //work thread
### publishProgress     // Work thread -> UI Thread
### onProgressUpdate    // UI Thread
### onPostExecute       // UI Thread
### void onCancelled()  // UI Thread
### `cancel()`
AsyncTask中的cancel()方法不是真正去取消任务，仅仅是表示这个任务为取消状态.  
需要在doInBackground()判断终止任务.类似终止一个线程：调用interrupt()方法，只是进行标记为中断，需要在线程内部进行标记判断然后中断线程。

### execute
- `mSumAsyncTask.execute(10)`   // 串行,默认
- `AsyncTask.executeOnExecutor(Executors.newSingleThreadExecutor(), 10)`    // 并行
- `SumAsyncTask.executeOnExecutor(Executors.newCachedThreadPool(), 10)`     // 并行
- `mSumAsyncTask.executeOnExecutor(Executors.newFixedThreadPool(10), 10)`   // 并行


### 调用顺序：  
- 需要执行更新进度:  
`onPreExecute() --> doInBackground() --> publishProgress() --> onProgressUpdate() --> onPostExecute()`

- 不需要执行更新进度：  
`onPreExecute() --> doInBackground() --> onPostExecute()`

# 实现原理
- Android的消息机制 - Handler
- AsyncTask的内部封装了两个线程池(SerialExecutor SERIAL_EXECUTOR 和 ThreadPoolExecutor THREAD_POOL_EXECUTOR )和一个Handler(InternalHandler)。

SERIAL_EXECUTOR 用于任务的顺序排列.   
THREAD_POOL_EXECUTOR 才真正地执行任务.   
SerialExecutor 类仅仅为了保持任务执行是串行的，实际执行交给了 THREAD_POOL_EXECUTOR 。

THREAD_POOL_EXECUTOR 含有一个BlockingQueue.

InternalHandler用于Msg从工作线程 -> 主线程.  

### AsyncTask.execute(10)
sDefaultExecutor default = SERIAL_EXECUTOR:一个顺序执行的线程池，内部实现有一个任务队列。=> 默认串行

```
@MainThread
public final AsyncTask<Params, Progress, Result> execute(Params... params) {
    return executeOnExecutor(sDefaultExecutor, params);
}
```

```
private static volatile Executor sDefaultExecutor = SERIAL_EXECUTOR;
```

```
private static class SerialExecutor implements Executor {
        final ArrayDeque<Runnable> mTasks = new ArrayDeque<Runnable>();// ArrayDeque =任务队列
        Runnable mActive;

        public synchronized void execute(final Runnable r) {
            mTasks.offer(new Runnable() { // Runnable -> 队列尾部
                public void run() {
                    try {
                        r.run();
                    } finally {
                        scheduleNext();
                    }
                }
            });
            if (mActive == null) { // If 没有执行任何一个 Runnable，则第一个 Runnable
                scheduleNext();
            }
        }

        protected synchronized void scheduleNext() {
            if ((mActive = mTasks.poll()) != null) {//  从Queue中取得一个 Runnable 来执行
                THREAD_POOL_EXECUTOR.execute(mActive);
            }
        }
    }
```
### `onProgressUpdate()`
```
@WorkerThread
protected final void publishProgress(Progress... values) {
    if (!isCancelled()) {
        getHandler().obtainMessage(MESSAGE_POST_PROGRESS,
                new AsyncTaskResult<Progress>(this, values)).sendToTarget();
    }
}
```


```
private static Handler getMainHandler() {
        synchronized (AsyncTask.class) {
            if (sHandler == null) {
                sHandler = new InternalHandler(Looper.getMainLooper());
            }
            return sHandler;
        }
    }
```

```
private static class InternalHandler extends Handler {
        public InternalHandler(Looper looper) {
            super(looper);
        }

        @SuppressWarnings({"unchecked", "RawUseOfParameterizedType"})
        @Override
        public void handleMessage(Message msg) {
            AsyncTaskResult<?> result = (AsyncTaskResult<?>) msg.obj;
            switch (msg.what) {
                case MESSAGE_POST_RESULT:
                    // There is only one result
                    result.mTask.finish(result.mData[0]);
                    break;
                case MESSAGE_POST_PROGRESS:
                    result.mTask.onProgressUpdate(result.mData);
                    break;
            }
        }
    }
```

### WorkerRunnable mWorker
```java
 mWorker = new WorkerRunnable<Params, Result>() {
    public Result call() throws Exception {
       ...
        result = doInBackground(mParams); // => doInBackground
        ...
        return result;
        }
    };
```

# QA
## QA:结果丢失
在屏幕旋转等造成Activity重新创建时AsyncTask数据丢失的问题。  
当Activity销毁并创新创建后，还在运行的AsyncTask会持有一个Activity的非法引用即之前的Activity实例。导致onPostExecute()没有任何作用。

## QA:串行? 并行？
- Android < 1.6,串行
- Android [1.6, v2.3],并行
- Android [3.0, Current],串行

# PO
## PO:Stop AsyncTask if not need at all.
Step1:
`AsyncTask.cancel(true)`

Step2:Check if `isCancelled()` in `doInBackground() `
```

@Override
protected Long doInBackground(Integer... params) {
    ...
    if (isCancelled()) {
        return result;
    }
    ...
    return result;
}
```

- If only Step1,  can not stop, still continue，直到执行结束，才invoke `onCancelled`.
- If Step1 + step2, 立刻提前结束，invoke `onCancelled`.

## PO：[内存泄露]Non-static inner classes leaks might occur.  AsyncTask class should be static / out-class.

# TBD
## TBD:`AsyncTask<Params, Progress, Result>`中 Params是什么类型?

# Refs
- https://blog.csdn.net/ly502541243/article/details/52329861
- https://www.jianshu.com/p/817a34a5f200
- https://droidyue.com/blog/2014/11/08/bad-smell-of-asynctask-in-android/