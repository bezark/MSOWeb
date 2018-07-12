let phrases = ["then","remember","saying","where","joke"];


var width = window.innerWidth;
var height = window.innerHeight;


function phraseSpriteGen(){

  phraseGroup.name = "phraseSprites"


for (var i = 0; i < phrases.length; i++) {
  var spriteMap = new THREE.TextureLoader().load( "assets/phrases/"+phrases[i]+".png" );
  var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  var sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set( 0.5, 0.5, 1 );
  sprite.name = phrases[i];
  sprite.position.set( i*0.4-1., i*-0.2+ 0.5, 0 ); // center

  phraseGroup.add( sprite );
}


  updateHUDSprites();

  	// var textureLoader = new THREE.TextureLoader();
  	//
  	// var mapA = textureLoader.load( "assets/phrases/sprite0.png", createHUDSprites );


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

// function createHUDSprites ( texture ) {
//
//
//   var material = new THREE.SpriteMaterial( { map: texture } );
//
//   var width = material.map.image.width;
//   var height = material.map.image.height;
//
//   sprite = new THREE.Sprite( material );
//   sprite.center.set( 0.5, 0.5 );
//   sprite.scale.set( width, height, 1 );
// 	sprite.name = "spritey"
//   HUDgroup.add(sprite);
//   updateHUDSprites();
// }


function updateHUDSprites() {



  // sprite.position.set(        0,        0, 1 ); // center
}
