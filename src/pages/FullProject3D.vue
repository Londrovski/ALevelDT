<template>
  <q-page class="jm-3d-page">
    <div class="jm-page-header">
      <h1 class="jm-page-title">The Full Monty</h1>
    </div>
    <STLViewer label="The Full Monty" url="/models/The-Full-Monty-with-Top-2.stl" />
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
