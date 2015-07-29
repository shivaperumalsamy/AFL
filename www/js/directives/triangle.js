directives.directive('triangle', ['$state', '$log', function($state, $log) {
	return {
		restrict: 'E',
		templateUrl : 'templates/directives/triangle.html',
		scope: {},
		link : function(scope, element, attr) {
			global = attr;
			// triangleDiv = angular.element(element[0].querySelector('.triangle'));
			scope.halfWindowWidth= Math.floor(window.innerWidth / 2);
			scope.halfWindowHeight = Math.floor(window.innerHeight / 2) + 0;

			element.css('height', scope.halfWindowHeight + 'px');
			$log.debug('halfWindowWidth: ' + scope.halfWindowWidth);
			$log.debug('halfWindowHeight: ' + scope.halfWindowHeight);
			// triangleDiv.css('border-left-width', scope.halfWindowWidth + 'px');
			// triangleDiv.css('border-right-width', scope.halfWindowWidth + 'px');
			// triangleDiv.css('border-top-width', scope.halfWindowHeight + 'px');

			var svg = angular.element(element[0].querySelector('svg'));
			
			svg.css('height', scope.halfWindowHeight + 'px');

			var triangle = document.createElementNS(svgNS, 'polygon');
			trianglePath = "0,0 " + window.innerWidth + ",0 " + scope.halfWindowWidth + "," + scope.halfWindowHeight;
			triangle.setAttributeNS(null, 'fill', 'blueviolet');
			triangle.setAttributeNS(null, 'points', trianglePath);

			svg.append(triangle);


			var avnet_logo = angular.element(element[0].querySelector('.avnet_logo'));
			var apl_logo = angular.element(element[0].querySelector('.apl_logo'));


			if(global.hasOwnProperty('withAvnetLogo')) {
				avnet_logo.css('top', '20%');
				apl_logo.css('bottom', '25%');
			}
			else {
				avnet_logo.css('display', 'none');
				apl_logo.css('bottom', '50%');
			}
		}
	};
}]);