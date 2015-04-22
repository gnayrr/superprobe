var _ = require('lodash');

function Container () {
   
   var _items = [];

   this.add = function (item) {
      
      _items.push(item);
   };

   this.get = function (name) {
      
      return _.find(_items, function (item) {
         return (item.name === name);
      });
   };

   this.size = function () {
      
      return _items.length;
   };

   this.all = function () {

      return _items;
   };
}

module.exports = Container;