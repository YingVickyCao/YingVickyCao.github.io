# Visual Studio Code

# 1. Install live-reload html page extensions

```
1. npm init // package.json
2. npm install -g browser-sync
3. browser-sync -v
4. browser-sync start --server --files "**/*.html" // Watching current folder html pages
```

[browser-sync installation has error](/doc/tools/npm/npm_FAQ.md)

原理：  
LiveReload 的原理是：  
是在本地启一个 WebSocket Server，然后浏览器插件往页面注入脚本，尝试让浏览器连接 localhost 的 35729 端口。当发现本地文件有变化的时候，就发送信息给浏览器，让浏览器刷新。Mac 下的所有浏览器都支持 WebSocket.

https://hepeng.net/2012/03/29/livereload/

该插件与 LiveReload 插件类似。

# 2. vsCode 设置行尾

Search eol -> `Files: Eol` = `\r\n`

- 每行结尾

```
Unix = \n = LF
Window = \r\n = CRLF`
Mac OS = \r
```

- `\r` = 回车符 CR,carriage return = return = 使光标到行首= 十进制 ASCII 代码是 13, 十六进制代码为 0x0D
- `\n` = 换行 LF,line feed = newline =使光标下移一格 = ASCII 代码是 10, 十六制为 0x0A
- `\r\n` = 回车+换行 CR/LF = `^M$`
  Dos 和 windows 采用回车+换行 CR/LF 表示下一行,即^M$（$不是换行符的表示，换行符没有表示出来，\$是文本结束 EOF 的表示）
- Unix/Mac 系统下的文件在 Windows 里打开，所有文字会变成一行；Windows 里的文件在 Unix 下打开，在每行的结尾会多车一个^M 字符。
-

# 3. vsCode 设置自动换行

Search wordWrap -> `Editor: Word Wrap` = on

# 4 VS Code 历史版本

- https://github.com/Microsoft/vscode/releases
- https://code.visualstudio.com/updates/v1_37

# 5 Plugin for ReactNative

Code 自带功能：带输入提示功能；点击跳转到引用。 不需要安装插件。

- ToDo Highlight
- Todo Tree
- Open in browser
- React Native tools：Debug
- Live Reload：auto refresh html
- ESLint：代码质量工具(确保没有未使用的变量、没有全局变量，等)
- Beautiffy：格式化代码
- Prettier - Code formatter：代码格式工具
- Color Highlight：Color 设置显示颜色
- Highlight Matching Tag  
  https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag

## Prettier - Code formatter

https://www.jianshu.com/p/9150c35625f2

### Prettier - Code formatter

- 安装 Prettier - Code formatter

plugin

```
npm install prettier --save-dev

```

- 配置 package.json

```
"scripts": {
    "prettier": "prettier --write \"./src/**/*.{js,ts,tsx}\"",
    "check-formart": "prettier --check \"./src/**/*.{js,ts,tsx}\""
}

```

- 配置 `.prettierrc`

```
{
    "printWidth": 240,
    "tabWidth": 2,
    "useTabs": true,
    "semi": true,
    "singleQuote": true,
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "endOfLine": "crlf",
    "htmlWhitespaceSensitivity": "ignore",
    "jsxBracketSameLine": false,
    "jsxSingleQuote": true
}
```

[All config list ](https://yingvickycao.github.io/doc/tools/prettierrc.txt)

- run or check formart with prettier

```
npm run prettier
npm run check-formart
```

- code.js

```
/**
@formart
/
@prettier
*/
```

### 自动保存并格式化代码

```
"editor.formatOnSave": true
"files.autoSave": "afterDelay"
```

### 使用 ESLint 运行 Prettier

使用 eslint-plugin-prettier 来添加 Prettier 作为 ESLint 的规则配置。

- 安装 eslint-plugin-prettier

```
npm install --save-dev eslint-plugin-prettier
```

- 配置 `.eslintrc.js`

```
  module.exports = {
  plugins: ['prettier'],
  rules: {
  'prettier/prettier': 'error'
  }
  };

```

### eslintrc 配置的 rules 与 Prettier 配置的 rules 冲突 ？

- 安装 npm install --save-dev eslint-config-prettier

```
npm install --save-dev eslint-config-prettier
```

- 配置 `.eslintrc.js`

```
module.exports = {
	extends: ['prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error'
	}
};
```

# 6. vscode mac 下无法跳转到引用,不同自动提示输入

Code 自带功能：带输入提示功能；点击跳转到引用。不需要安装插件。
vs code 1.42.1  
Fix:
Fully uninstall code, then start

```

Quit vscode first
Step1 remove vscode from application

Step2 remove settings and configs
// Stable version
sudo rm -rf $HOME/Library/Application\ Support/Code
// Insider version
sudo rm -rf $HOME/Library/Application\ Support/Code\ -\ Insiders/

Step3 remove all the extensions
// Stable version
sudo rm -rf $HOME/.vscode
// if you're using insider*
sudo rm -rf $HOME/.vscode-insiders/

Step4 download vscode and install code again

```

## 7. 打开文件自动停到窗口？

斜体：预览模式  
双击或编辑保存

```
workbench.editor.enablePreview:false
```

Ref: https://www.cnblogs.com/smzd/p/11039931.html
