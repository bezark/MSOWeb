
var camera, scene, renderer, cameraOrtho, sceneOrtho;
var geometry, material, mesh;

let comicGroup, HUDgroup, timeline, phraseGroup;





init();
animate();


function init() {

  var width = window.innerWidth;
  var height = window.innerHeight;


  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();




  comicArrayLoad();



  comicGroup = load_a_random_group();
  scene.add( comicGroup );
	timeline = load_timeline(currentComic);
	scene.add( timeline );
	expand ()

	phraseGroup = new THREE.Group();

	phraseSpriteGen();
	scene.add( phraseGroup );
	// HUDgroup = new THREE.Group();
	// hudSceneGen();
	//
	// scene.add( HUDgroup );

	console.log(phraseGroup);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.autoClear = false;

var container = document.getElementById("theContainer");

  container.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );


  container.addEventListener("mouseup", tapOrClick, false);
  container.addEventListener("touchend", tap, false);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

	updateHUDSprites();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//








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

    render();

}

function render() {
  renderer.clear();
  renderer.render( scene, camera );
  renderer.clearDepth();
  // renderer.render( sceneOrtho, cameraOrtho );
}
