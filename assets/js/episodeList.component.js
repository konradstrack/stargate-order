`use strict`;

(function() {
	angular
    .module('app')
		.component('sgEpisodeList', {
        templateUrl: 'assets/js/episodeList.component.html',
        controller: ['$anchorScroll', '$http', '$location', sgEpisodeListController],
        controllerAs: 'vm',
      });

    function sgEpisodeListController($anchorScroll, $http, $location) {
      var vm = this;
      vm.previousId = previousId;
      vm.nextId = nextId;

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
          vm.episodes = response.data.map(function(e) {
            return {
              id: episodeId(e),
              type: e.type,
              season: e.season,
              number: e.number,
              name: e.name
            };
          });
        }
      );

      function previousId() {
        var i = findCurrentIndex();
        if (i > 0) {
          $location.hash(vm.episodes[i-1].id);
          $anchorScroll();
        }
      }

      function nextId() {
        var i = findCurrentIndex();
        if (i < vm.episodes.length) {
          $location.hash(vm.episodes[i+1].id);
          $anchorScroll();
        }
      }

      function findCurrentIndex() {
        var id = $location.hash();

        for (var i = 0; i < vm.episodes.length; ++i) {
          if (vm.episodes[i].id == id) {
            return i;
          }
        }

        return 0;
      }

      function episodeId(episode) {
        return episode.type + '-' + episode.season + '-' + episode.number;
      }
    }
})();
