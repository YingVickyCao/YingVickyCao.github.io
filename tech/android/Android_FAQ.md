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

# 4 ERROR: `CLEARTEXT communication to "XXX domain" not permitted by network`

```
NetworkSecurityConfig: No Network Security Config specified, using platform default
    System.out: (HTTPLog)-Static: isSBSettingEnabled false
    java.io.IOException: Cleartext HTTP traffic to XXX not permitted
```

Reason :  
Android >=9(28) 网络访问安全策略升级，限制了非加密的流量请求。  
Android9，默认不支持 http，要使用 https.

Fix:

Way 1 : targetSdkVersion 27

Way 2 :Explicitly saying that accept clear text for some host

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config">
</application>
```

```xml
<!-- res/xml/network_security_config.xml  -->
<?xml version="1.0" encoding="utf-8"?>
    <network-security-config>
        <domain-config cleartextTrafficPermitted="true">
            <domain includeSubdomains="true">localhost</domain>
        </domain-config>
    </network-security-config>
</xml>
```

OR

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

Way 3 : app and server : http -> https (TBD)

Way 4 : Accept certificates from given Certificate Authority

```xml
<!-- res/xml/network_security_config.xml -->

<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <debug-overrides>
        <trust-anchors>
        <!-- /raw/debug_cert.dem -->
            <certificates src="@raw/debug_cert"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
```

https://blog.csdn.net/myhkhk/article/details/125978910

# 5 java.net.ConnectException: Failed to connect to localhost/127.0.0.1:7777

Reason:
Way 1 ：  
 模拟器默认把 127.0.0.1 和 localhost 当做本身了。  
 在模拟器上用 10.0.2.2 代替 127.0.0.1 和 localhost。

Way 2 ： 在局域网环境可以用 192.168.0.x 或者 192.168.1.x 连接本机。

Fix：  
 10.0.2.2

Refs:  
 http://www.douevencode.com/articles/2018-07/cleartext-communication-not-permitted/  
 https://blog.csdn.net/cpcpcp123/article/details/108063189  
 https://www.cnblogs.com/rainhome/p/5325686.html

# [7] connect failed: ENETUNREACH (Network is unreachable)

```
ERROR: java.net.ConnectException: Failed to connect to /59.110.162.30:80
    Caused by: java.net.ConnectException: failed to connect to /59.110.162.30 (port 80) from /:: (port 0) after 15000ms: connect failed: ENETUNREACH (Network is unreachable)
    Caused by: android.system.ErrnoException: connect failed: ENETUNREACH (Network is unreachable)
```

Reason :
http://59.110.162.30/app_updater_version.json 在 Chrome 可以访问。  
原因是 Android 13(33) Emulator 没有到达路由。

Fix：
换成 Android 11(30)连接成功
Ref： https://blog.csdn.net/wangzhongshun/article/details/98783264

# 【8】connect failed: EHOSTUNREACH (No route to host)

Fix：
重启手机
https://blog.csdn.net/u011400289/article/details/50588360

# 6 `level-list XmlPullParserException`

```
Caused by: android.content.res.Resources$NotFoundException: File res/drawable/level listXXX.xmlfrom drawable resource ID #0x7f08007e
Caused by: org.xmlpull.v1.XmlPullParserException: Binary XML file line #3: <item> tag requires a 'drawable' attribute or child tag defining a drawable
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<level-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:drawable="?attr/star_off"
        android:maxLevel="0" />

    <item
        android:drawable="?attr/star_on"
        android:maxLevel="1" />

</level-list>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<level-list xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:drawable="?attr/color1"
        android:maxLevel="0" />

    <item
        android:drawable="?attr/color2"
        android:maxLevel="1" />

</level-list>
```

原因：

level-list / selector xml drawable 中，android:drawable 不能引用一个 attr drawable。

Fix:

Way 1 :使用 bitmap 包装 attr drawable，然后再使用。

```xml
<!-- drawable_level_list_1_2.xml -->
<?xml version="1.0" encoding="utf-8"?>
<level-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:drawable="@drawable/drawable_star_off"
        android:maxLevel="0" />

    <item
        android:drawable="@drawable/drawable_star_on"
        android:maxLevel="1" />

</level-list>
```

```xml
<!-- drawable_star_off.xml -->
<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="?attr/star_off" />

<!-- drawable_star_on.xml -->
...
```

```xml
android:src="@drawable/drawable_level_list_1_2"
/
android:background
```

Way 2:使用 attr 引用 level-list drawable. (Recommended)

```xml
<!-- drawable_level_list_1_1.xml -->
<?xml version="1.0" encoding="utf-8"?>
<level-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:drawable="@android:drawable/star_big_off"
        android:maxLevel="0" />

    <item
        android:drawable="@android:drawable/star_big_on"
        android:maxLevel="1" />

