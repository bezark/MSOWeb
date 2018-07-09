

var counter = 0;


function frameAdvance(){
  if (counter >= 3){
  scene.remove(comicGroup);
  comicGroup = load_a_random_group();
  scene.add( comicGroup );

  counter = -1;
  }
  counter ++;
  precounter = counter - 1;
  console.log(counter);
  var oldy = comicGroup.getObjectByName("frame"+precounter);
  var newey = comicGroup.getObjectByName("frame"+counter);

  new TWEEN.Tween( oldy.material ).to( {
    opacity: 0.}, 250 ).start().onComplete(function() {
      new TWEEN.Tween( newey.material ).to( {
          opacity: 1.}, 250 ).start()
  });
}
