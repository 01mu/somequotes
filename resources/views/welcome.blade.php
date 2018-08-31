<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <?php do_includes(); ?>
    <title>Some Quotes</title>
    <link rel="icon" type="image/png" href="img/sq.png">
    <link href="css/site.css" rel="stylesheet" type="text/css" media="all">
</head>
<body ng-app="textBoxes" ng-init="something=add" ng-controller="boxCtrl">
    <div style="margin-bottom: 70px;"></div>
    <div class="container-fluid">
    <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">- Some Quotes -</a>
    </div>
    <form class="navbar-form navbar-right">
        <form novalidate>
            <input class="form-control" type="text" placeholder="Search Quotes" ng-model="qSearch">
            <button class="btn btn-default" ng-click="quoteSearch()">Search</button>
        </form>
    </form>
    <form class="navbar-form navbar-right">
        <form novalidate>
            <input class="form-control" type="text" placeholder="Search Authors" ng-model="aSearch">
            <button class="btn btn-default" ng-click="authorSearch()">Search</button>
        </form>
    </form>
    </nav>
        <div class="body">
            <!--<div class="row">
                <div class="col-sm-4">
                <br>
                <?php //output_quotes($quotes1); ?>
                </div>
                <div class="col-sm-4">
                <br>
                <?php //output_quotes($quotes2); ?>
                </div>
                <div class="col-sm-4">
                <br>
                <?php //output_quotes($quotes3); ?>
                </div>
            </div>!-->
            <div ng-repeat="p in authors" ng-cloak>
                <div ng-if="$odd" class="author-o"
                    ng-click="$parent.setAuthor(p)">
                    <p ng-bind-html="p.author | fix"></p>
                </div>
                <div ng-if="$even" class="author-e"
                    ng-click="$parent.setAuthor(p)">
                    <p ng-bind-html="p.author | fix"></p>
                </div>
                <br>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div ng-repeat="p in quotes1" ng-cloak>
                        <div ng-if="$odd" class="quote-o" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <div ng-if="$even" class="quote-e" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div ng-repeat="p in quotes2" ng-cloak>
                        <div ng-if="$odd" class="quote-o" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <div ng-if="$even" class="quote-e" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div ng-repeat="p in quotes3" ng-cloak>
                        <div ng-if="$odd" class="quote-o" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <div ng-if="$even" class="quote-e" >
                            <p ng-bind-html="p.quote | fix"></p>
                            <p ng-bind-html="p.author | fix"></p>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <div class="updateButton" ng-click="loadMore()" ng-cloak>
                @{{button}}
            </div>
        </div>
    </div>
    <div class="footer">
        Some Quotes
    </div>
   <script src="js/script.js"></script>
</body>
</html>


<?php

function do_includes()
{
    echo '<script src="https://ajax.googleapis.com/ajax/li' .
        'bs/angularjs/1.6.9/angular.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/boots' .
        'trap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/j' .
        'query/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/b' .
        'ootstrap/3.3.7/js/bootstrap.min.js"></script>
        ';
}

/*
$url = 'https://smallfolio.bitnamiapp.com/somequotes/';
$url = $url . 'get_quotes_random.php?limit=100&start=0';

$data = file_get_contents($url, false);
$posts = json_decode($data, true);

$size = count($posts[1]);

$quotes1 = array();
$quotes2 = array();
$quotes3 = array();

$flag = 0;

for($i = 0; $i < $size; $i++)
{
    $quote = '"' . $posts[1][$i]['quote'] . '"';
    $author = $posts[1][$i]['author'];

    switch($flag)
    {
        case 0: $quotes1[] = make_quote($quote, $author, $i); break;
        case 1: $quotes2[] = make_quote($quote, $author, $i); break;
        case 2: $quotes3[] = make_quote($quote, $author, $i); break;
        case 0: $quotes1[] = ['quote' => $quote, 'author' => $author]; break;
        case 1: $quotes2[] = ['quote' => $quote, 'author' => $author]; break;
        case 2: $quotes3[] = ['quote' => $quote, 'author' => $author]; break;
        default: break;
    }

    $flag++;

    if($flag == 3)
    {
        $flag = 0;
    }
}

function make_quote($quote, $author, $i)
{
    if($i % 2 == 0)
    {
        $str =  '<div class="quote-e" >' .
                '<p>' . $quote . '</p>' .
                '<p>' . $author . '</p>' .
                '</div>';
    }
    else
    {
        $str =  '<div class="quote-o" >' .
                '<p>' . $quote . '</p>' .
                '<p>' . $author . '</p>' .
                '</div>';
    }

    return $str;
}

function output_quotes($arr)
{
    for($i = 0; $i < count($arr); $i++)
    {
        echo $arr[$i];
        echo '<br>';
    }

    echo json_encode($arr);
}

//output_quotes($quotes1);
*/
