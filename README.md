# Starting with Angular 2, even faster

This repo is an Angular 2 distribution with typings included in the NPM package.
It's a proof-of-concept for solving https://github.com/angular/angular/issues/3082
in a way that lets developers start coding Angular 2 this fast:

```
$ mkdir angular2-quickerstart; cd angular2-quickerstart
$ npm install typescript angular2@alexeagle/angular2-distro
$ ./node_modules/.bin/tsc -init --experimentalDecorators --target es5
# Open VSCode
# Start coding in .ts - completion, error-highlighting, nav-to-docs all work!
$ ./node_modules/.bin/tsc --watch
```

It works because the TypeScript team has developed a way for the compiler
(and editor plugins that use TypeScript's language services)
to find the type definitions directly from the `node_modules` folder.

Remaining problems to address before shipping:
- VSCode should use the version of typescript found in node_modules *by default*:
  mailed a contact on the team requesting this
- tsc --watch should see newly added files, so we can start the compiler before coding:
  https://github.com/Microsoft/TypeScript/issues/4553
