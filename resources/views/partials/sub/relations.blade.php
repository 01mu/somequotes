<!--
    somequotes
    github.com/01mu
-->

<div ng-repeat="{{ $repeat }}" ng-cloak>
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
