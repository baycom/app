'use strict';
$(function () {
	var ws_options = new WebSocket('ws://'+location.host+'/ws_options');

	var bypass = false;
	var mono = false;
	var record = false;
	var onair = false;
	var raisehand = false;
	var afk = false;

	function RefreshBypass() {
		if (bypass) {
			$("#btn-bypass").removeClass("btn-default");
			$("#btn-bypass").addClass("btn-danger");
		} else {
			$("#btn-bypass").removeClass("btn-danger");
			$("#btn-bypass").addClass("btn-default");
		}
	}

	function RefreshMono() {
		if (mono) {
			$("#btn-mono").removeClass("btn-default");
			$("#btn-mono").addClass("btn-primary");

			$("#btn-stereo").removeClass("btn-primary");
			$("#btn-stereo").addClass("btn-default");

			$("#btn-stereo").attr("aria-pressed", false);
			$("#btn-mono").attr("aria-pressed", true);
		} else {
			$("#btn-mono").removeClass("btn-primary");
			$("#btn-mono").addClass("btn-default");

			$("#btn-stereo").removeClass("btn-default");
			$("#btn-stereo").addClass("btn-primary");

			$("#btn-stereo").attr("aria-pressed", true);
			$("#btn-mono").attr("aria-pressed", false);
		}
	}

	function RefreshRecord() {
		if (record) {
			$("#btn-record").removeClass("btn-default");
			$("#btn-record").addClass("btn-danger");
		} else {
			$("#btn-record").removeClass("btn-danger");
			$("#btn-record").addClass("btn-default");
		}
	}

	function RefreshOnair() {
		if (onair) {
			$("#btn-onair").removeClass("btn-default");
			$("#btn-onair").addClass("btn-danger");
		} else {
			$("#btn-onair").removeClass("btn-danger");
			$("#btn-onair").addClass("btn-default");
		}
	}

	function RefreshRaisehand() {
		if (raisehand) {
			$("#btn-raise-hand").removeClass("btn-default");
			$("#btn-raise-hand").addClass("btn-danger");
		} else {
			$("#btn-raise-hand").removeClass("btn-danger");
			$("#btn-raise-hand").addClass("btn-default");
		}
	}

	function RefreshAFK() {
		if (afk) {
			$("#btn-afk").removeClass("btn-default");
			$("#btn-afk").addClass("btn-danger");
		} else {
			$("#btn-afk").removeClass("btn-danger");
			$("#btn-afk").addClass("btn-default");
		}
	}

	function RefreshEventListener() {
		$( ".option-change" ).on( "click", function() {
			ws_options.send('{"key": "'+$(this).attr('data-option')+'", "value": "'+$(this).attr('data-value')+'"}');
		});

	}

	ws_options.onmessage = function (message) {
		var msg = JSON.parse(message.data);
		if (msg.bypass) {
			if (msg.bypass == "true") {
				bypass = true;
			} else {
				bypass = false;
			}
			RefreshBypass();
		}
		if (msg.mono) {
			if (msg.mono == "true") {
				mono = true;
			} else {
				mono = false;
			}
			RefreshMono();
		}
		if (msg.record) {
			if (msg.record == "true") {
				record = true;
			} else {
				record = false;
			}
			RefreshRecord();
		}
		if (msg.onair) {
			if (msg.onair == "true") {
				onair = true;
			} else {
				onair = false;
			}
			RefreshOnair();
		}
		if (msg.raisehand) {
			if (msg.raisehand == "true") {
				raisehand = true;
			} else {
				raisehand = false;
			}
			RefreshRaisehand();
		}
		if (msg.afk) {
			if (msg.afk == "true") {
				afk = true;
			} else {
				afk = false;
			}
			RefreshAFK();
		}

		delete msg.bypass;
		delete msg.mono;
		delete msg.record;
		delete msg.onair;
		delete msg.raisehand;
		delete msg.afk;

		$( "#options" ).html(Handlebars.templates.options(msg));

		RefreshEventListener();
	};

	RefreshEventListener();

	$( "#btn-bypass" ).on( "click", function() {
		if (bypass) {
			bypass = false;
		} else {
			bypass = true;
		}

		ws_options.send('{"key": "bypass", "value": "'+bypass+'"}');
	});
	$( "#btn-mono" ).on( "click", function() {
		ws_options.send('{"key": "mono", "value": "true"}');
	});
	$( "#btn-stereo" ).on( "click", function() {
		mono = false;
		ws_options.send('{"key": "mono", "value": "false"}');
	});
	$( "#btn-record" ).on( "click", function() {
		if (record) {
			record = false;
		} else {
			record = true;
		}

		ws_options.send('{"key": "record", "value": "'+record+'"}');
	});
	$( "#btn-onair" ).on( "click", function() {
		if (onair) {
			onair = false;
		} else {
			onair = true;
		}

		ws_options.send('{"key": "onair", "value": "'+onair+'"}');
	});
	$( "#btn-raise-hand" ).on( "click", function() {
		if (raisehand) {
			raisehand = false;
		} else {
			raisehand = true;
		}

		ws_options.send('{"key": "raisehand", "value": "'+raisehand+'"}');
	});
	$( "#btn-afk" ).on( "click", function() {
		if (afk) {
			afk = false;
		} else {
			afk = true;
		}

		ws_options.send('{"key": "afk", "value": "'+afk+'"}');
	});
});
