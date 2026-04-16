<template>
  <STLViewer
    title="Passive System"
    :models="models"
  />
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'

const models = [
          { url: '/models/Passive-Slide-1.stl', color: 0x888888 },
          { url: '/models/Passive-Track-1.stl', color: 0x999999 },
          { url: '/models/Leg-1.stl', color: 0x777777 },
          { url: '/models/Top-Pivot.stl', color: 0xaaaaaa },
          { url: '/models/Pivot-Hanger-1.stl', color: 0x666666 },
          { url: '/models/Hanger-1-1.stl', color: 0x888888 },
          { url: '/models/Hanger-2-1.stl', color: 0x999999 },
          { url: '/models/Hanger-3-1.stl', color: 0x777777 }
]
</script>
