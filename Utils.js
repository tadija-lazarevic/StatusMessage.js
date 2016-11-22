var Utils = (function () {
    'use strict';

    var method = {};

    method.FadeOut = function (el) {
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.visibility = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    method.FadeIn = function (el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    method.HasClass = function (el, cls) {
        if (typeof el === 'undefined') {
            alert('Cannot check class of undefined element for ' + cls)
        }
        return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    method.AddClass = function (el, cls) {
        if (typeof el === 'undefined') {
            alert('Cannot add class of undefined element for ' + cls)
        }
        if (!method.HasClass(el, cls)) el.className += " " + cls;
    };

    method.RemoveClassWithName = function (el, cls) {
        if (typeof el === 'undefined') {
            alert('Cannot remove class of undefined element for ' + cls)
        }
        if (method.HasClass(el, cls)) {
            var reg      = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, '');
        }
    };

    method.SetAnimationDelay = function (el, cls, ms) {
        setTimeout(function () {
            method.AddClass(el, cls);
        }, ms);
    };

    method.GetElementID = function (id) {
        return document.getElementById(id);
    };

    method.GetElementClass = function (el) {
        return document.getElementsByClassName(el);
    };

    method.GetElementTag = function (el) {
        return document.getElementsByTagName(el);
    };

    method.ResetCssClass = function (el) {
        if (typeof el === 'undefined') {
            alert('Cannot remove class of undefined element - ResetCssClass')
        }
        if (el.className !== '') el.className = '';
    };

    method.IsObjectEmpty = function (obj) {

        // null and undefined are "empty"
        if (obj === null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    };

    method.IsNullOrDefault = function (value, defaultValue) {
        return value === '' || 'undefined' || null ? value : defaultValue;
    };

    method.IsUndefinedOrDefault = function (value, defaultValue) {
        return typeof  value === 'undefined' ? defaultValue : value;
    };

    method.SetStyle = function (el, style) {
        el.style = style;
    };

    method.GetFirstChildWithTagName = function (element, tagName) {
        for (var i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName.toLowerCase() == tagName) return element.childNodes[i];
        }
    };

    method.AddEvent = function (element, action, funct) {
        element.addEventListener(action, funct);
    };

    method.DisabledEventPropagation = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else if (window.event) {
            window.event.cancelBubble = true;
        }
    };

    method.Browser = function () {
        var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
        var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
        var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
        var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
        var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6

        return {
            isOpera: isOpera,
            isFirefox : isFirefox,
            isSafari : isSafari,
            isChrome : isChrome,
            isIE : isIE
        };
    };

    Array.prototype.unique = function () {
        var n = {}, r = [];
        for (var i = 0; i < this.length; i++) {
            if (!n[this[i]]) {
                n[this[i]] = true;
                r.push(this[i]);
            }
        }
        return r;
    };

    return method;

}());

