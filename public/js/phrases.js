


///FIX THIS






function notCurrentComic(comic) {
    return comic != currentComic;
}


function phraseHop (selectedPhrase){


    var comicsToTraverse = []
    for (var comic in phraseStructure[selectedPhrase]) {
      if (comic != currentComic){
        comicsToTraverse.push(comic)
      }
    }

comicsToTraverse.length


    var newComic = comicsToTraverse[Math.floor(Math.random()*comicsToTraverse.length)]
    var newFrame = phraseStructure[selectedPhrase][newComic].panel

    warpPlaneNear.material.map = phraseStructure[selectedPhrase][currentComic].texture
    warpPlaneNear.material.needsUpdate = true;

    warpPlaneFar.material.map = phraseStructure[selectedPhrase][newComic].texture
    warpPlaneFar.material.needsUpdate = true;

    ui.material.map = warpTarget.texture;
    buttonGroup.visible = false
    // timeline.visible = false;
    console.log( newComic, newFrame);
    time_warp(Number(newComic), newFrame);


    warpPlaneFar.position.z = - 50.
    warpPlaneNear.position.z = -0.11;
    warpPlaneFar.rotation.z = 0.;
    warpPlaneNear.rotation.z = 0;

  var activeParties = phraseParties.getObjectByName(selectedPhrase+"parties")
  activeParties.visible = true

  new TWEEN.Tween( activeParties.position).to( {z: 10.}, 2500).start()


  new TWEEN.Tween( warpPlaneFar.position).to( {z: -0.11}, 2500).start()
  new TWEEN.Tween( warpPlaneFar.rotation).to( {z:   -(Math.PI*2)}, 2500).start()
  new TWEEN.Tween( warpPlaneNear.rotation).to( {z:   -(Math.PI*2)}, 2500).start()
  new TWEEN.Tween( warpPlaneNear.position).to( {z: 10.}, 2500).start()
    //
    new TWEEN.Tween( activeParties.rotation).to( {
      z: -(Math.PI*2)}, 2500 ).start().onComplete(function() {
        ui.material.map = uiTex;
        buttonGroup.visible = true;
        // timeline.visible= true;
        activeParties.visible = false;
        activeParties.position.z = 0;
        activeParties.rotation.z = 0;
      });
    //     time_warp(comicsToTraverse[theJump].comic, comicsToTraverse[theJump].frame);
    //     phraseHopGroups[selectedPhrase].visible = false;
    //   })



    // var theJump = Math.ceil((Math.random()*(comicsToTraverse.length)));
    // theJump--;
    //
    // if(theJump ==0){theJump=1;}
    //
    //
    // new TWEEN.Tween( phraseHopGroups[selectedPhrase].rotation).to( {
    //   z: (theJump+1)*phraseHopGroups[selectedPhrase].theta}, 750 ).start().onComplete(function() {
    //     time_warp(comicsToTraverse[theJump].comic, comicsToTraverse[theJump].frame);
    //     phraseHopGroups[selectedPhrase].visible = false;
    //   })
    //   var currStarRot = stars.rotation.y
    //   new TWEEN.Tween( stars.rotation).to( {
    //     y: currStarRot+6.283185}, 1000 ).start();
    // //
    // //

                // phraseHopGroups[selectedPhrase].visible = false;


}
