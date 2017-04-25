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
		'ngParallax',
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
			.when('/servicos-produtos', {
				name: 'works',
				templateUrl: 'views/works.html',
				controller: 'WorksCtrl',
				controllerAs: 'works',
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
	.run(['$rootScope', '$location', '$window', 'Strings', function($rootScope, $location, $window, Strings) {

		$rootScope.loading = {
			count: 0,
			isLoading: function() { return this.count > 0 },
			load: function() { this.count++; },
			unload: function() { this.count--; this.count < 0 ? this.count = 0 : null }
		};

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			$rootScope.currentPath = $location.path();
		});

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {			
			var nav = jQuery('#navbar ul:first-child');

			jQuery(nav).find('li').removeClass('active');
			jQuery(nav).find('li[name="' + current.name + '"]').addClass('active');
		});

		$rootScope.setCollapseNavEvent = function() {
			setTimeout(function() {
				// Esconde o navbar collapse ao clicar em um link
				jQuery('#navbar a').on('click', function() {
					if ($window.innerWidth < 768) {
						jQuery('.navbar-toggle').click();
					}
				});
			}, 500);
		}

	}]);
