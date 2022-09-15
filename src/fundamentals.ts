import './styles/base.css'
import * as THREE from 'three'
import { ColorRepresentation } from 'three'
import { resizeRendererToDisplaySize } from './helpers/responsiveness'

function getCamera() {
  const fov = 75
  const aspect = 2
  const near = 0.1
  const far = 5
  return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

function getBoxGeometry() {
  const boxHeight = 1
  const boxWidth = 1
  const boxDepth = 1
  return new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
}

function getLight() {
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  return light
}

function makeCube(color: ColorRepresentation, x: number) {
  const material = new THREE.MeshPhongMaterial({ color })
  const cubeMesh = new THREE.Mesh(getBoxGeometry(), material)
  cubeMesh.position.x = x
  return cubeMesh
}

function main() {
  const cubes = [makeCube('gray', 0), makeCube(0x8844aa, -2), makeCube(0xaa8844, 2)]

  const light = getLight()

  const scene = new THREE.Scene()
  scene.add(light)
  cubes.forEach((cube) => {
    scene.add(cube)
  })

  const camera = getCamera()
  camera.position.z = 2 // move the camera back a little

  const canvas = document.querySelector('#canvas')!
  const renderer = new THREE.WebGLRenderer({ canvas })

  function render(time: number) {
    time *= 0.001 // convert to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    cubes.forEach((cube) => {
      cube.rotation.x = time
      cube.rotation.y = time
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
