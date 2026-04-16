<template>
  <q-page class="jm-3d-page">
    <div class="jm-page-header">
      <div class="jm-page-eyebrow">3D View</div>
      <h1 class="jm-page-title">Attachments 3D View</h1>
    </div>
    <div class="jm-viewers-wrap">
      <STLViewer label="Top Pivot" url="/models/Top-Pivot.stl" />
      <STLViewer label="Pivot Hanger" url="/models/Pivot-Hanger-1.stl" />
      <STLViewer label="Hanger 1" url="/models/Hanger-1-1.stl" />
      <STLViewer label="Hanger 2" url="/models/Hanger-2-1.stl" />
      <STLViewer label="Hanger 3" url="/models/Hanger-3-1.stl" />
    </div>
  </q-page>
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'
</script>

<style scoped>
.jm-3d-page { background: #f2f2f2; min-height: 100vh; }
.jm-page-header {
  background: #ffffff;
  padding: 32px 48px 28px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 6px;
}
.jm-page-title {
  font-size: 28px; font-weight: 700; color: #333233;
  margin: 0; letter-spacing: -0.01em;
}
.jm-viewers-wrap {
  padding: 32px 48px 64px;
  display: flex; flex-direction: column; gap: 28px;
}
@media (max-width: 600px) {
  .jm-viewers-wrap { padding: 20px 16px 40px; }
  .jm-page-header { padding: 24px 20px 20px; }
}
</style>
