# npm

- Search `.npmrc` to readme about files.

# 1 Init

- Init package.json

```
npm init   // package.json
```

# 2 Install uninstall

## 全局安装

```
npm install -g package_name
npm install -g package_name@version
```

## 安装到当前目录

默认安装在当前目录 node_modules  
--save = 添加到 package.json

```
# 生产环境：JQuery
# defaul="dependencies"
# npm install --save = npm install -S
npm install --save redux
```

```
# 开发环境：gulp，webpack
# -dev="devDependencies"
# npm install --save-dev = npm install -D
npm install --save-dev eslint
```

# 3 uninstall package

```
# 删除全局安装的依赖包
npm uninstall -g package_name

# 删除当前project安装的依赖包
npm uninstall package_name
```

# 4 conflig and cache

```ini
npm config ls
```

```ini
// See all configs
npm config ls -l

// default cache dir when npm install -g
cache = "/Users/account/.npm"

// default install dir when npm install -g
prefix = "/usr/local"
```

- Change prefix and cache setting

```ini
npm config set prefix 'new_prefix_path'
npm config set cache 'new_cache_path'
```

# 5 List package version

- 查看全局安装的依赖包的版本号

```
npm list -g
```

- 查看项目所在目录下载的依赖包

```
// 方法1:
npm list > npm.txt		// Windows。 命令行保存信息比较少
npm list				// Mac
// 方法2: 打开项目目录的package.json文件
```

# 6 Switch responsity

```ini
// Set registry and dist
npm config set registry http://registry.npmjs.org --global
npm config set disturl https://npm.taobao.org/dist --global

npm config set registry http://registry.npmjs.org
npm config set disturl https://npm.taobao.org/dist

// Remove registry and dist
npm config delete registry --global
npm config delete disturl --global

# .npmrc (current account dir)

# Default
# registry = 'https://registry.npmjs.org/'
# registry = 'https://registry.npm.taobao.org/'
```
