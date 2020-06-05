# Lint

<h1 id="run_lint">1 Run lint</h1>

https://developer.android.google.cn/studio/write/lint.html

- Android Studio -> Analyze > Inspect Code

- Run the lint task for project

```
./gradlew lint
```

- Run the lint task for only a specific build variant

```
gradlew lintDebug
```

- Run lint using the standalone tool

```
# android_sdk/tools/lint
$ lint project

# MissingPrefix:only scan for XML attributes that are missing the Android namespace prefix
$ lint --check MissingPrefix myproject

$ lint --help
```

# [2 Improve code inspection with annotations](/doc/android/libs/lib_support-annotations.md)

# 3 Tip: App is not indexable by Google Search; consider adding at least one Activity with an ACTION-VIEW intent filter. See issue explanation for more details.

Fix:

```
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

->

```
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

