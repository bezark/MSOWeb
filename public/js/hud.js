// let sprite



function hudSceneGen(){

  var width = window.innerWidth;
  var height = window.innerHeight;
  cameraOrtho = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, 1, 5 );
  cameraOrtho.position.z = 10;

  sceneOrtho = new THREE.Scene();
  var spriteMap = new THREE.TextureLoader().load( "assets/phrases/joke.png" );
  var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(1, 1, 1);
  sceneOrtho.add( sprite );

  updateHUDSprites();

}

function hudResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  cameraOrtho.left = - width / 2;
  cameraOrtho.right = width / 2;
  cameraOrtho.top = height / 2;
  cameraOrtho.bottom = - height / 2;
  cameraOrtho.updateProjectionMatrix();

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
//   spriteTL = new THREE.Sprite( material );
//   spriteTL.center.set( 0.0, 1.0 );
//   spriteTL.scale.set( width, height, 1 );
//   sceneOrtho.add( spriteTL );
//   updateHUDSprites();
// }


function updateHUDSprites() {

  var width = window.innerWidth / 2;
  var height = window.innerHeight / 2;

  sprite.position.set(        0,        0, 1 ); // center
}
