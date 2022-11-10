import { context, canvas, start, end } from "../../canvas/canvas.js";

const drawCirleParametric = (context, start, end) =>{
    const radius = Math.sqrt(Math.pow(end[0]-start[0],2) + Math.pow(end[1]-start[1],2))
    const length = 2* Math.PI
    for(let a=0;a<length;){
        let x = radius * Math.cos(a)
        let y = radius * Math.sin(a)
        context.fillRect(x+start[0],y+start[1],1,1)
        a+=1/radius
    }
}

canvas.addEventListener("mouseup", e =>{
    drawCirleParametric(context, start, end)
})
