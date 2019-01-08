<!--
    somequotes
    github.com/01mu
-->

<div ng-repeat="{{ $repeat }}" ng-cloak>
    <div ng-if="$odd" class="quote-o"
        ng-click="setAuthor(p.authorRaw)">
        <p ng-bind-html="p.quote | fix"></p>
        <p ng-click="$event.stopPropagation()"
            class="right" ng-bind-html="p.author | fix"></p>
    </div>
    <div ng-if="$even" class="quote-e"
        ng-click="setAuthor(p.authorRaw)">
        <p ng-bind-html="p.quote | fix"></p>
        <p ng-click="$event.stopPropagation()"
            class="right" ng-bind-html="p.author | fix"></p>
    </div>
    <br>
</div>
