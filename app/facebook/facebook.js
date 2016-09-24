'use strict';

angular.module('ngFriend.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('890137914450678'); //facebook App ID
  $facebookProvider.setPermissions("email","public_profile","user_friends","user_photos"," read_custom_friendlists","user_birthday", "friends_birthday", "user_location" , "friends_location");
})

.run( function( $rootScope ) {
  // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
})


.controller('FacebookCtrl', ['$scope', '$facebook' ,function($scope, $facebook) {
	$scope.isLoggedIn = false;

	$scope.login = function(){
		$facebook.login().then(function(){
			$scope.isLoggedIn = true;
			$scope.loadFriends();
			refresh();
		});
	}

	$scope.logout = function(){
		$facebook.logout().then(function(){
			$scope.isLoggedIn = false;
			refresh();
		});
	}

	function refresh(){
		$facebook.api("/me").then(function(response){
			$scope.welcomeMsg = "Welcome "+ response.name;
			$scope.isLoggedIn = true;
			$scope.userInfo = response;
			$facebook.api('/me/picture').then(function(response){
				$scope.picture = response.data.url;
				$facebook.api('/me/permissions').then(function(response){
					$scope.permissions = response.data;
				});
			})
		},
		function(err){
			$scope.welcomeMsg = "Log in to Facebook";
		});
	}

	// refresh();

	$scope.loadFriends = function() {
      $facebook.api('/me/friends', function(response) {
        $scope.$apply(function() {
          $scope.friendList = response.data;
          console.log($scope.email);
        });

      });
    };

}]); 