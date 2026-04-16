<template>
  <q-page class="jm-photos-page">

    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Build Progression</div>
      <h1 class="jm-page-title">Pictures</h1>
      <p class="jm-page-sub">Click any photo to view full size. Filter by build stage below.</p>

      <!-- Filter chips -->
      <div class="jm-filter-row">
        <button
          v-for="tag in allTags" :key="tag"
          class="jm-chip"
          :class="{ 'jm-chip--active': activeTag === tag }"
          @click="activeTag = activeTag === tag ? null : tag"
        >{{ tag }}</button>
      </div>
    </div>

    <!-- Masonry-style gallery -->
    <div class="jm-gallery" ref="galleryEl">
      <div
        v-for="(photo, i) in filtered"
        :key="photo.src"
        class="jm-gallery-item"
        :class="`jm-gallery-item--${(i % 5) + 1}`"
        @click="openLightbox(photo)"
      >
        <img :src="photo.src" :alt="photo.label" class="jm-gallery-img" loading="lazy" />
        <div class="jm-gallery-overlay">
          <div class="jm-gallery-label">{{ photo.label }}</div>
          <div class="jm-gallery-tag">{{ photo.tag }}</div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightbox" class="jm-lightbox" @click.self="lightbox = null">
      <button class="jm-lb-close" @click="lightbox = null">
        <q-icon name="close" size="28px" />
      </button>
      <button class="jm-lb-prev" @click="lightboxPrev">
        <q-icon name="chevron_left" size="36px" />
      </button>
      <div class="jm-lb-inner">
        <img :src="lightbox.src" :alt="lightbox.label" class="jm-lb-img" />
        <div class="jm-lb-caption">
          <span class="jm-lb-label">{{ lightbox.label }}</span>
          <span class="jm-lb-tag">{{ lightbox.tag }}</span>
        </div>
      </div>
      <button class="jm-lb-next" @click="lightboxNext">
        <q-icon name="chevron_right" size="36px" />
      </button>
    </div>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const photos = [
  { src: '/images/PXL_20211111_113805146-scaled.jpg', label: 'Mk 5.2 – First Track & Slide Design', tag: 'Track & Slide' },
  { src: '/images/PXL_20211117_125846802-scaled.jpg', label: 'Mk 5.4 – Circular Track & Slide',    tag: 'Track & Slide' },
  { src: '/images/PXL_20211122_112510934-scaled.jpg', label: 'Mk 5.7 – Condensed Track & Slide',  tag: 'Track & Slide' },
  { src: '/images/PXL_20211213_155001297-scaled.jpg', label: 'Bevel Gears V1',                         tag: 'Bevel Gears'  },
  { src: '/images/PXL_20211217_092734307-scaled.jpg', label: 'Mk 5.13.2 – Double Leg Demo',       tag: 'Prototype'    },
  { src: '/images/PXL_20220113_113743033-scaled.jpg', label: 'Bevel Gears V2',                         tag: 'Bevel Gears'  },
  { src: '/images/PXL_20220126_122653604-scaled.jpg', label: 'Three-Way Bevel Gear Hub (3WBGH)',        tag: 'Bevel Gears'  },
  { src: '/images/PXL_20220201_092633347-scaled.jpg', label: '3WBGH – 2WBGH Connection',          tag: 'Bevel Gears'  },
  { src: '/images/PXL_20220207_112308184-scaled.jpg', label: 'Final Prototype Assembly',               tag: 'Final'        },
  { src: '/images/PXL_20220208_093524176-scaled.jpg', label: 'Height Difference When Lowered',         tag: 'Final'        },
  { src: '/images/PXL_20220209_155039849-scaled.jpg', label: 'Final Prototype',                        tag: 'Final'        },
  { src: '/images/PXL_20220310_113051011-scaled.jpg', label: 'Mk 5.4 Refinements',                     tag: 'Prototype'    },
  { src: '/images/PXL_20220324_135343336-scaled.jpg', label: 'Final Prototype – Complete',        tag: 'Final'        },
  { src: '/images/PXL_20220325_085842118-scaled.jpg', label: 'Final Assembly – Detail',           tag: 'Final'        },
]

const allTags = computed(() => ['All', ...new Set(photos.map(p => p.tag))])
const activeTag = ref(null)
const filtered = computed(() =>
  !activeTag.value || activeTag.value === 'All'
    ? photos
    : photos.filter(p => p.tag === activeTag.value)
)

