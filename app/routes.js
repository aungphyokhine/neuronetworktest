"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main/main.html",
        title: "Cordova Angular-Material",
        controller: "MainController",
        controllerAs: "main"
    })
    .state("stock", {
        url: "/stock",
        templateUrl: "app/components/stock/stock.html",
        title: "Cordova Angular-Material",
        controller: "StockController",
        controllerAs: "main"
    });

}]);
