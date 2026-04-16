<template>
  <STLViewer
    title="Attachments"
    :models="models"
  />
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'

const models = [
          { url: '/models/Handle.stl', color: 0x888888 },
          { url: '/models/Handle-Cap-1.stl', color: 0x999999 }
]
</script>
