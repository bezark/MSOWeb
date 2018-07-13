




let currentComic;



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
          console.log(frame, comic);
          phraseGroup.getObjectByName(phrase).visible = true;
          new TWEEN.Tween( phraseGroup.getObjectByName(phrase).position ).to( {
            y: (0)}, 250 ).start()
        }else{ /////PROBAVLY REDUNDANT
          phraseGroup.getObjectByName(phrase).position.set( 0, -1., 0 )
          phraseGroup.getObjectByName(phrase).visible = false;
      }}else{
        phraseGroup.getObjectByName(phrase).position.set( 0, -1., 0 )
        phraseGroup.getObjectByName(phrase).visible = false;

    }
  }
}





function updateCurrentComic (update){
  currentComic = update;
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

    new TWEEN.Tween( comicGroup.position ).to( {
      y: (counter*1.05)}, 250 ).start()
    // new TWEEN.Tween( oldy.material ).to( {
    //   opacity: 0.}, 250 ).start().onComplete(function() {
    //     new TWEEN.Tween( newey.material ).to( {
    //         opacity: 1.}, 250 ).start()
    // });
}

function collapse (target){
  phraseGroup.visible = false;
  for (var i = 0; i < comicGroup.children.length; i++) {
    new TWEEN.Tween( comicGroup.children[i].position ).to( {
      y: 0}, 250 ).start()
  }
  new TWEEN.Tween( comicGroup.position ).to( {
    y: 0}, 250 ).start().onComplete(function() {
      timeline.children[currentComic].visible = true;
        time_travel(target)
    });

    new TWEEN.Tween( camera.position ).to( {
      z: 2.}, 500 ).start()

}

function expand (){

  new TWEEN.Tween( comicGroup.position ).to( {
    y: 0}, 250 ).start().onComplete(function() {
      timeline.children[currentComic].visible = false;
      comicGroup.visible = true;
      phraseGroup.visible = true;
      for (var i = 0; i < comicGroup.children.length; i++) {
        new TWEEN.Tween( comicGroup.children[i].position ).to( {
          y: i * -1.05}, 250 ).start()
      }
    });


    new TWEEN.Tween( camera.position ).to( {
      z: 1.}, 500 ).start()

}

//////////TIME TRAVEL!!!////////

function time_warp(comic, frame){
  console.log("warping to "+comic, frame);
  tempTimeline.position.x = comic*-1.05

  comicGroup = load_a_group(comic);
  timeline.children[currentComic].visible = false;
  scene.add( comicGroup );
  timeline.visible = true;
  comicGroup.visible = true;
  counter = frame-1;
  expand();
  frameAdvance();
  comicGroup.position.y = frame*-1.05;
}

function time_travel(target){
  var i = (currentComic+ target)%(possibleComics.length);
  if (i<0){
    i = 20 + i;
  }
  console.log(i);
  scene.remove(comicGroup);
  new TWEEN.Tween( tempTimeline.position ).to( {
    x : i*-1.05}, 2000 ).start().onComplete(function() {
      comicGroup = load_a_group(i);
      scene.add( comicGroup );
      expand()
    });

  comicGroup = load_a_group(i);
  scene.add( comicGroup );
  console.log("Jumping to "+ currentComic);

}

function WB(){
  collapse(-(3+Math.ceil(Math.random()*2)));
  //time_travel();
}

function LB(){
  collapse(-(Math.ceil(Math.random()*2)));
}


function LF(){
  collapse((Math.ceil(Math.random()*2)));
}

function WF(){
  collapse(3+(Math.ceil(Math.random()*2)));
}
