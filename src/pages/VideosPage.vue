<template>
  <q-page class="jm-videos-page">
    <div class="jm-page-header">
      <h1 class="jm-page-title">Videos</h1>
      <p class="jm-page-sub">Build progress and testing footage.</p>
    </div>
    <div class="jm-video-grid">
      <div v-for="v in videos" :key="v.id" class="jm-video-card">
        <div class="jm-video-wrapper">
          <iframe
            :src="`https://www.youtube.com/embed/${v.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="jm-video-title">{{ v.title }}</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const videos = [
  { id: '4jTyH2c22-E', title: 'Mk 5 – Track & Slide Demo' },
  { id: 'au5JkXNEHmI', title: 'Mk 5.4 – Circular Track Test' },
  { id: 'FIho5F5fefk', title: 'Mk 5.7 – Condensed Track Test' },
  { id: 'NEesFrBb8yA', title: 'Bevel Gear Hub Assembly' },
  { id: 'zpv27q0CSIE', title: 'Power System Test' },
  { id: 'A2GO3WT6RNU', title: 'Final Prototype Demo' },
  { id: 'MR8mqT-pHq0', title: 'Mk 6 – Leg Assembly' },
]
</script>

<style scoped>
.jm-videos-page {
  background: #f4f2ef;
  min-height: 100vh;
  color: #1e1e1e;
}
.jm-page-header {
  padding: 28px 28px 20px;
  border-bottom: 1px solid #d4d0c8;
}
.jm-page-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}
.jm-page-sub {
  font-size: 14px;
  color: #888882;
  margin: 0;
}
.jm-video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 24px 28px 48px;
}
.jm-video-card {
  background: #fff;
  border: 1px solid #d4d0c8;
  border-radius: 6px;
  overflow: hidden;
}
.jm-video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  background: #000;
}
.jm-video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: none;
}
.jm-video-title {
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #1e1e1e;
  background: #fff;
  border-top: 1px solid #e8e5e0;
}
</style>
