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

    <!-- Mobile: PDF.js canvas renderer (iframes don't work on iOS/Android) -->
    <div v-if="isMobile" class="jm-pdf-mobile">
      <div v-if="mobileState === 'loading'" class="jm-pdf-loading">
        <q-circular-progress indeterminate color="teal" size="36px" />
        <div class="jm-pdf-loading-text">Loading… {{ loadedPages }}/{{ totalPages }}</div>
      </div>
      <div v-else-if="mobileState === 'error'" class="jm-pdf-error">
        <q-icon name="error_outline" size="32px" color="grey-5" />
        <div>Couldn't load PDF</div>
        <a :href="r2Url || driveUrl" target="_blank" class="jm-open-btn">Open PDF</a>
      </div>
      <div v-else-if="mobileState === 'ready'" class="jm-pdf-canvas-wrap">
        <canvas ref="canvasEl" class="jm-pdf-canvas"></canvas>
        <div class="jm-pdf-nav">
          <button class="jm-nav-btn" @click="prevPage" :disabled="currentPage <= 1">
            <q-icon name="chevron_left" size="22px" />
          </button>
          <span class="jm-nav-label">{{ currentPage }} / {{ totalPages }}</span>
          <button class="jm-nav-btn" @click="nextPage" :disabled="currentPage >= totalPages">
            <q-icon name="chevron_right" size="22px" />
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop: native browser iframe (fast, full-featured) -->
    <div v-else class="jm-pdf-embed">
      <iframe :src="embedSrc" class="jm-pdf-iframe" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  driveUrl: { type: String, default: '' },
  driveId:  { type: String, default: '' },
  r2Url:    { type: String, default: '' },
  title:    { type: String, default: '' },
  desc:     { type: String, default: '' },
})

// Detect mobile — iOS/Android block iframe PDF rendering
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    || window.innerWidth <= 860
  if (isMobile.value && props.r2Url) initPdfJs()
})

// Desktop iframe
const embedSrc = computed(() =>
  props.r2Url
    ? props.r2Url + '#view=FitH&toolbar=1&navpanes=0'
    : `https://drive.google.com/file/d/${props.driveId}/preview`
)

// Mobile PDF.js
const canvasEl    = ref(null)
const mobileState = ref('loading')
const totalPages  = ref(0)
const loadedPages = ref(0)
const currentPage = ref(1)
let pdfDoc = null

function loadScript (src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = res; s.onerror = rej
    document.head.appendChild(s)
  })
}

async function initPdfJs () {
  try {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    pdfDoc = await window.pdfjsLib.getDocument({ url: props.r2Url, withCredentials: false }).promise
    totalPages.value = pdfDoc.numPages
    loadedPages.value = pdfDoc.numPages
    mobileState.value = 'ready'
    await renderPage(1)
  } catch (e) {
    console.warn('PDF.js failed:', e)
    mobileState.value = 'error'
  }
}

async function renderPage (num) {
  if (!pdfDoc || !canvasEl.value) return
  const page = await pdfDoc.getPage(num)
  const containerW = canvasEl.value.parentElement?.clientWidth || window.innerWidth - 32
  const viewport = page.getViewport({ scale: 1 })
  const scale = containerW / viewport.width
  const scaled = page.getViewport({ scale })
  const canvas = canvasEl.value
  canvas.width  = scaled.width
  canvas.height = scaled.height
  await page.render({ canvasContext: canvas.getContext('2d'), viewport: scaled }).promise
}

async function nextPage () {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    await renderPage(currentPage.value)
  }
}
async function prevPage () {
  if (currentPage.value > 1) {
    currentPage.value--
    await renderPage(currentPage.value)
  }
}

onBeforeUnmount(() => { pdfDoc = null })
</script>

<style scoped>
.jm-pdf-wrap { background: #ffffff; border: 1px solid #d8d8d8; border-radius: 6px; overflow: hidden; }
.jm-pdf-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px 16px; border-bottom: 1px solid #ebebeb; }
.jm-pdf-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-pdf-desc  { font-size: 13px; color: #7c7c7c; }
.jm-open-link { font-size: 13px; font-weight: 600; color: #32a9b1; text-decoration: none; white-space: nowrap; margin-left: 16px; display: flex; align-items: center; gap: 4px; }
.jm-open-link:hover { color: #248d94; }

/* Desktop iframe */
.jm-pdf-embed { width: 100%; }
.jm-pdf-iframe { display: block; width: 100%; height: 82vh; min-height: 600px; border: none; }

/* Mobile canvas */
.jm-pdf-mobile { width: 100%; background: #f0efed; }
.jm-pdf-loading {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 48px 16px; background: #f9f9f9;
}
.jm-pdf-loading-text { font-size: 13px; color: #7c7c7c; }
.jm-pdf-error {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 40px 16px; text-align: center; color: #7c7c7c; font-size: 14px;
}
.jm-open-btn {
  background: #32a9b1; color: #fff; padding: 8px 20px;
  border-radius: 4px; font-size: 14px; font-weight: 600; text-decoration: none;
}
.jm-pdf-canvas-wrap { width: 100%; }
.jm-pdf-canvas { display: block; width: 100%; height: auto; }
.jm-pdf-nav {
  display: flex; align-items: center; justify-content: center; gap: 16px;
  padding: 12px 0; background: #2a2a2a;
}
.jm-nav-btn {
  background: none; border: 1px solid #555; border-radius: 4px;
  color: #ccc; cursor: pointer; padding: 4px 10px;
  display: flex; align-items: center;
}
.jm-nav-btn:disabled { opacity: 0.3; cursor: default; }
.jm-nav-btn:not(:disabled):hover { border-color: #32a9b1; color: #32a9b1; }
.jm-nav-label { font-size: 13px; color: #ccc; min-width: 60px; text-align: center; }
</style>
