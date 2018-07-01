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
  console.log(sceneOrtho);

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
  renderer.render( scene, camera );
  renderer.clearDepth();
  renderer.render( sceneOrtho, cameraOrtho );
}
