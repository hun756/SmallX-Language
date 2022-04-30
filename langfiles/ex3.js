"use strict";var _u=Math.imul;function print(){var t;(t=console).log.apply(t,arguments)}var add=function(t,n){return t+n},multiply=function(t,n){return _u(t,n)},subtract=function(t,n){return t-n},divide=function(t,n){return t/n},sqrt=function(t){return Math.sqrt(t)},pow=function(t,n){return Math.pow(t,n)};var x1 = 4;
var y1 = 8;
var x2 = 5;
var y2 = 12;
var dist = sqrt(add(pow(subtract(x1, x2), 2), pow(subtract(y1, y2), 2)));
print("The distance is : ", dist)