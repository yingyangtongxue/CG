import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

const newOrigin = [canvas.width/2, canvas.height/2]

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

const drawLine = (context, x0, y0,x1,y1) =>{
    context.strokeStyle = "red"
    context.beginPath()
    context.moveTo(Math.abs(x0),Math.abs(y0))
    context.lineTo(Math.abs(x1),Math.abs(y1))
    context.stroke()
}

const plotter = (arr) =>{
    for(let i=0;i<edge.length;i++){
        drawLine(context, arr[edge[i][0]][0],arr[edge[i][0]][1],arr[edge[i][1]][0],arr[edge[i][1]][1])
    }
}

export const ortogonal = (oldT) =>{
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
         
             if(temp[0][3]!=1){
                for(let i=0;i<temp.length;i++){
                    temp[i][0] /= temp[i][3]
                    temp[i][1] /= temp[i][3]
                    temp[i][2] /= temp[i][3]
                    temp[i][3] /= temp[i][3]
                }
            }
             plotter(temp)
}

const drawBlue = () =>{
    for(let x=10;x<=30;x++){
        for(let y=20;y<=40;y++){
            let z = Math.pow(x,2)+y
            context.fillStyle = "blue"
            context.fillRect(x+newOrigin[0], y+newOrigin[1], 1, 1)
        }
    }
}

const drawRed = () =>{
    for(let x=50;x<=100;x++){
        for(let y=30;y<=80;y++){
            let z = 3*x-2*y+5
            context.fillStyle = "red"
            context.fillRect(x+newOrigin[0], y+newOrigin[1], 1, 1)
        }
    }
}

const drawYellow = () =>{
    for(let t=0;t<= 50;t++){
        for(let a=0;a<=360;a++){
            let x = 30+Math.cos(a)*t
            let y = 50+Math.sin(a)*t
            let z = 10+t
            context.fillStyle = "yellow"
            context.fillRect(x+newOrigin[0], y+newOrigin[1], 1, 1)
        } 
    }
}

const drawGreen = () =>{
    for(let a=0;a<=360;a++){
        for(let b=0;b<=360;b++){
            let x = 100+30*Math.cos(a)*Math.cos(b)
            let y = 50+30*Math.cos(a)*Math.sin(b)
            let z = 20+30*Math.sin(a)

            context.fillStyle = "green"
            context.fillRect(x+newOrigin[0], y+newOrigin[1], 1, 1)            
        }
    }
}

const drawWhite = () => {
    let x = 20
    for(let y=-20;y<=20;y++){
        for(let z=-20;z<=20;z++){
            context.fillStyle = "white"
            context.fillRect(x+newOrigin[0], y+newOrigin[1], 1, 1)
        }
    }
}

canvas.addEventListener("click", e =>{
    drawBlue()
    drawRed()
    drawYellow()
    drawGreen()
    drawWhite()
})