angular.module('personalWebsite.directives', [])
	.directive('navBar', function() {
  	return {
    	templateUrl: 'partials/navbar.html'
  };
})
	.directive('socialMediaBar', function() {
    return {
      templateUrl: 'partials/social-media-bar.html'
    };
  });;