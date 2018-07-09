// var req = new XMLHttpRequest();
// req.open("GET","data/images.json", false);
// req.send(null);
// images = JSON.parse(req.responseText);



var possibleComics = [];

function comicArrayLoad (){

  for (var i = 0; i < 21; i++) {
      possibleComics.push(i);
  }
  console.log(possibleComics);
}




function load_a_random_group(){

  var i = possibleComics.length
  var theNumber = Math.floor(Math.random() * (i));
  var loadedGroup = load_a_group(theNumber)
  return loadedGroup;


}

function load_a_group(i){
  tempGroup = new THREE.Group();
  groupNo = i;
  // getScript("/assets/scripts/"+groupNo);

  geometry = new THREE.PlaneGeometry( 1, 1, 1 );

  loader = new THREE.TextureLoader();
  var loadi = 0;
  updateCurrentComic(i);
  imageLoad (groupNo, loadi);
  return tempGroup;
}

function imageLoad (groupNo, loadi){

   loader.load(
    // resource URL

    "assets/testImages/"+groupNo+"/"+loadi+".png",
    // Function when resource is loaded
    function ( texture ) {
      if(loadi == 0){theOpac = 1.}else{theOpac = 0.};
       material = new THREE.MeshBasicMaterial( {
        map: texture,
        transparent: true,
        opacity: theOpac

       } );

       var plane = new THREE.Mesh( geometry, material );
       plane.position.x = 0;
       plane.position.y = 0;
       plane.position.z = 0;
       plane.name = "frame"+loadi;
       console.log(loadi+" is loaded");
       tempGroup.add( plane );

       // if(loadi == 0){
       // new TWEEN.Tween( plane.rotation ).to( {
       //   z: -90.}, 1000 ).start().onComplete(function() {});}

       loadi ++;

       if(loadi < 4){
       imageLoad (groupNo, loadi);
     }else{
       return tempGroup;
     }


    },
    // Function called when download progresses
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.log( 'An error happened' );
    });


  // tempGroup.children[1].visible = true;

}
