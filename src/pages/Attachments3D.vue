<template>
  <q-page class="jm-3d-page">
    <div class="jm-page-header">
      <h1 class="jm-page-title">Attachments 3D View</h1>
    </div>
    <STLViewer label="Top Pivot" url="/models/Top-Pivot.stl" />
    <STLViewer label="Pivot Hanger" url="/models/Pivot-Hanger-1.stl" />
    <STLViewer label="Hanger 1" url="/models/Hanger-1-1.stl" />
    <STLViewer label="Hanger 2" url="/models/Hanger-2-1.stl" />
    <STLViewer label="Hanger 3" url="/models/Hanger-3-1.stl" />
  </q-page>
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'
</script>

<style scoped>
.jm-3d-page { background: #f4f2ef; min-height: 100vh; }
.jm-page-header {
  padding: 28px 24px 20px;
  border-bottom: 1px solid #d4d0c8;
}
.jm-page-title {
  font-size: 22px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0;
  letter-spacing: -0.01em;
}
</style>
