<template>
  <div class="jm-viewer-block">
    <div class="jm-viewer-label">{{ label }}</div>
    <div class="jm-viewer-hint">Click &amp; drag to rotate · Scroll to zoom · Right-click to pan</div>
    <div ref="container" class="jm-canvas-container"></div>
    <div v-if="loading" class="jm-loading">Loading model…</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  label: { type: String, default: '' },
  url:   { type: String, required: true },
  height:{ type: Number, default: 480 }
})

const container = ref(null)
const loading = ref(true)
let renderer, scene, camera, controls, animId

function init () {
  const el = container.value
  const w = el.clientWidth || 800
  const h = props.height

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf0eeea)

  // Lighting — match original soft grey look
  scene.add(new THREE.AmbientLight(0xffffff, 0.65))
  const d1 = new THREE.DirectionalLight(0xffffff, 0.7)
  d1.position.set(1, 2, 2)
  scene.add(d1)
  const d2 = new THREE.DirectionalLight(0xffffff, 0.25)
  d2.position.set(-1, -1, -1)
  scene.add(d2)

  camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 100000)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  el.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 1
  controls.maxDistance = 50000

  const loader = new STLLoader()
  loader.load(props.url, (geometry) => {
    geometry.computeBoundingBox()
    geometry.computeVertexNormals()

    // Centre the geometry
    const centre = new THREE.Vector3()
    geometry.boundingBox.getCenter(centre)
    geometry.translate(-centre.x, -centre.y, -centre.z)

    const material = new THREE.MeshPhongMaterial({
      color: 0x6e6e6e,
      specular: 0x222222,
      shininess: 30,
      side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Fit camera to bounding sphere — shows full model always
    geometry.computeBoundingSphere()
    const r = geometry.boundingSphere.radius
    const fovRad = (camera.fov * Math.PI) / 180
    const dist = (r / Math.sin(fovRad / 2)) * 1.25
    camera.position.set(dist * 0.6, dist * 0.4, dist)
    camera.near = dist * 0.001
    camera.far  = dist * 100
    camera.updateProjectionMatrix()
    controls.target.set(0, 0, 0)
    controls.update()

    loading.value = false
  })

  window.addEventListener('resize', onResize)
  animate()
}

function animate () {
  animId = requestAnimationFrame(animate)
  controls?.update()
  renderer?.render(scene, camera)
}

function onResize () {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = props.height
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
.jm-viewer-block {
  border-bottom: 1px solid #d4d0c8;
  padding-bottom: 0;
  margin-bottom: 0;
}
.jm-viewer-label {
  font-size: 18px;
  font-weight: 600;
  color: #1e1e1e;
  padding: 20px 24px 4px;
  letter-spacing: -0.01em;
}
.jm-viewer-hint {
  font-size: 12px;
  color: #999992;
  padding: 0 24px 10px;
}
.jm-canvas-container { width: 100%; line-height: 0; }
.jm-canvas-container canvas { display: block; width: 100% !important; }
.jm-loading {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  color: #888;
  font-size: 14px;
}
</style>
