'use strict';

angular.module('siteExpress.controllers')
	.controller('FooterCtrl', ['$scope', 'Strings', function($scope, Strings) {
		Strings.promise.then(function(success) {
			$scope.strings = Strings.getData();
		});
	}]);