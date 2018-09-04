var UIreq = new XMLHttpRequest();
UIreq.open("GET","data/ui.json", false);
UIreq.send(null);
UIstructure = JSON.parse(UIreq.responseText);



var buttonarray = [];
var buttonCount = 0;
let buttonGroup;

let ui;
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

          },
          // Function called when download progresses
          function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
          },
          // Function called when download errors
          function ( xhr ) {
            console.log( 'An error happened' );
          }
    );



  for (var button in UIstructure) {
    if (UIstructure.hasOwnProperty(button)) {
        buttonarray.push(button)
      }
    }

      buttonLoad();

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
