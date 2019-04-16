import {
  Camera,
  Scene,
  WebGLRenderer,
} from 'three';

import {KyuzanShaderMesh} from './KyuzanShaderMaterial';

export class App {
  private readonly scene: Scene;
  private readonly camera: Camera;
  private kyuzanShaderMesh: KyuzanShaderMesh;
  private readonly renderer: WebGLRenderer;

  constructor() {

    // camera
    this.camera =  new Camera();
    this.camera.position.z = 1;

    // SampleShaderMesh
    this.kyuzanShaderMesh = new KyuzanShaderMesh();

    // scene
    this.scene = new Scene();
    this.scene.add(this.kyuzanShaderMesh);

    // renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    // this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setPixelRatio(1);

    this.adjustCanvasSize();
    this.render();
  }

  private render() {
    this.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => { this.render(); });

    this.adjustCanvasSize();
  }

  private update() {
    this.kyuzanShaderMesh.update();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
