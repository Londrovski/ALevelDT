<template>
  <STLViewer
    title="The Full Monty"
    :models="models"
  />
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'

const models = [
          { url: '/models/The-Full-Monty-with-Top-2.stl', color: 0x888888 }
]
</script>
