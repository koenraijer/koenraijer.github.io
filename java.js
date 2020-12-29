
// RULES FOR VARIABLES:
// Cannot be a reserved keyword.
// Should be meaningful
// Cannot start with number
// Cannot contain space or hyphen (-)
// Camel notation = firstNameOfPerson
// Are case-sensitive
// Declare new variables on a new line (best practice)

// const interestRate = 0.3;
// console.log(interestRate);

// WHEN TO USE A CONSTANT:
// If you won't need to reassign a variable, use 'const'.
// Otherwise, use 'let'.

// TYPES OF VARIABLES:
// 1) Primitives/Value Types and  2) Reference Types. 
// 1) Primitives/Value Types: consists of string, number, 
// boolean, undefined and null.
// In ES6 there is also symbol!

// let name = 'Mosh'; // String Literal
// let age = 30; // Number Literal
// let isApproved = true; // Boolean Literal (lowercase)
// let firstName; // Undefined
// let lastName = null // null, explicitly clear the variable.

// VARIABLES IN JAVASCRIPT:
// JS is a dynamic language; the type of variable can change. 
// 'typeof' operator + variable gives the type of variable.
// In JS, ALL numbers are of type number (no integers/floats)


// 2) Reference Types: Object, Array, Function

// OBJECT:
// When dealing with multiple related variables, put them in
// an object. 
// {} is called 'object literal', between them, add 'key value pairs'.
// or the properties of an object. 

// let person = {
//    name: 'Koen',
//    age: 22
//};

// Dot notation
//person.name = 'John'

// Bracket notation
//person['name'] = 'Mary';

//console.log(person);
//console.log(person.name);

// When the property is selected by the user, therefore
// unknown at the time of coding, bracket notation
// is the most useful.

//let selection = 'Mary';
//person[selection] = 'Mary';

// ARRAY:
// [] = empty array

//let selectedColors = ['red', 'blue'];
//console.log(selectedColors[0]);

// Everything inside of an array has a number that can be 
// referenced in the array function.

//selectedColors[2] = 'green';

//console.log(selectedColors);

// Things inside of an array don't need to be the same type
// of variable. 

//console.log(selectedColors.length);

// FUNCTIONS:
// Function declarations don't need to end with ;
// variable name is only meaningful in this function
//function greet(name, lastName) {
//    console.log('Hello ' + name + ' ' + lastName);
//}

//greet(name);

// Parameter is what you have at the time of declaration, an argument
// is the actual value we supply for the parameter.

//greet('Koen')

// If you don't pass a value for a parameter, it will show up 
// as undefined, bc that is the default value of variables in
// javascript.

//greet(name, lastName)

//function square(number) {
//    return number * number;
//}

//console.log(square(2));

//window.addEventListener('scroll', () => {
//    document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
// }, false);


