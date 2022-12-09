import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

const btnconect = document.getElementById("conect")
const btnpaint = document.getElementById("paint")

let boundBox = {
    vertex: [],
    edge: [],
    limits: {
        min: {x: 0, y: 0},
        max: {x: 0, y: 0}
    }
}

let polygon = {
    vertex: [],
    edge: []
}

let polygonPointsFlag = true
let polygonDrawFlag = false

const popData = (data) =>{
    while(data.length){
        data.pop()
    }
}

const getPolygonVertex = (x,y) =>{
    context.fillStyle = "red";
    context.fillRect(x, y, 5, 5);
    polygon.vertex.push([x,y]);
}
const drawLine = (context, x0, y0, x1, y1) =>{
    context.beginPath()
    context.moveTo(Math.abs(x0),Math.abs(y0))
    context.lineTo(Math.abs(x1),Math.abs(y1))
    context.stroke()
}

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
    console.log(boundBox)
    console.log(polygon)
}
const drawBoundBox = (x0,y0,x1,y1) =>{
    context.beginPath()
    context.rect(x0,y0,Math.abs(x1-x0),Math.abs(y1-y0));
    context.stroke()
}

const drawPolygon = () =>{
    context.strokeStyle = "blue"
    for(let i=1;i<polygon.vertex.length;i++){
        drawLine(context,polygon.vertex[i-1][0],polygon.vertex[i-1][1],polygon.vertex[i][0],polygon.vertex[i][1])
        polygon.edge.push([i-1,i])
        if((polygon.vertex.length-(i+1)) == 1){
            drawLine(context,polygon.vertex[i+1][0],polygon.vertex[i+1][1],polygon.vertex[0][0],polygon.vertex[0][1])
            polygon.edge.push([i+1,0])
        }
    }
    console.log(polygon.vertex) 
    setPolygonLimits()
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
    popData(boundBox.vertex)
    popData(boundBox.edge)
    boundBox.limits.min.x = 0
    boundBox.limits.min.y = 0
    boundBox.limits.max.x = 0
    boundBox.limits.max.y = 0
    polygonDrawFlag = false
})

btnpaint.addEventListener("click", e=>{
    if(!(polygon.vertex.length>2)){
        alert("Selecione pelo menos três pontos")
        return
    }
    if(!polygonDrawFlag){
        console.log("paint")
    }      
})

canvas.addEventListener("click", e=>{
    if(polygonPointsFlag){
        if(!polygonDrawFlag){
            getPolygonVertex(start[0],start[1])
        }
    }
    
})