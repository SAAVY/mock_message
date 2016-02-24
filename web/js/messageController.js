angular.module('personalWebsite.controllers').controller('messageController', ['$scope', '$location', function($scope, $location) {
  $scope.messages = [];
  $scope.currentMessage = "";
  $scope.names = ["Magpie", "Meenu", "Alice"];
  $scope.sendMessage = function() {
      $scope.messages.push($scope.currentMessage);
      var xmlHttp = new XMLHttpRequest();
      var magpie_url = "http://localhost:5000/website?src=" + $scope.currentMessage;
      xmlHttp.open( "GET", magpie_url, false ); // false for synchronous request
      xmlHttp.send( null );
      $scope.currentMessage = "";
      $scope.messages.push(xmlHttp.responseText);
  }
}]);
