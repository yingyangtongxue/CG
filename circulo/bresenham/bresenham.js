import { context, canvas, start, end } from "../../canvas/canvas.js";

const draw = (xc, yc, x, y) =>{
    context.fillRect(x+xc, y+yc, 1, 1)
    context.fillRect(x+xc,-y+yc, 1, 1)
    context.fillRect(-x+xc,-y+yc, 1, 1)
    context.fillRect(-x+xc,y+yc, 1, 1)
    context.fillRect(y+xc,x+yc, 1, 1)
    context.fillRect(y+xc,-x+yc, 1, 1)
    context.fillRect(-y+xc,-x+yc, 1, 1)
    context.fillRect(-y+xc,x+yc, 1, 1)
}

const bresenham = (context, start, end) => {
    const radius = Math.sqrt(Math.pow(end[0]-start[0],2) + Math.pow(end[1]-start[1],2))
    let x = 0; let y = radius; let xc = start[0]+radius; let yc = start[1]+radius; let d = 3-2*radius;
    draw(xc, yc, x, y)

    while(x<=y){
        if(d<=0){
            d=d+(4*x)+6
        }else{
            d=d+(4*x)-(4*y)+10
            y--
        }
        x++
        draw(xc, yc, x, y)
    }
}

canvas.addEventListener("mouseup", e =>{
    bresenham(context, start, end)
})

