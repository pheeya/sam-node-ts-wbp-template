## Info
A template for making multi-page applications with nodejs, typescript and sass. Uses webpack and rollup. 

If you want to remove some packages simply remove them from package.json and then run ``npm install`` in the command line.

## Install
``npm install``

## Dev Server 
``npm run dev``

## Build 
``npm run build``

## Adding new page
1. Add entry in views.json
2. Create entry script in src/static
3. Create .hbs file in src/views
4. Handle route 

### Folder Structure 
```` 
src
  ├───data
  ├───db
  ├───handlers
  ├───models
  ├───routes
  ├───static
  │   |───media
  │   ├───sass
      └───scripts
  ├───util
  └───views
      └───partials
  
````