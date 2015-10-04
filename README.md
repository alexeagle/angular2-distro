# Starting with Angular 2, even faster

This repo is an Angular 2 distribution with typings included in the NPM package.
It's a proof-of-concept for solving https://github.com/angular/angular/issues/3082
in a way that lets developers start coding Angular 2 this fast:

```
$ npm install angular2
# Open your editor
# Start writing a .ts file, and completion and nav-to-docs already work
```

It works because the TypeScript team has developed a way for the compiler
(and editor plugins that use TypeScript's language services)
to find the type definitions directly from the `node_modules` folder.
