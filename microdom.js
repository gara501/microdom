var $dom = (function(win) {
  var MicrodomSingleton = (function(){
    var instance;
    function init() {
      function Qs(selector) {
        this.selector = selector;
      }
      Qs.prototype.getFirst = function() {
        return document.querySelector(this.selector);
      }

      Qs.prototype.getAll = function() {
        return document.querySelectorAll(this.selector);
      }

      Qs.prototype.count = function() {
        return document.querySelectorAll(this.selector).length;
      }

      Qs.prototype.addClass = function(newClass, all) {
        if (!all) {
          if (document.querySelector(this.selector).classList) {
            document.querySelector(this.selector).classList.add(newClass);
          } else {
            document.querySelector(this.selector).className += ' ' + newClass;
          }
        } else {
          document.querySelectorAll(this.selector).forEach(function(element) {
            if (element.classList) {
              element.classList.add(newClass);
            } else {
              element.className += ' ' + newClass;
            }
          })
        }
        
      }

      function qs(selector) {
        
        var q = new Qs(selector);

        return {
          all: function() {
            return q.getAll(selector);
          },
          one: function() {
            return q.getFirst(selector)
          },
          count: function(){
            return q.count(selector);
          },
          addCls: function(newClass) {
            return q.addClass(newClass, false);
          },
          addClsAll: function(newClass) {
            return q.addClass(newClass, true);
          }
        }
      }

      return {
        qs: qs
      }
    }
    return {
      getInstance: function() {
        if(!instance) {
          instance = init();
        }
        return instance;
      }
    }
  })();
  var $dom = MicrodomSingleton.getInstance();
  return (win.$dom = $dom);
})(window);
