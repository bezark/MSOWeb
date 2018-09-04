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

        var geometry = new THREE.PlaneGeometry(0.25, 0.25, 1.);


    		var starsArray = [];
        for (var i = 0; i < 4; i++) {
            starsArray.push(new THREE.TextureLoader().load( 'assets/stars/Star'+i+'.png' ))
        }
        stars = new THREE.Group
        stars.position.x = -radius;
        TimeLineScene.add( stars );

				for ( var i = 0; i < 1000; i ++ ) {
				var material = new THREE.MeshBasicMaterial( { map: starsArray[Math.floor(Math.random()*4)], transparent: true } );
				// material.color.setHSL( 0.0, 0., 0.5,  );

				var starMesh = new THREE.Mesh(geometry, material)



        starMesh.position.x =  radius*Math.sin(theta*i)+(10. * Math.random() - 5);
        starMesh.position.y = radius*Math.cos(theta*i)+(5. * Math.random() - 2.5);
        starMesh.position.z = -10. * Math.random();
        stars.add(starMesh);

      }
      console.log(stars);
    }
