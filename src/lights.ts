import * as THREE from 'three'
import { resizeRendererToDisplaySize } from './helpers/responsiveness'
import './styles/lights.css'

import GUI from 'lil-gui'

import { Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ColorGuiHelper } from './helpers/color-gui-helper'

function makeObjects() {
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/textures/checker.png')
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.magFilter = THREE.NearestFilter
  texture.repeat.set(20, 20)
  const planeGeometry = new THREE.PlaneGeometry(40, 40)
  const planeMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
  const planeMesh = new Mesh(planeGeometry, planeMaterial)
  planeMesh.rotation.x = Math.PI * -0.5

  const cubeSize = 4
  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: '#8AC' })
  const cubeMesh = new Mesh(cubeGeometry, cubeMaterial)
  cubeMesh.position.set(cubeSize, cubeSize / 2, 0)

  const sphereRadius = 3
  const sphereWidthDivisions = 32
  const sphereHeightDivision = 16
  const sphereGeometry = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivision
  )
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: '#CA8' })
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)

  return { planeMesh, cubeMesh, sphereMesh }
}

function main() {
  const canvas: HTMLElement = document.querySelector('canvas#lights')!
  const renderer = new THREE.WebGLRenderer({ canvas, logarithmicDepthBuffer: true })
  const scene = new THREE.Scene()

  const objects = makeObjects()
  Object.values(objects).forEach((object) => {
    scene.add(object)
  })

  const light = new THREE.AmbientLight(0xffffff, 1)
  scene.add(light)

  const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100)
  camera.position.set(0, 10, 20)

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  // function render(time: DOMHighResTimeStamp) {
  function render() {
    // responsiveness
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // animation
    // const timeInSecs = time * 0.001
    // Object.values(objects).forEach((object) => {
    //   object.rotation.y = timeInSecs
    // })

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  const gui = new GUI()
  gui.addColor(new ColorGuiHelper(light, 'color'), 'value').name('color')
  gui.add(light, 'intensity', 0, 2, 0.01)
}

main()
