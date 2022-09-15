import './styles/scenegraph.css'
import * as THREE from 'three'
import { resizeRendererToDisplaySize } from './helpers/responsiveness'

function makeObjects() {
  const geometry = new THREE.SphereGeometry(1, 9, 9)

  const sunMaterial = new THREE.MeshLambertMaterial({ emissive: 0xffff00 })
  const sun = new THREE.Mesh(geometry, sunMaterial)
  sun.scale.set(5, 5, 5)

  const moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, emissive: 0x222222 })
  const moon = new THREE.Mesh(geometry, moonMaterial)
  moon.scale.set(0.5, 0.5, 0.5)

  const moonOrbit = new THREE.Object3D()
  moonOrbit.position.x = 2
  moonOrbit.add(moon)

  const earthMaterial = new THREE.MeshLambertMaterial({ color: 0x2233ff, emissive: 0x112244 })
  const earth = new THREE.Mesh(geometry, earthMaterial)

  const earthOrbit = new THREE.Object3D()
  earthOrbit.position.x = 10
  earthOrbit.add(earth)
  earthOrbit.add(moonOrbit)

  const solarSystem = new THREE.Object3D()
  solarSystem.add(sun)
  solarSystem.add(earthOrbit)

  return { solarSystem, earthOrbit, sun, earth }
}

function main() {
  const canvas = document.querySelector('canvas#earth-orbit')!
  const renderer = new THREE.WebGLRenderer({ canvas })
  const scene = new THREE.Scene()

  const objects = makeObjects()
  scene.add(objects.solarSystem)

  const light = new THREE.PointLight(0xffffff, 1)
  scene.add(light)

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
  camera.position.set(0, 50, 0)
  camera.up.set(0, 0, 1)
  camera.lookAt(0, 0, 0)

  function render(time: DOMHighResTimeStamp) {
    // responsiveness
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    // animation
    const timeInSecs = time * 0.001
    Object.values(objects).forEach((object) => {
      object.rotation.y = timeInSecs
    })

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
