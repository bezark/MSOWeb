/////////EVENTS////////////////////////
var clicks = 0;
let triggy;




function tap(event){
   event.stopPropagation();
   event.preventDefault();
  console.log("taped");
  onTouchMove(event);
  tapOrClick(event);
}
function test(){
  console.log("test");
}
function triggerLoad(triggy, button){triggy(button)}

function tapOrClick(event) {
  event.stopPropagation();
  event.preventDefault();

  if(selectedObjects.length>0){


    // WB(buttonGroup.getObjectByName(selectedObjects[0].name));
    triggerLoad(buttonGroup.getObjectByName(selectedObjects[0].name).trigger, buttonGroup.getObjectByName(selectedObjects[0].name))

    ///FIGURe out phrase hop raycast
    // phraseHop(selectedObjects[0].name);
    // phraseGroup.getObjectByName(selectedObjects[0].name).visible = false
  }else{  frameAdvance()}


 }



function onTouchMove( event ) {

   var x, y;

   if ( event.changedTouches ) {

     x = event.changedTouches[ 0 ].pageX;
     y = event.changedTouches[ 0 ].pageY;

   } else {

     x = event.clientX;
     y = event.clientY;

   }

   mouse.x = ( x / width ) * 2 - 1;
   mouse.y = - ( y / height) * 2 + 1;

   checkIntersection();

 }

function addSelectedObject(object) {
   selectedObjects = [];
   selectedObjects.push(  object);
 }

function checkIntersection() {

   raycaster.setFromCamera( mouse, timelineCamera );

   var intersects = raycaster.intersectObjects( [ buttonGroup ], true );

   if ( intersects.length > 0 ) {

     var selectedObject = intersects[ 0 ].object;
     addSelectedObject(selectedObject);

     // outlinePass.selectedObjects = selectedObjects;
   }
   else {
     selectedObjects = [];
     // outlinePass.selectedObjects = selectedObjects;
   }
 }
