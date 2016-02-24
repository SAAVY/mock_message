angular.module('personalWebsite.controllers').controller('navbarController', ['$scope', '$location', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
  };
}]);

angular.module('personalWebsite.controllers').controller('socialMediaController', ['$scope', '$location', '$document',  function($scope, $location, $document) {

  $scope.icons = [
    {text:"linkedin", url:"https://ca.linkedin.com/in/varunseng"},
    {text:"flickr", url:"https://www.flickr.com/photos/133428272@N06/"},
    {text:"instagram", url:"https://www.instagram.com/_varun._/"}
  ];

  $scope.hoverIn = function(icon) {
    var idname = "#" + icon + "-text";
    var myEl = angular.element( document.querySelector( idname ) );
    myEl[0].style.display = 'block';
  };

  $scope.hoverOut = function(icon) {
    var idname = "#" + icon + "-text";
    var myEl = angular.element( document.querySelector( idname ) );
    myEl[0].style.display = 'none';
  };

  $scope.capitalize = function(input) {
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
}]);
