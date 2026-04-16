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

    <!-- Loading state -->
    <div v-if="state === 'loading'" class="jm-fb-loading">
      <q-circular-progress indeterminate color="teal" size="48px" />
      <div class="jm-fb-loading-text">Loading pages… {{ loadedPages }}/{{ totalPages }}</div>
    </div>

    <!-- Error state -->
    <div v-else-if="state === 'error'" class="jm-fb-error">
      <q-icon name="error_outline" size="40px" color="grey-5" />
      <div class="jm-fb-error-text">Couldn't load PDF directly — open in Drive instead.</div>
      <a :href="driveUrl" target="_blank" class="jm-btn-accent-sm">Open PDF in Drive</a>
    </div>

    <!-- Flipbook -->
    <div v-else-if="state === 'ready'" class="jm-fb-stage">
      <div class="jm-fb-controls jm-fb-controls--top">
        <span class="jm-fb-page-label">Page {{ currentPage }} of {{ totalPages }}</span>
      </div>
      <div class="jm-fb-book-wrap" ref="bookWrap">
        <div ref="flipbookEl" class="jm-flip-book"></div>
      </div>
      <div class="jm-fb-controls">
        <q-btn flat no-caps icon="first_page" @click="goFirst" class="jm-fb-btn" title="First page" />
        <q-btn flat no-caps icon="chevron_left" @click="goPrev" class="jm-fb-btn" title="Previous page" />
        <q-btn flat no-caps icon="chevron_right" @click="goNext" class="jm-fb-btn" title="Next page" />
        <q-btn flat no-caps icon="last_page" @click="goLast" class="jm-fb-btn" title="Last page" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  pdfUrl:   { type: String, required: true },
  driveUrl: { type: String, default: '' },
  title:    { type: String, default: '' },
  desc:     { type: String, default: '' },
})

const state        = ref('loading')   // loading | ready | error
const totalPages   = ref(0)
const loadedPages  = ref(0)
const currentPage  = ref(1)
const flipbookEl   = ref(null)
const bookWrap     = ref(null)

let pageFlip = null
let pdfDoc   = null
const canvases = []   // pre-rendered page canvases

// ── Load PDF.js from CDN ──
function loadScript (src) {
  return new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = res; s.onerror = rej
    document.head.appendChild(s)
  })
}

async function loadStPageFlip () {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js')
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js')
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/StPageFlip/2.0.7/StPageFlip.browser.js')
  // Set worker
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
}

async function renderPage (pageNum, scale) {
  const page = await pdfDoc.getPage(pageNum)
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width  = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext('2d')
  await page.render({ canvasContext: ctx, viewport }).promise
  return canvas
}

async function init () {
  try {
    await loadStPageFlip()

    // Load PDF — use CORS proxy for Google Drive
    const loadingTask = window.pdfjsLib.getDocument({
      url: props.pdfUrl,
      withCredentials: false,
    })
    pdfDoc = await loadingTask.promise
    totalPages.value = pdfDoc.numPages

    // Determine render scale based on container width
    await nextTick()
    const containerW = bookWrap.value?.clientWidth || 900
    const halfW = Math.floor(containerW / 2) - 8
    const firstPage = await pdfDoc.getPage(1)
    const naturalViewport = firstPage.getViewport({ scale: 1 })
    const scale = halfW / naturalViewport.width

    // Render all pages (chunked so UI stays responsive)
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const canvas = await renderPage(i, scale)
      canvases.push(canvas)
      loadedPages.value = i
    }

    // Mount flipbook
    await nextTick()
    mountFlipbook(canvases[0].width, canvases[0].height)
    state.value = 'ready'

  } catch (err) {
    console.error('Flipbook error:', err)
    state.value = 'error'
  }
}

function mountFlipbook (pageW, pageH) {
  const el = flipbookEl.value
  if (!el) return

  // Clear any previous instance
  el.innerHTML = ''

  // Create image elements from canvases
  canvases.forEach((canvas, i) => {
    const img = document.createElement('img')
    img.src = canvas.toDataURL('image/jpeg', 0.85)
    img.style.width = pageW + 'px'
    img.style.height = pageH + 'px'
    img.className = 'jm-flip-page'
    el.appendChild(img)
  })

  // Init StPageFlip
  const { PageFlip } = window.StPageFlip

  pageFlip = new PageFlip(el, {
    width:  pageW,
    height: pageH,
    size:   'fixed',
    minWidth:  pageW,
    maxWidth:  pageW,
    minHeight: pageH,
    maxHeight: pageH,
    showCover:    true,
    mobileScrollSupport: false,
    drawShadow:   true,
    flippingTime: 700,
    usePortrait:  false,
    startPage:    0,
    autoSize:     true,
  })

  pageFlip.loadFromHTML(el.querySelectorAll('.jm-flip-page'))

  pageFlip.on('flip', (e) => {
    currentPage.value = e.data + 1
  })
}

function goNext  () { pageFlip?.flipNext() }
function goPrev  () { pageFlip?.flipPrev() }
function goFirst () { pageFlip?.flip(0) }
function goLast  () { pageFlip?.flip(totalPages.value - 1) }

onMounted(init)
onBeforeUnmount(() => { pageFlip?.destroy?.() })
</script>

<style scoped>
.jm-flipbook-wrap {
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  overflow: hidden;
}
.jm-flipbook-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 20px 24px 16px;
  border-bottom: 1px solid #ebebeb;
}
.jm-flipbook-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-flipbook-desc  { font-size: 13px; color: #7c7c7c; }
.jm-open-link {
  font-size: 13px; font-weight: 600; color: #32a9b1;
  text-decoration: none; white-space: nowrap; margin-left: 16px;
  display: flex; align-items: center; gap: 4px; padding-top: 2px;
}
.jm-open-link:hover { color: #248d94; }

/* Loading */
.jm-fb-loading {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 16px;
  padding: 64px 24px; background: #f9f9f9;
}
.jm-fb-loading-text { font-size: 14px; color: #7c7c7c; }

/* Error */
.jm-fb-error {
  display: flex; flex-direction: column; align-items: center;
  gap: 12px; padding: 48px 24px; text-align: center;
}
.jm-fb-error-text { font-size: 14px; color: #7c7c7c; max-width: 360px; }
.jm-btn-accent-sm {
  background: #32a9b1; color: #fff; padding: 8px 18px;
  border-radius: 4px; font-size: 13px; font-weight: 600;
  text-decoration: none;
}

/* Book stage */
.jm-fb-stage { background: #e8e6e0; padding: 24px 0 12px; }
.jm-fb-controls--top {
  display: flex; justify-content: center; margin-bottom: 12px;
}
.jm-fb-page-label { font-size: 13px; color: #7c7c7c; font-weight: 500; }
.jm-fb-book-wrap {
  display: flex; justify-content: center; align-items: center;
  overflow: hidden;
}
.jm-flip-book { display: block; }
.jm-flip-page { display: block; }
.jm-fb-controls {
  display: flex; justify-content: center; align-items: center;
  gap: 4px; padding: 12px 0 4px;
}
.jm-fb-btn { color: #555450 !important; font-size: 22px !important; }
.jm-fb-btn:hover { color: #32a9b1 !important; background: rgba(50,169,177,0.08) !important; }
</style>
