import {
  AxesHelper,
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector3,
} from 'three';

import {Mountain3D} from './Mountain3D';

export class App {
  private readonly scene: Scene;
  private camera: Camera;
  private mesh: Mountain3D;
  private readonly renderer: WebGLRenderer;

  private lastTime: number = Date.now() / 1000.;

  constructor() {

    // SampleShaderMesh
    this.mesh = new Mountain3D();

    // scene
    this.scene = new Scene();
    this.scene.add(this.mesh);

    // camera
    // this.camera =  new Camera();
    this.camera = new PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
    this.camera.position.set(200, 300, 500);
    this.camera.lookAt(new Vector3(this.mesh.position.x, this.mesh.position.y - 50., this.mesh.position.z));

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
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
