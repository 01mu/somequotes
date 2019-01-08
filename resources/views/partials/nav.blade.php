<!--
    somequotes
    github.com/01mu
-->

<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-header">
        <div class="navbar-left">
            <img class="titleimg" ng-src="img/sq.png" ng-click="title()"/>
        </div>
        <a class="navbar-brand" ng-click="title()" ng-cloak>
            Some Quotes | @{{header}}
        </a>
    </div>
    <form class="navbar-form navbar-right">
        <form novalidate>
            <input class="form-control" type="text" placeholder="Search Quotes" ng-model="qSearch">
            <button class="btn btn-default" ng-click="quoteSearch()">
                Search
            </button>
        </form>
    </form>
    <form class="navbar-form navbar-right">
        <form novalidate>
            <input class="form-control" type="text" placeholder="Search Authors" ng-model="aSearch">
            <button class="btn btn-default" ng-click="authorSearch()">
                Search
            </button>
        </form>
    </form>
    <div class="navbar-right">
        <img class="loading" ng-cloak ng-src="@{{loading}}"/>
    </div>
</nav>
<div style="margin-top: 70px;">
</div>
