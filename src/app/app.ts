import {
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

import {Mountain2D} from './Mountain2D';

export class App {
  private readonly scene: Scene;
  private readonly camera: Camera;
  private mesh: Mountain2D;
  private readonly renderer: WebGLRenderer;

  constructor() {

    // camera
    // this.camera =  new Camera();
    this.camera = new PerspectiveCamera();
    this.camera.position.y = 1;
    this.camera.position.z = 1;

    // SampleShaderMesh
    this.mesh = new Mountain2D();

    // scene
    this.scene = new Scene();
    this.scene.add(this.mesh);

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
    this.mesh.update();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
