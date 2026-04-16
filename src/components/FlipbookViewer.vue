<template>
  <div class="jm-flipbook-wrap">
    <div class="jm-flipbook-header">
      <div>
        <div class="jm-flipbook-title">{{ title }}</div>
        <div class="jm-flipbook-desc">{{ desc }}</div>
      </div>
      <a :href="driveUrl" target="_blank" class="jm-open-link">
        Open in Drive <q-icon name="open_in_new" size="13px" />
      </a>
    </div>

    <!-- Loading -->
    <div v-if="state === 'loading'" class="jm-fb-status">
      <q-circular-progress indeterminate color="teal" size="40px" />
      <div class="jm-fb-status-text">Rendering pages… {{ loadedPages }}/{{ totalPages }}</div>
    </div>

    <!-- Error — fall back to Drive embed -->
    <div v-else-if="state === 'error'" class="jm-fb-drive">
      <div class="jm-fb-drive-note">Viewing in Google Drive preview</div>
      <iframe
        :src="`https://drive.google.com/file/d/${driveId}/preview`"
        class="jm-fb-iframe"
        allow="autoplay"
        frameborder="0"
      ></iframe>
    </div>

    <!-- Flipbook viewer -->
    <div v-else-if="state === 'ready'" class="jm-fb-stage">
      <div class="jm-fb-info">
        <span class="jm-fb-page-label">Page {{ viewPage + 1 }} of {{ pages.length }}</span>
        <span class="jm-fb-hint">Click edges to turn · Use arrows below</span>
      </div>

      <!-- Book container — two pages side by side with 3D flip -->
      <div class="jm-book-wrap" :style="{ perspective: '2000px' }">
        <div class="jm-book">
          <!-- Left page -->
          <div class="jm-page jm-page--left" @click="prevPage">
            <img v-if="pages[viewPage]" :src="pages[viewPage]" class="jm-page-img" />
            <div class="jm-page-corner jm-page-corner--left">‹</div>
          </div>
          <!-- Right page -->
          <div class="jm-page jm-page--right" @click="nextPage">
            <img v-if="pages[viewPage + 1]" :src="pages[viewPage + 1]" class="jm-page-img" />
            <div v-else class="jm-page-blank"></div>
            <div class="jm-page-corner jm-page-corner--right">›</div>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="jm-fb-controls">
        <q-btn flat icon="first_page" @click="goFirst" class="jm-fb-btn" :disable="viewPage === 0" />
        <q-btn flat icon="chevron_left" @click="prevPage" class="jm-fb-btn" :disable="viewPage === 0" />
        <q-btn flat icon="chevron_right" @click="nextPage" class="jm-fb-btn" :disable="viewPage >= pages.length - 2" />
        <q-btn flat icon="last_page" @click="goLast" class="jm-fb-btn" :disable="viewPage >= pages.length - 2" />
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
const pages       = ref([])   // base64 data URLs per page
const viewPage    = ref(0)    // always even — left page index

function loadScript(src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = res; s.onerror = rej
    document.head.appendChild(s)
  })
}

async function init() {
  try {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

    const pdf = await window.pdfjsLib.getDocument({ url: props.pdfUrl, withCredentials: false }).promise
    totalPages.value = pdf.numPages

    // Render at a good resolution — 1.8 scale gives sharp pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const vp = page.getViewport({ scale: 1.8 })
      const canvas = document.createElement('canvas')
      canvas.width = vp.width; canvas.height = vp.height
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise
      pages.value.push(canvas.toDataURL('image/jpeg', 0.82))
      loadedPages.value = i
    }
    state.value = 'ready'
  } catch (e) {
    console.warn('Flipbook PDF load failed:', e)
    state.value = 'error'
  }
}

