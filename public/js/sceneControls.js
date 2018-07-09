




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

  new TWEEN.Tween( oldy.material ).to( {
    opacity: 0.}, 250 ).start().onComplete(function() {
      new TWEEN.Tween( newey.material ).to( {
          opacity: 1.}, 250 ).start()
  });
}

//////////TIME TRAVEL!!!////////

function time_travel(target){
  var i = (currentComic+ target)%(possibleComics.length);
  if (i<0){
    i = 20 + i;
  }
  console.log(i);
  scene.remove(comicGroup);
  comicGroup = load_a_group(i);
  scene.add( comicGroup );
  console.log("Jumping to "+ currentComic);

}

function WB(){
  time_travel(-(3+Math.ceil(Math.random()*2)));
}

function LB(){
  time_travel(-(Math.ceil(Math.random()*2)));
}


function LF(){
  time_travel((Math.ceil(Math.random()*2)));
}

function WF(){
  time_travel(3+(Math.ceil(Math.random()*2)));
}
