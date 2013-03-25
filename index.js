var EventEmitter = require('events').EventEmitter;
var util = require('util');

var arDrone = require('ar-drone');

function argsToArray(obj){
	var ret = [];
	for(var x in obj) ret.push(obj[x]);
	return ret;
}

var funcMap = {
	takeoff : 0,
	land : 0,
	up : 1,
	down : 1,
	clockwise : 1,
	counterClockwise : 1,
	front : 1,
	back : 1,
	left : 1,
	right : 1,
	stop : 0,
	config : 2,
	animate : 2,
	animateLeds : 2,
	disableEmergency : 0
};

var events = ['landing','landed','takeoff','hovering','flying'];

var Fleet = function(drones){

	var Base = arDrone.Client;

	var self = this;

	// The list of base classes for each drone
	this.services = {};

	// Create a new base class for each drone
	for(var name in drones){
		self.services[name] = arDrone.createClient(drones[name]);
		for(var event in events){
			self.services[name].on(event,function(data){
				handleDroneEvent(name,event,data);
			});
		}
	}

	var passFunction = function(drone,func,arguments){
		if(self.services[drone] !== undefined && self.services[drone][func] !== undefined){
			self.services[drone][func].apply(self.services[drone],argsToArray(arguments));
		}else{
			throw new Error("Error passing function to client does not exist.");
		}
	};

	var handleDroneEvent = function(drone,event,data){
		data = data || {};
		data.drone = drone;
		self.emit(event,data);
	};

	Object.keys(funcMap).forEach(function(funcName){
		var paramCount = funcMap[funcName];
		self[funcName] = function(){
			if(arguments.length === paramCount){
				for(var drone in self.services){
					passFunction(drone,funcName,arguments);
				}
			}else if(arguments.length > paramCount){
				var drone = arguments[0];
				delete arguments[0];
				passFunction(drone,funcName,arguments);
			}else{
				throw new Error("Parameter count error. Expected " + paramCount + " or " + paramCount+1 + " recieved " + arguments.length);
			}
		};
	});
};
util.inherits(Fleet,EventEmitter);

module.exports = Fleet;