# React Native about errors

- 1 Error: bundling failed: Error: Unable to resolve module `./redux/store/index`

Reason:  
always remener deleted old code

Fix:

```
react-native start --reset-cache
```

- 2 8.0 Shake 时崩溃

https://www.jianshu.com/p/2d78943a3f39

- 3 const can only be used in a .ts file.ts(8009)

Class in -> out

- 4 Fragment detect Command+M action to not show RN DevMenu

Actiivty

```
private IOnKeyUp mOnKeyUp;

@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    // Android studio Emulator, Ctrl+M ->  dev menu
    Log.d(TAG, "onKeyUp: ");
    return null != mOnKeyUp && mOnKeyUp.onKeyUp(keyCode, event) || super.onKeyUp(keyCode, event);
}

public void setOnKeyUp(@Nullable IOnKeyUp onKeyUp) {
    mOnKeyUp = onKeyUp;
}
```

Fragment

```
@Override
public boolean onKeyUp(int keyCode, KeyEvent event) {
    // Android studio Emulator, Ctrl+M ->  dev menu
    Log.d(TAG, "onKeyUp: ");
    if (keyCode == KeyEvent.KEYCODE_MENU && null != mReactInstanceManager) {
        Log.d(TAG, "onKeyUp: Menu");
        mReactInstanceManager.showDevOptionsDialog();
        return true;
    }
    return false;
}

@Override
public void onAttach(Context context) {
    super.onAttach(context);
    if (context instanceof MainActivity) {
        ((MainActivity) context).setOnKeyUp(this);
    }
}

@Override
public void onDetach() {
    super.onDetach();
    Context context = getActivity();
    if (context instanceof MainActivity) {
        ((MainActivity) context).setOnKeyUp(null);
    }
}
```

- 调试 app 时出现莫名红屏?  
   Reason:  
   `console.log()`记录日志对 RN 应用的性能有影响。  
   查看日志记录是否太多。在生命周期函数中使用 console.log()容易引发问题。
  Fix:  
   ① 使用高配置的手机进行调试，手机 CPU 速度越快，就不会出这个问题。  
   ② 只打印必须的 console.log()  
   ③release 版本，不会自动关闭 consolog.log,因此在应用正式发布前，把代码中不需要的 consolog.log 删除或注释掉

- 5 ERROR: VS Code tip: `Parsing error: Unexpected token <eslint`

**Reason**:  
Eslint can not recognize JSX

**Fix**:

```ini
npm install --save-dev eslint-plugin-jsx-a11y
npm install --save-dev eslint-plugin-react
npm install --save-dev eslint-plugin-react-native
```

```ini
# .eslintrc.js
module.exports = {
	extends: ['pretier'],
	plugins: ['react', 'jsx-a11y'],
    // plugins: ['react','react-native', 'jsx-a11y'],
	rules: {
		'react/jsx-uses-react': 'error',
		'jsx-a11y/no-statc-element-interactions': 'warn'
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	}
};
```

- 6 ERROR: VS Code tip: `Parsing error: Unexpected token =eslint`

```ini
npm install babel-eslint --save-dev

# .eslintrc.js
{
  parser: 'babel-eslint'
}
```

- 7 ERROR: `Insert`␍`eslint(prettier/prettier)`

```ini
# .prettierrc
"endOfLine": "auto"
```

- 8 Error: `error Unexpected console statement no-console`

Fix:

```ini
# .eslintrc.js
rules: {
    'no-console': 'off',  // 禁用no-console规则
},
```

- 9 Error: `error 'console' is not defined no-undef`

这是因为 JavaScript 有很多种运行环境，比如常见的有浏览器和 Node.js，另外还有很多软件系统使用 JavaScript 作为其脚本引擎，比如 PostgreSQL 就支持使用 JavaScript 来编写存储引擎，而这些运行环境可能并不存在 console 这个对象。

| 对象         | 浏览器环境 | Node.js 环境 |
| ------------ | ---------- | ------------ |
| window 对象  | Have       | Not have     |
| process 对象 | Not have   | Have         |
| console 对象 | Have       | Have         |

Fix:

```
# .eslintrc.js
 env: {
    node: true,  // 指定程序的目标环境为node
 }
```

- 10 ERROR(RN-0.60.5):libjscexecutor.so,libhermes.so

```
E/SoLoader: couldn't find DSO to load: libjscexecutor.so
E/SoLoader: couldn't find DSO to load: libhermes.so
```

- 11 WARN: `# Debug app yellow warn:Remote debugger is in a background tab which may cause apps to perform slowly . Fix this by foregrounding the tab (or opening it in a separate window).`

Fix:  
把 chrome 的 debug Tab 页保持最前，浏览器窗口不要最小化.

- 12 couldn't find DSO to load: libhermes.so

```
+ hermes-debug.aar
+ hermes-release.aar
```

- 13 couldn't find DSO to load: libjscexecutor.so caused by: dlopen failed: library "libjsc.so" not found result: 0

```
+ react-native-0.64.1.aar having "libjscexecutor.so"
+ android-jsc.aar having "libjsc.so"
```

- 14 Failed to resolve: com.facebook.fbjni:fbjni-java-only:0.0.3  
   Failed to resolve: com.facebook.yoga:proguard-annotations:1.14.1

```
// Althoug is depressed, but these libs have not migreated to mavenCenter yet.
+ jcenter()
```
