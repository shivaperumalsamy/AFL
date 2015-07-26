var AFL = {
	appName : "afl",
	moduleNames : {
		CONTROLLERS : "afl.controllers",
		SERVICES : "afl.services",
		DIRECTIVES : "afl.directives",
		FILTERS: "afl.filters"
	}
};

var controllers = angular.module(AFL.moduleNames.CONTROLLERS, []);
var services = angular.module(AFL.moduleNames.SERVICES, []);
var directives = angular.module(AFL.moduleNames.DIRECTIVES, []);
var filters = angular.module(AFL.moduleNames.FILTERS, []);

var svgNS = "http://www.w3.org/2000/svg";
