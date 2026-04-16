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

    <!-- Loading -->
    <div v-if="state === 'loading'" class="jm-pdf-status">
      <q-circular-progress indeterminate color="teal" size="40px" />
      <div class="jm-pdf-status-text">Loading… {{ loadedPages }}/{{ totalPages }}</div>
    </div>

    <!-- Error — Drive embed fallback -->
    <div v-else-if="state === 'error'" class="jm-pdf-drive">
      <div class="jm-pdf-drive-note">Viewing via Google Drive</div>
      <iframe :src="`https://drive.google.com/file/d/${driveId}/preview`" class="jm-pdf-iframe" allow="autoplay" frameborder="0"></iframe>
    </div>

    <!-- Spread viewer -->
    <div v-else-if="state === 'ready'" class="jm-pdf-stage">
      <div class="jm-pdf-info">
        <span class="jm-pdf-page-label">{{ spreadLabel }}</span>
        <span class="jm-pdf-hint">Use arrows to turn pages</span>
      </div>

      <!-- Spread: cover alone, then pairs -->
      <div class="jm-spread">
        <!-- Left page: blank on cover, previous even page otherwise -->
        <div class="jm-spread-page jm-spread-page--left">
          <img v-if="leftPage !== null" :src="pages[leftPage]" class="jm-spread-img" />
          <div v-else class="jm-spread-blank"></div>
        </div>
        <!-- Spine -->
        <div class="jm-spread-spine"></div>
        <!-- Right page -->
        <div class="jm-spread-page jm-spread-page--right">
          <img v-if="rightPage !== null" :src="pages[rightPage]" class="jm-spread-img" />
          <div v-else class="jm-spread-blank"></div>
        </div>
      </div>

      <!-- Controls -->
      <div class="jm-pdf-controls">
        <q-btn flat icon="first_page" @click="goFirst" class="jm-pdf-btn" :disable="spreadIndex === 0" />
        <q-btn flat icon="chevron_left" @click="prevSpread" class="jm-pdf-btn" :disable="spreadIndex === 0" />
        <q-btn flat icon="chevron_right" @click="nextSpread" class="jm-pdf-btn" :disable="spreadIndex >= maxSpread" />
        <q-btn flat icon="last_page" @click="goLast" class="jm-pdf-btn" :disable="spreadIndex >= maxSpread" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  pdfUrl:   { type: String, required: true },
  driveUrl: { type: String, default: '' },
  driveId:  { type: String, default: '' },
  title:    { type: String, default: '' },
  desc:     { type: String, default: '' },
})

const state       = ref('loading')
const totalPages  = ref(0)
const loadedPages = ref(0)
const pages       = ref([])       // data URLs per page (0-indexed)
const spreadIndex = ref(0)        // 0 = cover, 1 = spread 2-3, 2 = spread 4-5 …

// Layout:
//  spread 0 → blank | page 0  (cover alone)
//  spread 1 → page 1 | page 2
//  spread 2 → page 3 | page 4
//  ...
const leftPage  = computed(() => spreadIndex.value === 0 ? null : (spreadIndex.value - 1) * 2 + 1)
const rightPage = computed(() => {
  if (spreadIndex.value === 0) return 0
  const r = (spreadIndex.value - 1) * 2 + 2
  return r < pages.value.length ? r : null
})
const maxSpread = computed(() => Math.ceil((pages.value.length - 1) / 2))
const spreadLabel = computed(() => {
  if (spreadIndex.value === 0) return 'Cover'
  const l = leftPage.value + 1
  const r = rightPage.value !== null ? rightPage.value + 1 : null
  return r ? `Pages ${l} – ${r}` : `Page ${l}`
})

function goFirst    () { spreadIndex.value = 0 }
function goLast     () { spreadIndex.value = maxSpread.value }
function nextSpread () { if (spreadIndex.value < maxSpread.value) spreadIndex.value++ }
function prevSpread () { if (spreadIndex.value > 0) spreadIndex.value-- }

function loadScript (src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = res; s.onerror = rej
    document.head.appendChild(s)
  })
}

async function init () {
  try {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

    const pdf = await window.pdfjsLib.getDocument({ url: props.pdfUrl, withCredentials: false }).promise
    totalPages.value = pdf.numPages

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const vp = page.getViewport({ scale: 1.6 })
      const canvas = document.createElement('canvas')
      canvas.width = vp.width; canvas.height = vp.height
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
      pages.value.push(canvas.toDataURL('image/jpeg', 0.82))
      loadedPages.value = i
    }
    state.value = 'ready'
  } catch (e) {
    console.warn('PDF load failed:', e)
    state.value = 'error'
  }
}

function onKey (e) {
  if (e.key === 'ArrowRight') nextSpread()
  if (e.key === 'ArrowLeft')  prevSpread()
}
onMounted  (() => { init(); window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.jm-pdf-wrap { background: #ffffff; border: 1px solid #d8d8d8; border-radius: 6px; overflow: hidden; }
.jm-pdf-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 20px 24px 16px; border-bottom: 1px solid #ebebeb;
}
.jm-pdf-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-pdf-desc  { font-size: 13px; color: #7c7c7c; }
.jm-open-link {
  font-size: 13px; font-weight: 600; color: #32a9b1; text-decoration: none;
  white-space: nowrap; margin-left: 16px; display: flex; align-items: center; gap: 4px;
}
.jm-open-link:hover { color: #248d94; }

.jm-pdf-status { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 56px 24px; background: #f9f9f9; }
.jm-pdf-status-text { font-size: 14px; color: #7c7c7c; }

.jm-pdf-drive { padding: 0; }
.jm-pdf-drive-note { font-size: 12px; color: #b2b2b2; padding: 8px 16px; background: #f9f9f9; border-bottom: 1px solid #ebebeb; text-align: center; }
.jm-pdf-iframe { display: block; width: 100%; height: 78vh; min-height: 500px; border: none; }

/* Stage */
.jm-pdf-stage { background: #3a3a3a; padding: 20px 0 0; }
.jm-pdf-info {
  display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 16px;
}
.jm-pdf-page-label { font-size: 13px; font-weight: 600; color: #ccc; }
.jm-pdf-hint { font-size: 11px; color: #666; }

/* Spread — two pages side by side */
.jm-spread {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  max-width: 100%;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  margin: 0 32px;
}
.jm-spread-page {
  flex: 1;
  max-width: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.jm-spread-page--left {
  box-shadow: inset -4px 0 12px rgba(0,0,0,0.12);
}
.jm-spread-page--right {
  box-shadow: inset 4px 0 12px rgba(0,0,0,0.08);
}
.jm-spread-spine {
  width: 6px;
  flex-shrink: 0;
  background: linear-gradient(to right, #aaa, #ddd, #aaa);
  box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
.jm-spread-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 76vh;
  object-fit: contain;
}
.jm-spread-blank {
  width: 100%;
  height: 76vh;
  background: #f8f8f8;
}

.jm-pdf-controls {
  display: flex; justify-content: center; gap: 4px;
  padding: 14px 0 10px;
}
.jm-pdf-btn { color: #aaa !important; }
.jm-pdf-btn:hover { color: #32a9b1 !important; }
</style>
