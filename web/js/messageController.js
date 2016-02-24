angular.module('personalWebsite.controllers').controller('messageController', ['$scope', '$location', '$sce',  function($scope, $location, $sce) {
    $scope.messages = [];
    $scope.currentMessage = "";
    $scope.htmlContent = "";
    $scope.names = ["Magpie", "Meenu", "Alice"];
    $scope.sendMessage = function() {
        $scope.htmlContent = $sce.trustAsHtml($scope.currentMessage);
        $scope.messages.push($scope.htmlContent);
        var urlArray = [];
        var matchArray;

        // Regular expression to find FTP, HTTP(S) and email URLs.
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

        // Iterate through any URLs in the text.
        while( (matchArray = regexToken.exec( $scope.currentMessage )) !== null ) {
            var token = matchArray[0];
            urlArray.push(token);
        }

        for (var i = 0; i < urlArray.length; i++) {
            var xmlHttp = new XMLHttpRequest();
            var magpie_url = "http://localhost:5000/website?src=" + urlArray[i];
            xmlHttp.open("GET", magpie_url, false); // false for synchronous request
            xmlHttp.send(null);
            var card = $scope.createCard(xmlHttp.responseText);
            $scope.messages.push($sce.trustAsHtml(card));
        }
        $scope.currentMessage = "";
    }
    $scope.createCard = function(json) {
        var cardHtml = "";
        var validJson = JSON.parse(json);

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
            cardHtml += "<div class=\"website-name\"> <p>" + validJson['data']['provider_url'] + "</p></div>";
        }
        cardHtml += "</div>" //Header div close

        cardHtml += "<div class=\"left-col\">";
        if (validJson['data']['media'] != null
        && validJson['data']['media']['data'] != null
        && validJson['data']['media']['data'][0]['iframe'] != null) {
            cardHtml += "<div class=\"media\">" + validJson['data']['media']['data'][0]['iframe'] + "</div>";
        } else if (validJson['data']['images'] != null && validJson['data']['images']['data'] != null) {
            cardHtml += "<div class=\"images\">";
            cardHtml += "<img class=\"image\" src=\"" + validJson['data']['images']['data'][0]['url'] + "></img>";
            cardHtml += "</div>";
        }
        cardHtml += "</div>"; //Closes Left Col Div

        cardHtml += "<div class=\"right-col\">";
        if (validJson['data']['title'] != null) {
            cardHtml += "<h2 class=\"title\">" + validJson['data']['title'] + "</h2>";
        }
        if (validJson['data']['description'] != null) {
            cardHtml += "<p class=\"desc\">" + validJson['data']['description'] + "</p>";
        }
        if (validJson['data']['provider_url'] != null && validJson['data']['url'] != null) {
            cardHtml += "<div class=\"read_more\"><a href=\"" + validJson['data']['url'] + "\"> See more on " + validJson['data']['provider_url'] + "</a>";
            cardHtml += "</div>";
        }
        cardHtml += "</div></div>";

        return cardHtml;
    }
}]);
