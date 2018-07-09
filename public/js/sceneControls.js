
let currentComic;

function updateCurrentComic (update){
  currentComic = update;
}



var counter = 0;


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
function WB(){
  console.log(currentComic);
}

function LB(){
  var i = currentComic - 1;
  console.log("LB");
  load_a_group(i);

}


function LF(){
  var i = currentComic + 1;
  load_a_group(i);
  console.log("LF");
}

function WF(){
  console.log("WF");
}
