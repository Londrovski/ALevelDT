<template>
  <q-page class="jm-3d-page">
    <div class="jm-page-header">
      <div class="jm-page-eyebrow">3D View</div>
      <h1 class="jm-page-title">Full Project 3D View</h1>
    </div>
    <div class="jm-viewers-wrap">
      <STLViewer label="The Full Monty (with Top)" url="/models/The-Full-Monty-with-Top-2.stl" :height="viewerH" :zoomFactor="0.75" />
      <STLViewer label="The Full Monty" url="/models/The-Full-Monty-1.stl" :height="viewerH" :zoomFactor="0.75" />
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import STLViewer from 'components/STLViewer.vue'
// Mobile: 2/3 of 500 ≈ 333; desktop: 500
const viewerH = computed(() => window.innerWidth <= 860 ? 333 : 500)
</script>

<style scoped>
.jm-3d-page { background: #f2f2f2; min-height: 100vh; }
.jm-page-header { background: #ffffff; padding: 32px 48px 28px; border-bottom: 1px solid #d8d8d8; }
@media (max-width: 860px) { .jm-page-header { padding: 20px 20px 16px; } }
.jm-page-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #32a9b1; margin-bottom: 6px; }
.jm-viewers-wrap { padding: 32px 48px 64px; display: flex; flex-direction: column; gap: 28px; }
@media (max-width: 860px) { .jm-viewers-wrap { padding: 16px 12px 40px; gap: 16px; } }
</style>
