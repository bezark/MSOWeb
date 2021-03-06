
let width, height;
let camera, ComicScene, TimeLineScene, renderer
let geometry, material, mesh, comicTarget;

let comicGroup, timeline, phraseGroup;

let raycaster = new THREE.Raycaster();

let container;

let mouse = new THREE.Vector2();
let selectedObjects = [];

let composer, effectFXAA, outlinePass;

window.addEventListener("orientationchange", handleOrientation);

let initted = false;
function handleOrientation(){
  window.setTimeout(function(){
    if(!initted){  ;
    if(window.innerHeight > window.innerWidth){

        // alert("the orientation of the device is now "+screen.orientation.angle);
       alert("Please rotate to landscape!");
    }else{
      init();
      animate();
      initted = true;
    }}else{
      onWindowResize()
    }},250);

}



handleOrientation();


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

  calcWH()

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

 container = document.getElementById("theContainer");

  container.appendChild( renderer.domElement );


  window.addEventListener( 'resize', onWindowResize, false );


  // container.addEventListener("mouseup", tapOrClick, false);
  // container.addEventListener("touchend", tap, false);
  //
	// container.addEventListener( 'mousemove', onTouchMove );
  container.addEventListener( 'touchmove', onTouchMove );
  loadHammertime();


}  ////END O INIT

function onWindowResize() {
  calcWH();


  timelineCamera.aspect = width / height;
  warpCamera.aspect = width / height;
  timelineCamera.updateProjectionMatrix();


  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( width, height );
	// composer.setSize(width, height ); // width, height ); ????????
	// effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height );

}

//

















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
