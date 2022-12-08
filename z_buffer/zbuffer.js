import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

const drawBlue = () =>{
    for(let x=10;x<=30;x++){
        for(let y=20;y<=40;y++){
            let z = Math.pow(x,2)+y
            context.fillStyle = "blue"
            context.fillRect(x, y, 1, 1)
        }
    }
}

canvas.addEventListener("click", e =>{
    drawBlue()
})