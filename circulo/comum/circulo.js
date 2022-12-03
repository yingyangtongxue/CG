import { context, canvas, start, end } from "../../canvas/canvas.js";

const drawCircle = (context, start, end) =>{
    const radius = Math.sqrt(Math.pow(end[0]-start[0],2) + Math.pow(end[1]-start[1],2))
    for(let x = -radius; x<radius;x++){
        let y = Math.sqrt(Math.pow(radius,2)-Math.pow(x,2))
        context.fillRect(x+start[0], y+start[1], 1, 1)
        context.fillRect(x+start[0], -y+start[1], 1, 1)
        //x+=1/radius
    }
}

canvas.addEventListener("mouseup", e =>{
    drawCircle(context, start, end)
})