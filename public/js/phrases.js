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


function hudSceneGen(){

  HUDgroup.name = "HUDsprites"



  var spriteMap = new THREE.TextureLoader().load( "assets/phrases/joke.png" );
  var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set( 0.5, 0.5, 1 );
  sprite.position.set( 0., -0.75, 0 ); // center

  HUDgroup.add( sprite );

  updateHUDSprites();

  	// var textureLoader = new THREE.TextureLoader();
  	//
  	// var mapA = textureLoader.load( "assets/phrases/sprite0.png", createHUDSprites );


}

function hudResize() {

  updateHUDSprites();


}



function updateHUDSprites() {



}
