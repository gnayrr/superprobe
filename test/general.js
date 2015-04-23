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

         probe.name.should.be.a.string;
         probe.tasks.should.be.an.object;
      });

      it('should generate a new probe with name Ben', function () {
         
         var probe = superprobe.probe('Ben');

         probe.should.be.an.object;

         probe.name.should.be.exactly('Ben');
         probe.tasks.should.be.an.object;
      });

      it('should tolerate strange name inputs', function () {
         
         var probe = superprobe.probe(true);

         probe.should.be.an.object;

         probe.name.should.be.exactly('anonymous probe');
         probe.tasks.should.be.an.object;
      });
   });
});

describe('Simple use case', function () {
   
   it('should complete tasks and return results', function (done) {
      
      var probe = superprobe.probe();

      probe.tasks
      .add(function (agent, done) { setTimeout(function() { done('w'); }, 500); })
      .add(function (agent, done) { setTimeout(function() { done('t'); }, 300); })
      .add(function (agent, done) { setTimeout(function() { done('f'); }, 200); });


      probe.tasks.all().should.be.an.array;
      probe.tasks.count().should.be.exactly(3);

      probe.name = 'killer bee';

      probe.name.should.be.exactly('killer bee');

      probe.dispatch(function (results) {
         
         results.should.be.an.array;
         results[0].should.be.exactly('w');
         results[1].should.be.exactly('t');
         results[2].should.be.exactly('f');

         done();
      });
   });

   it('should complete tasks in parallel and return results in order', function (done) {
   	
   	var probe = superprobe.probe();

   	probe.tasks
   	.add(function (agent, done) { setTimeout(function() { done(1000); }, 1000); })
   	.add(function (agent, done) { setTimeout(function() { done( 800); },  800); })
   	.add(function (agent, done) { setTimeout(function() { done( 500); },  500); });

   	probe.tasks.count().should.be.exactly(3);

   	probe.dispatch({ parallel: true }, function (results) {
   		
         results[0].should.be.exactly(1000);
         results[1].should.be.exactly(800);
         results[2].should.be.exactly(500);

         done();
   	});
   });
});