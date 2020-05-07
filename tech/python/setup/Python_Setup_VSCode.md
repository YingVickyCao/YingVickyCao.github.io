# Python Setup VS Code

# Step 1 : Install a Python interpreter

Python 3.7  
Verify the Python installation

# Step 2 : Install VS Code

# Step 3 : Install Python extension for VS Code `√`

# Step 4 : Lauching VSCode from the command line

```
$ type -a code
-bash: type: code: not found

# F1 / Command + Shift + P
Comand Palette -> shell command
shell command: Install 'code' command in PATH (Select this)
shell command: Uninstall 'code' command from PATH

$ type -a code
code is /usr/local/bin/code
```

# Step 5 : Open project in VSCode

```
code dir
/
File -> Open Folder
```

# Step 6 : Select a Python interpreter `√`

```
Comand Palette -> Python:Select Interpreter
```

```
# /current_project/.vscode/settings.json
{
  "python.pythonPath": "/Users/hades/opt/anaconda3/envs/python_3_7_4/bin/python"
}

```

# Step 6 : Create a Python sample File

# Step 7 : Run Python sample File

Option 1 : Click > (Run Python File in Terminal) .  
Option 2 : Right-click -> Run Python File in Terminal  
Option 3 : Select lines -> Press "Shift + Enter" / Right-click -> Run Python File in Terminal  
Option 4 : Comand Palette -> Python:Run Python File in Terminal

# Step 8 : Configure and run the debugger

- F9 ： +/1 beakpoint
- F5 / Debug -> Start Debugging): Comand Palette choose "Debug Configurations -> Python File "
- Debug toolbar / Debug Menu  
  Continue: F5  
  Step Into : F11  
  Step Out: Shift + F11  
  Restart : Command + Shift + F15:  
  Stop : Shift + F5

# Step 9 : Install code and Formatter

pylint：Code analysis for Python。 保存代码时，VSCode 提示要安装  
autopep8 : Formatter 。 Python 官方推出编码约定。 保存代码时，VSCode 提示要安装

# Refs

- [Python in Visual Studio Code](https://code.visualstudio.com/docs/languages/python)
