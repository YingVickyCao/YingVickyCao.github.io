# Android Errors

# 1 ERROR: gradle sync error

```
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights
```

Fix:

`--stacktrace --info --debug` , then Gradle task tree ->run agian

# 2 ERROR: gradle sysnc error, `AndroidJUnit4 is Depressed'

```
AndroidJUnit4 is Depressed. use androidx.test.ext.junit.runners.AndroidJUnit4 instead.
```

Fix:

```groovy
androidTestImplementation 'androidx.test:runner:1.2.0'
->
androidTestImplementation 'androidx.test.ext:junit:1.1.1'

androidx.test.runner.AndroidJUnit4;
->
androidx.test.ext.junit.runners.AndroidJUnit4
```

# 3 ERROR： `can't create handler inside thread that has not called Looper.prepare()`, and page is empty.

Reason: In Activity onCreate(), one Dialog is showd in RxJava2 thread ,causing code RxJava2-onError, so UI is not inited.

[TestCase1.java](https://gitee.com/YingVickyCao/AndroidAboutDemos/blob/master/soruce/AndroidLibs/RxJava2/app/src/main/java/com/hades/android/example/rxjava2/_subscribeOn_vs_observeOn/TestCase1.java)
