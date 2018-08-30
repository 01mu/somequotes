<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <?php do_includes(); ?>
    <title>Some Quotes</title>
    <link rel="icon" type="image/png" href="img/sq.png">
    <link href="css/site.css" rel="stylesheet" type="text/css" media="all">
</head>
<body>
    <div class="title">
        <div class="title-text">
            Some Quotes
        </div>
    </div>
    <div class="container-fluid">
        <div class="body">
            <div ng-app="textBoxes" ng-controller="boxCtrl">
                <div class="row">
                    <div class="col-sm-4">
                        <br>
                        <div ng-repeat="p in quotes1" ng-cloak>
                            <div ng-if="$odd" class="quote-o" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <div ng-if="$even" class="quote-e" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <br>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <br>
                        <div ng-repeat="p in quotes2" ng-cloak>
                            <div ng-if="$odd" class="quote-o" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <div ng-if="$even" class="quote-e" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <br>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <br>
                        <div ng-repeat="p in quotes3" ng-cloak>
                            <div ng-if="$odd" class="quote-o" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <div ng-if="$even" class="quote-e" >
                                <p ng-bind-html="p.quote | fix"></p>
                                <p ng-bind-html="p.author | fix"></p>
                            </div>
                            <br>
                        </div>
                    </div>
                </div>
                <div class="updateButton" ng-click="loadMore()" ng-cloak>
                    @{{button}}
                </div>
            </div>
        </div>
    </div>
   <script src="js/script.js"></script>
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
