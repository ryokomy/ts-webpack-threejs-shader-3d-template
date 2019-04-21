import {
  AxesHelper,
  Scene,
  WebGLRenderer,
  Vector3,
} from 'three';

import { EasyPerspectiveCamera } from './systems/EasyPerspectiveCamera';
import { EasyOrbitControls } from './systems/EasyOrbitControls';

import {Mountain3D} from './visuals/Mountain3D';

export class App {
  private readonly scene: Scene;
  private camera: EasyPerspectiveCamera;
  private controls: EasyOrbitControls;
  private mesh: Mountain3D;
  private readonly renderer: WebGLRenderer;

  private lastTime: number = Date.now() / 1000.;

  constructor() {

    // SampleShaderMesh
    this.mesh = new Mountain3D();

    // scene
    this.scene = new Scene();
    this.scene.add(this.mesh);

    // axis
    const axis = new AxesHelper(1000);
    axis.position.set(0, 0, 0);
    this.scene.add(axis);

    // renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    // this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    this.renderer.setPixelRatio(1);

    // camera
    this.camera = new EasyPerspectiveCamera();
    this.camera.easySetUp();

    // controls
    this.controls = new EasyOrbitControls(this.camera, this.renderer.domElement);
    this.controls.easySetUp();

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
    const now = Date.now() / 1000.0;
    this.lastTime = now;
    this.mesh.update();

    this.controls.update();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
