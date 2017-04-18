'use strict';

angular.module('siteExpress.controllers', [ ]);
angular.module('siteExpress.services', [ ]);

angular.module('siteExpress', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'siteExpress.controllers',
		'siteExpress.services',
		'duParallax',
		'ngMap'
	])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}])
	.config(['$routeProvider', function($routeProvider) {

		var resolve = {
			'StringsData': ['Strings', function(Strings) {
				return Strings.promise;
			}]
		};

		$routeProvider
			.when('/', {
				name: 'home',
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'home',
				resolve: resolve
			})
			.when('/sobre', {
				name: 'about',
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about',
				resolve: resolve
			})
			.when('/contato', {
				name: 'contact',
				templateUrl: 'views/contact.html',
				controller: 'ContactCtrl',
				controllerAs: 'contact',
				resolve: resolve
			})
			.otherwise({
				redirectTo: '/'
			});

	}])
	.run(['$rootScope', '$location', 'Strings', function($rootScope, $location, Strings) {

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			$rootScope.currentPath = $location.path();
		});

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {			
			var nav = jQuery('#navbar ul:first-child');

			jQuery(nav).find('li').removeClass('active');
			jQuery(nav).find('li[name="' + current.name + '"]').addClass('active');
		});

		// Esconde o navbar collapse ao clicar em um link
		jQuery('.navbar-header .navbar-brand, #navbar-collapse a').on('click', function() {
			if ($window.innerWidth < 768) {
				jQuery('.navbar-toggle').click();
			}
		});

	}]);
