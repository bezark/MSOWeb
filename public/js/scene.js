
let width, height;
let camera, ComicScene, TimeLineScene, renderer
let geometry, material, mesh, comicTarget;

let comicGroup, timeline, phraseGroup;

let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2();
let selectedObjects = [];

let composer, effectFXAA, outlinePass;



init();
animate();

function calcWH(){
  width = window.innerWidth;
  height = 0.5625*width;
}
function init() {

  calcWH();


  comicCamera = new THREE.PerspectiveCamera( 70, 1, 0.01, 10 );
  comicCamera.position.z = 0.75;

  timelineCamera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
  timelineCamera.position.z = 1;

  TimeLineScene = new THREE.Scene();
  ComicScene = new THREE.Scene();

	// controls = new THREE.TrackballControls( timelineCamera );

  comicTarget = new THREE.WebGLRenderTarget( 1024, 1024, { format: THREE.RGBFormat } );
  comicTarget.name = "comicTarget";


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
	renderer.shadowMap.enabled = true;


  comicArrayLoad();

	phraseSpriteGen();
	ComicScene.add( phraseGroup );
	phraseGroupsGen();


  loadAllComics()

  UILoad();

	timeline = load_timeline();
	TimeLineScene.add( timeline );

	// expand ()




  initStars();



	postInit();

var container = document.getElementById("theContainer");

  container.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener("orientationchange", handleOrientation, false);

  container.addEventListener("mouseup", tapOrClick, false);
  container.addEventListener("touchstart", tap, false);

	container.addEventListener( 'mousemove', onTouchMove );
  container.addEventListener( 'touchmove', onTouchMove );



}  ////END O INIT

function onWindowResize() {
  calcWH();
  timelineCamera.aspect = width / height;
  timelineCamera.updateProjectionMatrix();

	updateHUDSprites();

  renderer.setSize( width, height );
	composer.setSize(width, height ); // width, height ); ????????
	effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height );

}

//

function handleOrientation(event){
  onWindowResize();
}


if(window.innerHeight > window.innerWidth){
    alert("Please use Landscape!");
}


///////////////

function animate() {

    requestAnimationFrame( animate );
  	TWEEN.update();
			// controls.update();
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
