'use script';

angular.module('siteExpress.controllers')
	.controller('ContactCtrl', ['$scope', 'Strings', 'NgMap', function($scope, Strings, NgMap) {
	
		var self = this;

		$scope.strings = Strings.getData();

		NgMap.getMap().then(function(map) {
			self.map = map;
		});

		$scope.lattitude = $scope.strings.pages.contact.lattitude;
		$scope.longitude = $scope.strings.pages.contact.longitude;

	}]);