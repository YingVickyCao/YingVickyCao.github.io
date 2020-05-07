# Annotations Support Library

- Annotations allow you to provide hints to code inspections tools like Lint, to help detect these more subtle code problems.

# 1 Add annotations to your project

https://developer.android.google.cn/reference/android/support/annotation/package-summary.html

- appcompat library already depends on the annotations library

```
implementation 'com.android.support:appcompat-v7:28.0.0'
/
implementation 'com.android.support:support-annotations:28.0.0'
```

```
implementation 'androidx.appcompat:appcompat:1.1.0'
/
implementation 'androidx.annotation:annotation:1.1.0'
```

# [2 Run code inspections](/doc/tools/sdk/lint/Lint.md#run_lint)

# 3 Annotations

## NonNull

@NonNull:indicates a variable, parameter, or return value that cannot be null.  
if null, generates a warning indicating a non-null conflict.

## Nullable

@Nullable：indicates a variable, parameter, or return value that can be null.
when ref @Nullable method, must add first checking if the result is null, or generates a nullness warning.

## Resource annotations
