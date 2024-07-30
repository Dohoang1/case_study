class Beer {
    constructor(x,y,width,height,dy,color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dy = dy;
        this.color = color;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx=this.canvas.getContext("2d");
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    moveDown() {
        this.y += this.dy;
    }

    resetBeer(x,y,dy,color) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.color = color;
    }
}