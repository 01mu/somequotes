$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

//const baseURL = 'https://smallfolio.bitnamiapp.com/somequotes/';
const baseURL = 'https://somequotes.herokuapp.com/api/';

var app = angular.module('textBoxes', []);

app.filter('fix', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('boxCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

    var trackPage = 0;
    var quoteSearchFlag = 0;
    var authorSearchFlag = 0;

    //var url = baseURL + 'get_quotes_random.php?limit=100&start=0';
    var url = baseURL + 'get_quotes_random/100/0';

    setHeaderText('Quotes');
    setLoadingText('Getting quotes...');

    updateQuotes(0, url, 0);

    setLoadingBar(0);
    setLoadingGif(1);
    setRelations(1);

    initAuthors();
    initRelations();
    initQuotes();

    $scope.loadMore = function() {
        setLoadingGif(1);
        setRelationText('');
        setLoadingText('Loading...');

        if(quoteSearchFlag == 1) {
            trackPage += 100;

            //var url = baseURL + 'get_quotes_search.php?query=' +
            //    $scope.qSearch + '&limit=100&start=' + trackPage;

            var url = baseURL + 'get_quotes_search/100/' + trackPage + '/' +
                $scope.qSearch;

            updateQuotes(1, url, 1);
        } else if(authorSearchFlag == 1) {
            trackPage += 100;

            //url = baseURL + 'get_author_search.php?limit=100&start=' +
            //    trackPage + '&query=' + $scope.aSearch;

            var url = baseURL + 'get_author_search/100/' + trackPage + '/' +
                $scope.aSearch;

            updateAuthors(1, url);
        } else {
            setLoadingBar(0);
            //var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

            var url = baseURL + 'get_quotes_random/100/0';

            updateQuotes(1, url, 0);
        }
    }

    $scope.authorSearch = function() {
        if($scope.aSearch != null) {
            //var url = baseURL + 'get_author_search.php?limit=100&start=0&query='
            //    + $scope.aSearch;

            var url = baseURL + 'get_author_search/100/0/' + $scope.aSearch;

            trackPage = 0;

            setLoadingGif(1);
            setRelationText('');
            initRelations();
            setLoadingBar(0);
            setLoadType(false, true);
            setRelations(1);

            updateAuthors(0, url);

            setHeaderText('Results for \"' + $scope.aSearch + '\"');

            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    $scope.quoteSearch = function() {
        if($scope.qSearch != null) {
            //var url = baseURL + 'get_quotes_search.php?query='
            //    + $scope.qSearch + '&limit=100&start=0';

            var url = baseURL + 'get_quotes_search/100/0/' + $scope.qSearch;

            trackPage = 0;

            setLoadingGif(1);
            setRelationText('');
            initRelations()
            initAuthors();
            setLoadingBar(0);
            setLoadType(true, false);
            setRelations(1);

            updateQuotes(0, url, 1);

            setHeaderText('Results for \"' + $scope.qSearch + '\"');

            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    $scope.title = function() {
        setLoadingGif(1);
        setRelationText('');
        initRelations();
        initAuthors();
        setLoadingBar(0);
        setLoadType(false, false);
        setRelations(1);

        setHeaderText('Quotes');
        updateQuotes(0, url, 0);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    $scope.setAuthor = function(guy) {
        //var url = baseURL + 'get_author_single.php?author=' + guy;

        var url = baseURL + 'get_author_single/' + guy;

        setLoadingGif(1);

        setRelationText('');
        setLoadingBar(1);

        updateQuotes(2, url, 0);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    function updateAuthors(type, url) {
        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status === 'Good') {
                var authorsResponse = json[1];
                var authorsSize = authorsResponse.length;

                if(authorsSize === 1) {
                    $scope.setAuthor(authorsResponse[0]['author']);
                    return;
                }

                if(type === 0) {
                    initAuthors();
                }

                for(var i = 0; i < authorsSize; i++) {
                    var add = {'author': authorsResponse[i]['author']};

                    $scope.authors.push(add);

                    if(authorsSize < 100) {
                        $scope.hideLoadingBar = 1;
                    }
                }

                initQuotes();

                setLoadingText('Load more...');
                setLoadingGif(0);
                $scope.$apply();
            } else {
               $scope.title();
            }

            //$scope.aSearch = null;
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

                if(type === 2) {
                    var relations = json[2];
                    var relationsSize = relations.length;
                }

                for(var i = 0; i < quotesSize; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var authorRaw = quotesRespose[i].author;
                    var author = '- ' + authorWP(authorRaw);

                    if(hl === 1) {
                        quote = str_highlight_text(quote, $scope.qSearch)
                    }

                    var add = {'quote': quote, 'author': author,
                        'authorRaw': authorRaw};

                    if(type === 0 || type === 2) {
                        switch(arrFlag)
                        {
                            case 0: getQuotes1.push(add); break;
                            case 1: getQuotes2.push(add); break;
                            case 2: getQuotes3.push(add); break;
                            default: break;
                        }
                    } else  {
                        $scope.quotes[arrFlag].push(add);
                    }

                    arrFlag = checkArrFlag(arrFlag, 3);

                    if(quotesSize < 100) {
                        $scope.hideLoadingBar = 1;
                    }
                }

                if(type === 2) {
                    arrFlag = 0;

                    setHeaderText(authorRaw + ' quotes');
                    setRelationText('Related to ' + authorRaw);
                    setRelations(0);
                    initRelations();

                    for(var i = 0; i < relationsSize; i++) {
                        var add = {'relation': relations[i]};

                        $scope.relations[arrFlag].push(add);

                        arrFlag = checkArrFlag(arrFlag, 3);
                    }

                    initAuthors();
                }

                if(type === 0 || type === 2) {
                    $scope.quotes[0] = getQuotes1;
                    $scope.quotes[1] = getQuotes2;
                    $scope.quotes[2] = getQuotes3;
                }

                setLoadingText('Load more...');
                setLoadingGif(0);
                $scope.$apply();
            } else {
                $scope.title();
            }

            //$scope.qSearch = null;
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

    function initAuthors() {
        $scope.authors = [];
    }

    function initRelations() {
        $scope.relations = [];

        for(var i = 0; i < 3; i++) {
            $scope.relations[i] = [];
        }
    }

    function initQuotes() {
        $scope.quotes = [];

        for(var i = 0; i < 3; i++) {
            $scope.quotes[i] = [];
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

    function setLoadingBar(setVal) {
        $scope.hideLoadingBar = setVal;
    }

    function setRelations(setVal) {
        $scope.hideRelations = setVal;
    }

    function setLoadingText(text) {
        $scope.button = text;
    }

    function setRelationText(text) {
        $scope.relation = text;
    }

    function setHeaderText(text) {
        $scope.header = text;
    }
}]);
