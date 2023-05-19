# Python Setup VSCode Errors

# 1 When Run in VSCode, import module -> `ModuleNotFoundError: No module named 'define'`

```
(python_3_7_4) 192:testPython hades$ /Users/hades/opt/anaconda3/envs/python_3_7_4/bin/python /Users/hades/Documents/project/testPython/src/8_class/use/test_class.py
Traceback (most recent call last):
  File "/Users/hades/Documents/project/testPython/src/8_class/use/test_class.py", line 1, in <module>
    from define.dog import Dog
ModuleNotFoundError: No module named 'define'
```

```
#打印PYTHONPATH
$ python
>>> import sys
print(sys.path)
>>> print(sys.path)
['', '/Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python37.zip', '/Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python3.7', '/Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python3.7/lib-dynload', '/Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python3.7/site-packages'
```

Solution : Add `.path` in `site-pathages` dir

```
$ python
>>> import site
>>> site.getsitepackages()
['/Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python3.7/site-packages']
>>> eixt()

$ open /Users/hades/opt/anaconda3/envs/python_3_7_4/lib/python3.7/site-packages
Add testPython.pth
```

```
# testPython.pth
/Users/hades/Documents/project/testPython/src
/Users/hades/Documents/project/testPython/src/7_method
/Users/hades/Documents/project/testPython/src/8_class
/Users/hades/Documents/project/testPython/src/8_class/define
/Users/hades/Documents/project/testPython/src/8_class/use
```
