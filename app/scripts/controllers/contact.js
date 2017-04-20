'use script';

angular.module('siteExpress.controllers')
	.controller('ContactCtrl', ['$scope', '$window', 'Strings', 'NgMap', function($scope, $window, Strings, NgMap) {
	
		var self = this;

		$scope.strings = Strings.getData();

		NgMap.getMap().then(function(map) {
			self.map = map;
		});

		$scope.lattitude = $scope.strings.pages.contact.lattitude;
		$scope.longitude = $scope.strings.pages.contact.longitude;

		$scope.$on('$viewContentLoaded', function() {
			setTimeout(function() {
				if ($window.innerWidth >= 768) {
					jQuery('#map').css('height', jQuery('.form-contact').outerHeight());
				} else {
					jQuery('#map').css('height', 400);
				}
			}, 100);
		});

	}]);