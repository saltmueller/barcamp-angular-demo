'use strict';

var app = angular.module("myApp"); 

/* Controllers */

function HomeCtrl () {}
HomeCtrl.$inject = []; 

// ******* CRUD 
function CRUDCtrl(scope, resource) {
    scope.title_input = "";
    scope.description_input = ""; 

    var Item = resource('/item/:iid', { iid: "@id" } );
    scope.records = Item.query();

    scope.addRecord = function () { 
        var rec = {
            'title' : scope.title_input,
            'description' : scope.description_input,
        }; 
        var newItem = new Item(rec); 
        newItem.$save(function () {
            console.log("Got result"); 
            scope.records = Item.query(); 
        }); 
    }; 

    scope.deleteRecord = function (idx) { 
        var target_id = scope.records[idx].id; 
        Item.remove({iid : target_id}, function () { 
            console.log("Item deleted !");
            scope.records = Item.query(); 
        }); 
    }; 
}
CRUDCtrl.$inject = ['$scope', '$resource']

function ClockCtrl(scope) {
    var now = Date.now();
    scope.target_time_1 = now + 3 * 60 * 1000;  // 3 min in the future  
    scope.target_time_2 = now + 6 * 60 * 1000;  // 6 ...
    scope.target_time_3 = now + 9 * 60 * 1000; 
    scope.target_time_4 = now + 12 * 60 * 1000;
}
ClockCtrl.$inject = ['$scope'];
