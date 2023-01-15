import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

let flagMousedown = false
let object = []
let projectionObject = []

const canvas2 = document.getElementById("show")
const context2 = canvas2.getContext("2d", { willReadFrequently: true })

context2.lineWidth = 3;
context2.lineJoin = 'round';
context2.lineCap = 'round';

const getCursorPosition =  (e) => [ e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]

const drawCanvasDivision = () => {
    context.beginPath()
    context.moveTo(canvas.width/2, 0)
    context.lineTo(canvas.width/2, canvas.height)
    context.stroke()
}

drawCanvasDivision()

const popData = (data) =>{
    while(data.length){
        data.pop()
    }
}

const clearCanvas2 = () =>{
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
}

const drawCircle = (start, end) => {
    let radius = Math.sqrt(Math.pow(end[0]-start[0], 2) + Math.pow(end[1]-start[1], 2))
  
    let increment = 0
  
    if (radius >= 1) increment = 1 / radius
    else increment = 1
  
    for (let i = 0; i < 360; i = i + increment * 5){
        projectionObject.push({
            x: radius * Math.cos(i) + start[0],
            y: start[1],
            z: radius * Math.sin(i) + start[1],
        })
    }

    console.log(projectionObject)
}

const drawObject = () => {
    object.forEach(element => {
        drawCircle([0,Math.abs(element[1]-(canvas2.height/2))],[Math.abs(element[0]-(canvas2.height/2)),Math.abs(element[1]-(canvas2.height/2))])
    })

    let projResult = cavaleira(object)

    projResult.map((element) => {
        element.x += canvas2.width/2
        element.y += canvas2.height/2
        return element 
    })

    console.log(projResult)

    projResult.map((element) => {
        context2.fillRect(element.x, element.y, 1,1)
    })
}

const multiplyMatrices = (point, t) => {   
    let result = [];
    for (let i = 0; i < t[0].length; i++) {
      result[i] = 0;
      for (let j = 0; j < t.length; j++) {
        if(point[j]===undefined) point[j]=0
        result[i] += point[j] * t[j][i]
      }
    }
    return result
}

const cavaleira = (points) => {
    const cnt = Math.sqrt(2) / 2
    let newPoints = []
    
    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [cnt, cnt, 0, 0],
             [0, 0, 0, 1]]
  
    for (let i = 0; i < points.length; i++) {
      let result = multiplyMatrices([points[i][0], points[i][1], points[i][2], 1], t)
      newPoints.push({ x: parseInt(result[0]), y: parseInt(result[1]) })
    }
    return newPoints;
}

canvas.addEventListener("mousedown", e =>{
    flagMousedown = true
})

canvas.addEventListener("mouseup", e =>{
    flagMousedown = false
    drawObject()
})

canvas.addEventListener("mousemove", e =>{
    if(flagMousedown){
        let point = getCursorPosition(e)
        object.push(point)
        context.fillRect(point[0], point[1], 1, 1)
    }
})

btnclear.addEventListener("click", e=>{
    popData(object)
    popData(projectionObject)
    drawCanvasDivision()
    clearCanvas2()
})
