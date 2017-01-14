"use strict";

angular.module("ngapp").controller("MainController", function ($rootScope, shared, $state, $scope, $mdSidenav, $mdComponentRegistry, $cordovaInAppBrowser, $window) {

   
    $scope.actions = [
        { value: [0, 0, 0, 0],desc:"playing golf" ,checked : false},
        { value: [0, 0, 0, 1], desc: "playing football", checked: false },
        { value: [0, 0, 1, 0], desc: "making business", checked: false },
        { value: [0, 0, 1, 1], desc: "going bar", checked: false },
        { value: [0, 1, 0, 0], desc: "playing with toys", checked: false },
        { value: [0, 1, 0, 1], desc: "doing homework", checked: false },
        { value: [0, 1, 1, 0], desc: "going shool", checked: false },
        { value: [0, 1, 1, 1], desc: "taking job", checked: false },
        { value: [1, 0, 0, 0], desc: "got married", checked: false },
        { value: [1, 0, 0, 1], desc: "fighting with others", checked: false },
        { value: [1, 0, 1, 0], desc: "singing song", checked: false },
        { value: [1, 0, 1, 1], desc: "running on the road", checked: false },
        { value: [1, 1, 0, 0], desc: "going to beauty spa", checked: false },
        { value: [1, 1, 0, 1], desc: "drinking liquor", checked: false },
        { value: [1, 1, 1, 0], desc: "doing business", checked: false },
        { value: [1, 1, 1, 1], desc: "shavinig the hair", checked: false },
    ];

    $scope.persons = [
        { value: [0, 0], desc: "Boy", checked: false },
        { value: [0, 1], desc: "Girl", checked: false },
        { value: [1, 0], desc: "Man", checked: false },
        { value: [1, 1], desc: "Woman", checked: false },
    ]


    var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

    var myNetwork = new Architect.Perceptron(3, 3, 2)
    var trainer = new Trainer(myNetwork)

    $scope.trainingSet = []
    $scope.errorRate = 0;
    $scope.state = 0;

    $scope.train = function () {

        
        trainer.trainAsync($scope.trainingSet, {
            rate: .1,
            iterations: 20000,
            error: .005,
            shuffle: true,
            log: 1000,
            cost: Trainer.cost.CROSS_ENTROPY
        })
        .then(results => $scope.errorRate = results)
    }

    $scope.calculate = function () {
        var action;
        for (var i = 0; i < $scope.actions.length; i++) {
            if ($scope.actions[i].checked) {
                action = $scope.actions[i];
            }
        }
        if (action) {
            var t = myNetwork.activate(action.value);
            alert(t);
        }
       
       
    }


    $scope.actioncheck = function (action) {
        console.log(action);
        setinput();
        //action.checked = !action.checked;
    }
    $scope.gotoactions = function () {
        $scope.state = 1;
        $scope.selectpeson = JSON.parse($scope.selectedperson);



       // alert(JSON.stringify($scope.selectedperson));
    }
    $scope.gotopersons = function () {
        $scope.state = 0;
    }
    $scope.gototraining = function () {
        if ($scope.trainingSet.length > 0) {
            $scope.state = 2;
            
            setTimeout(function () {
                trainer.trainAsync($scope.trainingSet, {
                    rate: .1,
                    iterations: 20000,
                    error: .005,
                    shuffle: true,
                    log: 1000,
                    cost: Trainer.cost.CROSS_ENTROPY
                })
            .then(function (results) {
                console.log(results);
                $scope.errorRate = results;
                $scope.$apply();
            });
            }, 300);
            

        }
        else {
            alert("Need to add some input for training.")
        }
    }

    $scope.personcheck = function (person) {
       
        for (var i = 0; i < $scope.persons.length; i++) {
            $scope.persons[i].checked = false;
         
        }
        
        person.checked = !person.checked;
    }


    $scope.selectperon = function (person) {
        for (var i = 0; i < $scope.persons.length; i++) {
            $scope.persons[i].checked = false;

        }
        person.checked = true;
        $scope.state = 1;
        $scope.selectpeson = person;
    }

    $scope.addinput = function () {
       var set = setinput();
        for (var i = 0; i < $scope.persons.length; i++) {
            $scope.persons[i].checked = false;

        }
        for (var i = 0; i < $scope.actions.length; i++) {
            $scope.actions[i].checked = false;

        }

        for (var i = 0; i < set.length; i++) {
           
            $scope.trainingSet.push(set[i]);
        }
        $scope.state = 0;
        console.log($scope.trainingSet);
    }

    function setinput() {
       var set = [];
        
       if ($scope.selectpeson) {
            for (var i = 0; i < $scope.actions.length; i++) {
                if ($scope.actions[i].checked) {
                    set.push({
                        input: $scope.actions[i].value,
                        output: $scope.selectpeson.value
                    })
                }
            }

            
        }
        return set;
    }
    $scope.restart = function () {
        $scope.trainingSet = [];
        $scope.state = 0;
    }

    $scope.predict = function (action) {
        for (var i = 0; i < $scope.actions.length; i++) {
            $scope.actions[i].checked = false;

        }

        $scope.predicttype = null;
        setTimeout(function () {
            trainer.trainAsync($scope.trainingSet, {
                rate: .1,
                iterations: 20000,
                error: .005,
                shuffle: true,
                log: 1000,
                cost: Trainer.cost.CROSS_ENTROPY
            })
        .then(function (results) {
            console.log(results);
            $scope.errorRate = results;
            $scope.selectaction = action;

            var t = myNetwork.activate(action.value);
            var first = Math.round(t[0]);
            var second = Math.round(t[1]);

            for (var i = 0; i < $scope.persons.length; i++) {
                var result = [first, second];

                if ($scope.persons[i].value + "" == result + "") {
                    //alert($scope.persons[i].desc);
                    $scope.predicttype = i;
                }

            }

            $scope.$apply();

            $window.scrollTo(0, 0);


        });
        }, 300);



       
   
        action.checked = true;
    }
});
