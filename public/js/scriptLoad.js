
    var theComic = document.querySelector('comic');
    // var myLinks = document.querySelectorAll('ul a');
    // for(var i = 0; i <= myLinks.length - 1; i++) {
    //   myLinks[i].onclick = function(e) {
    //     e.preventDefault();
    //     var linkData = e.target.getAttribute('data-page');
    //     getData(linkData);
    //   }
    // };
    function getScript(pageId) {
      console.log(pageId);
      var myRequest = new Request(pageId + '.txt');

      fetch(myRequest)
      .then(function(response) { return response.text() })
      .then(function(text) {
        theComic.innerHTML = text;
      });
    }
