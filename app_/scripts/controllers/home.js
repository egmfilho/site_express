'use strict';

angular.module('siteExpress.controllers')
	.controller('HomeCtrl', ['$scope', 'Strings', function($scope, Strings) {

		$scope.strings = Strings.getData();

	}]);