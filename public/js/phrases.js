let phrases = ["then","remember","saying","where","joke"];


///FIX THIS


let phraseHopGroups= {
  "then": null,
  "remember": null,
  "saying": null,
  "where": null,
  "joke": null
}




function notCurrentComic(comic) {
    return comic != currentComic;
}


function phraseHop (selectedPhrase){
  console.log(selectedPhrase);
  phraseHopGroups[selectedPhrase].visible = true;

  timeline.visible = false;



    var comicsToTraverse = phraseHopGroups[selectedPhrase].children.filter(notCurrentComic);
    console.log(comicsToTraverse);
    var theJump = Math.ceil((Math.random()*(comicsToTraverse.length)));
    theJump--;

    if(theJump ==0){theJump=1;}


    new TWEEN.Tween( phraseHopGroups[selectedPhrase].rotation).to( {
      z: (theJump+1)*phraseHopGroups[selectedPhrase].theta}, 750 ).start().onComplete(function() {
        time_warp(comicsToTraverse[theJump].comic, comicsToTraverse[theJump].frame);
        phraseHopGroups[selectedPhrase].visible = false;
      })
      var currStarRot = stars.rotation.y
      new TWEEN.Tween( stars.rotation).to( {
        y: currStarRot+6.283185}, 1000 ).start();



                // phraseHopGroups[selectedPhrase].visible = false;


}
