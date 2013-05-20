'use strict';

/* Directives */
angular.module('myApp.directives', []).
    directive('countDown', ['$timeout', function($timeout) {
    	function linkFn(scope, element, attrs) {
    		var target_time = parseInt(scope.input_time);
    		scope.target_time_str = new Date(target_time); 

    		function updateTime() {
    			var current_time = Date.now(); 
    			scope.time_left = Math.round(((target_time > current_time) ? (target_time - current_time) : 0)/1000);
    			if (scope.time_left > 0) { 
    				$timeout(updateTime, 1000); 
    			}
    		};
    		
    		updateTime();
    	}

    	return {
    		restrict: 'E',
    		scope: {
    			input_time: "=t"
    		},
    		template: '<div>{{time_left}} seconds left to {{target_time_str}}</div>',
    		replace: true,
    		link: linkFn
    	}; 
    }]);

