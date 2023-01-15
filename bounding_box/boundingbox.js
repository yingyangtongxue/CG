import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";
import { drawLine } from "./drawLine.js";

const btnconect = document.getElementById("conect")
const btnpaint = document.getElementById("paint")

let boundBox = {
    vertex: [],
    edge: [],
    sides: [],
    limits: {
        min: {x: 0, y: 0},
        max: {x: 0, y: 0}
    }
}

let polygon = {
    vertex: [],
    edge: [],
    sides: []
}

let polygonPointsFlag = true
let polygonDrawFlag = false
let paintedFlag = false

const popData = (data) =>{
    while(data.length){
        data.pop()
    }
}

const getPolygonVertex = (x,y) =>{
    context.fillStyle = "RGB(255,0,0)";
    context.fillRect(x, y, 5, 5);
    polygon.vertex.push([x,y]);
}

// const drawLine = (context, x0, y0, x1, y1) =>{
//     context.beginPath()
//     context.moveTo(Math.abs(x0),Math.abs(y0))
//     context.lineTo(Math.abs(x1),Math.abs(y1))
//     context.stroke()
// }

const setPolygonLimits = () =>{
    boundBox.limits.max.x = boundBox.limits.max.y = Number.MIN_SAFE_INTEGER
    boundBox.limits.min.x = boundBox.limits.min.y = Number.MAX_SAFE_INTEGER
    for(let i=0;i<polygon.vertex.length;i++){
        if(boundBox.limits.max.x < polygon.vertex[i][0]){
            boundBox.limits.max.x = polygon.vertex[i][0]
        } 
        if(boundBox.limits.min.x > polygon.vertex[i][0]){
            boundBox.limits.min.x = polygon.vertex[i][0]
        }
        if(boundBox.limits.max.y < polygon.vertex[i][1]){
            boundBox.limits.max.y = polygon.vertex[i][1]
        }
        if(boundBox.limits.min.y > polygon.vertex[i][1]){
            boundBox.limits.min.y = polygon.vertex[i][1]
        }
    }

    boundBox.vertex.push([boundBox.limits.min.x,boundBox.limits.min.y])
    boundBox.vertex.push([boundBox.limits.max.x,boundBox.limits.min.y])
    boundBox.vertex.push([boundBox.limits.max.x,boundBox.limits.max.y])
    boundBox.vertex.push([boundBox.limits.min.x,boundBox.limits.max.y])

    boundBox.edge.push([0,1])
    boundBox.edge.push([1,2])
    boundBox.edge.push([2,3])
    boundBox.edge.push([3,0])
        
    context.strokeStyle = "#e65300"
    drawBoundBox(boundBox.limits.min.x,boundBox.limits.min.y,boundBox.limits.max.x,boundBox.limits.max.y)
}

const setDefaultColor = () =>{
    context.strokeStyle = "RGB(255,255,255)"
    for(let i=boundBox.limits.min.x;i<boundBox.limits.max.x;i++){
        for(let j=boundBox.limits.min.y;j<boundBox.limits.max.y;j++){
            let RGB = getRGBForCoord(i,j)
            if(RGB[0] === 0 && RGB[1] === 0 && RGB[2] === 0){
                context.beginPath()
                context.rect(i,j,1,1)
                context.stroke() 
            }
        }
    }
}

const drawBoundBox = (x0,y0,x1,y1) =>{
    context.beginPath()
    context.rect(x0,y0,Math.abs(x1-x0),Math.abs(y1-y0));
    context.stroke()
    // setDefaultColor()
    InitBoundBoxCode()
}

const drawPolygon = () =>{
    context.strokeStyle = "RGB(0,0,255)"
    for(let i=1;i<polygon.vertex.length;i++){
        drawLine2(context,polygon.vertex[i-1][0],polygon.vertex[i-1][1],polygon.vertex[i][0],polygon.vertex[i][1])
        polygon.edge.push([i-1,i])
        if((polygon.vertex.length-(i+1)) == 1){
            drawLine2(context,polygon.vertex[i+1][0],polygon.vertex[i+1][1],polygon.vertex[0][0],polygon.vertex[0][1])
            polygon.edge.push([i+1,0])
        }
    }
    setPolygonLimits()
}

const drawLine2 = (context,x0,y0,x1,y1) => {
    context.fillStyle = "RGB(0,0,255)";
    polygon.sides.push(drawLine(context,[x0,y0],[x1,y1]))
}

const getRGBForCoord = (x, y) => {
    let pixel = context.getImageData(x,y, 1, 1)
    return [pixel.data[0],pixel.data[1],pixel.data[2]] 
}

const paint = () =>{
    let last = 0
    for(let i=0;i<polygon.sides.length;i++){
        for(let j=0;j<polygon.sides[i].length;j++){
            if (last != polygon.sides[i][j].y) {
                invertColors(polygon.sides[i][j],boundBox);
            }
            last = polygon.sides[i][j].y;
        }
    }
    paintPolygon()
}

const paintPolygon = () =>{
    context.fillStyle = "RGB(102,0,204)"
    let limx = Math.abs(boundBox.limits.max.x-boundBox.limits.min.x)
    let limy = Math.abs(boundBox.limits.max.y-boundBox.limits.min.y)   
    for (let i = 0; i <limx;i++) {
        for (let j = 0; j<limy; j++) {
          if(boundBox.sides[i][j]==1){
            context.fillRect(i + boundBox.limits.min.x, j + boundBox.limits.min.y, 1, 1)
          }
        }
      }    
}

const invertColors = (point,boundBox) => {
    for(let i=Math.abs(parseInt(point.x)-boundBox.limits.min.x);i<Math.abs(boundBox.limits.max.x-boundBox.limits.min.x);i++){
        if(boundBox.sides[i][parseInt(point.y)-boundBox.limits.min.y] == 1){
            boundBox.sides[i][parseInt(point.y)-boundBox.limits.min.y] = 0
        }else{
            boundBox.sides[i][parseInt(point.y)-boundBox.limits.min.y] = 1
        }
    }
}

const InitBoundBoxCode = () =>{
    let limx = Math.abs(boundBox.limits.max.x-boundBox.limits.min.x)
    let limy = Math.abs(boundBox.limits.max.y-boundBox.limits.min.y)
    for(let i=0;i<limx;i++){
        boundBox.sides[i] = []
        for(let j=0;j<limy;j++){
            boundBox.sides[i].push(0)
        }
    }    
}

btnconect.addEventListener("click", e=>{
    if(!(polygon.vertex.length>2)){
        alert("Selecione pelo menos três pontos")
        return
    }
    if(!polygonDrawFlag){
        drawPolygon()
        polygonDrawFlag = true
    } 
    
})

btnclear.addEventListener("click", e=>{
    popData(polygon.vertex)
    popData(polygon.edge)
    popData(polygon.sides)
    popData(boundBox.vertex)
    popData(boundBox.edge)
    popData(boundBox.sides)
    boundBox.limits.min.x = 0
    boundBox.limits.min.y = 0
    boundBox.limits.max.x = 0
    boundBox.limits.max.y = 0
    polygonDrawFlag = false
    paintedFlag = false
})

btnpaint.addEventListener("click", e=>{
    if(!(polygon.vertex.length>2)){
        alert("Selecione pelo menos três pontos")
        return
    }
    if(polygonDrawFlag){
        if(!paintedFlag){
            paint()
            paintedFlag = true
        }
    }      
})

canvas.addEventListener("click", e=>{
    if(polygonPointsFlag){
        if(!polygonDrawFlag){
            getPolygonVertex(start[0],start[1])
        }
    }
})