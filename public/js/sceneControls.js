




let currentComic, currentComicGroup;
let circOffset = 0;
let spun = 0;
let oldTexture;
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



function phraseCheck(comic, frame){

  for (var phrase in phraseStructure) {

    if (phraseStructure[phrase].hasOwnProperty(comic)) {

      if(phraseStructure[phrase][comic].panel == frame){
          // console.log(frame, comic);
          phraseGroup.getObjectByName(phrase).visible = true;
          new TWEEN.Tween( phraseGroup.getObjectByName(phrase).position ).to( {
            x: (0)}, 250 ).start()
        }else{ /////PROBAVLY REDUNDANT
          phraseGroup.getObjectByName(phrase).position.set( 1., 0., 0 )
          phraseGroup.getObjectByName(phrase).visible = false;
      }}else{
        phraseGroup.getObjectByName(phrase).position.set( 1., 0., 0 )
        phraseGroup.getObjectByName(phrase).visible = false;

    }
  }
}





function updateCurrentComic (update){
  currentComic = update;
  currentComicGroup = ComicScene.getObjectByName("comicGroup"+currentComic);

}



let counter = 0;


function frameAdvance(){

  precounter = counter;
  counter ++;
  if (counter>=4) {
      counter = 0;
  }
    phraseCheck (currentComic, counter);

    // var oldy = comicGroup.getObjectByName("frame"+precounter);
    // var newey = comicGroup.getObjectByName("frame"+counter);

    new TWEEN.Tween( currentComicGroup.position ).to( {
      x: (counter*-1.05)}, 250 ).start()

      new TWEEN.Tween( stars.position ).to( {
        x: -(radius*0.5)-(counter*1.05)}, 250 ).start()
    // new TWEEN.Tween( oldy.material ).to( {
    //   opacity: 0.}, 250 ).start().onComplete(function() {
    //     new TWEEN.Tween( newey.material ).to( {
    //         opacity: 1.}, 250 ).start()
    // });
}




//
// function collapse (target){
//   phraseGroup.visible = false;
//   for (var i = 0; i < comicGroup.children.length; i++) {
//     new TWEEN.Tween( comicGroup.children[i].position ).to( {
//       y: 0}, 250 ).start()
//   }
//   new TWEEN.Tween( comicGroup.position ).to( {
//     y: 0}, 250 ).start().onComplete(function() {
//       timeline.children[currentComic].visible = true;
//         time_travel(target)
//     });
//
//     new TWEEN.Tween( timelineCamera.position ).to( {
//       z: 2.}, 500 ).start()
//
// }
//
// function expand (){
//
//   new TWEEN.Tween( comicGroup.position ).to( {
//     y: 0}, 250 ).start().onComplete(function() {
//       timeline.children[currentComic].visible = false;
//       comicGroup.visible = true;
//       phraseGroup.visible = true;
//       for (var i = 0; i < comicGroup.children.length; i++) {
//         new TWEEN.Tween( comicGroup.children[i].position ).to( {
//           y: i * -1.05}, 250 ).start()
//       }
//     });
//
//
//     new TWEEN.Tween( timelineCamera.position ).to( {
//       z: 1.}, 500 ).start()
//
// }

//////////TIME TRAVEL!!!////////

function time_warp(comic, frame){
  console.log("warping to "+comic, frame);
  // timeline.rotation.z = comic*theta;
  timeline.visible = true;
  // circOffset = comic*theta;
  time_travel(Number(comic), true);




  counter = frame-1;

  frameAdvance();
  currentComicGroup.position.x = frame*1.05;
}

function time_travel(target, warpBool, button){

  button.visible = false;
  //// TEXUTRE SWAP
  if (warpBool){
    comicName = target;
    circOffset = target;
  }else{
  circOffset = (circOffset+ target);
  var comicName = circOffset%(possibleComics.length);
  if (comicName<0){
    comicName =21+comicName;
    }
  }

  console.log("circoffset:"+circOffset);
  var oldPlaneToChange = timeline.getObjectByName("TimeLine"+currentComic)

  if (spun){
    oldPlaneToChange.material.map = oldTexture;
    currentComicGroup.visible = false;
  }

  spun = 1;

  updateCurrentComic(comicName);
  console.log("currentComicGroup:");
  console.log(currentComicGroup);
  currentComicGroup.visible = true;



  planeToChange = timeline.getObjectByName("TimeLine"+comicName);

  oldTexture = planeToChange.material.map;
  planeToChange.material.map = comicTarget.texture;
  phraseCheck (currentComic, 0);



  if (warpBool){
    console.log("warprot");
     timeline.rotation.z = theta*circOffset;
  }else{
    new TWEEN.Tween( timeline.rotation ).to( {
      z: theta*circOffset}, 2000 ).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function() {
        button.visible = true;
      });
      new TWEEN.Tween( stars.rotation ).to( {
        z: theta*circOffset}, 2000 ).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function() {});
    }
        // comicGroup = load_a_group(i);
        // scene.add( comicGroup );
        // expand()













    // comicGroup = load_a_group(i);
    // scene.add( comicGroup );


}






function WB(button){
  time_travel(-(3+Math.ceil(Math.random()*2)),false, button);
  //time_travel();
}

function LB(button){
  time_travel(-(Math.ceil(Math.random()*2)),false, button);
}


function LF(button){
  time_travel((Math.ceil(Math.random()*2)),false, button);
}

function WF(button){
  time_travel(3+(Math.ceil(Math.random()*2)),false, button);
}
