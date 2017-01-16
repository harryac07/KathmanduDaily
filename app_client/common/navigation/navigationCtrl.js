  angular
      .module('KD')
      .controller('navCtrl', navCtrl);

  function navCtrl($scope, $location, $interval, $window, $timeout, auth, mainService) {
      $scope.currentTime = moment.utc(new Date).local().format('YYYY MM DD , hh:mm:ss a');
      /* live current time */
      $interval(function() {
          $scope.currentTime = moment.utc(new Date).local().format('YYYY MM DD , hh:mm:ss a');
      }, 1000);

      /* handling user logina nd logout status in navigation */
      $scope.isLoggedIn = auth.isLoggedIn();

      $scope.currentUser = auth.currentUser();

      $scope.logout = function() {
          auth.logout();
          $window.location.reload();
      };

      /* load main */
      /* load subscription form only if user is logged in /default will set to be true for subscription ;) later*/
      // if ($scope.isLoggedIn) {
      //     $timeout(function() {
      //         $('#myModal').modal('show');
      //     }, 10000); //60 sec    
      // }

      /* take subscription email to handlew subscription */
      $scope.credential = {
          email: ""
      };
      $scope.formError = "";
      $scope.onSubmit = function() {
          if (!$scope.credential.email) {
              $scope.formError = "Please type valid email to subscribe.";
          }
          mainService.subscribe($scope.credential)
              .error(function(err) {
                  $scope.formError = err;
              })
              .then(function() {
                  $('#myModal').modal('hide');
              });
      };
  }