'use strict';

angular.module('siteExpress.controllers')
	// .controller('HeaderCtrl', ['$scope', 'parallaxHelper', 'Strings', function($scope, parallaxHelper, Strings) {
	.controller('HeaderCtrl', ['$scope', 'Strings', function($scope, Strings) {

		// this.parallax = parallaxHelper.createAnimator(-0.5);
		

		Strings.promise.then(function(success) {
			$scope.strings = Strings.getData();
		})

	}]);