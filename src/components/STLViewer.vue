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
  label:      { type: String, default: '' },
  url:        { type: String, required: true },
  height:     { type: Number, default: 500 },
  zoomFactor: { type: Number, default: 1.4 }
})

const container = ref(null)
const loading   = ref(true)
let renderer, scene, camera, controls, animId

function init () {
  const el = container.value
  const w = el.clientWidth || 800
  const h = props.height

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  // ── CAD-quality lighting ──
  // Soft ambient — fill shadows so they're not pitch black
  scene.add(new THREE.AmbientLight(0xffffff, 0.45))

  // Key light — main illumination from top-front-right
  const key = new THREE.DirectionalLight(0xffffff, 0.85)
  key.position.set(3, 5, 4)
  scene.add(key)

  // Fill light — opposite side, much softer, slight warm tint
  const fill = new THREE.DirectionalLight(0xfff4e0, 0.3)
  fill.position.set(-4, 2, -3)
  scene.add(fill)

  // Rim / back light — picks out edges and separation from background
  const rim = new THREE.DirectionalLight(0xe8f4ff, 0.4)
  rim.position.set(0, -3, -5)
  scene.add(rim)

  // Top light — brightens upper faces (like studio ceiling)
  const top = new THREE.DirectionalLight(0xffffff, 0.25)
  top.position.set(0, 8, 0)
  scene.add(top)

  camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 1000000)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  el.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.07

  new STLLoader().load(props.url, (geo) => {
    geo.computeBoundingBox()
    geo.computeVertexNormals()
    const centre = new THREE.Vector3()
    geo.boundingBox.getCenter(centre)
    geo.translate(-centre.x, -centre.y, -centre.z)

    // Mid-tone grey with good specularity — looks like machined aluminium/plastic
    // MeshPhongMaterial gives the classic CAD look with specular highlights
    const mat = new THREE.MeshPhongMaterial({
      color:     0x8a9ba8,   // cool blue-grey — classic CAD/SLA print look
      specular:  0xffffff,
      shininess: 80,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    scene.add(mesh)

    // Optional subtle ground plane to show shadow
    geo.computeBoundingBox()
    const boxH = geo.boundingBox.max.y - geo.boundingBox.min.y
    const groundY = -(boxH / 2) - 0.5
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.ShadowMaterial({ opacity: 0.08 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = groundY
    ground.receiveShadow = true
    scene.add(ground)
    key.castShadow = true
    key.shadow.mapSize.set(1024, 1024)
    key.target = mesh

    // Fit camera
    geo.computeBoundingSphere()
    const r = geo.boundingSphere.radius
    const fovRad = camera.fov * Math.PI / 180
    const dist = (r / Math.sin(fovRad / 2)) * props.zoomFactor
    camera.position.set(dist * 0.6, dist * 0.4, dist)
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
  background: #ffffff; border: 1px solid #b2b2b2; border-radius: 6px; overflow: hidden;
}
.jm-viewer-header {
  padding: 18px 22px 14px; border-bottom: 1px solid #e8e8e8; background: #ffffff;
}
.jm-viewer-label { font-size: 20px; font-weight: 700; color: #333233; letter-spacing: -0.01em; }
.jm-viewer-hint  { font-size: 12px; color: #b2b2b2; margin-top: 3px; }
.jm-canvas-wrap  { position: relative; }
.jm-canvas-inner { width: 100%; line-height: 0; }
.jm-canvas-inner canvas { display: block; width: 100% !important; }
.jm-loading {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  color: #b2b2b2; font-size: 14px; pointer-events: none;
}
</style>
