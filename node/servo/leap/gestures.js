/*jslint indent: 4, maxerr: 50, vars: true, nomen: true*/
/*global */
var gestures = function () {
	"use strict";

	var my = {};

	var isFrameValid = function (frame) {

		if (frame.pointables && frame.pointables[0] && frame.hands && frame.hands[0]) {
			return frame.pointables[0].valid && frame.hands[0].valid;
		}

		return false;
	};

	var palmPosition = function (frame) {
		return {
			x : frame.hands[0].stabilizedPalmPosition[0],
			y : frame.hands[0].stabilizedPalmPosition[1],
			//at the moment I am only interested in x and y but including z.
			z : frame.hands[0].stabilizedPalmPosition[2]
		};
	};

	var tipPosition = function (frame) {
		return {
			x : frame.pointables[0].stabilizedTipPosition[0],
			y : frame.pointables[0].stabilizedTipPosition[1],
			z : frame.pointables[0].stabilizedTipPosition[2]
		};
	};

	//TODO: determine the angle of the two points.
	var pointDelta = function (frame) {

		var palm = palmPosition(frame);
		var	tip = tipPosition(frame);

		return {
			x : palm.x - tip.x,
			y : palm.y - tip.y,
			z : palm.x - tip.x
		};
	};

	//this is not correct, need to determine the correct approach.
	var pointAngle = function (frame) {
		var deltas = pointDelta(frame);
		console.log(deltas.y);
		console.log(deltas.x);
		var atan = Math.atan2(deltas.y / deltas.x);
		var angleInDegrees = atan * 180 / Math.PI;

		return angleInDegrees;
	};

	my.processFrame = function (frame) {
		var isValid = isFrameValid(frame);
		return {
			isFrameValid : isValid,
			pointDirection : isValid ? pointDelta(frame) : null,
			pointAngle : isValid ? pointAngle(frame) : null
		};
	};

	return my;
};

module.exports = gestures;