var ScrollOut = (function () {
  'use strict';

  function clamp(v, min, max) {
      return min > v ? min : max < v ? max : v;
  }
  function sign(x) {
      return (+(x > 0) - +(x < 0));
  }
  function round(n) {
      return Math.round(n * 10000) / 10000;
  }

  var cache = {};
  function replacer(match) {
      return '-' + match[0].toLowerCase();
  }
  function hyphenate(value) {
      return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
  }

  /** find elements */
  function $(e, parent) {
      return !e || e.length === 0
          ? // null or empty string returns empty array
              []
          : e.nodeName
              ? // a single element is wrapped in an array
                  [e]
              : // selector and NodeList are converted to Element[]
                  [].slice.call(e[0].nodeName ? e : (parent || document.documentElement).querySelectorAll(e));
  }
  function setAttrs(el, attrs) {
      // tslint:disable-next-line:forin
      for (var key in attrs) {
          if (key.indexOf('_')) {
              el.setAttribute('data-' + hyphenate(key), attrs[key]);
          }
      }
  }
  function setProps(cssProps) {
      return function (el, props) {
          for (var key in props) {
              if (key.indexOf('_') && (cssProps === true || cssProps[key])) {
                  el.style.setProperty('--' + hyphenate(key), round(props[key]));
              }
          }
      };
  }

  var clearTask;
  var subscribers = [];
  function loop() {
      clearTask = 0;
      subscribers.slice().forEach(function (s2) { return s2(); });
      enqueue();
  }
  function enqueue() {
      if (!clearTask && subscribers.length) {
          clearTask = requestAnimationFrame(loop);
      }
  }
  function subscribe(fn) {
      subscribers.push(fn);
      enqueue();
      return function () {
          subscribers = subscribers.filter(function (s) { return s !== fn; });
          if (!subscribers.length && clearTask) {
              cancelAnimationFrame(clearTask);
              clearTask = 0;
          }
      };
  }

  function unwrap(value, el, ctx, doc) {
      return typeof value === 'function' ? value(el, ctx, doc) : value;
  }
  function noop() { }

  /**
   * Creates a new instance of ScrollOut that marks elements in the viewport with
   * an "in" class and marks elements outside of the viewport with an "out"
   */
  // tslint:disable-next-line:no-default-export
  function main (opts) {
      // Apply default options.
      opts = opts || {};
      // Debounce onChange/onHidden/onShown.
      var onChange = opts.onChange || noop;
      var onHidden = opts.onHidden || noop;
      var onShown = opts.onShown || noop;
      var onScroll = opts.onScroll || noop;
      var props = opts.cssProps ? setProps(opts.cssProps) : noop;
      var se = opts.scrollingElement;
      var container = se ? $(se)[0] : window;
      var doc = se ? $(se)[0] : document.documentElement;
      var rootChanged = false;
      var scrollingElementContext = {};
      var elementContextList = [];
      var clientOffsetX, clientOffsety;
      var sub;
      function index() {
          elementContextList = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) { return ({ element: el }); });
      }
      function update() {
          // Calculate position, direction and ratio.
          var clientWidth = doc.clientWidth;
          var clientHeight = doc.clientHeight;
          var scrollDirX = sign(-clientOffsetX + (clientOffsetX = doc.scrollLeft || window.pageXOffset));
          var scrollDirY = sign(-clientOffsety + (clientOffsety = doc.scrollTop || window.pageYOffset));
          var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - clientWidth || 1);
          var scrollPercentY = doc.scrollTop / (doc.scrollHeight - clientHeight || 1);
          // Detect if the root context has changed.
          rootChanged =
              rootChanged ||
                  scrollingElementContext.scrollDirX !== scrollDirX ||
                  scrollingElementContext.scrollDirY !== scrollDirY ||
                  scrollingElementContext.scrollPercentX !== scrollPercentX ||
                  scrollingElementContext.scrollPercentY !== scrollPercentY;
          scrollingElementContext.scrollDirX = scrollDirX;
          scrollingElementContext.scrollDirY = scrollDirY;
          scrollingElementContext.scrollPercentX = scrollPercentX;
          scrollingElementContext.scrollPercentY = scrollPercentY;
          var childChanged = false;
          for (var index_1 = 0; index_1 < elementContextList.length; index_1++) {
              var ctx = elementContextList[index_1];
              var element = ctx.element;
              // find the distance from the element to the scrolling container
              var target = element;
              var offsetX = 0;
              var offsetY = 0;
              do {
                  offsetX += target.offsetLeft;
                  offsetY += target.offsetTop;
                  target = target.offsetParent;
              } while (target && target !== container);
              // Get element dimensions.
              var elementHeight = element.clientHeight || element.offsetHeight || 0;
              var elementWidth = element.clientWidth || element.offsetWidth || 0;
              // Find visible ratios for each element.
              var visibleX = (clamp(offsetX + elementWidth, clientOffsetX, clientOffsetX + clientWidth) -
                  clamp(offsetX, clientOffsetX, clientOffsetX + clientWidth)) /
                  elementWidth;
              var visibleY = (clamp(offsetY + elementHeight, clientOffsety, clientOffsety + clientHeight) -
                  clamp(offsetY, clientOffsety, clientOffsety + clientHeight)) /
                  elementHeight;
              var intersectX = visibleX === 1 ? 0 : sign(offsetX - clientOffsetX);
              var intersectY = visibleY === 1 ? 0 : sign(offsetY - clientOffsety);
              var viewportX = clamp((clientOffsetX - (elementWidth / 2 + offsetX - clientWidth / 2)) / (clientWidth / 2), -1, 1);
              var viewportY = clamp((clientOffsety - (elementHeight / 2 + offsetY - clientHeight / 2)) / (clientHeight / 2), -1, 1);
              var visible = void 0;
              if (opts.offset) {
                  visible = unwrap(opts.offset, element, ctx, doc) <= clientOffsety ? 1 : 0;
              }
              else if ((unwrap(opts.threshold, element, ctx, doc) || 0) < visibleX * visibleY) {
                  visible = 1;
              }
              else {
                  visible = 0;
              }
              var changedVisible = ctx.visible !== visible;
              var changed = ctx._changed ||
                  changedVisible ||
                  ctx.visibleX !== visibleX ||
                  ctx.visibleY !== visibleY ||
                  ctx.index !== index_1 ||
                  ctx.elementHeight !== elementHeight ||
                  ctx.elementWidth !== elementWidth ||
                  ctx.offsetX !== offsetX ||
                  ctx.offsetY !== offsetY ||
                  ctx.intersectX !== ctx.intersectX ||
                  ctx.intersectY !== ctx.intersectY ||
                  ctx.viewportX !== viewportX ||
                  ctx.viewportY !== viewportY;
              if (changed) {
                  childChanged = true;
                  ctx._changed = true;
                  ctx._visibleChanged = changedVisible;
                  ctx.visible = visible;
                  ctx.elementHeight = elementHeight;
                  ctx.elementWidth = elementWidth;
                  ctx.index = index_1;
                  ctx.offsetX = offsetX;
                  ctx.offsetY = offsetY;
                  ctx.visibleX = visibleX;
                  ctx.visibleY = visibleY;
                  ctx.intersectX = intersectX;
                  ctx.intersectY = intersectY;
                  ctx.viewportX = viewportX;
                  ctx.viewportY = viewportY;
                  ctx.visible = visible;
              }
          }
          if (!sub && (rootChanged || childChanged)) {
              sub = subscribe(render);
          }
      }
      function render() {
          maybeUnsubscribe();
          // Update root attributes if they have changed.
          if (rootChanged) {
              rootChanged = false;
              setAttrs(doc, {
                  scrollDirX: scrollingElementContext.scrollDirX,
                  scrollDirY: scrollingElementContext.scrollDirY
              });
              props(doc, scrollingElementContext);
              onScroll(doc, scrollingElementContext, elementContextList);
          }
          var len = elementContextList.length;
          for (var x = len - 1; x > -1; x--) {
              var ctx = elementContextList[x];
              var el = ctx.element;
              var visible = ctx.visible;
              var justOnce = el.hasAttribute('scrollout-once') || false; // Once
              if (ctx._changed) {
                  ctx._changed = false;
                  props(el, ctx);
              }
              if (ctx._visibleChanged) {
                  setAttrs(el, { scroll: visible ? 'in' : 'out' });
                  onChange(el, ctx, doc);
                  (visible ? onShown : onHidden)(el, ctx, doc);
              }
              // if this is shown multiple times, keep it in the list
              if (visible && (opts.once || justOnce)) { // or if this element just display it once
                  elementContextList.splice(x, 1);
              }
          }
      }
      function maybeUnsubscribe() {
          if (sub) {
              sub();
              sub = undefined;
          }
      }
      // Run initialize index.
      index();
      update();
      render();
      // Collapses sequential updates into a single update.
      var updateTaskId = 0;
      var onUpdate = function () {
          updateTaskId = updateTaskId || setTimeout(function () {
              updateTaskId = 0;
              update();
          }, 0);
      };
      // Hook up document listeners to automatically detect changes.
      window.addEventListener('resize', onUpdate);
      container.addEventListener('scroll', onUpdate);
      return {
          index: index,
          update: update,
          teardown: function () {
              maybeUnsubscribe();
              window.removeEventListener('resize', onUpdate);
              container.removeEventListener('scroll', onUpdate);
          }
      };
  }

  return main;

}());

