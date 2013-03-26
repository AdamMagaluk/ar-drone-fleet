ar-drone-fleet
==============

Control multiple ar drones using Node.js, module wraps @felixge's https://github.com/felixge/node-ar-drone module.

Api wraps all of Felixge's Client api library.

## Status
Still under heavy development and not completly tested, still waiting to get together with multiple drones.


## Installing

```bash
npm install ar-drone-fleet
```

## Api Functions wrapped
- takeoff
- land
- up/down
- clockwise/counterClockwise
- front/back
- left/right
- stop
- config
- animate
- animateLeds
- disableEmergency

Each wrapped function can be called as normal to control all drones `fleet.takeoff()` or with the first parameter as the drones key `fleet.takeoff('drone1')`. See example below for more details.

```js
var ArDroneFleet = require('ar-drone-fleet');

// Supply constructor with the client options, this is used by arDrone.createClient()
var fleet = new ArDroneFleet({
	drone1 : {ip : "192.168.1.2"},
	drone2 : {ip : "192.168.1.3"}
});

fleet.up(1);
fleet.up('drone1',2); // Use object name

fleet.on('takeoff',function(data){
	console.log(data.drone + " tookoff");
});

// Or alternately supply the constructor with array of client options.
var fleet = new ArDroneFleet([
	{ip : "192.168.1.2"},
	{ip : "192.168.1.3"}
]);

fleet.up(1);
fleet.up(1,2); // Using index of supplied drones

fleet.on('takeoff',function(data){
	console.log(data.drone + " tookoff");
});

```
