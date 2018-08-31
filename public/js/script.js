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

    $scope.authors = [];

    $scope.button = 'Getting quotes...';

    var trackPage = 0;
    var quoteSearchFlag = 0;
    var authorSearchFlag = 0;

    var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

    update(0, url);

    $scope.loadMore = function() {
        $scope.button = 'Loading...';

        if(quoteSearchFlag == 1) {
            trackPage += 100;

            var url = baseURL + 'get_quotes_search.php?query=' +
                $scope.qSearch + '&limit=100&start=' + trackPage;

            update(1, url);
        } else if(authorSearchFlag == 1) {
            trackPage += 100;

            url = baseURL + 'get_author_search.php?limit=100&start=' +
                trackPage + '&query=' + $scope.aSearch;

            updateAuthors(1, url);
        } else {
            var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

            update(1, url);
        }
    }

    $scope.authorSearch = function() {
        var url = baseURL + 'get_author_search.php?limit=100&start=0&query=' +
            $scope.aSearch;

        updateAuthors(0, url);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    $scope.quoteSearch = function() {
        $scope.authors = [];
        trackPage = 0;

        quoteSearchFlag = 1;

        var url = baseURL + 'get_quotes_search.php?query=' + $scope.qSearch +
            '&limit=100&start=' + trackPage;

        update(0, url);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    $scope.setAuthor = function(guy) {
        $scope.authors = [];

        var url = baseURL + 'get_author_single.php?author=' + guy.author;

        $.getJSON(url, function(json) {
            var status = json[0].Response;
            var authorsResponse = json[1];
            var authorsSize = authorsResponse.length;
            var arrFlag = 0;

            if(status === 'Good') {
                for(var i = 0; i < authorsSize; i++) {
                    var author = '- ' + authorWP(guy.author);
                    var quote = '"' + authorsResponse[i]['quote'] + '"';

                    var add = {'author': author, 'quote': quote};

                    switch(arrFlag)
                    {
                        case 0: $scope.quotes1.push(add); break;
                        case 1: $scope.quotes2.push(add); break;
                        case 2: $scope.quotes3.push(add); break;
                        default: break;
                    }

                    arrFlag++;

                    if(arrFlag == 3) {
                        arrFlag = 0;
                    }
                }
            }

            $scope.$apply();
        });
    }

    function updateAuthors(type, url) {
        $scope.quotes1 = [];
        $scope.quotes2 = [];
        $scope.quotes3 = [];

        quoteSearchFlag = 0;
        authorSearchFlag = 1;

        if(type === 0) {
            trackPage = 0;
            $scope.authors = [];
        }

        $.getJSON(url, function(json) {
            var status = json[0].Response;
            var authorsResponse = json[1];
            var authorsSize = authorsResponse.length;

            if(status === 'Good') {
                for(var i = 0; i < authorsSize; i++) {
                    var add = {'author': authorsResponse[i]['author']};

                    $scope.authors.push(add);
                }
            }

            $scope.button = 'Load more...';
            $scope.$apply();
        });
    }

    function update(type, url) {
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

    function ass() {
        alert('ass');
    }

    function authorWP(author) {
        var authorLink = author.replace(/ /g, '_');
        var wpLink = 'http://en.wikipedia.org/wiki/' + authorLink;

        author = '<a href=' + wpLink + ' target="_blank">' + author + '</a>';

        return author;
    }
}]);
