import { SHAPES } from "./constants.js";

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(-560, 560, 280, -280, 1, 1000)
camera.position.set(0, 0, 100)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialiases: true})
renderer.setSize(1080, 560)
document.querySelector('#canvas-container').appendChild(renderer.domElement)

let rotationX = 20
let rotationY = -20
let rotationZ = 0

const allGeometries = []

const plotObject = () => {
    SHAPES.forEach(shape => {
        const { color, points } = shape
        const [ xBegin, yBegin, _ ] = points[0]
        const allZs = points.map(point => point[2])
        const maxZ = allZs.reduce((z, acc) => Math.max(z, acc))
        const minZ = allZs.reduce((z, acc) => Math.min(z, acc))
        const depth = Math.max(maxZ - minZ, 0)
        const path = new THREE.Shape()

        path.moveTo(xBegin, yBegin)
        for(let i = 1; i < points.length; i++) {
            const [ x, y, _ ] = points[i]
            path.lineTo(x, y)
        }
        path.lineTo(xBegin, yBegin)

        const geometry = new THREE.ExtrudeGeometry(path, {depth: depth, bevelEnabled: false})
        allGeometries.push(geometry)
        geometry.rotateX(rotationX * (Math.PI / 180))
        geometry.rotateY(rotationY * (Math.PI / 180))
        geometry.rotateZ(rotationZ * (Math.PI / 180))
        const material = new THREE.MeshBasicMaterial({color: color})
        const mesh = new THREE.Mesh(geometry, material)

        scene.add(mesh)
        renderer.render(scene, camera)
    })
}

plotObject()

const rotateObject = (x, y, z) => {
    allGeometries.forEach(geometry => {
        geometry.rotateX(x * (Math.PI / 180))
        geometry.rotateY(y * (Math.PI / 180))
        geometry.rotateZ(z * (Math.PI / 180))
    })
    renderer.render(scene, camera)
}

document.querySelector("#rotation-x-minus").addEventListener('click', () => {
    rotationX += 10
    rotateObject(10, 0, 0)
})
document.querySelector("#rotation-x-plus").addEventListener('click', () => {
    rotationX -= 10
    rotateObject(-10, 0, 0)
})
document.querySelector("#rotation-y-minus").addEventListener('click', () => {
    rotationY += 10
    rotateObject(0, 10, 0)
})
document.querySelector("#rotation-y-plus").addEventListener('click', () => {
    rotationY -= 10
    rotateObject(0, -10, 0)
})
document.querySelector("#rotation-z-minus").addEventListener('click', () => {
    rotationZ += 10
    rotateObject(0, 0, 10)
})
document.querySelector("#rotation-z-plus").addEventListener('click', () => {
    rotationZ -= 10
    rotateObject(0, 0, -10)
})
