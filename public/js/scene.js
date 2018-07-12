
let camera, scene, renderer, cameraOrtho, sceneOrtho;
let geometry, material, mesh;

let comicGroup, HUDgroup, timeline, phraseGroup;

let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2();
let selectedObjects = [];

let composer, effectFXAA, outlinePass;



init();
animate();


function init() {

  var width = window.innerWidth;
  var height = window.innerHeight;


  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  scene = new THREE.Scene();




  comicArrayLoad();

	phraseSpriteGen();
	scene.add( phraseGroup );

  comicGroup = load_a_random_group();
  scene.add( comicGroup );

	phraseGroupsGen();

	timeline = load_timeline(currentComic);
	scene.add( timeline );

	expand ()



	// HUDgroup = new THREE.Group();
	// hudSceneGen();
	//
	// scene.add( HUDgroup );
	console.log("PHRASE GROUP:");
	console.log(phraseGroup);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.setClearColor( 0xa0a0a0 );

	postInit();

var container = document.getElementById("theContainer");

  container.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );


  container.addEventListener("mouseup", tapOrClick, false);
  container.addEventListener("touchend", tap, false);

	container.addEventListener( 'mousemove', onTouchMove );
  container.addEventListener( 'touchmove', onTouchMove );


}  ////END O INIT

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

	updateHUDSprites();

  renderer.setSize( window.innerWidth, window.innerHeight );
	composer.setSize(window.innerWidth, window.innerHeight ); // width, height ); ????????
	effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );

}

//







///////////////

function animate() {

    requestAnimationFrame( animate );
  	TWEEN.update();

    render();

}

function render() {
	renderer.autoClear = true;
	renderer.setClearColor( 0xfff0f0 );
	renderer.setClearAlpha( 0.0 );
	composer.render();
  // renderer.clearDepth();
  // renderer.render( sceneOrtho, cameraOrtho );
}
