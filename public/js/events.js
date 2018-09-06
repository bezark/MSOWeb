/////////EVENTS////////////////////////
var clicks = 0;
let triggy;

function loadHammertime(){
  var hammertime = new Hammer(container);
  hammertime.on('swipe', function(ev) {
  	swipes(ev);
  });
  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on('tap',function(event){
  console.log(event);
  // event.stopPropagation();
  // event.preventDefault();

  onTouchMove(event);
  tapOrClick(event);
  });
}

function tap(event){
}
function swipes(event){
  switch(event.direction){
  case 2:
    frameAdvance(true);
  break;
  case 4:
    frameAdvance(false)
  break;
  case 16:
   WB(buttonGroup.getObjectByName("WB"))
   break;
   case 8:
   WF(buttonGroup.getObjectByName("WF"))
  }

}
function triggerLoad(triggy, button){triggy(button)}

function tapOrClick(event) {
  // event.stopPropagation();
  // event.preventDefault();
  console.log(event);
  if(selectedObjects.length>0){


    if(selectedObjects[0].isPhrase){
        phraseHop(selectedObjects[0].name);
    }else{
      // document.getElementById("mobileLog").innerHTML = selectedObjects[0].name
    // WB(buttonGroup.getObjectByName(selectedObjects[0].name));
    triggerLoad(buttonGroup.getObjectByName(selectedObjects[0].name).trigger, buttonGroup.getObjectByName(selectedObjects[0].name))
}
    ///FIGURe out phrase hop raycast

    // phraseGroup.getObjectByName(selectedObjects[0].name).visible = false
  }else{  frameAdvance(true)}


 }



function onTouchMove( event ) {

   var x, y;
   x = event.center.x;
   y = event.center.y;
   // if ( event.changedTouches ) {
   //
   //   x = event.changedTouches[ 0 ].pageX;
   //   y = event.changedTouches[ 0 ].pageY;
   //
   // } else {
   //
   //   x = event.clientX;
   //   y = event.clientY;
   //
   // }

    mouse.x = ((x-(window.innerWidth-width)*0.5)/width)* 2 - 1; //
    mouse.y = - ( y/height ) * 2 + 1;
   checkIntersection();

 }

function addSelectedObject(object) {
   selectedObjects = [];
   selectedObjects.push(  object);
 }

function checkIntersection() {

   raycaster.setFromCamera( mouse, timelineCamera );

   var intersects = raycaster.intersectObjects( [ buttonGroup, phraseGroup ], true );

   if ( intersects.length > 0 ) {

     var selectedObject = intersects[ 0 ].object;




     // mobileLog.appendChild(document.createTextNode(selectedObject.position.x+", "+selectedObject.position.y));


     addSelectedObject(selectedObject);

     // outlinePass.selectedObjects = selectedObjects;
   }
   else {
     selectedObjects = [];
     // outlinePass.selectedObjects = selectedObjects;
   }
 }
