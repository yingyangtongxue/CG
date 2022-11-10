import { context, canvas, start, end } from "../../canvas/canvas.js";

context.beginPath();
context.arc(95, 50, 40, 0, 2 * Math.PI);
context.stroke();


const bresenham = (context, start, end) => {
    console.log("precisa fazer")
}

canvas.addEventListener("mouseup", e =>{
    bresenham(context, start, end)
})

