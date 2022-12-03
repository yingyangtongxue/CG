import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

let flag = false

let window = {
    points: {
        1: {x: 0, y: 0},
        2: {x: 0, y: 0},
        3: {x: 0, y: 0},
        4: {x: 0, y: 0}
    },
    limits: {
        min: {x: 0, y: 0},
        max: {x: 0, y: 0}
    }
}

const drawRect = (context, point1, point2) =>{
    context.strokeStyle = "black"
    context.beginPath()
    context.rect(point1.x,point1.y,Math.abs(point2.x-point1.x),Math.abs(point2.y-point1.y));
    context.stroke()
}

const drawLine = (context, x0, y0, x1, y1) =>{
    context.strokeStyle = "red"
    context.beginPath()
    context.moveTo(Math.abs(x0),Math.abs(y0))
    context.lineTo(Math.abs(x1),Math.abs(y1))
    context.stroke()
}

const drawWindow = (start, end) =>{

    if(!flag){

        window.limits.min.x = window.points[1].x = start[0]
        window.limits.min.y = window.points[1].y = start[1]
    
        window.points[2].x = start[0]
        window.points[2].y = end[1]
    
        window.limits.max.x = window.points[3].x = end[0]
        window.limits.max.y = window.points[3].y = end[1]
    
        window.points[4].x = end[0]
        window.points[4].y = start[1]

        drawRect(context, window.points[1], window.points[3])

        flag = true
    }
    
    console.log(window)
}

canvas.addEventListener("mouseup", e => {
    !flag ? drawWindow(start,end) : sutherland(start,end)//drawLine(context, start,end)
})

btnclear.addEventListener("click", e => {
    flag = false
})

const generateCode = (x, y) => {
    let code = ['0','0','0','0']

    if(x < window.limits.min.x){
        code[3] = '1'
    }else if(x > window.limits.max.x){
        code[2] = '1'
    }else if(y < window.limits.min.y){
        code[1] = '1'
    }else if(y > window.limits.max.y){
        code[0] = '1'
    }
    return code
}

const applyAnd = (code1, code2) => {
    let code = ['0','0','0','0']
    for(let i=0; i<4; i++){
        if((code1[i]==='1') && (code2[i]==='1')){
            code[i] = '1'
        }
    }
    return code
}

const isInterception = (x, y) => {
    if(x>=window.limits.min.x && x<=window.limits.max.x){
        if(y>=window.limits.min.y && y<=window.limits.max.y){
            return true
        }
    }
    return false
}

const diagonal = (start, end, code, flag) => {
    console.log("entrou")
    let indexes = []
    let firstInterc = {x: 0, y: 0}
    let secondInterc = {x: 0, y: 0}
    let position = {1: null, 2: null}

    code.forEach((element, index) => {
        if(element === '1')
            indexes.push(index);
    })

    if(indexes.length === 1){
        return flag //it's not a diagonal
    }else{
        position[1] = indexes.pop() //left or right 
        position[2] = indexes.pop() //top or bottom
        console.log(position[1],position[2])
        let m = (end[1]-start[1])/(end[0]-start[0])

        if(position[1] === 0){ //top
            console.log("top")
            firstInterc[y] = window.limits.max.y
            firstInterc[x] = (1/m)*(window.limits.max.y-start[1]+start[0])
            console.log(firstInterc)
        }else if(position[1] === 1){ //bottom
            console.log("bottom")
            firstInterc[y] = window.limits.min.y
            firstInterc[x] = (1/m)*(window.limits.min.y-start[1]+start[0])
            console.log(firstInterc)
        }else if(position[2] === 2){ //right
            console.log("right")
            secondInterc[x] = window.limits.max.x
            secondInterc[y] = m*(window.limits.max.x-start[0])+start[1]
            console.log(secondInterc)
        }else{
            console.log("left")
            secondInterc[x] = window.limits.min.x
            secondInterc[y] = m*(window.limits.min.x-start[0])+start[1]
            console.log(secondInterc)
        }

        if(isInterception(firstInterc[x],firstInterc[y])){
            return position[1] //interception y
        }else{
            return position[2] //interception x
        }
    }
}

const sutherland = (start,end) => {
    let code1 = generateCode(start[0],start[1])
    let code2 = generateCode(end[0],end[1])

    if ((code1.join('') === '0000') && (code2.join('') === '0000')){
        drawLine(context, start[0], start[1],end[0], end[1])
        return
    }

    let code = applyAnd(code1,code2)

    if(code.join('') === '0000'){
        let bottom = {x: 0, y: window.limits.min.y}
        let top = {x: 0, y: window.limits.max.y}
        let left = {x: window.limits.min.x, y: 0}
        let right = {x: window.limits.max.x, y: 0}

        let m = (end[1]-start[1])/(end[0]-start[0])

        let firstPoint; let lastPoint; let index;

        if(code1.join('') === '0000'){
            index = code2.indexOf('1')
            firstPoint = start
            index = diagonal(start,end,code2,index)
        }else if(code2.join('') === '0000'){
            index = code1.indexOf('1')
            firstPoint = end
            index = diagonal(start,end,code1,index)
        }

        if(firstPoint){
            switch(index){
                case 0:
                    top.x = (1/m)*(window.limits.max.y-start[1])+start[0]
                    drawLine(context,firstPoint[0],firstPoint[1],top.x, top.y)
                    break
                
                case 1:
                    bottom.x = (1/m)*(window.limits.min.y-start[1])+start[0]
                    drawLine(context,firstPoint[0],firstPoint[1],bottom.x, bottom.y)
                    break      
                    
                case 2:
                    right.y = m*(window.limits.max.x-start[0])+start[1]
                    drawLine(context,firstPoint[0],firstPoint[1],right.x, right.y)
                    break 
                    
                case 3:
                    left.y = m*(window.limits.min.x-start[0])+start[1]
                    drawLine(context,firstPoint[0],firstPoint[1],left.x, left.y)
                    break                     
            }
            return
        }else{
            top.x = (1/m)*(window.limits.max.y-start[1])+start[0]
            bottom.x = (1/m)*(window.limits.min.y-start[1])+start[0]
            right.y = m*(window.limits.max.x-start[0])+start[1]
            left.y = m*(window.limits.min.x-start[0])+start[1]

            if(isInterception(top.x,top.y)){
                firstPoint = top
            }
            if(isInterception(bottom.x, bottom.y)){
                if(firstPoint){
                    lastPoint = bottom
                }else{
                    firstPoint = bottom
                }
            }
            if(isInterception(left.x,left.y)){
                if(firstPoint){
                    lastPoint = left
                }else{
                    firstPoint = left
                }
            }
            if(isInterception(right.x,right.y)){
                if(firstPoint){
                    lastPoint = right
                }else{
                    firstPoint = right
                }
            }
            console.log(lastPoint)
            drawLine(context,firstPoint.x,firstPoint.y,lastPoint.x,lastPoint.y)
        }
    }
}