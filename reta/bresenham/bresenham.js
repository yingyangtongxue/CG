import { context, canvas, start, end } from "../../canvas/canvas.js";

const bresenham = (context, start, end) => {
    const dx = Math.abs(end[0] - start[0])
    const dy = Math.abs(end[1] - start[1])
    const m = (end[1] - start[1]) / (end[0] - start[0]);
    const now = { x: 0, y: 0 };

    if(dx > dy){ drawingX(context, start, end, now, m) } else { drawingY(context, start, end, now, m) }
} 


const drawingX = (context, start, end, now, m) => {
    now.x = start[0];
    if (start[0] <= end[0]) {
        let limit = end[0] + 1;
        while (now.x < limit) {
            now.y = parseInt(m * (now.x - start[0]) + start[1]); 
            context.fillRect(now.x, now.y, 1, 1);
            now.x+=0.1;
        }
    } else {
        while (now.x > end[0]) {
            now.y = parseInt(m * (now.x - start[0]) + start[1]);          
            context.fillRect(now.x, now.y, 1, 1);
            now.x-=0.1;
        }
    }   
}

const drawingY = (context, start, end, now, m) => {
    now.y = start[1];
    let limit = end[1] + 1;
    if (start[1] < limit) {
        while (now.y <= end[1]) {
            now.x = (now.y - start[1]) / m + start[0];         
            context.fillRect(now.x, now.y, 1, 1);
            now.y+=0.1;
        }
    } else {
        while (now.y > end[1]) {
            now.x = (now.y - start[1]) / m + start[0];
            context.fillRect(now.x, now.y, 1, 1);
            now.y-=0.1;
        }
    }   
}

canvas.addEventListener("mouseup", e =>{
    bresenham(context, start, end)
})
