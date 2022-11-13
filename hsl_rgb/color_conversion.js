const box = document.getElementById("box");

const R = document.getElementById("r");
const G = document.getElementById("g");
const B = document.getElementById("b");

const H = document.getElementById("h");
const S = document.getElementById("s");
const L = document.getElementById("l");

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

let h = s = l = r = g = b = 0;
let data = [];

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

    return [h, s, l]
}

const HSLtoRGB = (h,s,l) =>{
    s/=240; l/=240;

    const c = (1-Math.abs(2*l-1)) * s
    const x = c * (1-Math.abs((h/40) % 2-1))
    const m = l - c/2

    let r = g = b = 0;

    if(h<=0 && h<40){
        r = c; g = x; b = 0;
    }else if(h<=40 && h<80){
        r = x; g = c; b = 0;
    }else if(h<=80 && h<120){
        r = 0; g = c; b = x;
    }else if(h<=120 && h<160){
        r = 0; g = x; b = c;
    }else if(r<=160 && h<200){
        r = x; g = 0; b = c;
    }else if(h<=200 && h<240){
        r = c; g = 0; b = x;
    }

    r = Math.round((r+m)*255)
    g = Math.round((g+m)*255)
    b = Math.round((b+m)*255)

    return [r,g,b] 
}

btn1.addEventListener("click", e => {
    
    r = R.value; g = G.value; b = B.value;
    
    box.style.backgroundColor = "rgb("+r+","+g+","+b+")";

    data = RGBtoHSL(r, g, b)
    h = data[0]; s = data[1]; l = data[2];

    H.value = h; S.value = s; L.value = l;

})    

btn2.addEventListener("click", e => {

    h = H.value; s = S.value; l = L.value;

    data = HSLtoRGB(h,s,l)

    r = data[0]; g = data[1]; b = data[2];

    R.value = r; G.value = g; B.value = b;

    box.style.backgroundColor = "rgb("+r+","+g+","+b+")";
})