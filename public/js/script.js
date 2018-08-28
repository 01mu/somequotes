const baseURL = 'https://smallfolio.bitnamiapp.com/somequotes/';
var app = angular.module('textBoxes', []);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.controller('boxCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {

    $scope.quotes = [];
    $scope.button = 'Getting quotes...';

    var url = baseURL + 'get_quotes_random.php?limit=100&start=0';

    update(0);

    $scope.loadMore = function() {
        $scope.button = 'Loading...';
        update(1);
    }

    function authorWP(author) {
        var authorLink = author.replace(/ /g, '_');
        var wpLink = 'http://en.wikipedia.org/wiki/' + authorLink;

        author = '<a href=' + wpLink + ' target="_blank">' + author + '</a>';

        return author;
    }

    function update(type) {
        $.getJSON(url, function(json) {
            var getQuotes = [];
            var status = json[0].Response;
            var quotesRespose = json[1];
            var quotesSize = quotesRespose.length;

            if(status === 'Good') {
                for(var i = 0; i < quotesSize; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var author = authorWP(quotesRespose[i].author);

                    var add = {'quote': quote, 'author': '- ' + author};

                    if(type === 0) {
                        getQuotes.push(add);
                    } else {
                        $scope.quotes.push(add);
                    }
                }
            }

            if(type === 0) {
                $scope.quotes = getQuotes;
            }

            $scope.button = 'Load more...';
            $scope.$apply();
        });
    }
}]);
