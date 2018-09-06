var req = new XMLHttpRequest();
req.open("GET","data/comicStructure.json", false);
req.send(null);
comicStructure = JSON.parse(req.responseText);
phraseStructure = comicStructure.phrases


let phrases = ["then","remember","saying","where","joke"];


let theta, radius;

let comicSceneMaterial;

let loader = new THREE.TextureLoader();

let warpb
///////TIMELINE//////////
function load_timeline(){
  radius = (possibleComics.length);
  theta = (Math.PI*2)/((possibleComics.length*4));
  tempTimeline = new THREE.Group();
  timelineImageLoad(0);

  tempTimeline.position.x = -radius;
  tempTimeline.position.z = 0.256;


  comicSceneMaterial = new THREE.MeshBasicMaterial( {
   map: comicTarget,
   transparent: true,
   opacity: 1.,
   name : "comicSceneMaterial"//theOpac
  });



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






    var geometry = new THREE.PlaneGeometry( 1.7778, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { opacity: 0., transparent: true} );
    var circle = new THREE.Mesh( geometry, material );
    circle.name = phrases[i];
    circle.isPhrase = true;
    // circle.position.z = -0.257;; // center
    circle.scale.set( 0.5, 0.5, 1 )


    phraseGroup.add( circle );
  }


    phraseCheck (currentComic, counter);


  }

let phraseHopGroups= {
  "then": null,
  "remember": null,
  "saying": null,
  "where": null,
  "joke": null
}

function comicTexRefGen(){
  var texArray = []
  for (var phrase in phraseStructure) {

  texArray.push(phrase, Object.keys(phraseStructure[phrase]))

    // WarpScene.add(phraseHopGroups[phrase]);

    //
    // for (var comic in phraseStructure[phrase]) {
    //   console.log(Object.keys(phraseStructure[phrase][comic]));
    //   phraseStructure[phrase][comic].tex = "toop!"
      // PHpositionIndex ++;
      }

      phraseGroupLoad(texArray)//
    }

function phraseGroupLoad(texArray){
  if (texArray.length){
    var phraseGroup = texArray.splice(0, 2)
    phraseGroupImageLoad  (phraseGroup[0],phraseGroup[1], texArray)
  }else{
    console.log('PHRASE STRUCTURE:');
    console.log(phraseStructure);
  }
}

function phraseGroupImageLoad (phrase, comics, remainingGroups){


    if(comics.length){
      var comic = comics.splice (0, 1);

      loader.load(
       // resource URL

       "assets/testImages/"+comic+"/"+phraseStructure[phrase][comic].panel+".png",
       // Function when resource is loaded
       function ( texture) {

        phraseStructure[phrase][comic].texture = texture;
        phraseGroupImageLoad(phrase, comics, remainingGroups)
       },
       // Function called when download progresses
       function ( xhr ) {
         console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
       },
       // Function called when download errors
       function ( xhr ) {
         console.log( 'An error happened loading textures for warp comics' );
       });

    }else{
      phraseGroupLoad(remainingGroups)
    }
    // console.log("assets/testImages/"+comic+"/"+frame+".png",);


}




let partieTex ={};
let warpPlaneFar, warpPlaneNear;
function warpSceneGen(){


  warpbackgroundgeo =  new THREE.PlaneGeometry( 100, 100, 1 );

  loader.load(
   // resource URL

   'assets/warpTex.png',
   // Function when resource is loaded
   function ( texture ) {

      var warpbackMaterial=  new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
      warpb = new THREE.Mesh( warpbackgroundgeo, warpbackMaterial );
      warpb.scale.set( 1, 0.5625, 1 );
      warpb.name = "warp";

      warpb.position.set( 0., 0., -10.); // center


      WarpScene.add( warpb );


    });

    partieTexGen(0);
    var warpPlane = new THREE.PlaneGeometry( 1., 1., 1. );
    var warpPlaneMaterialNear=  new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true } );
    var warpPlaneMaterialFar=  new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true } );
    warpPlaneNear = new THREE.Mesh( warpPlane, warpPlaneMaterialNear );
    warpPlaneNear.position.z = -0.11;
    warpPlaneFar = new THREE.Mesh( warpPlane, warpPlaneMaterialFar );
    warpPlaneFar.position.z = -100.;

    WarpScene.add(warpPlaneNear)
    WarpScene.add(warpPlaneFar)

  }

let phraseParties = new THREE.Group();
phraseParties.name = "phrasesParties"


function partieTexGen(phraseIndex){
    var jokegeo =  new THREE.PlaneGeometry( 1., 1., 1 );
    console.log("PHRASEINDEX"+phrases[phraseIndex]);
    var tempGroup = new THREE.Group()
    tempGroup.name = phrases[phraseIndex]+"parties";
    phraseParties.add(tempGroup);
    loader.load(
     // resource URL
     'assets/phrases/'+phrases[phraseIndex]+'.png',
     // Function when resource is loaded
     function ( texture ) {


           var jokemat = new THREE.MeshBasicMaterial( {map: texture, color: 0xffffff, transparent: true } );
           for ( var j = 0; j < 500; j ++ ) {
               meshy = new THREE.Mesh( jokegeo, jokemat );
               meshy.position.x = 1.7777778 * Math.random()-0.8888888889;
                meshy.position.y = 1. * Math.random() - 0.5;
                meshy.position.z = j/-50.;
                meshy.rotation.z =-(Math.PI*2)/250*j;
                meshy.scale.x = 0.25
                meshy.scale.y=0.25;
                tempGroup.add(meshy);
                tempGroup.visible = false;

             }
     // partieTex[phrases[phraseIndex]] = texture
      phraseIndex ++
      if(phraseIndex<5){
        partieTexGen(phraseIndex)
      }else{
        console.log(phraseParties);
        WarpScene.add(phraseParties);
      }
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
  tempGroup.position.z = 0.256;
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
       if (comicLoadingIndex < 21) {
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
