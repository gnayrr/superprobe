var _ = require('lodash');
var Probe = require('./probe');

;(function (station) {

   // var _probes = [];

   this.probe = function (optName) {

      var probe = new Probe(optName);

      // _probes.push(probe);

      return probe;
   };

   // this.dispatchAll = function (callback) {

   //    if (_.probes.length) {

   //       var results = [];
         
   //       _.each(_probes, function (probe, i) {
            
   //          probe.dispatch(function (result) {

   //             results.push(result);

   //             if (i === (_probes.length - 1)) {

   //                callback(results);
   //             }
   //          });
   //       });
   //    } else {

   //       callback(results);
   //    }
   // };

   module.exports = this;

}).call({});