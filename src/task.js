var _ = require('lodash');

function Task (name, func) {

   this.name = _.isString(name) ? name : 'anonymous task';
   this.func = _.isFunction(func) ? func : _.noop;
   this.result = undefined;

   // accumulates the numbe rof times this task has ran
   this.counter = 0;
}

(function () {

   this.run = function (agent, callback) {
      
      this.func(agent, _.bind(function (err, result) {

         this.counter += 1;
         this.result = err || result;

         callback(this.result);

      }, this));
   };

   this.done = function () {
      
      return (this.counter > 0);
   };

}).call(Task.prototype);

module.exports = Task;