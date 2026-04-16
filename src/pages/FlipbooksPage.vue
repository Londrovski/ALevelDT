<template>
  <q-page class="jm-page">
    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Documents</div>
      <h1 class="jm-page-title">Sketchbook</h1>
      <p class="jm-page-sub">Click "Open in Drive" to view the full document.</p>
    </div>
    <div class="jm-flipbook-list">
      <FlipbookViewer
        title="Design Sketchbook"
        desc="Full design process — research, ideation, development and final design."
        driveUrl="https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view"
        driveId="1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39"
      />
      <FlipbookViewer
        title="Manufacturing Pack"
        desc="Component orthographics, renders, and full manufacturing specification."
        driveUrl="https://drive.google.com/file/d/1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj/view"
        driveId="1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj"
      />
    </div>
  </q-page>
</template>

<script setup>
import FlipbookViewer from 'components/FlipbookViewer.vue'
</script>

<style scoped>
.jm-page { background: #f2f2f2; color: #333233; min-height: 100vh; }
.jm-page-header { background: #ffffff; padding: 32px 48px 28px; border-bottom: 1px solid #d8d8d8; }
.jm-flipbook-list { padding: 32px 48px 64px; display: flex; flex-direction: column; gap: 40px; max-width: 1200px; }
@media (max-width: 600px) { .jm-flipbook-list { padding: 20px 16px 40px; } .jm-page-header { padding: 24px 20px 20px; } }
</style>
