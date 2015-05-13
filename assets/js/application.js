(function() {
	var app = angular.module('stargate', []);

	app.controller('OrderController', ['$http',
		function($http) {
			var order = this;
			order.episodes = [];

			$http.get('assets/data/episodes.json').success(function(data) {
				order.episodes = data;
			});
		}
	])
		.directive('episode', function() {
			return {
				templateUrl: 'assets/templates/episode.html'
			}
		});
})();