</level-list>
```

```xml
<!-- theme -->
<item name="levelListDrawable">@drawable/drawable_level_list_1_1</item>
```

```xml
android:src="?attr/levelListDrawable"
/
android:background
```

# 7 java.lang.ClassCastException: androidx.appcompat.widget.AppCompatTextView cannot be cast to android.widget.TextClock

# 9 java.lang.IllegalStateException: Underflow in restore - more restores than saves

restore()次数大于 save() 次数
<br/>

# [10] 快速多次 show dialog fragment，app crashed：java.lang.IllegalStateException: Fragment already added.

TestDialogActivity.java  
 Reason :  
 同一个 Fragment 已经 added (addFragment)，当再次 added 时，就会 发生这种错误。  
 https://www.jianshu.com/p/1068f9f75fe4

Log :

```
D/TestDialogActivity: fix_IllegalStateException_FragmentAlreadyAdded: new TestBottomSheetDialogFragment
D/TestDialogActivity: fix_IllegalStateException_FragmentAlreadyAdded: show
D/TestDialogActivity: fix_IllegalStateException_FragmentAlreadyAdded: TestBottomSheetDialogFragment.setData
D/TestDialogActivity: fix_IllegalStateException_FragmentAlreadyAdded: show
D/TestBottomSheetDialogFragment: onCreate:
D/TestBottomSheetDialogFragment: onCreateDialog:
I/Dialog: mIsSamsungBasicInteraction = false, isMetaDataInActivity = false
D/TestBottomSheetDialogFragment: onCreateView:
I/DecorView: [INFO] isPopOver=false, config=false
I/DecorView: updateCaptionType >> DecorView@e01ae21[], isFloating=true, isApplication=true, hasWindowDecorCaption=false, hasWindowControllerCallback=false
D/DecorView: setCaptionType = 0, this = DecorView@e01ae21[]
D/InputTransport: Input channel constructed: '734afd ', fd=85
I/ViewRootImpl@8efc2cc[TestDialogActivity]: setView = com.android.internal.policy.DecorView@e01ae21 TM=true
D/TestBottomSheetDialogFragment: onStart:
D/TestBottomSheetDialogFragment: onResume:
D/AndroidRuntime: Shutting down VM


    --------- beginning of crash
2022-05-25 17:24:42.962 3836-3836/com.hades.example.android E/AndroidRuntime: FATAL EXCEPTION: main
    Process: com.hades.example.android, PID: 3836
    java.lang.IllegalStateException: Fragment already added: TestBottomSheetDialogFragment{3e16191} (d760daa5-390e-42a4-863b-eb7723a5adec tag=TestBottomSheetDialogFragment)
        at androidx.fragment.app.FragmentStore.addFragment(FragmentStore.java:91)
        at androidx.fragment.app.FragmentManager.addFragment(FragmentManager.java:1713)
        at androidx.fragment.app.BackStackRecord.executeOps(BackStackRecord.java:415)
        at androidx.fragment.app.FragmentManager.executeOps(FragmentManager.java:2404)
        at androidx.fragment.app.FragmentManager.executeOpsTogether(FragmentManager.java:2162)
        at androidx.fragment.app.FragmentManager.removeRedundantOperationsAndExecute(FragmentManager.java:2100)
        at androidx.fragment.app.FragmentManager.execPendingActions(FragmentManager.java:2002)
        at androidx.fragment.app.FragmentManager$5.run(FragmentManager.java:524)
        at android.os.Handler.handleCallback(Handler.java:938)
        at android.os.Handler.dispatchMessage(Handler.java:99)
        at android.os.Looper.loop(Looper.java:246)
        at android.app.ActivityThread.main(ActivityThread.java:8633)
        at java.lang.reflect.Method.invoke(Native Method)
        at com.android.internal.os.RuntimeInit$MethodAndArgsCaller.run(RuntimeInit.java:602)
        at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:1130)
2022-05-25 17:24:43.009 3836-3836/com.hades.example.android I/Process: Sending signal. PID: 3836 SIG: 9

```

Fix :
首先：防止 button 重复点击。
其次：判断当同一个数据时，dialog fragment 是否已经 showing/要重复 show ？If Yes，不继续执行。否则，先 remove 再 show()

扩展：  
如果是 Fragment，不是 DialogFragment，如何处理？  
Fix：
判断 null == findFragmentByTag ？Yes，则 add by tag。否则，仅仅 fragment 仅设置，不用重新 add。

```java
fm.findFragmentByTag( tag )
ft.add( R.id.main_content, fragment, tag );
```

# [11] `layer-list Drawable`app crash,`Caused by: org.xmlpull.v1.XmlPullParserException: Binary XML file line #18: <bitmap> requires a valid src attribute`

