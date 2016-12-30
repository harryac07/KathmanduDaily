  angular
    .module('KD')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/common/navigation/navigation.html',
      controller: 'navCtrl'
    };
  }

//Directive or route for directive view navigation