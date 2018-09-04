

// let mobileLog = document.getElementById("mobileLog");


let currentComic, currentComicGroup;
let circOffset = 0;
let spun = 0;
let oldTexture;
var possibleComics = [];
let counter = 0;
let comicName = 0;
// updateCurrentComic(comicName);

function comicArrayLoad (){

  for (var i = 0; i < 21; i++) {
      possibleComics.push(i);
  }

}





function phraseCheck(comic, frame){ ////add positioning

  for (var phrase in phraseStructure) {

    if ((phraseStructure[phrase].hasOwnProperty(comic))&&(phraseStructure[phrase][comic].panel == frame)) {
      phraseGroup.getObjectByName(phrase).visible = true;
        phraseGroup.getObjectByName(phrase).scale.x = phraseStructure[phrase][comic].scale.x;
        phraseGroup.getObjectByName(phrase).scale.y = phraseStructure[phrase][comic].scale.y;
        phraseGroup.getObjectByName(phrase).position.x = phraseStructure[phrase][comic].pos.x
        phraseGroup.getObjectByName(phrase).position.y = phraseStructure[phrase][comic].pos.y

      }else{
        phraseGroup.getObjectByName(phrase).position.set( 0., 0., 0.257 )
        phraseGroup.getObjectByName(phrase).visible = false;

    }
  }
}

function updateCurrentComic (update){
  currentComic = update;
  currentComicGroup = TimeLineScene.getObjectByName("comicGroup"+currentComic);

}

function frameAdvance(){

  precounter = counter;
  counter ++;
  if (counter>=4) {
      counter = 0;
  }
    phraseCheck (currentComic, counter);


    new TWEEN.Tween( currentComicGroup.position ).to( {
      x: (counter*-1.05)}, 250 ).start()



}



//////////TIME TRAVEL!!!////////
var planeToChange, oldPlaneToChange;
function time_travel(target, warpBool, button){
  button.material.map = button.pressedTexture;
  button.material.needsUpdate = true;

  counter = 0;
  phraseCheck (currentComic, counter);

  new TWEEN.Tween( currentComicGroup.position ).to( {
  x: (counter*-1.05)}, 250 ).start().onComplete(function(){


      circOffset = (circOffset+ target);
      var comicName = circOffset%(possibleComics.length);
      if (comicName<0){
        comicName =21+comicName;
        // }
      }


       oldPlaneToChange = timeline.getObjectByName("TimeLine"+currentComic)


        oldPlaneToChange.material.opacity = 1.;
        currentComicGroup.visible = false;


      updateCurrentComic(comicName);



      planeToChange = timeline.getObjectByName("TimeLine"+comicName);

      oldTexture = planeToChange.material.map;

      phraseCheck (currentComic, 0);

///// This might be where the loading error is

      new TWEEN.Tween( timeline.rotation ).to( {
        z: theta*circOffset}, 2000 ).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function() {
          button.material.map = button.unPressedTex;
          button.material.needsUpdate = true;
          currentComicGroup.visible = true;
          planeToChange.material.opacity = 0;
        });
        new TWEEN.Tween( stars.rotation ).to( {
          z: theta*circOffset}, 2000 ).easing(TWEEN.Easing.Bounce.Out).start().onComplete(function() {});

    });


}

function time_warp(comic, frame){
  timeline.getObjectByName("TimeLine"+currentComic).material.opacity = 1.;
  currentComicGroup.position.x = 0;
  currentComicGroup.visible = false;
  console.log("warping");
  updateCurrentComic(comic);

  timeline.rotation.z = comic*theta;
  timeline.visible = true;
  timeline.getObjectByName("TimeLine"+comic).material.opacity = 0;
  circOffset = comic;
  stars.rotation.z = theta*circOffset;
  currentComicGroup.visible = true;

 phraseCheck (currentComic, counter);


  counter = frame-1;

  frameAdvance();
  currentComicGroup.position.x = frame*1.05;
}





///////BUTTONS///////////
function WB(button){


  time_travel(-(3+Math.ceil(Math.random()*2)),false, button);

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
