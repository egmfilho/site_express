'use script';

angular.module('siteExpress.controllers')
	.controller('ContactCtrl', ['$rootScope', '$scope', '$window', 'Strings', 'NgMap', function($rootScope, $scope, $window, Strings, NgMap) {

		$scope.strings = Strings.getData();

		NgMap.getMap().then(function(map) {
			$scope.map = map;
		});

		$scope.lattitude = $scope.strings.pages.contact.map.lattitude;
		$scope.longitude = $scope.strings.pages.contact.map.longitude;

		jQuery('form').on('submit', function(e) {
			e.stopPropagation();
			e.preventDefault();
			$rootScope.loading.load();
			jQuery.ajax({
				url: './external/mail.php',
				method: 'POST',
				dataType: 'json',
				data: jQuery('form').serialize(),
				success: function(data) {
					$rootScope.loading.unload();
					$scope.$apply();
				},
				error: function(data) {
					$rootScope.loading.unload();
					$scope.$apply();
				}
			});
		});

	}]);