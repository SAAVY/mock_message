angular.module('personalWebsite.controllers').controller('messageController', ['$scope', '$location', function($scope, $location) {
  $scope.messages = [];
  $scope.currentMessage = "";
  $scope.names = ["Magpie", "Meenu", "Alice"];
  $scope.sendMessage = function() {
      $scope.messages.push($scope.currentMessage);
      $scope.currentMessage = "";
  }
}]);
