# Simple Dropbox clone

## Description
A simple yet beautiful project to build a single page application showing basic features of dropbox. [Work in progress]


##Contains: 

* Ducks architecture (https://github.com/erikras/ducks-modular-redux). Simple pattern to write redux apps.
* ES6 - 7 Support with Babel
* React Routing
* Hot module reloading
* webpack
* Sass support, just import your styles wherever you need them
* eslint to keep your js readable


## Run the app

0. ```npm install```. (``yarn install`` also works fine)
0. ```npm start```

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.


## Cloned from:
https://github.com/jpsierens/webpack-react-redux.git


## TODO:
0. Auto rename common item name to (1) (2), etc..
0. Naming of new folder and Renaming of existing items
0. Add navigation in create bread crumbs
0. Heavy testing addition of folder -> url should match and browser history should match.
0. Add pop ups based on user actions
0. Url appending when clicked on folder be based on path provided from backend
0. Send id along with name when get details->checking for mismatch
0. Remove trailing / form url if user manually puts it


0. Currently support is being added for folder creation. Although, file uploading(only name wise) is on the way.
0. Add middleware to make promise call to apis and attach to store actions
0. On demand module loading
0. Code splitting
0. Add offline functionality / Service worker[pretty good example since it also has an app shell]