var floatPanel = new McFloatPanel();
/* Float Panel v2016.10.28. Copyright www.menucool.com */
function McFloatPanel(){var i=[],s=[],h="className",t="getElementsByClassName",d="length",l="display",C="transition",m="style",B="height",c="scrollTop",k="offsetHeight",a="fixed",e=document,b=document.documentElement,j=function(a,c,b){if(a.addEventListener)a.addEventListener(c,b,false);else a.attachEvent&&a.attachEvent("on"+c,b)},o=function(c,d){if(typeof getComputedStyle!="undefined")var b=getComputedStyle(c,null);else b=c.currentStyle;return b?b[d]:a},L=function(){var a=e.body;return Math.max(a.scrollHeight,a[k],b.clientHeight,b.scrollHeight,b[k])},O=function(a,c){var b=a[d];while(b--)if(a[b]===c)return true;return false},g=function(b,a){return O(b[h].split(" "),a)},q=function(a,b){if(!g(a,b))if(!a[h])a[h]=b;else a[h]+=" "+b},p=function(a,f){if(a[h]&&g(a,f)){for(var e="",c=a[h].split(" "),b=0,i=c[d];b<i;b++)if(c[b]!==f)e+=c[b]+" ";a[h]=e.replace(/^\s+|\s+$/g,"")}},n=function(){return window.pageYOffset||b[c]},z=function(a){return a.getBoundingClientRect().top},F=function(b){var c=n();if(c>b.oS&&!g(b,a))q(b,a);else g(b,a)&&c<b.oS&&p(b,a)},x=function(){for(var a=0;a<s[d];a++)J(s[a])},J=function(a){if(a.oS){a.fT&&clearTimeout(a.fT);a.fT=setTimeout(function(){if(a.aF)F(a);else y(a)},50)}else y(a)},w=function(d,c,b){p(d,a);c[l]="none";b.position=b.top=""},y=function(c){var j=z(c),f=c[k],e=c[m],d=c.pH[m],h=n();if(j<c.oT&&h>c.oS&&!g(c,a)&&(window.innerHeight||b.clientHeight)>f){c.tP=h+j-c.oT;var p=L();if(f>p-c.tP-f)var i=f;else i=0;d[l]="block";d[C]="none";d[B]=f+1+"px";c.pH[k];d[C]="height .3s";d[B]=i+"px";q(c,a);e.position=a;e.top=c.oT+"px";if(o(c,"position")!=a)d[l]="none"}else if(g(c,a)&&(h<c.tP||h<c.oS)){var s=o(c,"animation");if(c.oS&&c.classList&&s.indexOf("slide-down")!=-1){var r=o(c,"animationDuration");c.classList.remove(a);e.animationDirection="reverse";e.animationDuration="300ms";void c[k];c.classList.add(a);setTimeout(function(){w(c,d,e);e.animationDirection="normal";e.animationDuration=r},300)}else w(c,d,e)}},I=function(){var f=[],c,b;if(e[t]){f=e[t]("float-panel");i=e[t]("slideanim")}else{var k=e.getElementsByTagName("*");c=k[d];while(c--)g(k[c],"float-panel")&&f.push(k[c])}c=f[d];for(var h=0;h<c;h++){b=s[h]=f[h];b.oT=parseInt(b.getAttribute("data-top")||0);b.oS=parseInt(b.getAttribute("data-scroll")||0);if(b.oS>20&&o(b,"position")==a)b.aF=1;b.pH=e.createElement("div");b.pH[m].width=b.offsetWidth+"px";b.pH[m][l]="none";b.parentNode.insertBefore(b.pH,b.nextSibling)}if(s[d]){setTimeout(x,160);j(window,"scroll",x)}},f,D=200,E=0,r,u,H=function(){return window.innerWidth||b.clientWidth||e.body.clientWidth};function K(){if(!r)r=setInterval(function(){var a=e.body;if(a[c]<3)a[c]=0;else a[c]=a[c]/1.3;if(b[c]<3)b[c]=0;else b[c]=b[c]/1.3;if(!n()){clearInterval(r);r=null}},14)}function A(){clearTimeout(u);if(n()>D&&H()>E){u=setTimeout(function(){p(f,"mcOut")},60);f[m][l]="block"}else{q(f,"mcOut");u=setTimeout(function(){f[m][l]="none"},500)}}var N=function(){f=e.getElementById("backtop");if(f){var a=f.getAttribute("data-v-w");if(a){a=a.replace(/\s/g,"").split(",");D=parseInt(a[0]);if(a[d]>1)E=parseInt(a[1])}j(f,"click",K);j(window,"scroll",A);A()}},v=function(){for(var c=n(),e=c+window.innerHeight,g=i[d],b,f,a=0;a<g;a++){b=c+z(i[a]),f=b+i[a][k];if(b<e)q(i[a],"slide");else p(i[a],"slide")}},G=function(){if(i[d]){j(window,"scroll",v);v()}},M=function(){I();N();G()};j(window,"load",M);j(document,"touchstart",function(){})}
