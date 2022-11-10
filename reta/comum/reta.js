import { context, canvas, start, end } from "../../canvas/canvas.js";

canvas.addEventListener("mouseup", e =>{
    drawLine(start, end)
})

const drawLine = (start, end) => {
    //y = ax + b

    if(start[0]<end[0]){
        let a = (end[1]-start[1])/(end[0]-start[0])
        for(let x = start[0]; x < end[0];){
            let y = (a*(x-start[0]))+start[1]
            context.fillRect(x, y, 1, 1)
            x+=0.1
        }
    }else{
        let a = (end[0]-start[0])/(end[1]-start[1])
        for(let y = start[1]; y < end[1];){
            let x = (a*(y-start[1]))+start[0]
            context.fillRect(x, y, 1, 1)
            y+=0.1
        }
    }
}