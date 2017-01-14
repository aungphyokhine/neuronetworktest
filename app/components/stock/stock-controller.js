"use strict";

angular.module("ngapp").controller("StockController", function (shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser) {

    var ctrl = this;
    $scope.entry = true;
    $scope.stock = {};

















    $scope.add = function () {

    
        $scope.entry = false;
    }
    $scope.back = function () {
        $scope.entry = true;
    }
    $scope.submit = function () {


        var currentUser = Parse.User.current();
        if (currentUser) {
            // do stuff with the user
        } else {
            alert("No User");
            // show the signup or login page
        }
        var Stock = Parse.Object.extend("Stock");
        var stock = new Stock();

        stock.set("name", $scope.stock.name);
        stock.set("description", $scope.stock.description);
        stock.set("amount", $scope.stock.amount);
        stock.set("currency", $scope.stock.currency);
        stock.set("qty", $scope.stock.qty);
        stock.set("imageurl", $scope.stock.imageurl);


        stock.save(null, {
            success: function (newstock) {
                // Execute any logic that should take place after the object is saved.
                alert('New object created with objectId: ' + newstock.id);
            },
            error: function (stock, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });

       
        var query = new Parse.Query(Stock);
        //query.equalTo("playerName", "Dan Stemkoski");
        query.find({
            success: function (results) {
                alert("Successfully retrieved " + results.length + " stocks.");
                // Do something with the returned Parse.Object values
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    alert(object.id + ' - ' + object.get('name'));
                }
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    this.title = $state.current.title;
    $scope.currencies = [{ abbrev: 'MMK', value: 'MMK' }, { abbrev: 'USD', value: 'USD' }]
});
