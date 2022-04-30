"use strict";var _u=Math.imul;function print(){var t;(t=console).log.apply(t,arguments)}var add=function(t,n){return t+n},multiply=function(t,n){return _u(t,n)},subtract=function(t,n){return t-n},divide=function(t,n){return t/n},sqrt=function(t){return Math.sqrt(t)},pow=function(t, n){return Math.pow(t, n)};
var name = "Mehmet";
var age = 25;
var favourite_color = "orange";
var sum = add(1, multiply(2, subtract(4, 3)));
print("sum is :", sum)