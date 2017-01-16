  angular
    .module('KD')
    .controller('navCtrl', navCtrl);

  function navCtrl($scope, $location, $interval, $window, auth) {
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


  }