$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

const baseURL = 'https://smallfolio.bitnamiapp.com/somequotes/';
var app = angular.module('textBoxes', []);

app.filter('fix', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('boxCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

    $scope.hideLoadingBar = 0;
    setLoadingGif(0);

    $scope.quotes1 = [];
    $scope.quotes2 = [];
    $scope.quotes3 = [];

    $scope.authors = [];

    $scope.relations = [];

    initRelations();

    var trackPage = 0;
    var quoteSearchFlag = 0;
    var authorSearchFlag = 0;
    var url = baseURL + 'get_quotes_random.php?limit=100&start=0';
    var lastSearch = '';

    $scope.button = 'Getting quotes...';

    updateQuotes(0, url, 0, '');

    $scope.loadMore = function() {
        setLoadingGif(1);
        $scope.relation = '';
        $scope.button = 'Loading...';

        if(quoteSearchFlag == 1) {
            trackPage += 100;

            var url = baseURL + 'get_quotes_search.php?query=' +
                $scope.qSearch + '&limit=100&start=' + trackPage;

            updateQuotes(1, url, 1, lastSearch);
        } else if(authorSearchFlag == 1) {
            trackPage += 100;

            url = baseURL + 'get_author_search.php?limit=100&start=' +
                trackPage + '&query=' + $scope.aSearch;

            updateAuthors(1, url);
        } else {$scope.hideLoadingBar = false;
            var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

            updateQuotes(1, url, 0, '');
        }
    }

    $scope.authorSearch = function() {
        if($scope.aSearch != null) {
            var url = baseURL + 'get_author_search.php?limit=100&start=0&query='
                + $scope.aSearch;

            setLoadingGif(1);
            $scope.relation = '';
            initRelations()

            $scope.hideLoadingBar = 0;

            setLoadType(false, true);

            updateAuthors(0, url);


            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    $scope.quoteSearch = function() {
        if($scope.qSearch != null) {
            setLoadingGif(1);
            initRelations()
            $scope.authors = [];
            trackPage = 0;
            $scope.relation = '';

            setLoadType(true, false);

            $scope.hideLoadingBar = 0;

            var url = baseURL + 'get_quotes_search.php?query='
                + $scope.qSearch + '&limit=100&start=' + trackPage;

            lastSearch = $scope.qSearch;

            updateQuotes(0, url, 1, lastSearch);
            setLoadingGif(0);

            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    $scope.title = function() {
        setLoadingGif(1);
        $scope.authors = [];
        initRelations();
        $scope.relation = '';
        $scope.hideLoadingBar = 0;

        setLoadType(false, false);

        updateQuotes(0, url, 0, '');

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    $scope.setAuthor = function(guy) {
        setLoadingGif(1);

        $scope.authors = [];
        initRelations();
        $scope.relation = '';
        $scope.hideLoadingBar = 1;

        $('html, body').animate({ scrollTop: 0 }, 'fast');

        var url = baseURL + 'get_author_single.php?author=' + guy;

        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status === 'Good') {
                var getQuotes1 = [];
                var getQuotes2 = [];
                var getQuotes3 = [];

                var authorsResponse = json[1];
                var relations = json[2];
                var relationsSize = relations.length;
                var authorsSize = authorsResponse.length;
                var arrFlag = 0;

                $scope.relation = 'Related to ' + guy;

                for(var i = 0; i < authorsSize; i++) {
                    var author = '- ' + authorWP(guy);
                    var quote = '"' + authorsResponse[i]['quote'] + '"';

                    var add = {'authorRaw': guy,
                            'author': author, 'quote': quote};

                    switch(arrFlag)
                    {
                        case 0: getQuotes1.push(add); break;
                        case 1: getQuotes2.push(add); break;
                        case 2: getQuotes3.push(add); break;
                        default: break;
                    }

                    arrFlag = checkArrFlag(arrFlag, 3);
                }

                arrFlag = 0;

                for(var i = 0; i < relationsSize; i++) {
                    var add = {'relation': relations[i]};

                    $scope.relations[arrFlag].push(add);

                    arrFlag = checkArrFlag(arrFlag, 3);
                }
            }

            $scope.quotes1 = getQuotes1;
            $scope.quotes2 = getQuotes2;
            $scope.quotes3 = getQuotes3;

            setLoadingGif(0);
            $scope.$apply();
        });
    }

    function updateAuthors(type, url) {
        if(type === 0) {
            trackPage = 0;
            $scope.authors = [];
        }

        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status === 'Good') {
                var authorsResponse = json[1];
                var authorsSize = authorsResponse.length;

                if(authorsSize === 1) {
                    $scope.setAuthor(authorsResponse[0]['author']);
                    return;
                }

                for(var i = 0; i < authorsSize; i++) {
                    var add = {'author': authorsResponse[i]['author']};

                    $scope.authors.push(add);

                    if(authorsSize < 100) {
                        $scope.hideLoadingBar = 1;
                    }
                }

                $scope.quotes1 = [];
                $scope.quotes2 = [];
                $scope.quotes3 = [];

                $scope.button = 'Load more...';
                setLoadingGif(0);
                $scope.$apply();
            } else {
               setLoadingGif(0);
            }
        });
    }

    function updateQuotes(type, url, hl, hlStr) {
        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status == 'Good') {
                var getQuotes1 = [];
                var getQuotes2 = [];
                var getQuotes3 = [];
                var quotesRespose = json[1];
                var quotesSize = quotesRespose.length;

                var arrFlag = 0;

                for(var i = 0; i < quotesSize; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var author = authorWP(quotesRespose[i].author);

                    if(hl === 1) {
                        quote = str_highlight_text(quote, hlStr)
                    }

                    var add = {'quote': quote, 'author': '- ' + author,
                        'authorRaw': quotesRespose[i].author};

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

                    arrFlag = checkArrFlag(arrFlag, 3);

                    if(quotesSize < 100) {
                        $scope.hideLoadingBar = 1;
                    }
                }

                if(type === 0) {
                    $scope.quotes1 = getQuotes1;
                    $scope.quotes2 = getQuotes2;
                    $scope.quotes3 = getQuotes3;
                }

                $scope.button = 'Load more...';
                setLoadingGif(0);
                $scope.$apply();
            }
        });
    }

    function authorWP(author) {
        var authorLink = author.replace(/ /g, '_');
        var wpLink = 'http://en.wikipedia.org/wiki/' + authorLink;

        author = '<a href=' + wpLink + ' target="_blank">' + author + '</a>';

        return author;
    }

    function checkArrFlag(arrFlag, count) {
        arrFlag++;

        if(arrFlag == count) {
            arrFlag = 0;
        }

        return arrFlag;
    }

    function str_highlight_text(string, str_to_highlight){
        var reg = new RegExp(str_to_highlight, 'gi');

        return string.replace(reg, function(str) {
            return '<span style="background-color:#fffa00;">' +
                str + '</span>'});
    }

    function initRelations() {
        for(var i = 0; i < 3; i++) {
            $scope.relations[i] = [];
        }
    }

    function setLoadType(quoteSearch, authorSearch) {
        quoteSearchFlag = quoteSearch;
        authorSearchFlag = authorSearch;
    }

    function setLoadingGif(setVal) {
        if(setVal === 1) {
            $scope.loading = "img/load.gif";
        } else {
            $scope.loading = "img/nothing.png";
        }
    }
}]);
