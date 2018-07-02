var camera, controls, scene, renderer, cameraOrtho, sceneOrtho;
var geometry, material, mesh, group, sprite;

init();
animate();


function init() {

  comicArrayLoad();

  var container = document.getElementById("theContainer");
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;



  // var textureLoader = new THREE.TextureLoader();
  // var mapA = textureLoader.load( "assets/phrases/joke.png", createHUDSprites );
  scene = new THREE.Scene();

  group = load_a_random_group()
  scene.add( group );
  hudSceneGen();
  // console.log(sceneOrtho);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;


  container.appendChild( renderer.domElement );



  window.addEventListener( 'resize', onWindowResize, false );



  container.addEventListener("mouseup", tapOrClick, false);
  container.addEventListener("touchend", tap, false);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  hudResize();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

///HUD////

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
  spriteTL  .center.set( 0.0, 1.0 );
  spriteTL.scale.set( width, height, 1 );
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
  sprite.position.set(   0,        0, -1 );
  console.log("HUD SPRITE:");
  console.log(sprite);
  // center
}

/////////EVENTS////////////////////////

function tap(event){
   event.stopPropagation();
   event.preventDefault();
  console.log("taped");
  tapOrClick(event);
}

function tapOrClick(event) {
  event.stopPropagation();
  event.preventDefault();


    frameAdvance();

 }



function animate() {

    requestAnimationFrame( animate );
  	TWEEN.update();
    // group.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;
    // controls.update();
    render();

}

function render() {
  renderer.clear();
  // renderer.render( scene, camera );
  renderer.clearDepth();
  renderer.render( sceneOrtho, cameraOrtho );
}
