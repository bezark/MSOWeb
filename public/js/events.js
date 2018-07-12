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


    frameAdvance();

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
   selectedObjects.push(object);
 }

 function checkIntersection() {

   raycaster.setFromCamera( mouse, camera );

   var intersects = raycaster.intersectObjects( [ phraseGroup ], true );

   if ( intersects.length > 0 ) {

     var selectedObject = intersects[ 0 ].object;
     console.log(comicStructure.phrases[selectedObject.name]);
     addSelectedObject(selectedObject);
     outlinePass.selectedObjects = selectedObjects;
   }
   else {
     outlinePass.selectedObjects = [];
   }
 }
