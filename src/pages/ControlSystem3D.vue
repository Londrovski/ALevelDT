<template>
  <q-page class="jm-3d-page">
    <div class="jm-page-header">
      <h1 class="jm-page-title">Control System 3D View</h1>
    </div>
    <STLViewer label="Handle" url="/models/Handle.stl" />
    <STLViewer label="Drive Shaft Bracket 1" url="/models/Drive-Shaft-Bracket-1-1.stl" />
    <STLViewer label="Drive Shaft Bracket 2" url="/models/Drive-Shaft-Bracket-2-1.stl" />
    <STLViewer label="Three-Way Bevel Gear Hub Base" url="/models/Three-Way-Bevel-Gear-Hub-Base.stl" />
    <STLViewer label="Three-Way Bevel Gear Hub Top" url="/models/Three-Way-Bevel-Gear-Hub-Top.stl" />
    <STLViewer label="Bevel Gear – Square" url="/models/Bevel-Gear-Square-1.stl" />
    <STLViewer label="Bevel Gear – Hex" url="/models/Bevel-Gear-Hex-1.stl" />
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
