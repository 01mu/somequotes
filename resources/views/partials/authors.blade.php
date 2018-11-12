<div ng-repeat="p in authors" ng-cloak>
    <div ng-if="$odd" class="author-o" ng-click="setAuthor(p.author)">
        <p ng-bind-html="p.author | fix"></p>
    </div>

    <div ng-if="$even" class="author-e" ng-click="setAuthor(p.author)">
        <p ng-bind-html="p.author | fix"></p>
    </div>

    <br>
</div>
