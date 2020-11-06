import { GlowParticle } from "./glowparticle.js";

const COLORS = [
    {r:255, g:147, b:126},//pastelRed
    {r:255, g:177, b:205},//pastelPink
    {r:124, g:153, b:245},//patelBlue
    {r:168, g:235, b:150},//pastelGreen
    {r:255, g:207, b:131},//pastelYellow
    {r:154, g:97, b:211},//pastelpurple

];


class App {
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx =this.canvas.getContext('2d');

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;
        


        this.totalParticles = 20;
        this.particles = [];
        this.maxRadius = document.body.clientWidth / 10; //화면 크기별로 공 사이즈가 달라짐
        this.minRadius = document.body.clientWidth / 30;

        
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));

        

    }


    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.ctx.globalCompositeOperation = 'saturation';

        this.createParticles();


    }

    createParticles(){
        let curColor = 0;
        this.particles = [];

        for(let i = 0; i < this.totalParticles; i++){
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
                COLORS[curColor]
            );

            if (++curColor >= COLORS.length){
                curColor = 0;
            }

            this.particles[i] = item;
            
        }

    }

    animate(){
         window.requestAnimationFrame(this.animate.bind(this));

         this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        for (let i = 0; i < this.totalParticles; i++){
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);

        }

    }




}


window.onload = () => {
    new App();
}