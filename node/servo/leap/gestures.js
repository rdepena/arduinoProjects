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

	var isHandPresent = function (frame) {
		return frame.hands[0].valid;
	};

	var palmPosition = function (frame) {
		return {
			x : frame.hands[0].stabilizedPalmPosition[0],
			y : frame.hands[0].stabilizedPalmPosition[1],
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

	var pointDelta = function (frame) {

		var palm = palmPosition(frame);
		var	tip = tipPosition(frame);

		return {
			x : palm.x - tip.x,
			y : palm.y - tip.y,
			z : palm.x - tip.x
		};
	};


	my.processFrame = function (frame) {
		var isValid = isFrameValid(frame);
		return {
			isFrameValid : isValid,
			pointDirection : isValid ? pointDelta(frame) : null,
			isHandPresent : isValid ? isHandPresent(frame) : null

		};
	};

	return my;
};

module.exports = gestures;