function nextPage() {
  if (viewPage.value < pages.value.length - 2) viewPage.value += 2
}
function prevPage() {
  if (viewPage.value > 0) viewPage.value -= 2
}
function goFirst() { viewPage.value = 0 }
function goLast()  { viewPage.value = pages.value.length % 2 === 0 ? pages.value.length - 2 : pages.value.length - 1 }

function onKey(e) {
  if (e.key === 'ArrowRight') nextPage()
  if (e.key === 'ArrowLeft')  prevPage()
}
onMounted(() => { init(); window.addEventListener('keydown', onKey) })
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.jm-flipbook-wrap {
  background: #ffffff; border: 1px solid #d8d8d8; border-radius: 6px; overflow: hidden;
}
.jm-flipbook-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 20px 24px 16px; border-bottom: 1px solid #ebebeb;
}
.jm-flipbook-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-flipbook-desc  { font-size: 13px; color: #7c7c7c; }
.jm-open-link {
  font-size: 13px; font-weight: 600; color: #32a9b1; text-decoration: none;
  white-space: nowrap; margin-left: 16px; display: flex; align-items: center; gap: 4px;
}
.jm-open-link:hover { color: #248d94; }

/* Loading / status */
.jm-fb-status {
  display: flex; flex-direction: column; align-items: center;
  gap: 14px; padding: 56px 24px; background: #f9f9f9;
}
.jm-fb-status-text { font-size: 14px; color: #7c7c7c; }

/* Drive embed fallback */
.jm-fb-drive { padding: 0; }
.jm-fb-drive-note {
  font-size: 12px; color: #b2b2b2; padding: 8px 16px; background: #f9f9f9;
  border-bottom: 1px solid #ebebeb; text-align: center;
}
.jm-fb-iframe { display: block; width: 100%; height: 78vh; min-height: 500px; border: none; }

/* Flipbook stage */
.jm-fb-stage { background: #2a2a2a; padding: 20px 0 12px; }
.jm-fb-info {
  display: flex; justify-content: center; align-items: center; gap: 20px;
  margin-bottom: 16px;
}
.jm-fb-page-label { font-size: 13px; font-weight: 600; color: #ccc; }
.jm-fb-hint { font-size: 11px; color: #666; }

/* Book — two pages side by side */
.jm-book-wrap { display: flex; justify-content: center; align-items: center; }
.jm-book {
  display: flex;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
  border-radius: 2px 2px 2px 2px;
  max-width: 90vw;
}
.jm-page {
  position: relative; overflow: hidden; cursor: pointer;
  background: #fff;
  transition: transform 0.08s ease;
}
.jm-page--left {
  border-right: 2px solid #d0ccc8;
  border-radius: 3px 0 0 3px;
  box-shadow: inset -8px 0 20px rgba(0,0,0,0.08);
}
.jm-page--right {
  border-left: 1px solid #e8e4e0;
  border-radius: 0 3px 3px 0;
  box-shadow: inset 8px 0 20px rgba(0,0,0,0.05);
}
.jm-page:hover { transform: scaleX(0.985); }
.jm-page--left:hover { transform-origin: right center; }
.jm-page--right:hover { transform-origin: left center; }
.jm-page-img { display: block; width: 100%; height: auto; max-height: 75vh; object-fit: contain; }
.jm-page-blank { width: 100%; height: 75vh; background: #fafafa; }

/* Corner fold hint */
.jm-page-corner {
  position: absolute; bottom: 0; font-size: 28px; font-weight: 300;
  color: rgba(50,169,177,0.5); line-height: 1;
  transition: color 0.15s;
}
.jm-page-corner--left { left: 12px; }
.jm-page-corner--right { right: 12px; }
.jm-page:hover .jm-page-corner { color: #32a9b1; }

/* Controls */
.jm-fb-controls {
  display: flex; justify-content: center; gap: 4px; padding: 12px 0 8px;
}
.jm-fb-btn { color: #aaa !important; }
.jm-fb-btn:hover { color: #32a9b1 !important; }
</style>
