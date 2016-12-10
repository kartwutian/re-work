var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();
life.setMaxListeners(11)
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug')
})
life.on("求溺爱",function(who){
  console.log(who+'give you a hug 10')
})
life.on("求抱抱",function(who){
  console.log(who+'give you a hug 11')
})
var hasConfortListener = life.emit('求抱抱','女神')
var hasLoveListener = life.emit('求溺爱','女神')
var hasShareListener = life.emit('求分享','女神')

console.log( hasConfortListener )
console.log( hasLoveListener )
console.log( hasShareListener )