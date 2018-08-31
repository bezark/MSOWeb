let outlineParams  = {
				edgeStrength: 3.0,
				edgeGlow: 0.0,
				edgeThickness: 1.0,
				pulsePeriod: 0,
				rotate: false,
				usePatternTexture: false
			};


function postInit (){

      composer = new THREE.EffectComposer( renderer, warpTarget );

      var renderPass = new THREE.RenderPass( TimeLineScene, timelineCamera );
      composer.addPass( renderPass );

      outlinePass = new THREE.OutlinePass( new THREE.Vector2(window.innerWidth, window.innerHeight), TimeLineScene, timelineCamera);
      composer.addPass( outlinePass );



      effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
      effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight );
      effectFXAA.renderToScreen = true;
      composer.addPass( effectFXAA );
    }
