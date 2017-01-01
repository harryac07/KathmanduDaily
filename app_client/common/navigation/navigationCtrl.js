  angular
  	.module('KD',['ngSanitize','angularMoment'])
  	.controller('navCtrl', navCtrl);

  function navCtrl($scope, $location, $interval, $window) {
  	$scope.currentTime = moment().format('YYYY MM DD , hh:mm:ss a');
  	/* live current time */
  	$interval(function() {
  		$scope.currentTime = moment().format('YYYY MM DD , hh:mm:ss a');
  	}, 1000);


  }