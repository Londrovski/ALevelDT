<template>
  <STLViewer
    title="Power System"
    :models="models"
  />
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'

const models = [
          { url: '/models/Power-Unit-1.stl', color: 0x888888 },
          { url: '/models/Power-Unit-2.stl', color: 0x999999 },
          { url: '/models/Power-Unit-3.stl', color: 0x777777 },
          { url: '/models/Power-Unit-4.stl', color: 0xaaaaaa },
          { url: '/models/Power-Slide-1.stl', color: 0x666666 },
          { url: '/models/Power-Slide-2.stl', color: 0xbbbbbb },
          { url: '/models/Power-Track-1.stl', color: 0x888888 }
]
</script>
