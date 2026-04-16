<template>
  <q-page class="jm-page">
    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Documents</div>
      <h1 class="jm-page-title">Flipbooks</h1>
      <p class="jm-page-sub">Digital versions of the project sketchbook and manufacturing pack. Turn pages by clicking the edges or using the controls below.</p>
    </div>

    <div class="jm-flipbook-list">
      <FlipbookViewer
        title="Design Sketchbook"
        desc="Full design process — research, ideation, development and final design."
        pdfUrl="https://drive.google.com/uc?export=download&id=1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39"
        driveUrl="https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view"
      />
      <FlipbookViewer
        title="Manufacturing Pack"
        desc="Component orthographics, renders, and full manufacturing specification."
        pdfUrl="/docs/manufacturing-pack.pdf"
        driveUrl="https://drive.google.com/file/d/1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj/view"
      />
    </div>
  </q-page>
</template>

<script setup>
import FlipbookViewer from 'components/FlipbookViewer.vue'
</script>

<style scoped>
.jm-page { background: #f2f2f2; color: #333233; min-height: 100vh; }
.jm-page-header {
  background: #ffffff; padding: 32px 48px 28px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 6px;
}
.jm-page-title { font-size: 28px; font-weight: 700; color: #333233; margin: 0 0 6px; }
.jm-page-sub { font-size: 14px; color: #7c7c7c; margin: 0; }
.jm-flipbook-list {
  padding: 32px 48px 64px;
  display: flex; flex-direction: column; gap: 40px;
  max-width: 1200px;
}
@media (max-width: 600px) {
  .jm-flipbook-list { padding: 20px 16px 40px; }
  .jm-page-header { padding: 24px 20px 20px; }
}
</style>
