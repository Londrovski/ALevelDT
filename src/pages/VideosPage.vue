<template>
  <q-page class="bg-grey-10 text-white q-pa-lg">
    <div style="max-width: 900px; margin: 0 auto">
      <div class="text-h4 text-weight-bold q-mb-sm">Videos</div>
      <div class="text-grey-5 q-mb-xl">Build progress and testing footage uploaded to YouTube.</div>

      <div class="column q-gutter-xl">
        <div v-for="video in videos" :key="video.id" class="video-block">
          <div class="video-wrapper">
            <iframe
              :src="`https://www.youtube.com/embed/${video.id}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="text-subtitle1 q-mt-sm text-grey-3">{{ video.title }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const videos = [
  { id: '4jTyH2c22-E', title: 'DT A Level Project — Build Progress 1' },
  { id: 'au5JkXNEHmI', title: 'DT A Level Project — Build Progress 2' },
  { id: 'FIho5F5fefk', title: 'DT A Level Project — Build Progress 3' },
  { id: 'NEesFrBb8yA', title: 'DT A Level Project — Build Progress 4' },
  { id: 'zpv27q0CSIE', title: 'DT A Level Project — Build Progress 5' },
  { id: 'A2GO3WT6RNU', title: 'DT A Level Project — Build Progress 6' },
  { id: 'MR8mqT-pHq0', title: 'DT A Level Project — Mk 6 Leg Assembly' },
]
</script>

<style scoped>
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  background: #000;
  border-radius: 8px;
}
.video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border-radius: 8px;
}
</style>
