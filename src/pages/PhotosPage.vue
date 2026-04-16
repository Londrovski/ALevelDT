<template>
  <q-page class="jm-photos-page">

    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Build Progression</div>
      <h1 class="jm-page-title">Pictures</h1>
      <p class="jm-page-sub">Click any photo to view full size.</p>
      <div class="jm-filter-row">
        <button
          v-for="tag in allTags" :key="tag"
          class="jm-chip" :class="{ 'jm-chip--active': activeTag === tag }"
          @click="activeTag = activeTag === tag ? null : tag"
        >{{ tag }}</button>
      </div>
    </div>

    <!-- 3-column grid — same feel as videos page -->
    <div class="jm-grid">
      <div
        v-for="(photo, i) in filtered" :key="photo.src"
        class="jm-photo-card"
        @click="openLightbox(i)"
      >
        <div class="jm-photo-thumb-wrap">
          <img :src="photo.src" :alt="photo.label" class="jm-photo-thumb" loading="lazy" />
          <div class="jm-photo-hover">
            <q-icon name="zoom_in" size="36px" color="white" />
          </div>
        </div>
        <div class="jm-photo-label">{{ photo.label }}</div>
        <div class="jm-photo-tag">{{ photo.tag }}</div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxIndex !== null" class="jm-lightbox" @click.self="lightboxIndex = null">
        <button class="jm-lb-close" @click="lightboxIndex = null">
          <q-icon name="close" size="28px" />
        </button>
        <button class="jm-lb-prev" @click="lbPrev" :disabled="lightboxIndex === 0">
          <q-icon name="chevron_left" size="40px" />
        </button>
        <div class="jm-lb-content">
          <img :src="filtered[lightboxIndex].src" :alt="filtered[lightboxIndex].label" class="jm-lb-img" />
          <div class="jm-lb-caption">
            <span class="jm-lb-label">{{ filtered[lightboxIndex].label }}</span>
            <span class="jm-lb-tag">{{ filtered[lightboxIndex].tag }}</span>
            <span class="jm-lb-count">{{ lightboxIndex + 1 }} / {{ filtered.length }}</span>
          </div>
        </div>
        <button class="jm-lb-next" @click="lbNext" :disabled="lightboxIndex === filtered.length - 1">
          <q-icon name="chevron_right" size="40px" />
        </button>
      </div>
    </Teleport>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

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

const lightboxIndex = ref(null)
function openLightbox(i) { lightboxIndex.value = i }
function lbNext() { if (lightboxIndex.value < filtered.value.length - 1) lightboxIndex.value++ }
function lbPrev() { if (lightboxIndex.value > 0) lightboxIndex.value-- }

function onKey(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'ArrowRight') lbNext()
  if (e.key === 'ArrowLeft')  lbPrev()
  if (e.key === 'Escape')     lightboxIndex.value = null
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
.jm-photos-page { background: #f2f2f2; min-height: 100vh; color: #333233; }

.jm-page-header {
  background: #ffffff;
  padding: 28px 48px 20px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 4px;
}
.jm-page-title { font-size: 26px; font-weight: 700; color: #333233; margin: 0 0 4px; }
.jm-page-sub { font-size: 13px; color: #7c7c7c; margin: 0 0 16px; }

.jm-filter-row { display: flex; flex-wrap: wrap; gap: 8px; }
.jm-chip {
  padding: 5px 14px; border-radius: 999px;
  border: 1.5px solid #b2b2b2; background: transparent;
  color: #555455; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.15s;
}
.jm-chip:hover { border-color: #32a9b1; color: #32a9b1; }
.jm-chip--active { background: #32a9b1 !important; border-color: #32a9b1 !important; color: #fff !important; }

/* 3-column grid — matches videos page rhythm */
.jm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 28px 48px 64px;
}

.jm-photo-card {
  background: #ffffff;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.15s;
}
.jm-photo-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.jm-photo-thumb-wrap {
  position: relative;
  padding-bottom: 65%;
  overflow: hidden;
  background: #e8e5e0;
}
.jm-photo-thumb {
  position: absolute;
  inset: 0; width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.jm-photo-card:hover .jm-photo-thumb { transform: scale(1.04); }

.jm-photo-hover {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(50,169,177,0.25);
  opacity: 0; transition: opacity 0.2s;
}
.jm-photo-card:hover .jm-photo-hover { opacity: 1; }

.jm-photo-label {
  padding: 10px 12px 4px;
  font-size: 13px; font-weight: 600; color: #333233;
  line-height: 1.3;
}
.jm-photo-tag {
  padding: 0 12px 10px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
  text-transform: uppercase; color: #32a9b1;
}

/* Lightbox */
.jm-lightbox {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  gap: 12px;
}
.jm-lb-content {
  max-width: 88vw; max-height: 90vh;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.jm-lb-img {
  max-width: 100%; max-height: 80vh;
  object-fit: contain; border-radius: 4px;
  box-shadow: 0 16px 64px rgba(0,0,0,0.5);
}
.jm-lb-caption {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
}
.jm-lb-label { font-size: 15px; font-weight: 600; color: #fff; }
.jm-lb-tag {
  padding: 3px 10px; border-radius: 999px;
  background: #32a9b1; color: #fff; font-size: 12px; font-weight: 700;
}
.jm-lb-count { font-size: 13px; color: #7c7c7c; }
.jm-lb-close {
  position: fixed; top: 20px; right: 24px;
  background: none; border: none; color: rgba(255,255,255,0.6);
  cursor: pointer; z-index: 10000; padding: 4px;
}
.jm-lb-close:hover { color: #fff; }
.jm-lb-prev, .jm-lb-next {
  background: none; border: none;
  color: rgba(255,255,255,0.5); cursor: pointer;
  padding: 8px; transition: color 0.15s; flex-shrink: 0;
}
.jm-lb-prev:hover:not(:disabled), .jm-lb-next:hover:not(:disabled) { color: #32a9b1; }
.jm-lb-prev:disabled, .jm-lb-next:disabled { opacity: 0.2; cursor: default; }

@media (max-width: 720px) {
  .jm-grid { grid-template-columns: repeat(2, 1fr); padding: 16px 16px 40px; }
  .jm-page-header { padding: 20px 20px 16px; }
}
@media (max-width: 480px) {
  .jm-grid { grid-template-columns: 1fr; }
}
</style>