```xml
<!-- drawable_layer_list_4_bitmap.xml -->
<bitmap
      android:gravity="center"
      android:src="@drawable/ic_svg_back" />
```

```xml
<!-- ic_svg_back.xml -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
  android:width="24dp"
  android:height="24dp"
  android:viewportWidth="24"
  android:viewportHeight="24">
  <path
      android:fillColor="@android:color/white"
      android:pathData="M17.77,3.77l-1.77,-1.77l-10,10l10,10l1.77,-1.77l-8.23,-8.23z" />
</vector>
```

Fix：  
 `<bitmap>`的 src 不允许为 xml drawables，原因可能是为了避免循环引用

<br/>

# [12] AnimatedVectorsDrawable error: java.lang.IllegalArgumentException: Property: rotation is not supported for FullPath

```xml
<!-- ic_svg_pause.xml -->
<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="100dp"
    android:height="100dp"
    android:viewportWidth="10"
    android:viewportHeight="10">


    <group
        android:name="pause_group"
        android:pivotX="5"
        android:pivotY="5">
        <path
            android:name="pause"
            android:fillColor="@android:color/holo_green_dark"
            android:pathData="M 2,2 L 2,8 L4,8 L4,2z M 6,2 L6,8 L8,8 L8,2z" />
    </group>
</vector>
```

```xml
<!-- ic_svg_anim_vector_of_pause_2.xml  -->
 <?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_svg_pause">
    <target
        android:name="pause"
        android:animation="@animator/anim_pause_2" />
</animated-vector>
```

Fix :
AnimatedVectorsDrawable 使用 属性动画 操作 rotation 时，target 使用的是 group 的 name，不能是 path 的 name。

```xml
<!-- ic_svg_anim_vector_of_pause_2.xml  -->
 <?xml version="1.0" encoding="utf-8"?>
<animated-vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:drawable="@drawable/ic_svg_pause">
    <target
        android:name="pause_group"
        android:animation="@animator/anim_pause_2" />
</animated-vector>
```

<br/>

# [13] ColorDrawable 作为 textColor 时报错：

```
Process: com.hades.example.android, PID: 8286
android.view.InflateException: Binary XML file line #19 in com.hades.example.android:layout/res_drawable_color: Binary XML file line #19 in com.hades.example.android:layout/res_drawable_color: Error inflating class TextView
Caused by: android.view.InflateException: Binary XML file line #19 in com.hades.example.android:layout/res_drawable_color: Error inflating class TextView
Caused by: android.content.res.Resources$NotFoundException: Can't find ColorStateList from drawable resource ID #0x7f0801c2
```

```xml
 <TextView
        style="@style/tv"
        android:layout_height="@dimen/size_100"
        android:layout_alignParentBottom="true"
        android:text="Use ColorDrawable as text color"
        android:textColor="@drawable/drawable_color_red" />
```

```xml
<!-- res/drawable/drawable_color_red.xml -->
<?xml version="1.0" encoding="utf-8"?>
<color xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@android:color/holo_red_dark" />
```

Fix :  
ColorDrawable 只能用作 background 或 src 出现，不能用作 text color。  
res/color/中的 color `<selector>`文件，可以用做 text color，或 background 或 src 。

# [14] ERROR: Caused by java.lang.RuntimeException, Parcel android.os.Parcel@1bf4a17f: Unmarshalling unknown type code 717174 at offset 500

Reason : Read 和 write 的顺序 should 一致

```java
// InitBean.java
public class InitBean implements Parcelable {
    private boolean flag;
    private String uniqueKey;

    // Parcelable, START
    protected InitBean(Parcel in) {
        flag = in.readByte() != 0;
        // ERROR: Caused by java.lang.RuntimeException, Parcel android.os.Parcel@1bf4a17f: Unmarshalling unknown type code 717174 at offset 500
//        if (in.readByte() != 0) {
//            uniqueKey = in.readString();
//        }
        // Reason: Read （InitBean(Parcel in)） 和 write （writeToParcel）的顺序should 一致
        // Fix:
        if (flag){
            uniqueKey = in.readString();
        }
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeByte((byte) (flag ? 1 : 0));
        dest.writeString(uniqueKey);
    }
    // Parcelable,END
}
```

# [15] requestFeature() must be called before adding content

```
public class UpdateVersionDialog extends DialogFragment:

FATAL EXCEPTION: main
  Process: com.hades.example.android, PID: 13784
  android.util.AndroidRuntimeException: requestFeature() must be called before adding content
    at com.android.internal.policy.PhoneWindow.requestFeature(PhoneWindow.java:388)
    at android.app.Dialog.requestWindowFeature(Dialog.java:1205)
    at com.hades.example.android._case.apk_upgrade.UpdateVersionDialog.onViewCreated(UpdateVersionDialog.java:68)
```

