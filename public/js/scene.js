
let camera, ComicScene, TimeLineScene, renderer
let geometry, material, mesh, comicTarget;

let comicGroup, timeline, phraseGroup;

let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2();
let selectedObjects = [];

let composer, effectFXAA, outlinePass;



init();
animate();


function init() {

  var width = window.innerWidth;
  var height = window.innerHeight;


  comicCamera = new THREE.PerspectiveCamera( 70, 1, 0.01, 10 );
  comicCamera.position.z = 0.75;

  timelineCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  timelineCamera.position.z = 1;

  TimeLineScene = new THREE.Scene();
  ComicScene = new THREE.Scene();

	controls = new THREE.TrackballControls( timelineCamera );

  comicTarget = new THREE.WebGLRenderTarget( 1024, 1024, { format: THREE.RGBFormat } );
  comicTarget.name = "comicTarget";


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;


  comicArrayLoad();

	phraseSpriteGen();
	ComicScene.add( phraseGroup );
	phraseGroupsGen();


  loadAllComics()



	timeline = load_timeline();
	TimeLineScene.add( timeline );

	// expand ()




  initStars();



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

  timelineCamera.aspect = window.innerWidth / window.innerHeight;
  timelineCamera.updateProjectionMatrix();

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
			controls.update();
    render();

}

function render() {
	renderer.autoClear = true;
	renderer.setClearColor( 0xa0a0a0 );
  renderer.setClearAlpha( 0.0 );

  composer.render();

  // renderer.render( ComicScene, comicCamera, comicTarget, true );
	// renderer.setClearColor( 0xfff0f0 );
  renderer.render( TimeLineScene, timelineCamera );

}
