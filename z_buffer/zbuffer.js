import { SHAPES } from "./constants.js";

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-560, 560, 280, -280, 1, 1000)
camera.position.set(0, 0, 50)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialiases: true})
renderer.setSize(1080, 560)
document.querySelector('#canvas-container').appendChild(renderer.domElement)

const allGeometries = {}

const plotCircle = circle => {
    const { id, radius, x, y, z, color } = circle
    const geometry = new THREE.CircleGeometry(radius, 32)
    const material = new THREE.MeshBasicMaterial({color: color})
    const mesh = new THREE.Mesh(geometry, material)

    geometry.translate(x, y, z)
    scene.add(mesh)
    allGeometries[`${id}`] = geometry
}

const plotPlane = plane => {
    const { id, color, width, height, xInit, yInit, zInit, yRotation } = plane
    const shape = new THREE.Shape()

    shape.moveTo(xInit, yInit)
    shape.lineTo(xInit+width, yInit)
    shape.lineTo(xInit+width, yInit+height)
    shape.lineTo(xInit, yInit+height)
    shape.lineTo(xInit, yInit)
    
    const geometry = new THREE.ExtrudeGeometry(shape, {depth: 0, bevelEnabled: false})
    const material = new THREE.MeshBasicMaterial({color: color})
    const mesh = new THREE.Mesh(geometry, material)

    allGeometries[`${id}`] = geometry
    geometry.translate(xInit, yInit, zInit)
    geometry.rotateY(yRotation * (Math.PI / 180))
    scene.add(mesh)
}

const plotCube = cube => {
    const { id, color, width, height, depth, xInit, yInit } = cube
    const geometry = new THREE.BoxGeometry(width, height, depth)
    const material = new THREE.MeshBasicMaterial({color: color})
    const mesh = new THREE.Mesh(geometry, material)

    allGeometries[`${id}`] = geometry
    geometry.translate(xInit, yInit, 0)
    scene.add(mesh)
}

const plotter = {
    'circle': plotCircle,
    'plane': plotPlane,
    'cube': plotCube
}

const plotObject = () => {
    SHAPES.forEach(shape => plotter[shape.type](shape))
    renderer.render(scene, camera)
}

plotObject()

const degreeToRadian = degree => degree * (Math.PI / 180)

document.querySelector('#object-1-down').addEventListener('click', () => {
    allGeometries['1'].rotateZ(degreeToRadian(10))
    renderer.render(scene, camera)
})
document.querySelector('#object-1-up').addEventListener('click', () => {
    allGeometries['1'].rotateZ(degreeToRadian(-10))
    renderer.render(scene, camera)
})
document.querySelector('#object-2-down').addEventListener('click', () => {
    allGeometries['2'].rotateZ(degreeToRadian(10))
    renderer.render(scene, camera)
})
document.querySelector('#object-2-up').addEventListener('click', () => {
    allGeometries['2'].rotateZ(degreeToRadian(-10))
    renderer.render(scene, camera)
})
document.querySelector('#object-3-down').addEventListener('click', () => {
    allGeometries['3'].rotateZ(degreeToRadian(10))
    renderer.render(scene, camera)
})
document.querySelector('#object-3-up').addEventListener('click', () => {
    allGeometries['3'].rotateZ(degreeToRadian(-10))
    renderer.render(scene, camera)
})
document.querySelector('#object-4-down').addEventListener('click', () => {
    allGeometries['4'].rotateZ(degreeToRadian(10))
    renderer.render(scene, camera)
})
document.querySelector('#object-4-up').addEventListener('click', () => {
    allGeometries['4'].rotateZ(degreeToRadian(-10))
    renderer.render(scene, camera)
})
document.querySelector('#object-5-down').addEventListener('click', () => {
    allGeometries['5'].rotateZ(degreeToRadian(10))
    renderer.render(scene, camera)
})
document.querySelector('#object-5-up').addEventListener('click', () => {
    allGeometries['5'].rotateZ(degreeToRadian(-10))
    renderer.render(scene, camera)
})
