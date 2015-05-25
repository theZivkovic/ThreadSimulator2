var threadSimulatorApp = angular.module('ThreadSimulatorApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider)
{
	$routeProvider.when('/', {
		templateUrl: '/views/mainView.html',
		controller: 'mainController'
	});

}]);

