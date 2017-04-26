'use strict';

angular.module('siteExpress.controllers', [ ]);
angular.module('siteExpress.services', [ ]);

angular.module('siteExpress', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'siteExpress.controllers',
		'siteExpress.services'
	])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });
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
	.run(['$rootScope', '$window', function($rootScope, $window) {

		$rootScope.loading = {
			count: 0,
			isLoading: function() { return this.count > 0 },
			load: function() { this.count++; },
			unload: function() { this.count--; this.count < 0 ? this.count = 0 : null; }
		};

		var navbar = jQuery('nav.navbar.navbar-default'), 
			body   = jQuery('body');

		angular.element($window).bind("scroll", function(e) {
			if ($window.innerWidth < 768) {
				return;
			}

			if ($window.scrollY >= 150) {
				navbar.addClass('navbar-fixed-top');
				body.addClass('offset-top-50');
			} else {
				navbar.removeClass('navbar-fixed-top');
				body.removeClass('offset-top-50');
			}
		});

		$rootScope.getNumber = function(num) {
			return new Array(Math.max(0, Math.ceil(num)));
		};

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {			
			var nav = jQuery('#navbar-collapse ul:first-child');
			if (!previous || !previous.name) {
				jQuery(nav).find('li').removeClass('active');				
			} else {
				jQuery(nav).find('li[name="' + previous.name + '"]').removeClass('active');
			}			

			jQuery('#navbar-collapse ul li[name="' + current.name + '"]').addClass('active');
		});

		// Esconde o navbar collapse ao clicar em um link
		jQuery('#navbar-collapse a').on('click', function() {
			if ($window.innerWidth < 768) {
				jQuery('.navbar-toggle').click();
			}
		});
	}]);