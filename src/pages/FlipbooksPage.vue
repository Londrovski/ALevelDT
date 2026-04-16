<template>
  <q-page class="jm-page">
    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Documents</div>
      <h1 class="jm-page-title">Flipbooks</h1>
      <p class="jm-page-sub">Digital versions of the project sketchbook and manufacturing pack.</p>
    </div>

    <div class="jm-flipbook-section">
      <div v-for="book in books" :key="book.id" class="jm-flipbook-block">
        <div class="jm-flipbook-header">
          <div>
            <div class="jm-flipbook-title">{{ book.title }}</div>
            <div class="jm-flipbook-desc">{{ book.desc }}</div>
          </div>
          <a :href="book.driveUrl" target="_blank" class="jm-open-link">
            Open in Drive <q-icon name="open_in_new" size="14px" />
          </a>
        </div>
        <div class="jm-embed-wrap">
          <iframe
            :src="`https://drive.google.com/file/d/${book.id}/preview`"
            class="jm-embed"
            allow="autoplay"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const books = [
  {
    id: '1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39',
    title: 'Design Sketchbook',
    desc: 'Full design process — research, ideation, development and final design.',
    driveUrl: 'https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view'
  },
  {
    id: '1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj',
    title: 'Manufacturing Pack',
    desc: 'Component orthographics, renders, and full manufacturing specification.',
    driveUrl: 'https://drive.google.com/file/d/1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj/view'
  }
]
</script>

<style scoped>
.jm-page { background: #f2f2f2; color: #333233; min-height: 100vh; }

.jm-page-header {
  background: #ffffff;
  padding: 32px 48px 28px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 6px;
}
.jm-page-title {
  font-size: 28px; font-weight: 700; color: #333233;
  margin: 0 0 6px; letter-spacing: -0.01em;
}
.jm-page-sub { font-size: 15px; color: #7c7c7c; margin: 0; }

.jm-flipbook-section {
  padding: 32px 48px 64px;
  display: flex; flex-direction: column; gap: 48px;
}

.jm-flipbook-block {
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  overflow: hidden;
}

.jm-flipbook-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 22px 24px 18px;
  border-bottom: 1px solid #ebebeb;
}
.jm-flipbook-title {
  font-size: 20px; font-weight: 700; color: #333233; margin-bottom: 4px;
}
.jm-flipbook-desc { font-size: 14px; color: #7c7c7c; }
.jm-open-link {
  font-size: 13px; font-weight: 600; color: #32a9b1;
  text-decoration: none; white-space: nowrap; margin-left: 16px;
  display: flex; align-items: center; gap: 4px; padding-top: 4px;
}
.jm-open-link:hover { color: #248d94; }

.jm-embed-wrap { width: 100%; background: #1a1a1a; }
.jm-embed {
  display: block;
  width: 100%;
  height: 80vh;
  min-height: 500px;
  border: none;
}

@media (max-width: 600px) {
  .jm-flipbook-section { padding: 20px 16px 40px; }
  .jm-page-header { padding: 24px 20px 20px; }
  .jm-embed { height: 60vh; }
}
</style>
