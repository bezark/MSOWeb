var UIreq = new XMLHttpRequest();
UIreq.open("GET","data/ui.json", false);
UIreq.send(null);
UIstructure = JSON.parse(UIreq.responseText);



var buttonarray = [];
var buttonCount = 0;
let buttonGroup;

let ui, clearui;
let uiTex;
function UILoad (){
  buttonGroup = new THREE.Group();
  TimeLineScene.add(buttonGroup);
  uiGeo = new THREE.PlaneGeometry( 1., 1., 1. );
  // uiGeo = new THREE.PlaneGeometry( 1.92, 1.08, 1 );
  loader.load(
   // resource URL

   "assets/ui/UINormal.png",
   // Function when resource is loaded
   function ( texture ) {

     uiTex = texture;
      var uiMaterial=  new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
       ui = new THREE.Mesh( uiGeo, uiMaterial );
      // ui.scale.set( 1.92, 1.08, 1 );



       ui.scale.set( 1, 0.5625, 1 );
      ui.name = "UI";
      ui.position.set( 0., 0., 0.605); // center



      TimeLineScene.add(ui);

          }
    );

    loader.load(
     // resource URL

     "assets/ui/UIClear.png",
     // Function when resource is loaded
     function ( texture ) {


        var uiMaterial=  new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
         clearui = new THREE.Mesh( uiGeo, uiMaterial );
        // ui.scale.set( 1.92, 1.08, 1 );



         clearui.scale.set( 1, 0.5625, 1 );
        clearui.name = "clearUI";
        clearui.position.set( 0., 0., 0.605); // center
        clearui.visible = false;


        TimeLineScene.add(clearui);

            }
      );

  for (var button in UIstructure) {
    if (UIstructure.hasOwnProperty(button)) {
        buttonarray.push(button)
      }
    }

      buttonLoad();
      pauseLoad();
    }

function buttonLoad(){

    ;
      loader.load(

       // resource URL

       "assets/ui/"+buttonarray[buttonCount]+".png",
       // Function when resource is loaded
       function ( texture ) {

          var currButton = buttonarray[buttonCount]
          var buttonMaterial = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
          var uiButton = new THREE.Mesh( uiGeo, buttonMaterial );
          uiButton.scale.set( 0.15, 0.15, 1 );
          uiButton.layer = -1;
          uiButton.name = currButton;
          uiButton.unPressedTex = texture;
          uiButton.position.set( UIstructure[currButton].x, UIstructure[currButton].y, UIstructure[currButton].z);



          uiButton.trigger = window[UIstructure[currButton].event];
          loader.load(

           // resource URL

           "assets/ui/"+buttonarray[buttonCount]+"Pressed.png",
           // Function when resource is loaded
           function ( pressedtexture ) {
             uiButton.pressedTexture = pressedtexture
             buttonGroup.add(uiButton);
             console.log("BUTTON LOADIN");
             buttonCount += 1;
             if(buttonCount < buttonarray.length){buttonLoad()};
           });

          }
        );

  }
// let blocker = document.getElementById( 'blocker' );
// let pauseScreen = document.getElementById( 'pauseScreen' );
//
function pauseLoad(){
  var geometry = new THREE.PlaneGeometry( 0.1, 0.1, 1 );
  var material = new THREE.MeshBasicMaterial( { opacity: 0., transparent: true} );
  var pauseButton = new THREE.Mesh( geometry, material );
  pauseButton.name = "pauseButton";
  pauseButton.trigger = pause;
  pauseButton.position.z = 0.606;
  pauseButton.position.x = -0.39;
  pauseButton.position.y = 0.2;
  pauseButton.layer = 1;
  buttonGroup.add(pauseButton)

}
// function unpause(){
//   blocker.style.display = 'none';
// }
function pause(){
  console.log("PAUSED!");
window.location.href = '../mso/about.html';
  // blocker.style.display = '-webkit-box';
  // blocker.style.display = '-moz-box';
  // blocker.style.display = 'box';
  //
  // pauseScreen.style.display = '';
}
// function about(){
//   var credits = document.getElementById('credits');
//   credits.style.display = "none"
//
//   var about = document.getElementById('about');
//   about.style.display = ""
//
// }
// // about();
// function credits(){
//   var credits = document.getElementById('credits');
//   credits.style.display = ""
//   var about = document.getElementById('about');
//   about.style.display = "none"
//
// }
