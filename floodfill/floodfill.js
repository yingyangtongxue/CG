import { context, canvas, start, end, btnclear } from "../canvas/canvas.js";

const img = new Image()
img.src = "../floodfill/Testar_FloodFill.bmp"

img.onload = () => {
    context.drawImage(img, 0,0)
    const ImageData = context.getImageData(0, 0, canvas.width, canvas.height)
    //console.log(ImageData.data[200])
}

const getPixelValue = (x,y) =>{
    let pixeldata = context.getImageData(x, y, 1, 1).data
    console.log(pixeldata)
}


canvas.addEventListener("click", e => {
    getPixelValue(start[0],start[1])
})
