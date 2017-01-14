"use strict";

angular.module("ngapp").controller("AppController", function ($rootScope,shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser) {

    var ctrl = this;

    $scope.auth = shared.info.auth;

    $scope.toggle = angular.noop;

    $scope.title = $state.current.title;


    $scope.isOpen = function () { return false };
    $mdComponentRegistry
    .when("left")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });

    $scope.toggleRight = function () {
    $mdSidenav("left").toggle()
        .then(function(){
        });
    };

    $scope.close = function () {
    $mdSidenav("right").close()
        .then(function(){
        });
    };



    
});
