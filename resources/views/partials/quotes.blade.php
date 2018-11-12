<div class="col-sm-4">
    <div ng-repeat="p in quotes[0]" ng-cloak>
        <div ng-if="$odd" class="quote-o"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <div ng-if="$even" class="quote-e"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <br>
    </div>
</div>
<div class="col-sm-4">
    <div ng-repeat="p in quotes[1]" ng-cloak>
        <div ng-if="$even" class="quote-o"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <div ng-if="$odd" class="quote-e"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <br>
    </div>
</div>
<div class="col-sm-4">
    <div ng-repeat="p in quotes[2]" ng-cloak>
        <div ng-if="$odd" class="quote-o"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <div ng-if="$even" class="quote-e"
            ng-click="setAuthor(p.authorRaw)">
            <p ng-bind-html="p.quote | fix"></p>
            <p ng-click="$event.stopPropagation()" class="right" ng-bind-html="p.author | fix"></p>
        </div>
        <br>
    </div>
</div>
