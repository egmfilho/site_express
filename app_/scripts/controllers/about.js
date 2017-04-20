'use script';

angular.module('siteExpress.controllers')
	.controller('AboutCtrl', ['$scope', 'Strings', function($scope, Strings) {
	
		$scope.strings = Strings.getData();

	}]);