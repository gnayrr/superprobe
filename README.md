# SuperProbe
### A simple framework for managing [SuperAgent](https://github.com/visionmedia/superagent) tasks

Create a bunch of probes, assign SuperAgent tasks to them, and dispatch them in to space!



## Usage example

```js

var superprobe = require('superprobe');

var probe = superprobe.probe();

probe.tasks.add(function (agent, done) {

	agent.get('http://api.openweathermap.org/data/2.5/weather?q=seattle,wa').end(done);
});

probe.dispatch(function (results) {

	var weather = results[0];
});


```