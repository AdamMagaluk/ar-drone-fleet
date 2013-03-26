var ArDroneFleet = require('../index');

var fleet = new ArDroneFleet({
	drone1 : {ip : "192.168.1.2"},
	drone2 : {ip : "192.168.1.3"}
});

fleet.up(1);
fleet.up('drone1',2);

fleet.on('takeoff',function(data){
	console.log(data.drone + " tookoff");
});
