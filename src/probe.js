'use strict';

var Tasks = require('./tasks');
var superagent = require('superagent');
var async = require('async');
var _ = require('lodash');

function Probe (name) {

   this.name = _.isString(name) ? name : 'anonymous probe';

   this.tasks = new Tasks();
}

(function () {

   this.dispatch = function (config, callback) {

      var agent = new superagent.agent();
      var method = 'series';

      if (_.isPlainObject(config)) {

         agent = config.agent || agent;
         method = config.parallel ? 'parallel' : 'series';
      } else if (_.isFunction(config)) {

         callback = config;
      }

      async[method](
         _.map(this.tasks.all(), function (task) {
            
            return function (asyncCallback) {

               if (task.done()) {

                  asyncCallback(null, task.result);
               } else {

                  task.run(agent, function (taskResult) {

                     asyncCallback(null, taskResult);
                  });
               }
            };
         }),
         function (err, result) {
            
            callback(result);
         }
      );
   };

}).call(Probe.prototype);

module.exports= Probe;