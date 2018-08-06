let phrases = ["then","remember","saying","where","joke"];


///FIX THIS


let phraseHopGroups= {
  "then": null,
  "remember": null,
  "saying": null,
  "where": null,
  "joke": null
}

var width = window.innerWidth;
var height = window.innerHeight;


function notCurrentComic(comic) {
    return comic != currentComic;
}


function phraseHop (selectedPhrase){
  console.log(selectedPhrase);
  phraseHopGroups[selectedPhrase].visible = true;

  timeline.visible = false;



    var comicsToTraverse = phraseHopGroups[selectedPhrase].children.filter(notCurrentComic);

    var theJump = Math.ceil((Math.random()*(comicsToTraverse.length)));
    theJump--;

    if(theJump ==0){theJump=1;}

  for (var i = 0; i < comicsToTraverse.length; i++) {
    new TWEEN.Tween( comicsToTraverse[i].position ).to( {
      z: i * -0.75}, 250 ).start()
  }
                time_warp(comicsToTraverse[theJump].comic, comicsToTraverse[theJump].frame);

                phraseHopGroups[selectedPhrase].visible = false;


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
