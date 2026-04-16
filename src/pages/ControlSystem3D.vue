<template>
  <STLViewer
    title="Control System"
    :models="models"
  />
</template>

<script setup>
import STLViewer from 'components/STLViewer.vue'

const models = [
          { url: '/models/Drive-Shaft-Bracket-1-1.stl', color: 0x999999 },
          { url: '/models/Drive-Shaft-Bracket-2-1.stl', color: 0x888888 },
          { url: '/models/Two-Way-Bevel-Gear-Hub-Base.stl', color: 0x777777 },
          { url: '/models/Two-Way-Bevel-Gear-Hub-Top.stl', color: 0xaaaaaa },
          { url: '/models/Three-Way-Bevel-Gear-Hub-Base.stl', color: 0x666666 },
          { url: '/models/Three-Way-Bevel-Gear-Hub-Top.stl', color: 0xbbbbbb },
          { url: '/models/Bevel-Gear-Square-1.stl', color: 0x999999 },
          { url: '/models/Bevel-Gear-Hex-1.stl', color: 0x888888 }
]
</script>
