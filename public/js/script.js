const baseURL = 'https://smallfolio.bitnamiapp.com/somequotes/';
var app = angular.module('textBoxes', []);

app.filter('fix', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('boxCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

    $scope.quotes1 = [];
    $scope.quotes2 = [];
    $scope.quotes3 = [];

    $scope.button = 'Getting quotes...';

    var trackPage = 0;
    var quoteSearchFlag = 0;

    var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

    update(0);

    //$scope.name='assss';
    //alert($scope.something);

    $scope.loadMore = function() {
        if(quoteSearchFlag == 1) {
            trackPage += 100

            url = baseURL + 'get_quotes_search.php?query=' + $scope.qSearch +
                '&limit=100&start=' + trackPage;
        }

        $scope.button = 'Loading...';

        update(1);
    }

    function authorWP(author) {
        var authorLink = author.replace(/ /g, '_');
        var wpLink = 'http://en.wikipedia.org/wiki/' + authorLink;

        author = '<a href=' + wpLink + ' target="_blank">' + author + '</a>';

        return author;
    }

    $scope.quoteSearch = function() {
        quoteSearchFlag = 1;

        url = baseURL + 'get_quotes_search.php?query=' + $scope.qSearch +
            '&limit=100&start=' + trackPage;

        update(0);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    function update(type) {
        $.getJSON(url, function(json) {
            var getQuotes1 = [];
            var getQuotes2 = [];
            var getQuotes3 = [];
            var status = json[0].Response;
            var quotesRespose = json[1];
            var quotesSize = quotesRespose.length;

            var arrFlag = 0;

            if(status === 'Good') {
                for(var i = 0; i < quotesSize; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var author = authorWP(quotesRespose[i].author);

                    var add = {'quote': quote, 'author': '- ' + author};

                    if(type === 0) {
                        switch(arrFlag)
                        {
                            case 0: getQuotes1.push(add); break;
                            case 1: getQuotes2.push(add); break;
                            case 2: getQuotes3.push(add); break;
                            default: break;
                        }
                    } else {
                        switch(arrFlag)
                        {
                            case 0: $scope.quotes1.push(add); break;
                            case 1: $scope.quotes2.push(add); break;
                            case 2: $scope.quotes3.push(add); break;
                            default: break;
                        }
                    }

                    arrFlag++;

                    if(arrFlag == 3) {
                        arrFlag = 0;
                    }
                }
            }

            if(type === 0) {
                $scope.quotes1 = getQuotes1;
                $scope.quotes2 = getQuotes2;
                $scope.quotes3 = getQuotes3;
            }

            $scope.button = 'Load more...';
            $scope.$apply();
        });
    }
}]);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
