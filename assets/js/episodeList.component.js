`use strict`;

(function() {
	angular
    .module('app')
		.component('sgEpisodeList', {
        templateUrl: 'assets/js/episodeList.component.html',
        controller: ['$http', sgEpisodeListController],
        controllerAs: 'vm',
      });

    function sgEpisodeListController($http) {
      var vm = this;
      vm.episodeTypes = [
        ['film', 'type-film', 'Films'],
        ['SG1', 'type-sg1', 'Stargate SG-1'],
        ['SGA', 'type-sga', 'Stargate Atlantis'],
        ['SGU', 'type-sgu', 'Stargate Universe'],
        ['KW', 'type-kw', 'Kino Webisodes']
      ];

      vm.episodes = [];
      $http.get('assets/data/episodes.json').then(
        function(response) {
          vm.episodes = response.data;
        }
      );
    }
})();
