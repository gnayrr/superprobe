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

   it('should complete SuperAgent tasks', function (done) {
      
      var probe = superprobe.probe();

      probe.tasks.add(function (agent, done) {

         agent.get('http://api.openweathermap.org/data/2.5/weather')
         .query({ q: 'seattle,wa'})
         .end(done);
      });

      probe.tasks.count().should.be.exactly(1);

      probe.dispatch(function (results) {

         results.length.should.be.exactly(1);
         results[0].status.should.be.exactly(200);

         done();
      });
   });

   it('should complete SuperAgent tasks in parallel', function (done) {
      
      var probe = superprobe.probe();

      probe.tasks
      .add(function (agent, done) {
         
         agent.get('http://api.openweathermap.org/data/2.5/weather')
         .query({ q: 'irvine'})
         .end(done);
      })
      .add(function (agent, done) {
         
         agent.get('http://api.openweathermap.org/data/2.5/weather')
         .query({ q: 'brea'})
         .end(done);
      })
      .add(function (agent, done) {
         
         agent.get('http://api.openweathermap.org/data/2.5/weather')
         .query({ q: 'tacoma'})
         .end(done);
      })
      .add(function (agent, done) {
         
         agent.get('http://api.openweathermap.org/data/2.5/weather')
         .query({ q: 'tustin'})
         .end(done);
      });

      probe.tasks.count().should.be.exactly(4);

      probe.dispatch({ parallel: true }, function (results) {
         
         results.length.should.be.exactly(4);

         _.each(results, function (result) {

            result.status.should.be.exactly(200);
            result.body.should.be.an.object;
         });

         done();
      });
   });
});