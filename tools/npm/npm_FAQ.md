# npm FAQ

# 1 ERROR: `npm install [-g]` python is not supported by gyp

```
$ sudo npm install browser-sync
gyp ERR! stack Error: Python executable "/Users/hades/opt/anaconda3/bin/python" is v3.7.4, which is not supported by gyp.
gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
```

Reason:  
gyp needs Python >= v2.5.0 & < 3.0.0, not supproting python v3.734

Fix:  
Use Conda to switch env with python 2.7
Then try re-install.

# 2 ERROR: `npm install [-g]` EACCES: permission denied, mkdir

```
$ sudo npm install browser-sync
```

```
gyp ERR! stack Error: EACCES: permission denied, mkdir '/Users/hades/Documents/project/test_html_and_css/node_modules/fsevents/build'
```

Reason:  
权限不够.and sudo not work.

Fix:  
`npm install browser-sync -g --unsafe-perm=true --allow-root`

# 3 ERROR: `npm install [-g]` EACCES: permission denied, access

npm install browser-sync -g --unsafe-perm=true --allow-root

```
! Error: EACCES: permission denied, access '/usr/local/lib/node_modules/browser-sync'
```

Fix:

```
sudo npm install browser-sync -g --unsafe-perm=true --allow-root
```

# 4 ERROR: `npm install [-g]` CommandLineTools path error

\$ sudo npm install browser-sync -g --unsafe-perm=true --allow-root

```
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
```

Reason:  
Only CommandLineTools installed, not install XCode.  
xcodebuild 的路径不正确.

```
$ xcode-select --print-path
/Library/Developer/CommandLineTools

$ xcodebuild -showsdks
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
```

Fix:

```
# 将路径切换到Xcode的目录下: Not install XCode. After install XCode, try this again.
$ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer/
xcode-select: error: invalid developer directory '/Applications/Xcode.app/Contents/Developer/'

# But browser-sync is still working
$ browser-sync -v
```

# 5 ERROR:`npm install [-g]` Unexpected token `<` in JSON

```
$ npm install
npm ERR! Unexpected token < in JSON at position 0 while parsing near '<html>
npm ERR! <META HTTP-EQ...'

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/account/.npm/_logs/2019-11-06T08_02_57_115Z-debug.log
```

Fix:  
Solution 1 :  
Remove package-lock.json

Solution 2 :  
`npm cache clean --force`

Solution 3 :reset registry (used)  
`npm config set registry https://registry.npmjs.org`

# 6 ERROR: `npm install`,python version is not supported.

```
gyp ERR! stack Error: Python executable "/Users/account/opt/anaconda3/bin/python" is v3.7.4, which is not supported by gyp.
gyp ERR! stack You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.
```

Solution:  
Switch to Python >= v2.5.0 & < 3.0.0

```
$ conda env list
$ conda activate python27
```

# 7 ERROR: `npm start`, react-scripts package requires a dependency with other version.

```
The react-scripts package provided by Create React App requires a dependency:

  "babel-eslint": "10.0.2"

Don't try to install it manually: your package manager does it automatically.
However, a different version of babel-eslint was detected higher up in the tree:

  /Users/account/Documents/project/test-JavaScript/node_modules/babel-eslint (version: 10.0.3)
```

Solution:  
Step 1 : Delete package-lock.json  
Step 2 : Delete node_modules  
Step 3 : npm install

# 8 npm start :  Something is already running on port*  
Q : 
```
$ npm start
✔ Something is already running on port 3000. Probably:
  /usr/local/bin/node /Users/hades/Documents/project/testReact/node_modules/react-scripts/scripts/start.js (pid 42405)
  in /Users/hades/Documents/project/testReact

Would you like to run the app on another port instead?
```
A : Force exit the node in "Activity Monitor"    
When exit the npm, use "Ctrl + C" to ignore this problem.