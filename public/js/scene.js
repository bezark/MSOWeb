var camera, controls, scene, renderer;
var geometry, material, mesh, group;

init();
animate();


function init() {
  comicArrayLoad();
  var container = document.getElementById("theContainer");
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 1;

    // controls = new THREE.TrackballControls( camera );
		// 		controls.rotateSpeed = 1.0;
		// 		controls.zoomSpeed = 1.2;
		// 		controls.panSpeed = 0.8;
		// 		controls.noZoom = false;
		// 		controls.noPan = false;
		// 		controls.staticMoving = false;
		// 		controls.dynamicDampingFactor = 0.3;


    scene = new THREE.Scene();

    group = load_a_random_group()
    scene.add( group );
    console.log("GROUP:");
    console.log(group);
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth*0.6, window.innerHeight*0.6 );


    container.appendChild( renderer.domElement );



    window.addEventListener( 'resize', onWindowResize, false );



    container.addEventListener("mouseup", tapOrClick, false);
    container.addEventListener("touchend", tap, false);
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

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
    renderer.render( scene, camera );

}
