// var _ = require('lodash');
var Probe = require('./probe');

module.exports = {

   probe: function (optName) {
      
      var probe = new Probe(optName);

      return probe;
   }
};