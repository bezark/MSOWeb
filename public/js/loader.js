var req = new XMLHttpRequest();
req.open("GET","data/comicStructure.json", false);
req.send(null);
comicStructure = JSON.parse(req.responseText);
phraseStructure = comicStructure.phrases


let theta, radius;

let comicSceneMaterial;

let loader = new THREE.TextureLoader();


///////TIMELINE//////////
function load_timeline(){
  radius = (possibleComics.length);
  theta = (Math.PI*2)/((possibleComics.length*4));
  tempTimeline = new THREE.Group();
  timelineImageLoad(0);

  tempTimeline.position.x = -radius;
  tempTimeline.position.z = 0.2;


  comicSceneMaterial = new THREE.MeshBasicMaterial( {
   map: comicTarget,
   transparent: true,
   opacity: 1.,
   name : "comicSceneMaterial"//theOpac
  });
  console.log("CSM:");
  // console.log(comicSceneMaterial);

  return tempTimeline;


}

function timelineImageLoad (loadi){

   loader.load(
    // resource URL

    "assets/testImages/"+loadi+"/0.png",
    // Function when resource is loaded
    function ( texture ) {

      texture.name = loadi+"Texture";

      // if(loadi == 0){theOpac = 1.}else{theOpac = 0.};
       material = new THREE.MeshBasicMaterial( {
        map: texture, //comicTarget,
        transparent: true,
        opacity: 1.

       } );

       var plane = new THREE.Mesh( geometry, material );
       plane.position.x = radius*Math.sin(theta*loadi);
       plane.position.y = radius*Math.cos(theta*loadi);
       plane.rotation.z =-theta*loadi+1.570796;
       plane.name = "TimeLine"+loadi;

       tempTimeline.add( plane );


       ///CLONES!!/////
       for (var cv = 1; cv < 4; cv++) {
          var newPlane =  plane.clone();

            newPlane.position.x = radius*Math.sin(theta*(loadi+(21*cv)));
            newPlane.position.y = radius*Math.cos(theta*(loadi+(21*cv)));
            newPlane.rotation.z =-(theta*(loadi+(21*cv)))+1.570796;
            newPlane.name = "TimeLine"+loadi//((loadi+(21*cv)));
             tempTimeline.add( newPlane );

       }




       loadi ++;

       if(loadi < possibleComics.length ){
       timelineImageLoad (loadi);
     }else{
        updateCurrentComic(0);
        time_warp(0, 0);
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
}



///////PHRASES//////////

function phraseSpriteGen(){

	phraseGroup = new THREE.Group();
  phraseGroup.name = "phrases"


  for (var i = 0; i < phrases.length; i++) {






    var geometry = new THREE.CircleGeometry( 5, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var circle = new THREE.Mesh( geometry, material );
    circle.name = phrases[i];
    circle.isPhrase = true;
    // circle.position.set( i*0.4-1., 0.3, 0 ); // center
  circle.scale.set( 0.05, 0.05, 1 )
  console.log("CIRCLE");
  console.log(circle);
    phraseGroup.add( circle );
  }


    phraseCheck (currentComic, counter);


}

function phraseGroupsGen(){ //////This is weird 3d circle
  for (var phrase in phraseHopGroups) {
    var phlength = Object.keys(phraseStructure[phrase]).length;

    phraseHopGroups[phrase]=  new THREE.Group();
    phraseHopGroups[phrase].theta = (Math.PI*2)/(phlength);
    phraseHopGroups[phrase].radius =phlength*0.25;

    phraseHopGroups[phrase].position.x = phraseHopGroups[phrase].radius;
    // phraseHopGroups[phrase].position.y = -phraseHopGroups[phrase].radius;

    TimeLineScene.add(phraseHopGroups[phrase]);
    phraseHopGroups[phrase].visible = false;
    // console.log(phraseHopGroups[phrase]);
    var PHpositionIndex = 0;

    for (var comic in phraseStructure[phrase]) {
      phraseGroupImageLoad(comic, phraseStructure[phrase][comic].panel, phraseHopGroups[phrase], PHpositionIndex)
      PHpositionIndex ++;

      }
    }
  }

function phraseGroupImageLoad (comic, frame, group, i){
    // console.log("assets/testImages/"+comic+"/"+frame+".png",);
   loader.load(
    // resource URL

    "assets/testImages/"+comic+"/"+frame+".png",
    // Function when resource is loaded
    function ( texture) {
      // if(loadi == 0){theOpac = 1.}else{theOpac = 0.};
       material = new THREE.MeshBasicMaterial( {
        map: texture,
        transparent: true,
        opacity: 1. //theOpac

       } );

       var plane = new THREE.Mesh( geometry, material );
       plane.position.x = (group.radius)*Math.sin(group.theta*i);
       plane.position.y = -(group.radius)*Math.cos((group.theta)*i);
       plane.rotation.y =(group.theta)*i+1.570796;
       plane.rotation.x = 1.570796;
       // plane.rotation.x = 1.570796;
       plane.comic = comic;
       plane.frame = frame;

       group.add( plane );
       group.rotation.x = -1.570796;
       // group.rotation.z = group.theta;



    },
    // Function called when download progresses
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.log( 'An error happened' );
    });
}






///////COMICS///////////
let comicLoadingIndex = 0;

function loadAllComics(){


  load_a_group(comicLoadingIndex);




}



function load_a_group(i){
 tempGroup = new THREE.Group();
  groupNo = i;


  geometry = new THREE.PlaneGeometry( 1, 1, 1 );

  var loadi = 0;

  imageLoad (groupNo, loadi);


  phraseCheck (currentComic, counter);

  tempGroup.visible = false;
  tempGroup.name = "comicGroup"+comicLoadingIndex;
  tempGroup.position.z = 0.2;
  TimeLineScene.add( tempGroup );

}

function imageLoad (groupNo, loadi){

   loader.load(
    // resource URL

    "assets/testImages/"+groupNo+"/"+loadi+".png",
    // Function when resource is loaded
    function ( texture ) {

       material = new THREE.MeshBasicMaterial( {
        map: texture,
        transparent: true,
        opacity: 1.

       } );

       var plane = new THREE.Mesh( geometry, material );
       plane.position.z = 0;
       plane.position.y = 0;
       plane.position.x = loadi * 1.05;;
       plane.name = "frame"+loadi;

       tempGroup.add( plane );

       loadi ++;

       if(loadi < 4){

       imageLoad (groupNo, loadi);
     }else{
       comicLoadingIndex ++;
       if (comicLoadingIndex < 22) {
         // console.log("LOADING GROUP"+comicLoadingIndex)
         load_a_group(comicLoadingIndex)
       }
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
