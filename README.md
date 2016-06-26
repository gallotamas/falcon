# Falcon test

Test application for falcon.io to demonstrate a few concepts (REST, websockets, data visualization).
All requested features are implemeted.

## Quick start
``` bash
# install dependencies
npm install

# build the project using angular-cli
npm run build

# run the server
node app.js
```

Alternatively you can just run `npm install` and `npm start` to install and run the application.

The application will start on http://localhost:3000

## Tools & Technologies used

- [angular-cli](https://github.com/angular/angular-cli) for generating the project and file templates.
- [Visual Studio Code](https://code.visualstudio.com/) as IDE.
- [Angular 2](https://angular.io/) as client side framework.
- [TypeScript](https://www.typescriptlang.org/) as programming language of the frontend.
- [express](http://expressjs.com/) as server side framework.
- [socket.io](http://socket.io/) for easy websocket communication.
- [Material Design Lite](https://getmdl.io/) for user interface components (it is loaded from CDN).
- [d3.js](https://d3js.org/) for data visualization.
- [less](http://lesscss.org/) for stylesheets.

## Remarks

The application was optimized for Chrome an Firefox.

Normally, you could use `npm run build-prod` for building the production version of the app
but currently there is an [issue](https://github.com/angular/angular-cli/issues/1068) in angular-cli with `ng build -prod` that causes the production build to fail.

## Improvements possibilities

- Write tests. :)
- Use a spinner when there is a data loading activity in the background.
- Validation (it was not required).
- Improve reach graph.
- Make more properties editable on the edit publishing item page. 
