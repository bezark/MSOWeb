
    var theComic = document.querySelector('comic');

    function getScript(pageId) {

      var myRequest = new Request(pageId + '.txt');

      fetch(myRequest)
      .then(function(response) { return response.text() })
      .then(function(text) {
        theComic.innerHTML = text;
      });
    }
