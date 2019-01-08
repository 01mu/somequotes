/*
 * somequotes
 * github.com/01mu
 */

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});

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

    /* load more quotes based on flags
     *
     * args:    none
     *
     * returns: none
     */
    $scope.loadMore = function() {
        setLoadingGif(1);
        setRelationText('');
        setLoadingText('Loading...');

        if(quoteSearchFlag == 1) {
            trackPage += 100;

            var url = baseURL + 'get_quotes_search/100/' + trackPage + '/' +
                $scope.qSearch;

            updateQuotes(1, url, 1);
        } else if(authorSearchFlag == 1) {
            trackPage += 100;

            var url = baseURL + 'get_author_search/100/' + trackPage + '/' +
                $scope.aSearch;

            updateAuthors(1, url);
        } else {
            var url = baseURL + 'get_quotes_random/100/0';

            setLoadingBar(0);
            updateQuotes(1, url, 0);
        }
    }

    /* perform author search
     *
     * args: none
     *
     * returns none
     */
    $scope.authorSearch = function() {
        if($scope.aSearch != null) {
            var url = baseURL + 'get_author_search/100/0/' + $scope.aSearch;

            trackPage = 0;

            setLoadingGif(1);
            setRelationText('');
            initRelations();
            setLoadingBar(0);
            setLoadType(0, 1);
            setRelations(1);

            updateAuthors(0, url);

            setHeaderText('Results for \"' + $scope.aSearch + '\"');

            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    /* perform quote search
     *
     * args: none
     *
     * returns none
     */
    $scope.quoteSearch = function() {
        if($scope.qSearch != null) {
            var url = baseURL + 'get_quotes_search/100/0/' + $scope.qSearch;

            trackPage = 0;

            setLoadingGif(1);
            setRelationText('');
            initRelations()
            initAuthors();
            setLoadingBar(0);
            setLoadType(1, 0);
            setRelations(1);

            updateQuotes(0, url, 1);

            setHeaderText('Results for \"' + $scope.qSearch + '\"');

            $('html, body').animate({ scrollTop: 0 }, 'fast');
        }
    }

    /* clear everything and load index
     *
     * args: none
     *
     * returns: none
     */
    $scope.title = function() {
        setLoadingGif(1);
        setRelationText('');
        initRelations();
        initAuthors();
        setLoadingBar(0);
        setLoadType(0, 0);
        setRelations(1);

        setHeaderText('Quotes');
        updateQuotes(0, url, 0);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    /* set author from view (clicking on an author form search or quote div)
     *
     * args:    author = author to set
     *
     * returns: none
     */
    $scope.setAuthor = function(author) {
        var url = baseURL + 'get_author_single/' + author;

        setLoadingGif(1);

        setRelationText('');
        setLoadingBar(1);

        updateQuotes(2, url, 0);

        $('html, body').animate({ scrollTop: 0 }, 'fast');
    }

    /* get authors from author search query
     *
     * args:    type = 0: initialize authors
     *                 1: append to authors
     *          url = url to get authors from
     *
     * returns: none
     */
    function updateAuthors(type, url) {
        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status === 'Good') {
                var authorsResponse = json[1];

                if(authorsResponse.length === 1) {
                    $scope.setAuthor(authorsResponse[0]['author']);
                    return;
                }

                if(type === 0) {
                    initAuthors();
                }

                for(var i = 0; i < authorsResponse.length; i++) {
                    var add = {'author': authorsResponse[i]['author']};

                    $scope.authors.push(add);
                }

                if(authorsResponse.length < 100) {
                    $scope.hideLoadingBar = 1;
                }

                initQuotes();

                setLoadingText('Load more...');
                setLoadingGif(0);
                $scope.$apply();
            } else {
               $scope.title();
            }
        });
    }

    /* get quotes
     *
     * args:    type = 0: initialize quotes with no relations
     *                 1: update quotes (append to arrays) with no relations
     *                 2: load quotes for individual author with relations
     *          url = url to get quotes from
     *          hl = whether to highlight quotes for search result
     *
     * returns: none
     */
    function updateQuotes(type, url, hl) {
        $.getJSON(url, function(json) {
            var status = json[0].Response;

            if(status == 'Good') {
                var getQuotes1 = [];
                var getQuotes2 = [];
                var getQuotes3 = [];
                var quotesRespose = json[1];

                var arrFlag = 0;

                for(var i = 0; i < quotesRespose.length; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var authorRaw = quotesRespose[i].author;
                    var author = '- ' + authorWP(authorRaw);

                    if(hl === 1) {
                        quote = str_highlight_text(quote, $scope.qSearch);
                    }

                    var add = {'quote': quote, 'author': author,
                        'authorRaw': authorRaw};

                    if(type === 0 || type === 2) {
                        switch(arrFlag) {
                            case 0: getQuotes1.push(add); break;
                            case 1: getQuotes2.push(add); break;
                            default: getQuotes3.push(add); break;
                        }
                    } else  {
                        $scope.quotes[arrFlag].push(add);
                    }

                    arrFlag = checkArrFlag(arrFlag, 3);
                }

                if(quotesRespose.length < 100) {
                    $scope.hideLoadingBar = 1;
                }

                if(type === 2) {
                    prepareRelations(json[2], authorRaw);
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
        });
    }

    /* prepare relations view for an author's page
     *
     * args:    relations = array of relations
     *          authorRaw = author's name
     *
     * returns: none
     */
    function prepareRelations(relations, authorRaw) {
        var arrFlag = 0;

        setHeaderText(authorRaw + ' quotes');
        setRelationText('Related to ' + authorRaw);
        setRelations(0);
        initRelations();

        for(var i = 0; i < relations.length; i++) {
            $scope.relations[arrFlag].push({'relation': relations[i]});

            arrFlag = checkArrFlag(arrFlag, 3);
        }

        initAuthors();
    }

    /* create wikipedia link from author name
     *
     * args:    author = name of author
     *
     * returns: html link with the author's name
     */
    function authorWP(author) {
        var authorLink = author.replace(/ /g, '_');
        var wpLink = 'http://en.wikipedia.org/wiki/' + authorLink;

        author = '<a href=' + wpLink + ' target="_blank">' + author + '</a>';

        return author;
    }

    /* increment array flag for insertion into different arrays
     *
     * args:    arrFlag = current flag
     *          count = max
     *
     * returns: none
     */
    function checkArrFlag(arrFlag, count) {
        arrFlag++;

        if(arrFlag == count) {
            arrFlag = 0;
        }

        return arrFlag;
    }


    /* highlight portion of string for search query
     *
     * args:    string = query
     *          needle = portion to highlight
     *
     * returns: none
     */
    function str_highlight_text(string, needle) {
        var reg = new RegExp(needle, 'gi');

        return string.replace(reg, function(str) {
            return '<span style="background-color:#fffa00;">' +
                str + '</span>'});
    }

    /* initialize author search result array
     *
     * args:    none
     *
     * returns: none
     */
    function initAuthors() {
        $scope.authors = [];
    }

    /* initialize 3 empty arrays to store relations
     *
     * args:    none
     *
     * returns: none
     */
    function initRelations() {
        $scope.relations = [];

        for(var i = 0; i < 3; i++) {
            $scope.relations[i] = [];
        }
    }

    /* initialize 3 empty arrays to store quotes
     *
     * args:    none
     *
     * returns: none
     */
    function initQuotes() {
        $scope.quotes = [];

        for(var i = 0; i < 3; i++) {
            $scope.quotes[i] = [];
        }
    }

    /* toggle display flags
     *
     * args:    quoteSearch = 1 if quote page, 0 else
     *          authorSearch = 1 if author search page, 0 else
     *
     * returns: none
     */
    function setLoadType(quoteSearch, authorSearch) {
        quoteSearchFlag = quoteSearch;
        authorSearchFlag = authorSearch;
    }

    /* toggle navbar loading image
     *
     * args:    setVal = type
     *
     * returns: none
     */
    function setLoadingGif(setVal) {
        if(setVal === 1) {
            $scope.loading = "img/load.gif";
        } else {
            $scope.loading = "img/nothing.png";
        }
    }

    /* toggle bottom loading bar view
     *
     * args:    setVal = 0 to hide, 1 to show
     *
     * returns: none
     */
    function setLoadingBar(setVal) {
        $scope.hideLoadingBar = setVal;
    }

    /* toggle show bottom relations (only shows for an author specific page)
     *
     * args:    setVal = 0 to show, 1 to hide
     *
     * returns: none
     */
    function setRelations(setVal) {
        $scope.hideRelations = setVal;
    }

    /* set bottom loading bar text
     *
     * args:    text = text to set
     *
     * returns: none
     */
    function setLoadingText(text) {
        $scope.button = text;
    }

    /* set relations header text
     *
     * args:    text = text to set
     *
     * returns: none
     */
    function setRelationText(text) {
        $scope.relation = text;
    }

    /* edit navbar main text
     *
     * args:    text = text to set
     *
     * returns: none
     */
    function setHeaderText(text) {
        $scope.header = text;
    }
}]);
