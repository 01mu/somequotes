<div ng-repeat="p in authors" ng-cloak>
    <div ng-if="$odd" class="author-o" ng-click="setAuthor(p.author)">
        <p ng-bind-html="p.author | fix"></p>
    </div>

    <div ng-if="$even" class="author-e" ng-click="setAuthor(p.author)">
        <p ng-bind-html="p.author | fix"></p>
    </div>

    <br>
</div>

<div class="row">
    @include('partials/quotes')
</div>

<div class="header" ng-hide="hideRelations" ng-cloak>
    @{{relation}}
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
<div class="updateButton" ng-click="loadMore()" ng-hide="hideLoadingBar" ng-cloak>
    @{{button}}
</div>
