# Create a React app

# 1 Create a New React App by NPM

```
# npm init <initializer> is available in npm 6+
npm init react-app test-typescript
```

## package.json VS package-lock.json

After npm install ,auto create package-lock.json.  
package-lock.json: keep dependencies are same in different environment.

```
# package.json
"dependencies": {
    "react": "^16.11.0",
    "react-dom": "^16.11.0",      // ^ : supprot any higher version with magor version. e.g. 16.15.2
    "react-scripts": "3.2.0"
  }
```

```
# package-lock.json
// many dependicies for package.json
```

- Refs:  
  https://reactjs.org/docs/create-a-new-react-app.html#create-react-app  
  https://github.com/facebook/create-react-app#create-react-app--

# 2 Run a React App

```
cd test-typescript
npm start
```

http://localhost:3000/
