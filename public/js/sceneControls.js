




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


  var oldy = comicGroup.getObjectByName("frame"+precounter);
  var newey = comicGroup.getObjectByName("frame"+counter);

  new TWEEN.Tween( comicGroup.position ).to( {
    y: (counter*1.05)}, 250 ).start()
  // new TWEEN.Tween( oldy.material ).to( {
  //   opacity: 0.}, 250 ).start().onComplete(function() {
  //     new TWEEN.Tween( newey.material ).to( {
  //         opacity: 1.}, 250 ).start()
  // });
}

function collapse (target){
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
      for (var i = 0; i < comicGroup.children.length; i++) {
        new TWEEN.Tween( comicGroup.children[i].position ).to( {
          y: i * -1.05}, 250 ).start()
      }
    });


    new TWEEN.Tween( camera.position ).to( {
      z: 1.}, 500 ).start()

}

//////////TIME TRAVEL!!!////////

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
