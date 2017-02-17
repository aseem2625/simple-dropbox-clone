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


## Run the app (Development)

0. ```npm install```. (``yarn install`` also works fine)
0. ```npm start```

## Build the app (Deployment)
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.


## Base Cloned from:
https://github.com/jpsierens/webpack-react-redux.git

## Basic feature added till now:
0. Open localhost:3000, you'll see landing page
<img src="/docs/screenshots/1.png" alt="Landing page" width="550">

0. Select a folder by clicking anywhere on the row (except name of file, just like dropbox)
<img src="/docs/screenshots/2.png" alt="Select folder for rename" width="550">

0. For single selection, * button appears to rename file. Type some name
<img src="/docs/screenshots/3.png" alt="Click the * button for rename" width="550">

0. Now you can see that folder is renamed. Now, you can "click on folder name" to go inside that folder
<img src="/docs/screenshots/4.png" alt="Folder with newly given name" width="550">

0. Select multiple folder by clicking anywhere on the row (except name of file, just like dropbox)
<img src="/docs/screenshots/7.png" alt="Select multiple folders" width="550">

0. Click on delete button to delete all the selected folders
<img src="/docs/screenshots/6.png" alt="Delete multiple folders" width="550">

0. Click on + button to add new folder in the given directory. Give some name
<img src="/docs/screenshots/8.png" alt="Add new folder" width="550">

0. New folder now appears in the given directory. You can navigate and add further folders inside it.
<img src="/docs/screenshots/9.png" alt="New folder added" width="550">



## TODO:
0. Auto rename common item name to (1) (2), etc..
0. Resolve path bug in response when Renaming of existing items
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
