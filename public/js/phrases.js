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


function phraseSpriteGen(){

	phraseGroup = new THREE.Group();
  phraseGroup.name = "phrases"


  for (var i = 0; i < phrases.length; i++) {

    var spriteMap = new THREE.TextureLoader().load( "assets/phrases/"+phrases[i]+".png" );
    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set( 0.5, 0.5, 1 );
    sprite.name = phrases[i];
    sprite.position.set( i*0.4-1., 0.3, 0 ); // center

    phraseGroup.add( sprite );
  }


    updateHUDSprites();
    phraseCheck (currentComic, counter);


}

function notCurrentComic(comic) {
    return comic != currentComic;
}


function phraseHop (selectedPhrase){
  phraseHopGroups[selectedPhrase].visible = true;
  // timeline.visible = false;
  // comicGroup.visible = false;
  new TWEEN.Tween( phraseHopGroups[selectedPhrase].rotation ).to( {
    y: 0.7853982}, 500 ).start()
  new TWEEN.Tween( timeline.opacity ).to( {
  0.}, 500 ).start()
    new TWEEN.Tween( comicGroup.rotation ).to( {
      y: 0.7853982}, 500 ).start()


    var comicsToTraverse = phraseHopGroups[selectedPhrase].children.filter(notCurrentComic);
  for (var i = 0; i < comicsToTraverse.length; i++) {
    new TWEEN.Tween( comicsToTraverse[i].position ).to( {
      z: i * -0.75}, 250 ).start()
  }


      new TWEEN.Tween( camera.position ).to( {
        z: 2.}, 500 ).start()



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
