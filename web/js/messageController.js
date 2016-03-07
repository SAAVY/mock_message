angular.module('personalWebsite.controllers').controller('messageController', ['$scope', '$location', '$sce', '$http',  function($scope, $location, $sce, $http) {
    $scope.messages = [];
    $scope.currentMessage = "";
    $scope.htmlContent = "";
    $scope.names = ["Magpie", "Meenu", "Alice"];
    $scope.sendMessage = function() {
        var messageBubble = "<div id=\"message_bubble\">" + $scope.currentMessage + "</div>"
        $scope.htmlContent = $sce.trustAsHtml(messageBubble);
        $scope.messages.push($scope.htmlContent);
        var urlArray = [];
        var matchArray;

        // Regular expression to find FTP, HTTP(S) and email URLs.
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g;

        // Iterate through any URLs in the text.
        while( (matchArray = regexToken.exec( $scope.currentMessage )) !== null ) {
            var token = matchArray[0];
            urlArray.push(token);
        }

        for (var i = 0; i < urlArray.length; i++) {
            $http({
                method: 'GET',
                url: 'http://localhost:5000/website?src=' + urlArray[i] + '&desc_cap=100'
            }).then(function successCallback(response) {
                console.log(response);
                var card = $scope.createCard(response.data);
                $scope.messages.push($sce.trustAsHtml(card));
            }, function errorCallback(response) {
                alert(response);
            });
        }
        $scope.currentMessage = "";
    }
    $scope.createCard = function(json) {
        var cardHtml = "";
        console.log(json);
        var validJson = json;

        if (validJson['data']['media'] != null && validJson['data']['media']['data'] != null && validJson['data']['media']['data'][0]['iframe'] != null) {
            cardHtml += "<div class=\"card has-media\">";
        } else if (validJson['data']['images'] != null && validJson['data']['images']['data'] != null) {
            cardHtml += "<div class=\"card has-images\">";
        } else {
            cardHtml += "<div class=\"card no-media\">";
        }
        cardHtml += "<div class=\"header\">";
        if (validJson['data']['favicon'] != null) {
            cardHtml += "<img class=\"favicon\" src=\"" +  validJson['data']['favicon'] + "\"/>";
        }
        if (validJson['data']['provider_url'] != null) {
            cardHtml += "<span>" + validJson['data']['provider_url'] + "</span>";
        }
        cardHtml += "</div>" //Header div close

        cardHtml += "<div class=\"top-div\">";
        if (validJson['data']['media'] != null
        && validJson['data']['media']['data'] != null
        && validJson['data']['media']['data'][0]['iframe'] != null) {
            cardHtml += "<div class=\"media\">" + validJson['data']['media']['data'][0]['iframe'] + "</div>";
        } else if (validJson['data']['images'] != null && validJson['data']['images']['data'] != null) {
            cardHtml += "<div class=\"images\">";
            cardHtml += "<img class=\"image\" src=\"" + validJson['data']['images']['data'][0]['url'] + "\"></img>";
            cardHtml += "</div>";
        }
        cardHtml += "</div>"; //Closes Left Col Div

        cardHtml += "<div class=\"bottom-div\">";
        if (validJson['data']['title'] != null) {
            if (validJson['data']['provider_url'] != null && validJson['data']['url'] != null) {
                cardHtml += "<h5 class=\"title\"><a href=\"" + validJson['data']['url'] + "\"><strong>" + validJson['data']['title'] + "</strong></a></h5>";
            } else {
                cardHtml += "<h5 class=\"title\"><strong>" + validJson['data']['title'] + "</strong></h5>";
            }
        }
        if (validJson['data']['description'] != null) {
            cardHtml += "<p class=\"desc\">" + validJson['data']['description'] + "</p>";
        }
        cardHtml += "</div></div>";
        return cardHtml;
    }
}]);
