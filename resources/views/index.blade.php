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
    <div class="footer">
        @include('partials/footer')
    </div>
   <script src="js/script.js"></script>
</body>
</html>
