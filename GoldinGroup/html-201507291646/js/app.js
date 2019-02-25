(function(angular) {
	'use strict';

	var app = angular.module('gg', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'sn.skrollr',
		'duScroll'
	]);

	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
				when('/', {
					templateUrl: 'templates/home.html',
					controller: 'homeCtrl'
				}).
				when('/home', {
					templateUrl: 'templates/home.html',
					controller: 'homeCtrl'
				}).
				when('/about', {
					templateUrl: 'templates/about.html',
					controller: 'aboutCtrl'
				}).
				when('/articles', {
					templateUrl: 'templates/articles.html',
					controller: 'articlesCtrl'
				}).
				when('/articles/:slug', {
					templateUrl: 'templates/article.html',
					controller: 'articleCtrl'
				}).
				when('/contact', {
					templateUrl: 'templates/contact.html',
					controller: 'contactCtrl'
				}).
				when('/404', {
					templateUrl: 'templates/404.html',
					controller: 'page404Ctrl'
				}).
				otherwise({
					redirectTo: '/404'
				});
		}]);

	app.config(['snSkrollrProvider', function(snSkrollrProvider) {
		snSkrollrProvider.config = {
			smoothScrolling: true,
			forceHeight: false
		};
	}]);

	app.directive('manFade', function() {
		return {
			restrict: "A",
			link: function ($scope, $element) {
				$element.fadeIn(10000);
			}
		};
	});

	app.controller('shellCtrl', [
		'$rootScope', '$timeout',
		function($rootScope, $timeout) {
			angular.extend($rootScope, {
				$safeApply: function (fn) {
					var phase = this.$$phase;
					if (phase == '$apply' || phase == '$digest') {
						if (fn && (typeof (fn) === 'function')) {
							fn();
						}
					} else {
						this.$apply(fn);
					}
				}
			});

			$rootScope.manFace = function() {
				$('.man-face').fadeIn(3000).fadeOut(3000);
			};

			$rootScope.date = new Date();
	}]);

	app.controller('homeCtrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate',
		function($scope, $rootScope, $location, $timeout, $animate) {
			$scope.goContact = function() {
				$location.path('/contact');
			};
		}]);

	app.controller('aboutCtrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate',
		function($scope, $rootScope, $location, $timeout, $animate) {
		}]);

	app.controller('articlesCtrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate', '$http',
		function($scope, $rootScope, $location, $timeout, $animate, $http) {
			$scope.articles = [];
			$http.get('/article/all').
				success(function(data, status, headers, config) {
					$scope.articles = data;
				}).
				error(function(data, status, headers, config) {
					$scope.articles = [
						{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
						,{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
						,{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
						,{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
						,{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
						,{"id":"2","title":"Русское название","annotation":"annotation","article_text":"article text","slug":"russkoe-nazvanie","keywords":"keywords","is_deleted":"0"}
					];
					//$location.path('/404');
				});
		}]);

	app.controller('articleCtrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate', '$http', '$routeParams', '$sce',
		function($scope, $rootScope, $location, $timeout, $animate, $http, $routeParams, $sce) {
			$scope.currentArticle = [];
			var processData = function(data) {
				data.letter = data.title.substr(0,1).toUpperCase();
				data.article_text = $sce.trustAsHtml(data.article_text);
				return data;
			};
			$http.get('/article/' + $routeParams.slug).
				success(function(data, status, headers, config) {
					$scope.currentArticle = processData(data);
				}).
				error(function(data, status, headers, config) {
					data = {
						"id":"2",
						"title":"неРусское название",
						"annotation":"Autem consequuntur corporis cumque distinctio dolore ducimus eaque eum, id itaque iure, nemo quas quos recusandae repudiandae sapiente, tenetur veritatis voluptate voluptatibus!",
						"article_text":"<h1>Title H1</h1><h2>Title H2</h2><h3>Title H3</h3><h4>Title H4</h4><h5>Title H5</h5><h6>Title H6</h6><p><b>This</b><sup>sup</sup> <i>is</i> <del>paragraph</del></p><p><strong>This</strong><sub>sub</sub> <em>is</em> <span style=\"text-decoration: line-through;\">another</span> <span style=\"text-decoration: underline;\">paragraph</span></p><div class=\"article-quote\"><p style=\"text-align: center\">Article quote</p></div><div class=\"article-blockquote\">Article blockquote</div><ul style=\"list-style-type: circle;\"><li>List item</li><li>List item</li><li>List item</li></ul><ol style=\"list-style-type: upper-roman;\"><li>List item</li><li>List item</li><li>List item</li></ol>",
						"slug":"russkoe-nazvanie",
						"keywords":"keywords",
						"is_deleted":"0",
						"author_name": "Lorem Ipsum",
						"author_position": "Dolor sit amet, consectetur adipisicing elit",
						"date": "2015"
					};
					$scope.currentArticle = processData(data);
					$location.path('/404');
				});
		}]);

	app.controller('contactCtrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate',
		function($scope, $rootScope, $location, $timeout, $animate) {
		}]);

	app.controller('page404Ctrl', [
		'$scope', '$rootScope', '$location', '$timeout', '$animate',
		function($scope, $rootScope, $location, $timeout, $animate) {
		}]);

})(window.angular);