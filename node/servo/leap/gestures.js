/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var gestures = function () {
	"use strict";

	var pointables = require('./pointables.js')();
	var my = {};
	var gestureEvents = [];
	var lastPublishedEventTime = null;

	//we only want to process gestures each x seconds.
	var isWithinTimeThreshold = function () {
		var millisecond = 2000;
		if(lastPublishedEventTime) {
			return Date.now() - lastPublishedEventTime > millisecond;
		}
		return true;
	};


	//invoke the callbacks for a specified gesture.
	var publishGesture = function (gesture) {
		if (gestureEvents[gesture.type]) {
			for (var x = 0; x < gestureEvents[gesture.type].length; x++) {
				gestureEvents[gesture.type][x]();
				lastPublishedEventTime = Date.now();
			}
		}
	};

	//Process the frame to look for gestures.
	var processGestures = function (frame) {
		//only respond if two fingers are shown.
		if(frame.pointables.length === 2 && isWithinTimeThreshold() && frame.gestures.length > 0) { 
			//we check the event raised against our subscribed events.
			for (var i = 0; i < frame.gestures.length; i++) {
				var gesture = frame.gestures[i];
				publishGesture(gesture);
			}
		}
	};

	//subscribe to events.
	my.on = function (gesture, callback) {
		if (!gestureEvents[gesture]) {
			gestureEvents[gesture] = [];
		}
		gestureEvents[gesture].push(callback);
	};

	my.processFrame = function (frame) {
		processGestures(frame);
		var pointable = pointables.processFrame(frame);
		return { 
			isFrameValid : pointable.isValid,
			pointDirection : pointable.pointDirection  
		};
	};

	return my;
};

module.exports = gestures;