# TypeScript

# 1 source

https://github.com/Microsoft/TypeScript

# 2 TypeScript in React

## Using TypeScript with Create React App

https://reactjs.org/docs/static-type-checking.html#using-typescript-with-create-react-app

```
 npm install -g create-react-app
create-react-app reacttypescript --typescript
```

## Adding TypeScript to a Project

- INSTALL TypeScript

```
$ npm install -g typescript
/usr/local/bin/tsserver -> /usr/local/lib/node_modules/typescript/bin/tsserver
/usr/local/bin/tsc -> /usr/local/lib/node_modules/typescript/bin/tsc
+ typescript@3.6.4
updated 1 package in 5.757s

/
$ npm install --save-dev typescript

```

- package.json  
  tsc command

```
{
  // ...
  "scripts": {
    "build": "tsc",
    "tsc": "tsc",
    // ...
  },
  // ...
}
```

- Configuring the TypeScript Compiler

```

# tsconfig.json
tsc --init
/
npm run tsc --init

# COMPILE
# helloworld.ts -> helloworld.js
tsc helloworld.ts
```

- tsconfig.json  
  Ref tsconfig.json :  
  https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json

- Type Definitions  
   Type 1: Bundled - The library bundles its own declaration file  
   index.d.ts

  Type 2: DefinitelyTyped  
  `npm install --save-dev @types/node @types/react @types/react-dom @types/jest`

  Type 3: Local Declarations

```
# e.g. declarations.d.ts file
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

# Refs:

- http://www.typescriptlang.org/docs/handbook/basic-types.html
