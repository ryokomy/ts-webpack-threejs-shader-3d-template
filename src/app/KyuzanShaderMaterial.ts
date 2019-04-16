import {
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    ShaderMaterialParameters,
    Texture,
    TextureLoader,
    Vector2,
} from 'three';

// tslint:disable-next-line
const fragmentShader = require('../shaders/kyuzan.fs')
// tslint:disable-next-line
const vertexShader = require('../shaders/kyuzan.vs')
// tslint:disable-next-line
const noiseTexturePath = require('../textures/graynoise.png')

export class KyuzanShaderMesh extends Mesh {

    private shaderMaterialParams: ShaderMaterialParameters;
    private startTime: number;

    constructor() {
        super();

        this.startTime = Date.now() / 1000.0;

        const textureLoader = new TextureLoader();
        const noiseTexture = textureLoader.load(noiseTexturePath);

        // material
        this.shaderMaterialParams = {
            fragmentShader,
            uniforms: {
                noiseTex: { type: 't', value: noiseTexture },
                resolution: { type: 'v2', value: new Vector2() },
                time: { type: 'f', value: 1.0 },
            },
            vertexShader,
        };
        this.material = new ShaderMaterial(this.shaderMaterialParams);

        // geometry
        this.geometry = new PlaneGeometry(2, 2);

        global.console.log(window.innerWidth);
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
    }

    public update() {
        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;

        this.shaderMaterialParams.uniforms.time.value = Date.now() / 1000.0 - this.startTime;
    }
}
