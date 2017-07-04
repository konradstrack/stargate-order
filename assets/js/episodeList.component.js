`use strict`;

(function() {
	angular
    .module('app')
		.component('sgEpisodeList', {
        templateUrl: 'assets/js/episodeList.component.html',
        controller: ['$anchorScroll', '$http', '$location', '$scope', sgEpisodeListController],
        controllerAs: 'vm',
      });

    function sgEpisodeListController($anchorScroll, $http, $location, $scope) {
      var vm = this;
      vm.previousId = previousId;
      vm.nextId = nextId;
      vm.currentIndex = currentIndex;

      vm.episodesById = {};
      vm.episodes = [];

      vm.episodeTypes = [
        ['film', 'type-film', 'Films'],
        ['SG1', 'type-sg1', 'Stargate SG-1'],
        ['SGA', 'type-sga', 'Stargate Atlantis'],
        ['SGU', 'type-sgu', 'Stargate Universe'],
        ['KW', 'type-kw', 'Kino Webisodes']
      ];

      activate();

      function activate() {
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

            for (var i = 0; i < vm.episodes.length; ++i) {
              var episode = vm.episodes[i];
              vm.episodesById[episode.id] = i;
            }
          }
        );
      }

      function previousId() {
        var i = currentIndex();
        if (i > 0) {
          $location.hash(vm.episodes[i-1].id);
          $anchorScroll();
        }
      }

      function nextId() {
        var i = currentIndex();
        if (i < vm.episodes.length) {
          $location.hash(vm.episodes[i+1].id);
          $anchorScroll();
        }
      }

      function currentIndex() {
        var id = $location.hash();
        return vm.episodesById[id] || 0;
      }

      function episodeId(episode) {
        var id = episode.type;

        if (episode.season !== undefined) {
          id += '-' + episode.season;
        }

        if (episode.number !== undefined) {
          id += '-' + episode.number;
        }

        return id;
      }
    }
})();
