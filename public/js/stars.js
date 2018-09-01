// let stars;
// function initStars(){
//
// stars = new THREE.group();
//
// for (var i = 0; i < 500; i++) {
//   var star = new THREE.Mesh()
//
//
// }
//
// TimeLineScene.add(stars)
//
// }

function rotateStars(theta){

}

let stars;
function initStars(){
      
        var geometry = new THREE.BufferGeometry();


    		var vertices = [];
				var sprite = new THREE.TextureLoader().load( 'assets/star3.png' );
				for ( var i = 0; i < 10000; i ++ ) {
					var x = 50. * Math.random()-25.;
					var y = 50. * Math.random() - 25;
					var z = 50. * Math.random() - 25;
					vertices.push( x, y, z );
				}
				geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				material = new THREE.PointsMaterial( { size: 50, map: sprite, sizeAttenuation: false, alphaTest: 0.25, transparent: true } );
				material.color.setHSL( 0.0, 0., 0.5,  );
				stars = new THREE.Points( geometry, material );
        stars.position.x = -radius*0.5;
				TimeLineScene.add( stars );

      }
