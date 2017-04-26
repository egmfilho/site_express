'use strict';

angular.module('siteExpress.controllers')
	.controller('WorksCtrl', ['$scope', 'Strings', function($scope, Strings) {
	
		$scope.strings = Strings.getData();

	}]);