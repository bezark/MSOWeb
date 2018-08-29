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
  // uiGeo = new THREE.PlaneGeometry( 1.92, 1.08, 1 );
  loader.load(
   // resource URL

   "assets/ui/tempUI.png",
   // Function when resource is loaded
   function ( texture ) {


      var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
      var sprite = new THREE.Sprite( spriteMaterial );
      sprite.scale.set( 1, 0.5625, 1 );
      sprite.name = "UI";
      sprite.position.set( 0., 0., 0.605); // center



      TimeLineScene.add(sprite);

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
  // uibuttonGeo = new THREE.PlaneGeometry( 1., 1., 1. );


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
          var spriteMaterial = new THREE.SpriteMaterial( { map: texture, color: 0xffffff } );
          var sprite = new THREE.Sprite( spriteMaterial );
          sprite.scale.set( 0.07, 0.07, 1 );
          sprite.name = currButton;
          sprite.position.set( UIstructure[currButton].x, UIstructure[currButton].y, UIstructure[currButton].z); // center
          sprite.trigger = window[UIstructure[currButton].event];
          console.log(sprite.name);
          buttonGroup.add(sprite);
          console.log(buttonGroup);
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
