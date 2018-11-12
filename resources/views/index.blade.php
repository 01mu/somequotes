<!DOCTYPE html>
<html>
<head>
    @include('partials/header')
</head>
<body ng-app="textBoxes" ng-controller="boxCtrl">
    @include('partials/nav')
    @include('partials/authors')
    <div class="container-fluid">
        <div class="body">
            <div class="row">
                @include('partials/quotes')
            </div>
        </div>
    </div>
    <div class="header" ng-hide="hideRelations" ng-cloak>
        @{{relation}}
    </div>
    <div class="container-fluid">
        <div class="body">
            <div class="row">
                @include('partials/relations')
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
