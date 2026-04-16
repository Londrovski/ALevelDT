<template>
  <q-page class="jm-page">
    <div class="jm-slideshow">
      <q-carousel
        v-model="slide"
        animated arrows navigation infinite autoplay :autoplay-speed="4500"
        transition-prev="slide-right" transition-next="slide-left"
        class="jm-carousel"
      >
        <q-carousel-slide
          v-for="(photo, i) in photos" :key="i" :name="i"
          :img-src="photo.src"
          class="jm-slide"
        >
          <div class="jm-caption">{{ photo.label }}</div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <div class="jm-about">
      <h2 class="jm-section-title">About Me</h2>
      <p class="jm-body-text">
        I'm James Morris, Engineering Undergraduate at The University of Bath and Small Scale
        Property Developer at Stortford Developments. When I was born my father bought this
        domain to give me a personalised website &amp; email, but also to learn website building
        and management skills. I had tinkered around with the website for a while but when I
        completed my DT A Level Major Project I finally had a good use for it. Here I've been
        able to upload digital flipbook versions of my Sketchbook and Manufacturing Pack,
        interactive 3D views of the components I designed and 3D printed, and links to videos
        I took along the way and uploaded to YouTube.
      </p>
      <div class="jm-cta-row">
        <q-btn outline to="/full-project-3d-view" label="View 3D Models" icon="view_in_ar" class="jm-btn" />
        <q-btn outline to="/videos" label="Watch Videos" icon="play_circle" class="jm-btn" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const slide = ref(0)

// Exact order and labels from the original site
// Using the -e165... cropped versions that match what was shown in the slideshow
const photos = [
  { src: '/images/PXL_20220324_135343336-scaled.jpg',   label: 'Final Prototype' },
  { src: '/images/PXL_20211111_113805146-scaled.jpg',   label: 'Mk 5.2 – First Track & Slide Design' },
  { src: '/images/PXL_20211117_125846802-scaled.jpg',   label: 'Mk 5.4 – Circular Track & Slide' },
  { src: '/images/PXL_20211122_112510934-scaled.jpg',   label: 'Mk 5.7 – Condensed Track & Slide' },
  { src: '/images/PXL_20211217_092734307-scaled.jpg',   label: 'Mk 5.13.2 – Double Leg Demo' },
  { src: '/images/PXL_20211213_155001297-scaled.jpg',   label: 'Bevel Gears V1' },
  { src: '/images/PXL_20220113_113743033-scaled.jpg',   label: 'Bevel Gears V2' },
  { src: '/images/PXL_20220126_122653604-scaled.jpg',   label: 'Three-Way Bevel Gear Hub (3WBGH)' },
  { src: '/images/PXL_20220201_092633347-scaled.jpg',   label: '3WBGH – 2WBGH Connection' },
  { src: '/images/PXL_20220207_112308184-scaled.jpg',   label: 'Final Prototype Assembly' },
  { src: '/images/PXL_20220208_093524176-scaled.jpg',   label: 'Height Difference When Lowered' },
  { src: '/images/PXL_20220209_155039849-scaled.jpg',   label: 'Final Prototype' },
]
</script>

<style scoped>
.jm-page { background: #f4f2ef !important; color: #1e1e1e !important; }
.jm-carousel { height: 70vh; min-height: 380px; background: #000; }
.jm-slide { background-size: cover; background-position: center; }
.jm-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 10px 18px;
  background: rgba(0,0,0,0.52);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.jm-about {
  max-width: 860px;
  margin: 0 auto;
  padding: 48px 32px 64px;
}
.jm-section-title {
  font-size: 26px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}
.jm-body-text {
  font-size: 16px;
  line-height: 1.75;
  color: #3c3c38;
  margin-bottom: 32px;
}
.jm-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.jm-btn { color: #1e1e1e !important; border-color: #1e1e1e !important; font-weight: 500 !important; }
</style>
