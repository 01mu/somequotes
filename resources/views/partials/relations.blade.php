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
