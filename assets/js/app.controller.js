`use strict`;

(function() {

angular
  .module('app')
  .controller('AppController', ['$http', AppController]);

  function AppController($http) {
    var order = this;
    order.episodeTypes = [
      ['film', 'type-film', 'Films'],
      ['SG1', 'type-sg1', 'Stargate SG-1'],
      ['SGA', 'type-sga', 'Stargate Atlantis'],
      ['SGU', 'type-sgu', 'Stargate Universe'],
      ['KW', 'type-kw', 'Kino Webisodes']
    ];

    order.episodes = [];
    $http.get('assets/data/episodes.json').success(function(data) {
      order.episodes = data;
    });
  }
})();
