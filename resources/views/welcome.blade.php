<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <?php do_includes(); ?>
    <title>Some Quotes</title>
    <link rel="icon" type="image/png" href="sq.png">
    <link href="css/site.css" rel="stylesheet" type="text/css" media="all">
</head>
<body>
    <div class="container-fluid">
        <div class="body">
            <div ng-app="textBoxes" ng-controller="boxCtrl">
                <br>
                <br>
                <span>
                    <div ng-repeat="p in quotes" ng-cloak>
                        <p ng-bind-html="p.quote | unsafe"></p>
                        <p ng-bind-html="p.author | unsafe"></p>
                        <br>
                    </div>
                </span>
            </div>
        </div>
    </div>
    <script>
const baseURL = 'https://smallfolio.bitnamiapp.com/somequotes/';
var app = angular.module('textBoxes', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('boxCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

    $scope.quotes = [];

        var url = baseURL + 'get_quotes_random.php?limit=50&start=0';

        $.getJSON(url, function(json) {
            var getQuotes = [];
            var status = json[0].Response;
            var quotesRespose = json[1];
            var quotesSize = quotesRespose.length;

            if(status === 'Good') {
                for(var i = 0; i < quotesSize; i++) {
                    var add = {'quote': '"' + quotesRespose[i].quote + '"',
                        'author': '- ' + quotesRespose[i].author};

                    getQuotes.push(add);
                }
            }

            $scope.quotes = getQuotes;
            $scope.$apply();

        });

}]);
    </script>
</body>
</html>

<?php

function do_includes()
{
    echo '
        <script src="https://ajax.googleapis.com/ajax/li' .
        'bs/angularjs/1.6.9/angular.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/boots' .
        'trap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/j' .
        'query/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/b' .
        'ootstrap/3.3.7/js/bootstrap.min.js"></script>
        ';
}
