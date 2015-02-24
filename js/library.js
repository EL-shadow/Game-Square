/**
 * Created by EL.
 * Date: 16.10.12
 * Time: 13:55
 * Description: in this file some multipurpose code
 */


//Function return Fibbonaci row element
function fib(n) {
  var a = 1, b = 1;
  for (var i = 3; i <= n; i++) {
    var c = a + b;
    a = b;
    b = c;
  }
  return b;
}

//Function return FACTORIAL
function factorial (n) {
    return !n ? 1 : n * factorial(n-1);
}

// Случайное целое между min и max
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Перевеодим в радианы
function degToRad(deg) {
  return Math.PI * deg / 180;
}

//http://javascript.ru/tutorial/events/crossbrowser
//Кросс-браузерное добавление и обработка событий
Event = (function() {

  var guid = 0

  function fixEvent(event) {
	event = event || window.event

    if ( event.isFixed ) {
      return event
    }
    event.isFixed = true

    event.preventDefault = event.preventDefault || function(){this.returnValue = false}
    event.stopPropagation = event.stopPropagaton || function(){this.cancelBubble = true}

    if (!event.target) {
        event.target = event.srcElement
    }

    if (!event.relatedTarget && event.fromElement) {
        event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
    }

    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
        event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
    }

    if ( !event.which && event.button ) {
        event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
    }

	return event
  }

  /* Вызывается в контексте элемента всегда this = element */
  function commonHandle(event) {
    event = fixEvent(event)

    var handlers = this.events[event.type]

	for ( var g in handlers ) {
      var handler = handlers[g]

      var ret = handler.call(this, event)
      if ( ret === false ) {
          event.preventDefault()
          event.stopPropagation()
      }
    }
  }

  return {
    add: function(elem, type, handler) {
      if (elem.setInterval && ( elem != window && !elem.frameElement ) ) {
        elem = window;
      }

      if (!handler.guid) {
        handler.guid = ++guid
      }

      if (!elem.events) {
        elem.events = {}
		elem.handle = function(event) {
		  if (typeof Event !== "undefined") {
			return commonHandle.call(elem, event)
		  }
        }
      }

      if (!elem.events[type]) {
        elem.events[type] = {}

        if (elem.addEventListener)
		  elem.addEventListener(type, elem.handle, false)
		else if (elem.attachEvent)
          elem.attachEvent("on" + type, elem.handle)
      }

      elem.events[type][handler.guid] = handler
    },

    remove: function(elem, type, handler) {
      var handlers = elem.events && elem.events[type]

      if (!handlers) return

      delete handlers[handler.guid]

      for(var any in handlers) return
	  if (elem.removeEventListener)
		elem.removeEventListener(type, elem.handle, false)
	  else if (elem.detachEvent)
		elem.detachEvent("on" + type, elem.handle)

	  delete elem.events[type]


	  for (var any in elem.events) return
	  try {
	    delete elem.handle
	    delete elem.events
	  } catch(e) { // IE
	    elem.removeAttribute("handle")
	    elem.removeAttribute("events")
	  }
    }
  }
}())



//http://javascript.ru/ui/offset

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        // "правильный" вариант
        return getOffsetRect(elem)
    } else {
        // пусть работает хоть как-то
        return getOffsetSum(elem)
    }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent
    }

    return {top: top, left: left}
}


function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()

    // (2)
    var body = document.body
    var docElem = document.documentElement

    // (3)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

    // (4)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0

    // (5)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft

    return { top: Math.round(top), left: Math.round(left) }
}