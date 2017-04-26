'use strict';

angular.module('siteExpress.controllers')
	.controller('AboutCtrl', ['$scope', 'Strings', function($scope, Strings) {

		Strings.promise.then(function(success) {
			$scope.strings = Strings.getData();			
		});

	}]);