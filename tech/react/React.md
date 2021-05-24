# Create a React app

### 1 Create a New React App

```
// Create a New React App
npx create-react-app my-app
cd my-app

// Run a React App
npm start
```

http://localhost:3000/

### 2 package.json VS package-lock.json

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

### 3 Babel

Babel is a compliler for generation JavaScript for transforming eg,React/ TypeScript to recognized formart by browser.

https://babeljs.io/repl/#?presets=react&code_lz=DwEwlgbgBAxgNgQwM5IHIILYFMC8AiJACwHsAHUsAOwHMBaOMJAFzwD4AoKKYQgRlYDKJclWpQAMoyZQAZsQBOUAN6l5ZJADpKmLAF9gAej4cuwAK5wTXbg1YBJSswTV5mQ7c7XgtgOqEETEgAguTuYFamtgDyMBZmSGFWhhYchuAQrADc7EA
