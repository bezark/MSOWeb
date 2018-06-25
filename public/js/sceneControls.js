

var counter = 0;


function frameAdvance(){
  if (counter >= 3){
  scene.remove(group);
  group = load_a_random_group();
  scene.add( group );

  counter = -1;
  }
  counter ++;
  precounter = counter - 1;
  console.log(counter);
  var oldy = group.getObjectByName("frame"+precounter);
  var newey = group.getObjectByName("frame"+counter);

  new TWEEN.Tween( oldy.material ).to( {
    opacity: 0.}, 250 ).start().onComplete(function() {
      new TWEEN.Tween( newey.material ).to( {
          opacity: 1.}, 250 ).start()
  });
}
