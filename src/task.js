var _ = require('lodash');

function Task (name, func) {
   
   var _name = name || 'unnamed task';
   var _func = func || _.noop();
   var _result = null;

   this.run = function (agent, callback) {

      _func(agent, function (err, result) {

         _result = err || result;

         callback(_result);
      });
   };

   this.name = function () {

      return _name;
   };

   this.result = function () {

      return _result;
   };

   this.done = function () {
      
      return (_result !== null);
   };
}

module.exports = Task;