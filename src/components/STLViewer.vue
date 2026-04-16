<template>
  <div class="jm-viewer-block">
    <div class="jm-viewer-header">
      <div class="jm-viewer-label">{{ label }}</div>
      <div class="jm-viewer-hint">Click &amp; drag to rotate · Scroll to zoom · Right-click to pan</div>
    </div>
    <div class="jm-canvas-wrap">
      <div ref="container" class="jm-canvas-inner"></div>
      <div v-if="loading" class="jm-loading">Loading model…</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const props = defineProps({
  label:  { type: String, default: '' },
  url:    { type: String, required: true },
  height: { type: Number, default: 500 },
  // 1.4 = normal zoom-out (parts), 0.75 = closer (Full Monty)
  zoomFactor: { type: Number, default: 1.4 }
})

const container = ref(null)
const loading = ref(true)
let renderer, scene, camera, controls, animId

function init () {
  const el = container.value
  const w = el.clientWidth || 800
  const h = props.height

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xfafafa)

  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const d1 = new THREE.DirectionalLight(0xffffff, 0.6)
  d1.position.set(2, 3, 4); scene.add(d1)
  const d2 = new THREE.DirectionalLight(0xffffff, 0.2)
  d2.position.set(-2, -1, -2); scene.add(d2)

  camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 1000000)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  el.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08

  new STLLoader().load(props.url, (geo) => {
    geo.computeBoundingBox()
    geo.computeVertexNormals()
    const centre = new THREE.Vector3()
    geo.boundingBox.getCenter(centre)
    geo.translate(-centre.x, -centre.y, -centre.z)

    const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x666666, specular: 0x1a1a1a, shininess: 25, side: THREE.DoubleSide
    }))
    scene.add(mesh)

    geo.computeBoundingSphere()
    const r = geo.boundingSphere.radius
    const fovRad = camera.fov * Math.PI / 180
    const dist = (r / Math.sin(fovRad / 2)) * props.zoomFactor
    camera.position.set(dist * 0.55, dist * 0.35, dist)
    camera.near = dist * 0.001
    camera.far  = dist * 50
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
  camera.aspect = w / props.height
  camera.updateProjectionMatrix()
  renderer.setSize(w, props.height)
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
  background: #ffffff;
  border: 1px solid #b2b2b2;
  border-radius: 6px;
  overflow: hidden;
}
.jm-viewer-header {
  padding: 18px 22px 14px;
  border-bottom: 1px solid #e8e8e8;
  background: #ffffff;
}
.jm-viewer-label {
  font-size: 20px;
  font-weight: 700;
  color: #333233;
  letter-spacing: -0.01em;
}
.jm-viewer-hint {
  font-size: 12px;
  color: #b2b2b2;
  margin-top: 3px;
}
.jm-canvas-wrap { position: relative; }
.jm-canvas-inner { width: 100%; line-height: 0; }
.jm-canvas-inner canvas { display: block; width: 100% !important; }
.jm-loading {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  color: #b2b2b2; font-size: 14px; pointer-events: none;
}
</style>