```java
public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
    super.onViewCreated(view, savedInstanceState);
    getDialog().requestWindowFeature(Window.FEATURE_NO_TITLE);
    getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); // 不需要有背景
}
```

Fix:

```java
// onCreateView / onCreateDialog, 二选一
@Nullable
@Override
public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
    getDialog().requestWindowFeature(Window.FEATURE_NO_TITLE); // 不要有标题。
    getDialog().getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); // 不需要有背景。此处的背景为透明

    View view = inflater.inflate(R.layout.app_version_upgrade_dialog, container, false);
    ...
    return view;
}
```

# [16] build error: Duplicate `kotlin-stdlib`, kotlin-stdlib-jdk7,`kotlin-stdlib-jdk7`

[Android Studio Electric Eel | 2022.1.1]

```

Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.internal.jdk8.JDK8PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.io.path.ExperimentalPathApi found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.io.path.PathRelativizer found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.io.path.PathsKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.io.path.PathsKt**PathReadWriteKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.io.path.PathsKt**PathUtilsKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.jdk7.AutoCloseableKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk7-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.10)
Duplicate class kotlin.jvm.jdk8.JvmRepeatableKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.random.jdk8.PlatformThreadLocalRandom found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.streams.jdk8.StreamsKt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.streams.jdk8.StreamsKt$asSequence$$inlined$Sequence$1 found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.streams.jdk8.StreamsKt$asSequence$$inlined$Sequence$2 found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.streams.jdk8.StreamsKt$asSequence$$inlined$Sequence$3 found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.streams.jdk8.StreamsKt$asSequence$$inlined$Sequence$4 found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.text.jdk8.RegexExtensionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)
Duplicate class kotlin.time.jdk8.DurationConversionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.0 (org.jetbrains.kotlin:kotlin-stdlib:1.8.0) and jetified-kotlin-stdlib-jdk8-1.6.10 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.10)

Go to the documentation to learn how to Fix dependency resolution errors.

```

Reason:  
when use `kotlin-stdlib`(compiled by 1.8), not needed `kotlin-stdlib-jdk7` and `kotlin-stdlib-jdk8` in gradle any more

`./gradlew :app:dependencies -q --configuration debugRuntimeClasspath`

Fix:
https://juejin.cn/post/7195113801035808823

# [17] Error: `registerForActivityResult`

`java.lang.IllegalStateException: Fragment PermissionsFragment{b17aadc} (0b3ab832-6d7d-431b-8b4d-e51d4ffec16d tag=PermissionTools) is attempting to registerForActivityResult after being created. Fragments must call registerForActivityResult() before they are created (i.e. initialization, onAttach(), or onCreate())`

Fix :
registerForActivityResult on `onCreate`/`onAttach`

```java
ActivityResultLauncher<String[]> mResultLauncher;
RequestPermissionResultCallback mCallback;

@Override
public void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mResultLauncher = registerPermissionsResult();
}

private ActivityResultLauncher<String[]> registerPermissionsResult() {
    return registerForActivityResult(new ActivityResultContracts.RequestMultiplePermissions(), new ActivityResultCallback<Map<String, Boolean>>() {
        @Override
        public void onActivityResult(Map<String, Boolean> permissionsResult) {
            mCallback.checkResult(isAllGranted(permissionsResult));
        }
    });
}


public void requestPermissions(final RequestPermissionResultCallback callback, final String... unrequestedPermissions) {
    if (isPermissionsEmpty(unrequestedPermissions)) {
        log("No permission to request");
        return;
    }
    mCallback = callback;
    mResultLauncher.launch(unrequestedPermissions);
}
```

# [18] Error: `PendingIntent - FLAG_IMMUTABLE/FLAG_MUTABLE`

`java.lang.IllegalArgumentException: com.example.app: Targeting S+ (version 31 and above) requires that one of FLAG_IMMUTABLE or FLAG_MUTABLE be specified when creating a PendingIntent.Strongly consider using FLAG_IMMUTABLE, only use FLAG_MUTABLE if some functionality depends on the PendingIntent being mutable, e.g. if it needs to be used with inline replies or bubbles.`

```java
PendingIntent.getActivity(getActivity(), 0, intent, 0);
```

Fix :

```java
PendingIntent.getActivity(getActivity(), 0, intent, PendingIntent.FLAG_IMMUTABLE)
```

# 19 build error : `android:exported needs to be explicitly specified for element`

```
android:exported needs to be explicitly specified for element <activity#package.DictUserActivity>.
Apps targeting Android 12 and higher are required to specify an explicit value for`android:exported`when the corresponding component has an intent filter defined.
See https://developer.android.com/guide/topics/manifest/activity-element#exported for details.

```

Fix :
when target 12, componet having intent filer adds `android:exported`
