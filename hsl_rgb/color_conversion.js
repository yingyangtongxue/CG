const colorConversion = () =>{

}

const RGBtoHSL = (r,g,b) =>{
    r/=255; g/=255; b/=255;

    let minRGB = Math.min(r,g,b)
    let maxRGB = Math.max(r,g,b)

    let delta = maxRGB - minRGB

    let h = s = l = 0;

    if(delta==0){
        h = 0
    }else if(maxRGB==r){
        h = ((g-b)/delta)%6
    }else if(maxRGB==g){
        h = (b-r)/delta + 2
    }else{
        h = (r-g)/delta + 4
    }

    h = Math.round(h*40)

    if(h<0){
        h+=240
    }

    l = (maxRGB+minRGB)/2

    if(delta==0){
        s = 0
    }else{
        s = delta/(1-Math.abs(2*l-1))
    }

    s = Math.round(s*240)
    l = Math.round(l*240)

    console.log("h = "+h+" s = "+s+" l = "+l)
    return h,s,l
}

document.addEventListener("click", e => {
    RGBtoHSL(196, 63, 224)
})