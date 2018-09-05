
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
  height = window.innerHeight;//width *0.5625;

  if (window.innerWidth > height*1.7777777778){
      width = height*1.7777777778
  }else{
    width = window.innerWidth;
  }
  // document.getElementById("mobileLog").innerHTML = window.innerWidth +"x"+ window.innerHeight+"--"+width+"x"+height

}
function init() {

  calcWH();


  warpCamera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 101 );
  warpCamera.position.z = 0.75;

  timelineCamera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 1000 );
  timelineCamera.position.z = 1;

  TimeLineScene = new THREE.Scene();
  WarpScene = new THREE.Scene();

	controls = new THREE.TrackballControls( timelineCamera );

  warpTarget = new THREE.WebGLRenderTarget( 1024, 1024, { format: THREE.RGBFormat } );
  warpTarget.name = "warpTarget";


  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
	renderer.shadowMap.enabled = true;


  comicArrayLoad();

	phraseSpriteGen();
	TimeLineScene.add( phraseGroup );
	comicTexRefGen();


  loadAllComics()

  UILoad();

	timeline = load_timeline();
	TimeLineScene.add( timeline );




  warpSceneGen()

  initStars();



	// postInit();

var container = document.getElementById("theContainer");

  container.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener("orientationchange", handleOrientation, false);

  container.addEventListener("mouseup", tapOrClick, false);
  container.addEventListener("touchstart", tap, false);

	container.addEventListener( 'mousemove', onTouchMove );
  container.addEventListener( 'touchmove', onTouchMove );



}  ////END O INIT
calc = 0
function onWindowResize() {
  calcWH();
  calc ++

  timelineCamera.aspect = width / height;
  timelineCamera.updateProjectionMatrix();



  renderer.setSize( width, height );
	// composer.setSize(width, height ); // width, height ); ????????
	// effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height );

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

  // render.render();

  renderer.render( TimeLineScene, timelineCamera );
  renderer.setClearColor( "rgb(244, 148, 1)" );
  renderer.render( WarpScene, warpCamera, warpTarget, true );

}
