var UIreq = new XMLHttpRequest();
UIreq.open("GET","data/ui.json", false);
UIreq.send(null);
UIstructure = JSON.parse(UIreq.responseText);

console.log(UIstructure);

var buttonarray = [];
var buttonCount = 0;
let buttonGroup;
function UILoad (){
  buttonGroup = new THREE.Group();
  TimeLineScene.add(buttonGroup);
  uiGeo = new THREE.PlaneGeometry( 1., 1., 1. );
  // uiGeo = new THREE.PlaneGeometry( 1.92, 1.08, 1 );
  loader.load(
   // resource URL

   "assets/ui/tempUI.png",
   // Function when resource is loaded
   function ( texture ) {


      var uiMaterial=  new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
      var ui = new THREE.Mesh( uiGeo, uiMaterial );
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
      console.log(buttonarray);
      buttonLoad();

    }

function buttonLoad(){
    console.log(buttonarray);
    ;
      loader.load(

       // resource URL

       "assets/ui/"+buttonarray[buttonCount]+".png",
       // Function when resource is loaded
       function ( texture ) {

          var currButton = buttonarray[buttonCount]
          var buttonMaterial = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff, transparent: true } );
          var uiButton = new THREE.Mesh( uiGeo, buttonMaterial );
          uiButton.scale.set( 0.07, 0.07, 1 );
          uiButton.layer = -1;
          uiButton.name = currButton;
          uiButton.position.set( UIstructure[currButton].x, UIstructure[currButton].y, UIstructure[currButton].z);

          console.log(uiButton.name);
          console.log(uiButton.position); // center
          uiButton.trigger = window[UIstructure[currButton].event];

          buttonGroup.add(uiButton);

          buttonCount += 1;
          if(buttonCount < buttonarray.length){buttonLoad()};
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

  }
