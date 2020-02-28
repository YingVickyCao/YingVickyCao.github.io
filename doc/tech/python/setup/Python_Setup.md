# Python Setup

在不同的操作系统中，安装 Python 存在细微的差别。

<h1 id='check_python_version'>1 Check Python verson</h1>

```
$ python --version
Python 3.7.4
```

```
# Python 3.7.4
# exit() / Ctrl + D
$ python
Python 3.7.4 (default, Aug 13 2019, 15:17:50)
[Clang 4.0.1 (tags/RELEASE_401/final)] :: Anaconda, Inc. on darwin
Type "help", "copyright", "credits" or "license" for more information.
```

```
# Python 3.7 version,与 MAC OS 自带 python 版本不同。

$ type -a python

# python 3.7.4
python is /Users/hades/opt/anaconda3/bin/python

# Python 2.7.10 (default installed in macOS )
# After Install Homebrew,  Python 2.7.10 -> Python 3.7.5
python is /usr/bin/python
```

```
# python-3.7.5
# python is /usr/bin/python
/usr/local/Cellar/python/3.7.5/bin/python3
/usr/local/bin/python3
/usr/local/lib/python3.7/site-packages
/usr/local/lib/python3.7/pkgconfig
```

```
$ cd /usr/local/bin/
$ ls -l
lrwxr-xr-x  1 hades  admin  31 Dec 10 09:40 pip3 -> ../Cellar/python/3.7.5/bin/pip3
lrwxr-xr-x  1 hades  admin  33 Dec 10 09:40 pip3.7 -> ../Cellar/python/3.7.5/bin/pip3.7
lrwxr-xr-x  1 hades  admin  33 Dec 10 09:40 pydoc3 -> ../Cellar/python/3.7.5/bin/pydoc3
lrwxr-xr-x  1 hades  admin  35 Dec 10 09:40 pydoc3.7 -> ../Cellar/python/3.7.5/bin/pydoc3.7
lrwxr-xr-x  1 hades  admin  34 Dec 10 09:40 python3 -> ../Cellar/python/3.7.5/bin/python3
lrwxr-xr-x  1 hades  admin  41 Dec 10 09:40 python3-config -> ../Cellar/python/3.7.5/bin/python3-config
lrwxr-xr-x  1 hades  admin  36 Dec 10 09:40 python3.7 -> ../Cellar/python/3.7.5/bin/python3.7
lrwxr-xr-x  1 hades  admin  43 Dec 10 09:40 python3.7-config -> ../Cellar/python/3.7.5/bin/python3.7-config
lrwxr-xr-x  1 hades  admin  37 Dec 10 09:40 python3.7m -> ../Cellar/python/3.7.5/bin/python3.7m
lrwxr-xr-x  1 hades  admin  44 Dec 10 09:40 python3.7m-config -> ../Cellar/python/3.7.5/bin/python3.7m-config
```

# 2 Install Python

## Linux

## macOS

https://www.python.org/downloads/

`.pkg` / Use Homebrew to install Python

## Windows

Check `Add Python to PATH`

# 3 编辑器

- IDLE  
  IDLE 是 Python 的默认编辑器
- Emacs
- Vim
- SublimeText
- VSCode
- PyCharm
- Geany

# 4 解释器

python，也就是 Python 解释器 。  
选择解释器，就是指定具体的 python 版本 。
Python 解释器将代码转换为机器代码。  
安装多个版本的 Python，并且该项目选择一个。以后可以根据需要，为执行指定另一个解释器。
运行时，Python 解释器读取整个程序，确定其中每个单词的含义 。

# 5 创建虚拟环境

管理依赖库的版本。
为每个项目
Pythonic 解决方案之一是 virtualenvs（缩写为 venv）。Virtualenvs 可帮助您将不同项目的依赖关系分开。虽然在这个项目中没有使用任何依赖项，但是如果您希望将来添加依赖项，那么为您创建的每个新项目创建 virtualenv 都是最佳的。

# 6 Run Python from Command

```
# cd
# chmod a+x main.py
$ python main.py
This is a example project for python
```
