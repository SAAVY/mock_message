angular.module('magpieDemo.controllers').controller('messageController', ['$scope', '$location', '$sce', '$http', '$window', function($scope, $location, $sce, $http, $window) {
    $scope.names = ["Alice", "Avy", "Meenu", "Samiya", "Varun"];
    $scope.currentReceiver = "Alice";
    $scope.currentMessage = "";
    $scope.alicesMessages = [];
    $scope.meenusMessages = [];
    $scope.avysMessages = [];
    $scope.samiyasMessages = [];
    $scope.varunsMessages = [];

    $scope.getBgColor = function(curName) {
        if(curName == $scope.currentReceiver) {
          return "#D3D3D3";
        }
        return "white";
    }

    $scope.getMessages = function() {
      if ($scope.currentReceiver == "Alice") {
          return $scope.alicesMessages;
      }
      if ($scope.currentReceiver == "Avy") {
          return $scope.avysMessages;
      }
      if ($scope.currentReceiver == "Meenu") {
          return $scope.meenusMessages;
      }
      if ($scope.currentReceiver == "Samiya") {
          return $scope.samiyasMessages;
      }
      if ($scope.currentReceiver == "Varun") {
          return $scope.varunsMessages;
      }
    }

    $scope.setReceiver = function(receiverName) {
      console.log(receiverName);
      $scope.currentReceiver = receiverName;
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
            cardHtml += "<img class=\"favicon\" width=\"30px\" src=\"" +  validJson['data']['favicon'] + "\"/>";
        }
        if (validJson['data']['provider_url'] != null) {
            cardHtml += "<span>" + validJson['data']['provider_url'] + "</span>";
        }
        cardHtml += "</div>" //Header div close

        cardHtml += "<div class=\"top-div\">";
        if (validJson['data']['media'] != null
        && validJson['data']['media']['data'] != null
        && validJson['data']['media']['data'][0]['iframe'] != null) {
            cardHtml += "<div class=\"media\" width=\"100%\">" + validJson['data']['media']['data'][0]['iframe'] + "</div>";
        } else if (validJson['data']['images'] != null && validJson['data']['images']['data'] != null) {
            cardHtml += "<div class=\"images\">";
            cardHtml += "<img class=\"image\" src=\"" + validJson['data']['images']['data'][0]['url'] + "\" max-width=\"400px\" max-height=\"300px\"></img>";
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
        console.log(cardHtml);
        return cardHtml;
    }

    $window.setInterval(function() {
      var elem = document.getElementById('message_list');
      elem.scrollTop = elem.scrollHeight;
    }, 100);

    $scope.sendMessage = function() {
        console.log($scope.currentReceiver);
        if ($scope.currentMessage == "") {
            return;
        }
        var messageBubble = "<div id=\"message_bubble\">" + $scope.currentMessage + "</div>"
        $scope.htmlContent = $sce.trustAsHtml(messageBubble);

        if ($scope.currentReceiver == "Alice") {
            $scope.alicesMessages.push($scope.htmlContent);
        }
        if ($scope.currentReceiver == "Avy") {
            $scope.avysMessages.push($scope.htmlContent);
        }
        if ($scope.currentReceiver == "Meenu") {
            $scope.meenusMessages.push($scope.htmlContent);
        }
        if ($scope.currentReceiver == "Samiya") {
            $scope.samiyasMessages.push($scope.htmlContent);
        }
        if ($scope.currentReceiver == "Varun") {
            $scope.varunsMessages.push($scope.htmlContent);
        }

        var urlArray = [];
        var matchArray;

        // Regular expression to find FTP, HTTP(S) and email URLs.
        var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g;

        // Iterate through any URLs in the text.
        while( (matchArray = regexToken.exec( $scope.currentMessage )) !== null ) {
            var token = matchArray[0];
            urlArray.push(token);
        }

        if ($scope.currentMessage.substring(0,7) == "/giphy ") {
            urlArray.push($scope.currentMessage);
        }

        for (var i = 0; i < urlArray.length; i++) {
            var curReceiver = $scope.currentReceiver;
            $http({
                method: 'GET',
                url: 'http://52.33.243.223:5000/website?src=' + urlArray[i] + '&desc_cap=100'
            }).then(function successCallback(response) {
                console.log(response);
                var card = $scope.createCard(response.data);

                if (curReceiver == "Alice") {
                    $scope.alicesMessages.push($sce.trustAsHtml(card));
                }
                if (curReceiver == "Avy") {
                    $scope.avysMessages.push($sce.trustAsHtml(card));
                }
                if (curReceiver == "Meenu") {
                    $scope.meenusMessages.push($sce.trustAsHtml(card));
                }
                if (curReceiver == "Samiya") {
                    $scope.samiyasMessages.push($sce.trustAsHtml(card));
                }
                if (curReceiver == "Varun") {
                    $scope.varunsMessages.push($sce.trustAsHtml(card));
                }
            }, function errorCallback(response) {
                alert(response);
            });
        }
        $scope.currentMessage = "";
    }


}]);
