# Jest setup

```
$ npm install --save-dev jest
$ npm install --save-dev @types/jest"
```

- `package.json`

```
# package.json

"scripts": {
    "jest-test": "jest --verbose",
    "jest-test-coverage": "jest --coverage",
  }
,
  "devDependencies": {
    "@types/jest": "^24.0.20",
    "jest": "^24.9.0",
  }


  "moduleDirectories": [
    "node-modules",
    "src"
  ],
  "jest": {
    "testPathIgnorePatterns": [
      "/node_modules/",
      "/src/App.test.js"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/src/App.test.js"
    ]
  }
```

- VSCode -> Debug -> Edit  
  https://jestjs.io/docs/en/troubleshooting#debugging-in-vs-code

```
# respo/.vscode/launch.json
# VSCode -> Debug -> Edit
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```

- Run command

```
$ npm run jest-test
$ npm run jest-test-coverage
VSCode -> Debug
```
