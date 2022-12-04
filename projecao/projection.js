import { context, canvas, start, end, clearCanvas} from "../canvas/canvas.js";
import { vertex, edge } from "./projectionObject.js";

const button_run = document.getElementById("button-run");
const projection_type = document.getElementsByName("projections-types");
const scale_type = document.getElementsByName("scale-types");
const globalScale = document.getElementById("global_input");
let tempM = []

const drawLine = (context, x0, y0,x1,y1) =>{
    context.strokeStyle = "red"
    context.beginPath()
    context.moveTo(Math.abs(x0),Math.abs(y0))
    context.lineTo(Math.abs(x1),Math.abs(y1))
    context.stroke()
}

const ortogonal = () =>{
    let point;
    let showM = []
    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 1]]
    
    for(let i=0;i<vertex.length;i++){
        let x = vertex[i][0]   
        let y = vertex[i][1]
        let z = vertex[i][2]

        point = [x,y,z,1]        
        showM.push(multiplyMatrix(point,t))
    }
    plotter(showM)
}

const cavaleira = () =>{
    let point;
    let showM = []

    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [Math.cos(45), Math.sin(45), 0, 0],
             [0, 0, 0, 1]]

    for(let i=0;i<vertex.length;i++){
        let x = vertex[i][0]   
        let y = vertex[i][1]
        let z = vertex[i][2]

        point = [x,y,z,1]        
        showM.push(multiplyMatrix(point,t))
    }
    plotter(showM)
}

const cabinet = () =>{
    let point;
    let showM = []

    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [(0.5*Math.cos(63,4)), (0.5*Math.sin(63,4)), 0, 0],
             [0, 0, 0, 1]]

    for(let i=0;i<vertex.length;i++){
        let x = vertex[i][0]   
        let y = vertex[i][1]
        let z = vertex[i][2]

        point = [x,y,z,1]        
        showM.push(multiplyMatrix(point,t))
    }
    //plotter(tempM)
    // console.log("show2",showM)
    plotter(showM)
}

const plotter = (arr) =>{
    for(let i=0;i<edge.length;i++){
        drawLine(context, arr[edge[i][0]][0],arr[edge[i][0]][1],arr[edge[i][1]][0],arr[edge[i][1]][1])
    }
}

const multiplyMatrix = (point, t) =>{
    let temp = []
    for(let i=0;i<t[0].length;i++){
        temp[i] = 0
        for(let j=0;j < t.length; j++){
            temp[i] += point[j] * t[j][i] 
        }
    }
    // tempM.push(temp)
    return temp
}

const applyGlobalScale = (scale) =>{
    let point;
    let globalM = []

    let t = [[1,0,0,0],
             [0,1,0,0],
             [0,0,1,0],
             [0,0,0,scale]]

    for(let i=0;i<vertex.length;i++){
        let x = vertex[i][0]   
        let y = vertex[i][1]
        let z = vertex[i][2]

        point = [x,y,z,1]        
        globalM.push(multiplyMatrix(point,t))
    }    
    // console.log(globalM)
    return globalM
}

const applyLocalScale = () =>{
    const x = document.getElementById("local-x").value
    const y = document.getElementById("local-y").value
    const z = document.getElementById("local-z").value

    let t = [[x,0,0,0],
             [0,y,0,0],
             [0,0,z,0],
             [0,0,0,1]]
    return t
}

const choseScale = () =>{
    let t = []
    for(let i=0;i<scale_type.length;i++){
        if(scale_type[i].checked){
            switch(scale_type[i].value){
                case "global":
                    t = applyGlobalScale(globalScale.value)
                    console.log("t = ",t)
                    break;
                    //return globalScale.value
                case "local":
                    t = applyLocalScale()
                    break;
            }
        }
    }
}

const choseProjection = () =>{
    for(let i=0;i<projection_type.length;i++){
        if(projection_type[i].checked){
            switch(projection_type[i].value){
                case "cabinet":
                    clearCanvas()
                    cabinet();
                    break;
                case "cavaleira":
                    clearCanvas()
                    cavaleira();
                    break;
                case "ortogonal":
                    clearCanvas()
                    ortogonal();
                    break;
            }
        }
    }
}

button_run.addEventListener("click", e =>{
    let tempMatrix = [[1,0,0,0],
                      [0,1,0,0],
                      [0,0,1,0],
                      [0,0,0,1]]

    let scale = choseScale()


    // console.log(scale)
    choseProjection()
})