var Tasks = require('./tasks');
var Agent = require('superagent').agent;
var async = require('async');
var _ = require('lodash');

function Probe (name) {

   var _name = _.isString(name) ? name : 'anonymous probe';
   var _agent = new Agent();
   var _tasks = new Tasks();

   this.name = function (name) {

      _name = _.isString(name) ? name : _name;

      return _name;
   };

   this.dispatch = function (callback) {

      async.series(
         _.map(_tasks.all(), function (task) {
            
            return function (asyncCallback) {

               task.run(_agent, function (taskResult) {

                  asyncCallback(null, taskResult);
               });
            };
         }),
         function (err, result) {
            
            callback(result);
         }
      );
   };

   this.tasks = _tasks;
}

module.exports= Probe;