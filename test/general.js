var _ = require('lodash');
var superprobe = require(process.cwd() + '/src');

describe('General', function () {

   it('should have access to lodash', function () {
      
      _.should.be.an.object;
   });

   it('should have access to superprobe', function () {

      
      superprobe.should.be.an.object;
   });
});

describe('SuperProbe', function () {
   
   describe('#probe', function () {
      
      it('should generate a new probe', function () {
         var probe = superprobe.probe();

         probe.should.be.an.object;

         probe.name().should.be.a.string;
         probe.tasks.should.be.an.object;
      });

      it('should generate a new probe with name Ben', function () {
         
         var probe = superprobe.probe('Ben');

         probe.should.be.an.object;

         probe.name().should.be.exactly('Ben');
         probe.tasks.should.be.an.object;
      });

      it('should tolerate strange name inputs', function () {
         
         var probe = superprobe.probe(true);

         probe.should.be.an.object;

         probe.name().should.be.exactly('anonymous probe');
         probe.tasks.should.be.an.object;
      });
   });

   // describe('#dispatchAll', function () {
      
   //    it('should dispatch 0 probes', function (done) {
         
   //       superprobe.dispatchAll(function (results) {
            
   //          results.should.be.an.array;
   //          results.length.should.be.exactly(0);

   //          done();
   //       });
   //    });
   // });
});

describe('Simple use case', function () {
   
   it('should complete tasks and return results', function (done) {
      
      var probe = superprobe.probe();

      probe.tasks
      .add(function (agent, done) {

         agent.get('https://www.example.com').end(function (err, res) { done(res.text || res.body); });
      })
      .add(function (agent, done) {

         setTimeout(function() {

            done(200);
         }, 200);
      })
      .add(function (agent, done) {

         setTimeout(function() {

            done(300);
         }, 300);
      });

      probe.dispatch(function (results) {
         
         results.should.be.an.array;

         console.dir(results);

         done();
      });
   });
});