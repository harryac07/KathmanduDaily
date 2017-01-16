  angular
    .module('KD')
    .directive('sidebar', sidebar);

  function sidebar () {
    return {
      restrict: 'EA',
      templateUrl: '/common/sidebar/sidebar.html',
      controller: 'sidebarCtrl'
    };
  }

//Directive or route for directive view navigation