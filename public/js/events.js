/////////EVENTS////////////////////////

function tap(event){
   event.stopPropagation();
   event.preventDefault();
  console.log("taped");
  tapOrClick(event);
}

function tapOrClick(event) {
  event.stopPropagation();
  event.preventDefault();

  if(selectedObjects.length>0){
    phraseHop(selectedObjects[0].name);
    // phraseGroup.getObjectByName(selectedObjects[0].name).visible = false
  }else{frameAdvance();}

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

   mouse.x = ( x / window.innerWidth ) * 2 - 1;
   mouse.y = - ( y / window.innerHeight ) * 2 + 1;

   checkIntersection();

 }

function addSelectedObject(object) {
   selectedObjects = [];
   selectedObjects.push(  object);
 }

function checkIntersection() {

   raycaster.setFromCamera( mouse, camera );

   var intersects = raycaster.intersectObjects( [ phraseGroup ], true );

   if ( intersects.length > 0 ) {

     var selectedObject = intersects[ 0 ].object;
     addSelectedObject(selectedObject);
     outlinePass.selectedObjects = selectedObjects;
   }
   else {
     selectedObjects = [];
     outlinePass.selectedObjects = selectedObjects;
   }
 }
