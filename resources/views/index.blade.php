<!DOCTYPE html>
<html>
<head>
    @include('partials/header')
</head>
<body ng-app="textBoxes" ng-init="something=add" ng-controller="boxCtrl">
    @include('partials/nav')
    <div class="container-fluid">
        <div class="body">
            @include('partials/body')
        </div>
    </div>
    <div class="container-fluid">
        <div class="body">
            <div class="row">
                <div class="col-sm-4">
                    <div ng-repeat="p in relations[0]" ng-cloak>
                        <div ng-if="$odd" class="relation-o"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <div ng-if="$even" class="relation-e"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div ng-repeat="p in relations[1]" ng-cloak>
                        <div ng-if="$even" class="relation-o"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <div ng-if="$odd" class="relation-e"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div ng-repeat="p in relations[2]" ng-cloak>
                        <div ng-if="$odd" class="relation-o"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <div ng-if="$even" class="relation-e"
                            ng-click="setAuthor(p.relation)">
                            <p ng-bind-html="p.relation | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="updateButton" ng-click="loadMore()" ng-hide="hideLoadingBar" ng-cloak>
        @{{button}}
    </div>
    <div class="footer">
        @include('partials/footer')
    </div>
   <script src="js/script.js"></script>
</body>
</html>