// Lightbox
const lightbox = ref(null)
function openLightbox (photo) { lightbox.value = photo }
function lightboxPrev () {
  const arr = filtered.value
  const i = arr.indexOf(lightbox.value)
  lightbox.value = arr[(i - 1 + arr.length) % arr.length]
}
function lightboxNext () {
  const arr = filtered.value
  const i = arr.indexOf(lightbox.value)
  lightbox.value = arr[(i + 1) % arr.length]
}
// Keyboard navigation
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (!lightbox.value) return
    if (e.key === 'ArrowRight') lightboxNext()
    if (e.key === 'ArrowLeft')  lightboxPrev()
    if (e.key === 'Escape')     lightbox.value = null
  })
}
</script>

<style scoped>
.jm-photos-page { background: #f2f2f2; min-height: 100vh; color: #333233; }

/* Header */
.jm-page-header {
  background: #ffffff;
  padding: 32px 48px 24px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 6px;
}
.jm-page-title { font-size: 28px; font-weight: 700; color: #333233; margin: 0 0 4px; }
.jm-page-sub { font-size: 14px; color: #7c7c7c; margin: 0 0 20px; }

/* Filter chips */
.jm-filter-row { display: flex; flex-wrap: wrap; gap: 8px; }
.jm-chip {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1.5px solid #b2b2b2;
  background: transparent;
  color: #555455;
  font-size: 13px; font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}
.jm-chip:hover { border-color: #32a9b1; color: #32a9b1; }
.jm-chip--active { background: #32a9b1 !important; border-color: #32a9b1 !important; color: #fff !important; }

/* Gallery — CSS grid masonry-feel with varying spans */
.jm-gallery {
  padding: 28px 48px 64px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 12px;
}
.jm-gallery-item {
  position: relative; overflow: hidden; border-radius: 6px;
  cursor: pointer; background: #e0deda;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.jm-gallery-item:hover { transform: scale(1.02); box-shadow: 0 8px 28px rgba(0,0,0,0.18); z-index: 1; }

/* Varying sizes for visual rhythm */
.jm-gallery-item--1 { grid-column: span 2; grid-row: span 2; }
.jm-gallery-item--2 { grid-column: span 1; grid-row: span 1; }
.jm-gallery-item--3 { grid-column: span 1; grid-row: span 2; }
.jm-gallery-item--4 { grid-column: span 2; grid-row: span 1; }
.jm-gallery-item--5 { grid-column: span 1; grid-row: span 1; }

.jm-gallery-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.3s ease;
}
.jm-gallery-item:hover .jm-gallery-img { transform: scale(1.06); }

.jm-gallery-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 24px 14px 12px;
  background: linear-gradient(transparent, rgba(0,0,0,0.65));
  opacity: 0; transition: opacity 0.2s ease;
}
.jm-gallery-item:hover .jm-gallery-overlay { opacity: 1; }
.jm-gallery-label { font-size: 13px; font-weight: 600; color: #fff; }
.jm-gallery-tag {
  display: inline-block; margin-top: 4px;
  padding: 2px 8px; border-radius: 999px;
  background: #32a9b1; color: #fff;
  font-size: 11px; font-weight: 600;
}

/* Lightbox */
.jm-lightbox {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  gap: 16px;
}
.jm-lb-inner {
  max-width: 90vw; max-height: 90vh;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.jm-lb-img {
  max-width: 88vw; max-height: 82vh;
  object-fit: contain; border-radius: 4px;
  box-shadow: 0 16px 64px rgba(0,0,0,0.5);
}
.jm-lb-caption {
  display: flex; align-items: center; gap: 10px;
}
.jm-lb-label { font-size: 15px; font-weight: 600; color: #fff; }
.jm-lb-tag {
  padding: 3px 10px; border-radius: 999px;
  background: #32a9b1; color: #fff;
  font-size: 12px; font-weight: 600;
}
.jm-lb-close {
  position: fixed; top: 20px; right: 24px;
  background: none; border: none; color: rgba(255,255,255,0.7);
  cursor: pointer; z-index: 10000; padding: 4px;
}
.jm-lb-close:hover { color: #fff; }
.jm-lb-prev, .jm-lb-next {
  background: none; border: none;
  color: rgba(255,255,255,0.6); cursor: pointer;
  padding: 12px; flex-shrink: 0;
  transition: color 0.15s;
}
.jm-lb-prev:hover, .jm-lb-next:hover { color: #32a9b1; }

@media (max-width: 700px) {
  .jm-gallery { grid-template-columns: repeat(2, 1fr); padding: 16px 16px 40px; }
  .jm-gallery-item--1 { grid-column: span 2; }
  .jm-gallery-item--3 { grid-column: span 1; }
  .jm-gallery-item--4 { grid-column: span 2; }
  .jm-page-header { padding: 24px 20px 20px; }
}
</style>
