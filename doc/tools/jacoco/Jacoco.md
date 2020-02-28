# Jacoco

https://github.com/YingVickyCao/EnableCodeCoverage

- Jacoco = Java code coverage
- Jacoco = Local Unit Test + Instrumentation Unt Test.  
  But EnableCodeCoverage only for Local Unit Test .

# Usage

- Only module has Local Unit Test, reports dir can be genenated.

```
# app no Local Unit Test
:app:jacocoTestReport
Skipping task ':app:jacocoTestReport' as task onlyIf is false.
:app:jacocoTestReport SKIPPED
```

- First Jacoco B, Then Jacoco A. Or A Jacoco fails.

```
A Module
B Module
A use (B).
```

- interface.java not in code coverage

- Unit Test type

  | Unit Test type           | Dir         | Have config | Support | Coverage report exported                               |
  | ------------------------ | ----------- | ----------- | ------- | ------------------------------------------------------ |
  | Local Unit Test          | test        | Yes         | Support | XML/HTML/CSV, or Jacoco execution data files(`*.exec`) |
  | Instrumentation Unt Test | androidTest | No          | Support | .ac                                                    |

- Build Result

| header 1                     | Local unit test                                                | Instrumented unit test                           |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| Command                      | gradle app:test                                                | gradle app:connectedAndroidTest                  |
| Java build classes           | app/build/intermediates/classes/debug                          | Same                                             |
| Java test bulild classes     | app/build/intermediates/classes/test                           | app/build/intermediates/classes/androidTest      |
| Kotlin build classes         | app/build/tmp/kotlin-classes/debug                             | Same                                             |
| Kotlin test build classes    | app/build/tmp/kotlin-classes/debugUnitTest                     | app/build/tmp/kotlin-classes/debugAndroidTest    |
| Jacoco html report           | app/build/reports/jacoco/jacocoTestReport/html/index.html      | -                                                |
| Jacoco xml report            | app/build/reports/jacoco/jacocoTestReport/jacocoTestReport.xml | -                                                |
| HTML test result files(pass) | app/build/reports/tests                                        | app/build/reports/androidTests/connected/        |
| XML test result filess(pass) | app/build/test-results                                         | app/build/outputs/androidTest-results/connected/ |
| coverage HTML (%)            | app/build/reports/tests                                        | app/build/reports/coverage                       |
| Coverage                     | -                                                              | app/build/outputs/code-coverage/connected/`*.ec` |

- Jacoco reports filter dagger

```
# app/build/reports/jacoco/jacocoTestReport/html/index.html
'**/*Module.*',
 '**/*Module_ProvideStuFactory.*',
 '**/Dagger*Component.*',
 '**/Dagger*.*'
```

