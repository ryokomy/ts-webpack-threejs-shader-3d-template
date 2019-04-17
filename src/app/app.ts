import {
  AxesHelper,
  Camera,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Vector3,
} from 'three';

import {Sample3DTexture} from './Sameple3DTexture';

export class App {
  private readonly scene: Scene;
  private camera: Camera;
  private mesh: Sample3DTexture;
  private readonly renderer: WebGLRenderer;

  constructor() {

    // SampleShaderMesh
    this.mesh = new Sample3DTexture();

    // scene
    this.scene = new Scene();
    this.scene.add(this.mesh);

    // camera
    // this.camera =  new Camera();
    this.camera = new PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
    this.camera.position.set(200, 300, 500);
    this.camera.lookAt(this.mesh.position);

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
    this.mesh.update();
    // this.camera = this.camera.rotateOnWorldAxis((new Vector3(1, 1, 1)).normalize(), 1 / 360.);
    // this.camera = this.camera.translateZ(10);
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
