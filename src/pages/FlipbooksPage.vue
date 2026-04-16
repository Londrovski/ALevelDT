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
        r2Url="https://pub-087c249dd2224c6ebb29466c44a0638e.r2.dev/The-Real-Definite-Final-Digital-Sketchbook.pdf"
        driveUrl="https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view"
        driveId="1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39"
      />
      <FlipbookViewer
        title="Manufacturing Pack"
        desc="Component orthographics, renders, and full manufacturing specification."
        r2Url="https://pub-087c249dd2224c6ebb29466c44a0638e.r2.dev/The-Real-Final-Manufacturing-Pack.pdf"
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
@media (max-width: 860px) { .jm-page-header { padding: 20px 20px 16px; } }
.jm-flipbook-list { padding: 32px 48px 64px; display: flex; flex-direction: column; gap: 40px; max-width: 1200px; }
@media (max-width: 860px) { .jm-flipbook-list { padding: 16px 12px 40px; gap: 24px; } }
</style>
