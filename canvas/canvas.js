const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d", { willReadFrequently: true })


const getCursorPosition =  (e) => [ e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]

const btnclear = document.getElementById("clear")

let start;
let end;

const clearCanvas = () =>{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("mousedown", e =>{
    start = getCursorPosition(e)
    console.log("start = "+start)
})

canvas.addEventListener("mouseup", e =>{
    end = getCursorPosition(e)
    console.log("end = "+end)
})

btnclear.addEventListener("click", e => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("btnclear")
})

export { context, canvas, start, end, btnclear, clearCanvas}
//ctx.fillRect(x, y, 1, 1) #desenha pixel