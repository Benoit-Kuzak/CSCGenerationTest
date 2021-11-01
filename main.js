// import { sortCategoriesForInsert }  from './sortCategories.js'
let sortCategoriesForInsert = require('./sortCategories.js');
// import * as json from './example.json'
let jsonData = require('./example.json');

console.log(jsonData);
var response = sortCategoriesForInsert(jsonData);

console.log(response);