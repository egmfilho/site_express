'use script';

angular.module('siteExpress.controllers')
	.controller('ContactCtrl', ['$rootScope', '$scope', '$window', 'Strings', function($rootScope, $scope, $window, Strings) {

		$scope.strings = Strings.getData();		

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