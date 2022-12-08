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

const ortogonal = (oldT) =>{
    let point;
    let temp = []
    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 1]]
    
             t = multiplyMatrices(oldT,t)

             for(let i=0;i<vertex.length;i++){
                 let x = vertex[i][0]   
                 let y = vertex[i][1]
                 let z = vertex[i][2]
         
                 point = [x,y,z,1]    
                 temp.push(point)   
                 // showM.push(multiplyMatrix(point,t))
             }
         
             temp = multiplyMatrices(temp,t)
             console.log(temp)
         
             for(let i=0;i<temp.length;i++){
                 temp[i][0] /= temp[i][3]
                 temp[i][1] /= temp[i][3]
                 temp[i][2] /= temp[i][3]
                 temp[i][3] /= temp[i][3]
             }
             plotter(temp)
}

const cavaleira = (oldT) =>{
    let point;
    let temp = []

    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [Math.cos(45), Math.sin(45), 0, 0],
             [0, 0, 0, 1]]

             t = multiplyMatrices(oldT,t)

             for(let i=0;i<vertex.length;i++){
                 let x = vertex[i][0]   
                 let y = vertex[i][1]
                 let z = vertex[i][2]
         
                 point = [x,y,z,1]    
                 temp.push(point)   
                 // showM.push(multiplyMatrix(point,t))
             }
         
             temp = multiplyMatrices(temp,t)
             console.log(temp)
         
             for(let i=0;i<temp.length;i++){
                 temp[i][0] /= temp[i][3]
                 temp[i][1] /= temp[i][3]
                 temp[i][2] /= temp[i][3]
                 temp[i][3] /= temp[i][3]
             }
             plotter(temp)
}

const cabinet = (oldT) =>{
    let point;
    // let showM = []
    let temp = []

    let t = [[1, 0, 0, 0],
             [0, 1, 0, 0],
             [(0.5*Math.cos(63,4)), (0.5*Math.sin(63,4)), 0, 0],
             [0, 0, 0, 1]]

    t = multiplyMatrices(oldT,t)

    for(let i=0;i<vertex.length;i++){
        let x = vertex[i][0]   
        let y = vertex[i][1]
        let z = vertex[i][2]

        point = [x,y,z,1]    
        temp.push(point)   
        // showM.push(multiplyMatrix(point,t))
    }

    temp = multiplyMatrices(temp,t)
    console.log(temp)

    for(let i=0;i<temp.length;i++){
        temp[i][0] /= temp[i][3]
        temp[i][1] /= temp[i][3]
        temp[i][2] /= temp[i][3]
        temp[i][3] /= temp[i][3]
    }
    plotter(temp)
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

const multiplyMatrices = (m1, m2) =>{
    let result = [];

    for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

const applyGlobalScale = (tempMatrix, scale) =>{
    let globalM = []

    let t = [[1,0,0,0],
             [0,1,0,0],
             [0,0,1,0],
             [0,0,0,scale]]

    globalM = multiplyMatrices(tempMatrix,t)
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

const choseScale = (tempMatrix) =>{
    let t = []
    for(let i=0;i<scale_type.length;i++){
        if(scale_type[i].checked){
            switch(scale_type[i].value){
                case "global":
                    t = applyGlobalScale(tempMatrix, globalScale.value)
                    return t
                    //return globalScale.value
                case "local":
                    t = applyLocalScale()
                    break;
            }
        }
    }
}

const choseProjection = (tempMatrix) =>{
    for(let i=0;i<projection_type.length;i++){
        if(projection_type[i].checked){
            switch(projection_type[i].value){
                case "cabinet":
                    clearCanvas()
                    cabinet(tempMatrix);
                    break;
                case "cavaleira":
                    clearCanvas()
                    cavaleira(tempMatrix);
                    break;
                case "ortogonal":
                    clearCanvas()
                    ortogonal(tempMatrix);
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

    tempMatrix = choseScale(tempMatrix)


    // console.log(tempMatrix)
    choseProjection(tempMatrix)
})