Before  
![jacoco_reports_before_filter_dagger](https://yingvickycao.github.io/img/jacoco_reports_before_filter_dagger.jpg)

After  
![jacoco_reports_after_filter_dagger](https://yingvickycao.github.io/img/jacoco_reports_after_filter_dagger.jpg)

# build.gradle

```

# project build.gradle
//apply plugin: "org.sonarqube"

// By default, have Jacoco in android buid system.We have enable to enable it. If want to use specific version, jsut define it.
classpath "org.jacoco:org.jacoco.core:0.8.4"

// When config Jacoco in TeanCity, not need. Run command line, need it.
// classpath "org.sonarsource.scanner.gradle:sonarqube-gradle-plugin:2.8"
```

```
# module build.gradle

# Apply jaccoco for module
apply plugin: 'jacoco'

debug {

        // set true. Instrumentation Unt Test can auto generate coverage result.
        testCoverageEnabled = true
    }
```

## FAQ

## ERROR:`java.lang.NullPointerException`

```
Could not evaluate onlyIf predicate for task ':androidLib:jacocoTestReport'.
> java.lang.NullPointerException (no error message)
```

Fix:

```
In apply plugin: 'com.android.application' / apply plugin: 'com.android.library'

jacocoTestReport + below
classDirectories = files([classDirectories_java, classDirectories_kotlin])
    sourceDirectories = files([sourceDirectories_java])
    additionalSourceDirs = files([sourceDirectories_java])
   // raw coverage data file
    executionData = files(executionData_includes)
```

## ERROR；`at org.jacoco.agent.rt.internal_c13123e.core.`

```
[15:34:02][:androidLib:platformAttrExtractor] :javaLib:testClasses
[15:34:02][:androidLib:platformAttrExtractor] :javaLib:test (1s)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getProbes(RuntimeData.java:148)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.equals(RuntimeData.java:162)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.$jacocoInit(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionData.<init>(ExecutionData.java)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.data.ExecutionDataStore.get(ExecutionDataStore.java:133)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.jacoco.agent.rt.internal_c13123e.core.runtime.RuntimeData.getExecutionData(RuntimeData.java:120)
[15:34:03][:androidLib:platformAttrExtractor] Process 'Gradle Test Executor 2' finished with non-zero exit value 134
[15:34:03][:androidLib:platformAttrExtractor] org.gradle.process.internal.ExecException: Process 'Gradle Test Executor 2' finished with non-zero exit value 134
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.DefaultExecHandle$ExecResultImpl.assertNormalExitValue(DefaultExecHandle.java:389)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.worker.DefaultWorkerProcess.onProcessStop(DefaultWorkerProcess.java:118)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.worker.DefaultWorkerProcess.access$000(DefaultWorkerProcess.java:41)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.worker.DefaultWorkerProcess$1.executionFinished(DefaultWorkerProcess.java:74)
[15:34:03][:androidLib:platformAttrExtractor] 	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
[15:34:03][:androidLib:platformAttrExtractor] 	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
[15:34:03][:androidLib:platformAttrExtractor] 	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
[15:34:03][:androidLib:platformAttrExtractor] 	at java.lang.reflect.Method.invoke(Method.java:498)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.dispatch.ReflectionDispatch.dispatch(ReflectionDispatch.java:35)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.dispatch.ReflectionDispatch.dispatch(ReflectionDispatch.java:24)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.event.AbstractBroadcastDispatch.dispatch(AbstractBroadcastDispatch.java:42)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.event.BroadcastDispatch$SingletonDispatch.dispatch(BroadcastDispatch.java:230)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.event.BroadcastDispatch$SingletonDispatch.dispatch(BroadcastDispatch.java:149)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.event.ListenerBroadcast.dispatch(ListenerBroadcast.java:140)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.event.ListenerBroadcast.dispatch(ListenerBroadcast.java:37)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.dispatch.ProxyDispatchAdapter$DispatchingInvocationHandler.invoke(ProxyDispatchAdapter.java:93)
[15:34:03][:androidLib:platformAttrExtractor] 	at com.sun.proxy.$Proxy105.executionFinished(Unknown Source)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.DefaultExecHandle.setEndStateInfo(DefaultExecHandle.java:207)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.DefaultExecHandle.finished(DefaultExecHandle.java:334)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.ExecHandleRunner.completed(ExecHandleRunner.java:102)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.process.internal.ExecHandleRunner.run(ExecHandleRunner.java:82)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.operations.BuildOperationIdentifierPreservingRunnable.run(BuildOperationIdentifierPreservingRunnable.java:39)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.concurrent.ExecutorPolicy$CatchAndRecordFailures.onExecute(ExecutorPolicy.java:63)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.concurrent.ManagedExecutorImpl$1.run(ManagedExecutorImpl.java:46)
[15:34:03][:androidLib:platformAttrExtractor] 	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
[15:34:03][:androidLib:platformAttrExtractor] 	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
[15:34:03][:androidLib:platformAttrExtractor] 	at org.gradle.internal.concurrent.ThreadFactoryImpl$ManagedThreadRunnable.run(ThreadFactoryImpl.java:55)
[15:34:03][:androidLib:platformAttrExtractor] 	at java.lang.Thread.run(Thread.java:748)

```

Reason:  
一个不同 project 的 jacoco 使用不同版本。

Fix:

```
# project build.gradle
classpath "org.jacoco:org.jacoco.core:0.8.4"
# module build.gradle 不再设置jacoco version
```

# Refs:

- The JaCoCo Plugin https://docs.gradle.org/current/userguide/jacoco_plugin.html
- https://docs.sonarqube.org/display/PLUG/JaCoCo+Plugin
- https://engineering.rallyhealth.com/android/code-coverage/testing/2018/06/04/android-code-coverage.html
- https://www.cnblogs.com/zhizhiyin/p/11493392.html
- Test from the command line https://developer.android.google.cn/studio/test/command-line
