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
            var getQuotes1 = [];
            var getQuotes2 = [];
            var getQuotes3 = [];
            var status = json[0].Response;
            var quotesRespose = json[1];
            var quotesSize = quotesRespose.length;

            if(status === 'Good') {
                for(var i = 0; i < quotesSize; i++) {
                    var quote = '"' + quotesRespose[i].quote + '"';
                    var author = authorWP(quotesRespose[i].author);

                    var add = {'quote': quote, 'author': '- ' + author};

                    if(type === 0) {
                        if(i < 33)
                        getQuotes1.push(add);
                        if(i >= 33 && i < 66)
                        getQuotes2.push(add);
                        if(i >= 66)
                        getQuotes3.push(add);
                    } else {
                        if(i < 33)
                        $scope.quotes1.push(add);
                        if(i >= 33 && i < 66)
                        $scope.quotes2.push(add);
                        if(i >= 66)
                        $scope.quotes3.push(add);
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
