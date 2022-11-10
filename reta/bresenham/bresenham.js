import { context, canvas, start, end } from "../../canvas/canvas.js";

const bresenham = (context, start, end) => {
    const dx = Math.abs(end[0] - start[0])
    const dy = Math.abs(end[1] - start[1])
    const m = (end[1] - start[1]) / (end[0] - start[0]);
    const actual = { x: 0, y: 0 };

    if(dx > dy){ drawingX(context, start, end, actual, m) } else { drawingY(context, start, end, actual, m) }
} 


const drawingX = (context, start, end, actual, m) => {
    console.log("x aqui")
    actual.x = start[0];
    if (start[0] <= end[0]) {
        let limit = end[0] + 1;
        while (actual.x < limit) {
            actual.y = parseInt(m * (actual.x - start[0]) + start[1]); 
            context.fillRect(actual.x, actual.y, 1, 1);
            actual.x+=0.1;
        }
    } else {
        while (actual.x > end[0]) {
            actual.y = parseInt(m * (actual.x - start[0]) + start[1]);          
            context.fillRect(actual.x, actual.y, 1, 1);
            actual.x-=0.1;
        }
    }   
}

const drawingY = (context, start, end, actual, m) => {
    console.log("y aqui")
    actual.y = start[1];
    let limit = end[1] + 1;
    if (start[1] < limit) {
        while (actual.y <= end[1]) {
            actual.x = (actual.y - start[1]) / m + start[0];         
            context.fillRect(actual.x, actual.y, 1, 1);
            actual.y+=0.1;
        }
    } else {
        while (actual.y > end[1]) {
            actual.x = (actual.y - start[1]) / m + start[0];
            context.fillRect(actual.x, actual.y, 1, 1);
            actual.y-=0.1;
        }
    }   
}

canvas.addEventListener("mouseup", e =>{
    bresenham(context, start, end)
})
