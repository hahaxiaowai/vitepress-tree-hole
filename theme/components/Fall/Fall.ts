export class Fall {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  xSpeed: number;
  ySpeed: number;
  rotateSpeed: number;
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.scale = Math.random() * 2;
    this.rotate = Math.random() * Math.PI * 2;
    this.xSpeed = Math.random();
    this.ySpeed = Math.random();
    this.rotateSpeed = Math.random() * Math.PI * 0.006;
  }

  update() {
    this.x += this.xSpeed - 1.5;
    this.y += this.ySpeed + 0.5;
    this.rotate += this.rotateSpeed;
    if (
      Math.abs(this.x) > window.innerWidth
      || Math.abs(this.y) > window.innerHeight
    ) {
      this.x = Math.random() * window.innerWidth;
      this.y = 0;
      this.scale = Math.random() * 2;
      this.rotate = Math.random() * Math.PI * 2;
      this.xSpeed = Math.random();
      this.ySpeed = Math.random();
      this.rotateSpeed = Math.random() * Math.PI * 0.01;
    }
  }
}
export interface DrawOption {
  drawCount: number;
  image: HTMLImageElement;
}
export class Draw {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  drawCount: number;
  fallList: Fall[];
  image: HTMLImageElement;
  imageSize: number;
  stop: boolean;
  constructor(id: string, option: DrawOption) {
    this.canvas = document.getElementById("fall") as HTMLCanvasElement;
    if (!this.canvas)
      throw new Error(`${id}, does this element exist?`);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx)
      throw new Error("can not get Context2d");
    this.drawCount = option.drawCount || 10;
    this.fallList = [];
    this.image = option.image;
    this.imageSize = 30;
    this.stop = false;
    this.initFall(option);
    this.animate();
  }

  initFall(_option: DrawOption) {
    for (let i = 0; i < this.drawCount; i++) {
      this.fallList.push(new Fall());
    }
  }

  animate() {
    if (!this.stop) {
      requestAnimationFrame(() => {
        this.drawFall();
        this.animate();
      });
    }
  }

  drawFall() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let index = 0; index < this.drawCount; index++) {
        const fall = this.fallList[index];
        this.ctx.save();
        this.ctx.translate(fall.x + this.imageSize, fall.y + this.imageSize);
        this.ctx.rotate(fall.rotate);
        this.ctx.drawImage(
          this.image,
          0,
          0,
          this.imageSize * fall.scale,
          this.imageSize * fall.scale,
        );
        this.ctx.restore();
        fall.update();
      }
    }
  }

  clear() {
    this.stop = true;
  }
}
export function getImageByMonth() {
  const month = new Date().getMonth() + 1;
  let img = "sakura";
  switch (month) {
    case 3:
    case 4:
    case 5:
      img = "sakura";
      break;
    case 6:
    case 7:
    case 8:
      img = "pop";
      break;
    case 9:
    case 10:
    case 11:
      img = "leaf";
      break;
    case 12:
    case 1:
    case 2:
      img = "snow";
      break;
    default:
      break;
  }
  return img;
}
