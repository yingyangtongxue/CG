import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

let flag = false

const drawRect = (context, point1, point2) =>{
    context.beginPath()
    context.rect(point1.x,point1.y,Math.abs(point2.x-point1.x),Math.abs(point2.y-point1.y));
    //context.moveTo(point1.x, point1.y)
    //context.lineTo(point2.x, point2.y)
    context.stroke()
}

const drawLine = (context, point1, point2) =>{
    context.beginPath()
    context.rect(point1.x,point1.y,Math.abs(point2.x-point1.x),Math.abs(point2.y-point1.y));
    //context.moveTo(point1.x, point1.y)
    //context.lineTo(point2.x, point2.y)
    context.stroke()
}

const drawWindow = (start, end) =>{

    let window = {
        point1: {x: 0, y: 0},
        point2: {x: 0, y: 0},
        point3: {x: 0, y: 0},
        point4: {x: 0, y: 0}
    }

    let limit = {
        min: {x: 0, y: 0},
        max: {x: 0, y:0}
    }

    window.point1.x = start[0]
    window.point1.y = start[1]

    window.point2.x = start[0]
    window.point2.y = end[1]

    window.point3.x = end[0]
    window.point3.y = end[1]

    window.point4.x = start[1]
    window.point4.y = end[1]

    if(!flag){
        drawRect(context, window.point1, window.point3)
        flag = true
    }
    
    //drawLine(context, window.point2,window.point3)
    //drawLine(context, window.point4,window.point1)
    console.log(window)
}

canvas.addEventListener("mouseup", e => {
    drawWindow(start,end)
})

btnclear.addEventListener("click", e => {
    flag = false
})