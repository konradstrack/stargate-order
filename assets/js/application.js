(function() {
	var app = angular.module('stargate', []);

	app.controller('OrderController', ['$http',
		function($http) {
			var order = this;
			order.episodeTypes = [
				['film', 'type-film'],
				['SG1', 'type-sg1'],
				['SGA', 'type-sga'],
				['SGU', 'type-sgu'],
				['KW', 'type-kw']
			];

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
