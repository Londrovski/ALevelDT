<template>
  <q-page class="jm-photos-page">

    <div class="jm-page-header">
      <div class="jm-page-eyebrow">Build Progression</div>
      <h1 class="jm-page-title">Pictures</h1>
      <div class="jm-filter-row">
        <button
          v-for="tag in allTags" :key="tag"
          class="jm-chip" :class="{ 'jm-chip--active': activeTag === tag }"
          @click="setTag(tag)"
        >{{ tag }}</button>
      </div>
    </div>

    <!-- Split layout: filmstrip left, large preview right -->
    <div class="jm-viewer">

      <!-- Left: scrollable filmstrip -->
      <div class="jm-filmstrip" ref="filmstripEl">
        <div
          v-for="(photo, i) in filtered" :key="photo.src"
          class="jm-thumb"
          :class="{ 'jm-thumb--active': selected === photo }"
          @click="selected = photo"
        >
          <img :src="photo.src" :alt="photo.label" class="jm-thumb-img" loading="lazy" />
          <div class="jm-thumb-label">{{ photo.label }}</div>
          <div class="jm-thumb-tag">{{ photo.tag }}</div>
        </div>
      </div>

      <!-- Right: large preview -->
      <div class="jm-preview" v-if="selected">
        <div class="jm-preview-img-wrap">
          <img :src="selected.src" :alt="selected.label" class="jm-preview-img" />
        </div>
        <div class="jm-preview-info">
          <div class="jm-preview-label">{{ selected.label }}</div>
          <span class="jm-preview-tag">{{ selected.tag }}</span>
          <div class="jm-preview-nav">
            <button class="jm-nav-btn" @click="prevPhoto" :disabled="filteredIndex === 0">
              <q-icon name="chevron_left" size="20px" /> Prev
            </button>
            <span class="jm-nav-count">{{ filteredIndex + 1 }} / {{ filtered.length }}</span>
            <button class="jm-nav-btn" @click="nextPhoto" :disabled="filteredIndex === filtered.length - 1">
              Next <q-icon name="chevron_right" size="20px" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div class="jm-preview jm-preview--empty" v-else>
        <q-icon name="photo_library" size="56px" color="grey-4" />
        <div class="jm-empty-text">Select a photo from the filmstrip</div>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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

const selected = ref(photos[0])
const filteredIndex = computed(() => filtered.value.indexOf(selected.value))

function setTag (tag) {
  activeTag.value = activeTag.value === tag ? null : tag
  // Auto-select first of filtered set
  selected.value = filtered.value[0] || null
}

function nextPhoto () {
  const i = filteredIndex.value
  if (i < filtered.value.length - 1) selected.value = filtered.value[i + 1]
}
function prevPhoto () {
  const i = filteredIndex.value
  if (i > 0) selected.value = filtered.value[i - 1]
}

// Keyboard nav
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextPhoto()
    if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  prevPhoto()
  })
}
</script>

<style scoped>
.jm-photos-page {
  background: #f2f2f2;
  min-height: 100vh;
  color: #333233;
  display: flex;
  flex-direction: column;
}

/* Header */
.jm-page-header {
  background: #ffffff;
  padding: 28px 48px 20px;
  border-bottom: 1px solid #d8d8d8;
  flex-shrink: 0;
}
.jm-page-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 4px;
}
.jm-page-title { font-size: 26px; font-weight: 700; color: #333233; margin: 0 0 16px; }

/* Filter chips */
.jm-filter-row { display: flex; flex-wrap: wrap; gap: 8px; }
.jm-chip {
  padding: 5px 14px; border-radius: 999px;
  border: 1.5px solid #b2b2b2; background: transparent;
  color: #555455; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.15s;
}
.jm-chip:hover { border-color: #32a9b1; color: #32a9b1; }
.jm-chip--active { background: #32a9b1 !important; border-color: #32a9b1 !important; color: #fff !important; }

/* ── MAIN VIEWER — filmstrip + preview ── */
.jm-viewer {
  flex: 1;
  display: flex;
  min-height: 0;
  height: calc(100vh - 160px);
}

/* Filmstrip — left column, scrollable */
.jm-filmstrip {
  width: 240px;
  flex-shrink: 0;
  overflow-y: auto;
  background: #1e1e1e;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  scrollbar-width: thin;
  scrollbar-color: #32a9b1 #1e1e1e;
}
.jm-filmstrip::-webkit-scrollbar { width: 4px; }
.jm-filmstrip::-webkit-scrollbar-track { background: #1e1e1e; }
.jm-filmstrip::-webkit-scrollbar-thumb { background: #32a9b1; border-radius: 2px; }

.jm-thumb {
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.15s, transform 0.1s;
  background: #2a2a2a;
  flex-shrink: 0;
}
.jm-thumb:hover { border-color: rgba(50,169,177,0.5); transform: translateX(2px); }
.jm-thumb--active { border-color: #32a9b1 !important; }

.jm-thumb-img {
  width: 100%; height: 110px;
  object-fit: cover; display: block;
}
.jm-thumb-label {
  font-size: 11px; font-weight: 600; color: #e8e8e8;
  padding: 6px 8px 2px; line-height: 1.3;
}
.jm-thumb-tag {
  display: inline-block; margin: 2px 8px 7px;
  padding: 1px 7px; border-radius: 999px;
  background: rgba(50,169,177,0.25); color: #32a9b1;
  font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
}

/* Preview — right panel */
.jm-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #2c2c2c;
  overflow: hidden;
}
.jm-preview--empty {
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.jm-empty-text { color: #7c7c7c; font-size: 15px; }

.jm-preview-img-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 24px;
  min-height: 0;
}
.jm-preview-img {
  max-width: 100%; max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  transition: opacity 0.2s;
}

.jm-preview-info {
  flex-shrink: 0;
  background: #1e1e1e;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid #333;
}
.jm-preview-label { font-size: 15px; font-weight: 600; color: #ffffff; flex: 1; }
.jm-preview-tag {
  padding: 3px 10px; border-radius: 999px;
  background: rgba(50,169,177,0.2); color: #32a9b1;
  font-size: 12px; font-weight: 700;
  white-space: nowrap;
}
.jm-preview-nav {
  display: flex; align-items: center; gap: 8px; flex-shrink: 0;
}
.jm-nav-btn {
  display: flex; align-items: center; gap: 2px;
  background: none; border: 1px solid #444; border-radius: 4px;
  color: #ccc; font-size: 13px; font-weight: 500;
  padding: 4px 10px; cursor: pointer;
  transition: all 0.15s;
}
.jm-nav-btn:hover:not(:disabled) { border-color: #32a9b1; color: #32a9b1; }
.jm-nav-btn:disabled { opacity: 0.3; cursor: default; }
.jm-nav-count { font-size: 13px; color: #7c7c7c; min-width: 50px; text-align: center; }

@media (max-width: 700px) {
  .jm-viewer { flex-direction: column; height: auto; }
  .jm-filmstrip { width: 100%; height: 180px; flex-direction: row; overflow-x: auto; overflow-y: hidden; padding: 8px; gap: 6px; }
  .jm-thumb { flex-shrink: 0; width: 130px; }
  .jm-thumb-img { height: 80px; }
  .jm-preview { min-height: 60vh; }
  .jm-page-header { padding: 20px 20px 16px; }
}
</style>
