var Container = require('./container');
var Task = require('./task');
var _ = require('lodash');

function Tasks () {
   
   var _container = new Container();

   this.add = function (optName, func) {

      if (!_.isString(optName)) {

         if (_.isFunction(optName)) {

            func = optName;
         }

         optName = 'unnamed task';
      }

      if (_.isFunction(func)) {

         _container.add(new Task(optName, func));
      }

      return this;
   };

   this.get = function (name) {
      
      return _container.get(name);
   };

   this.count = function () {
      
      return _container.size();
   };

   this.all = function () {
      
      return _container.all();
   };
}

module.exports = Tasks;