<template>
  <div class="jm-pdf-wrap">
    <div class="jm-pdf-header">
      <div>
        <div class="jm-pdf-title">{{ title }}</div>
        <div class="jm-pdf-desc">{{ desc }}</div>
      </div>
      <a :href="driveUrl" target="_blank" class="jm-open-link">
        Open in Drive <q-icon name="open_in_new" size="13px" />
      </a>
    </div>
    <div class="jm-pdf-embed">
      <iframe
        :src="`https://drive.google.com/file/d/${driveId}/preview`"
        class="jm-pdf-iframe"
        allow="autoplay"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
defineProps({
  driveUrl: { type: String, default: '' },
  driveId:  { type: String, required: true },
  title:    { type: String, default: '' },
  desc:     { type: String, default: '' },
})
</script>

<style scoped>
.jm-pdf-wrap { background: #ffffff; border: 1px solid #d8d8d8; border-radius: 6px; overflow: hidden; }
.jm-pdf-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px 16px; border-bottom: 1px solid #ebebeb; }
.jm-pdf-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-pdf-desc  { font-size: 13px; color: #7c7c7c; }
.jm-open-link { font-size: 13px; font-weight: 600; color: #32a9b1; text-decoration: none; white-space: nowrap; margin-left: 16px; display: flex; align-items: center; gap: 4px; }
.jm-open-link:hover { color: #248d94; }
.jm-pdf-embed { width: 100%; }
.jm-pdf-iframe { display: block; width: 100%; height: 82vh; min-height: 600px; border: none; }
</style>
