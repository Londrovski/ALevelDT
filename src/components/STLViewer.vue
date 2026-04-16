<template>
  <q-page class="bg-grey-10 text-white" style="min-height: 100vh">
    <div class="q-pa-lg">
      <div class="text-h5 text-weight-bold q-mb-xs">{{ title }}</div>
      <div class="text-grey-5 text-caption q-mb-md">Click and drag to rotate · Scroll to zoom · Right-click to pan</div>
    </div>
    <div ref="container" class="stl-container"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  title: { type: String, default: '3D View' },
  models: { type: Array, default: () => [] } // array of { url, color }
})

const container = ref(null)
let renderer, scene, camera, controls, animId

function init () {
  const el = container.value
  const w = el.clientWidth
  const h = Math.max(window.innerHeight - 160, 400)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a1a)
  scene.add(new THREE.AmbientLight(0xffffff, 0.6))

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight.position.set(1, 2, 3)
  scene.add(dirLight)

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000)
  camera.position.set(0, 150, 400)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  el.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  const loader = new STLLoader()
  const colors = [0xaaaaaa, 0x888888, 0xcccccc, 0x666666, 0xbbbbbb]

  props.models.forEach((model, i) => {
    loader.load(model.url, (geometry) => {
      geometry.computeBoundingBox()
      const center = new THREE.Vector3()
      geometry.boundingBox.getCenter(center)
      geometry.translate(-center.x, -center.y, -center.z)

      const material = new THREE.MeshPhongMaterial({
        color: model.color || colors[i % colors.length],
        specular: 0x333333,
        shininess: 40
      })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      // Auto-fit camera to first model
      if (i === 0) {
        const box = new THREE.Box3().setFromObject(mesh)
        const size = box.getSize(new THREE.Vector3()).length()
        camera.position.set(0, size * 0.5, size * 1.5)
        controls.update()
      }
    })
  })

  window.addEventListener('resize', onResize)
  animate()
}

function animate () {
  animId = requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

function onResize () {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = Math.max(window.innerHeight - 160, 400)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(() => { if (container.value) init() })
onBeforeUnmount(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
})
</script>

<style scoped>
.stl-container {
  width: 100%;
  min-height: calc(100vh - 160px);
}
.stl-container canvas {
  display: block;
  width: 100% !important;
}
</style>
