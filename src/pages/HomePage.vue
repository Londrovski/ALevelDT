<template>
  <q-page class="bg-grey-10 text-white">

    <!-- Slideshow -->
    <div class="slideshow-container">
      <q-carousel
        v-model="slide"
        animated
        arrows
        navigation
        infinite
        autoplay
        :autoplay-speed="4000"
        transition-prev="slide-right"
        transition-next="slide-left"
        style="height: 70vh"
        class="bg-black"
      >
        <q-carousel-slide
          v-for="(photo, index) in photos"
          :key="index"
          :name="index"
          :img-src="photo.src"
          class="column no-wrap flex-center"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h6">{{ photo.label }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- About section -->
    <div class="q-pa-xl" style="max-width: 900px; margin: 0 auto">
      <div class="text-h4 text-weight-bold q-mb-lg">About Me</div>
      <p class="text-body1 text-grey-3" style="line-height: 1.8">
        I'm James Morris, Engineering Undergraduate at The University of Bath and Small Scale
        Property Developer at Stortford Developments. When I was born my father bought this
        domain to give me a personalised website &amp; email, but also to learn website building
        and management skills. I had tinkered around with the website for a while but when I
        completed my DT A Level Major Project I finally had a good use for it. Here I've been
        able to upload digital flipbook versions of my Sketchbook and Manufacturing Pack,
        interactive 3D views of the components I designed and 3D printed, and links to videos
        I took along the way and uploaded to YouTube.
      </p>

      <q-separator color="grey-8" class="q-my-xl" />

      <div class="row q-gutter-md justify-start">
        <q-btn outline color="white" to="/full-project-3d-view" label="View 3D Models" icon="view_in_ar" size="md" />
        <q-btn outline color="white" to="/videos" label="Watch Videos" icon="play_circle" size="md" />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const slide = ref(0)

const photos = [
  { src: '/images/PXL_20211111_113805146-scaled.jpg', label: 'Early prototype — November 2021' },
  { src: '/images/PXL_20211117_125846802-scaled.jpg', label: 'Mk 1 development' },
  { src: '/images/PXL_20211122_112510934-scaled.jpg', label: 'Mk 2 development' },
  { src: '/images/PXL_20211213_155001297-scaled.jpg', label: 'Mk 3 development' },
  { src: '/images/PXL_20211217_092734307-scaled.jpg', label: 'Mk 3.2 testing' },
  { src: '/images/PXL_20220113_113743033-scaled.jpg', label: 'Mk 4 development' },
  { src: '/images/PXL_20220126_122653604-scaled.jpg', label: 'Mk 4.5 leg assembly' },
  { src: '/images/PXL_20220201_092633347-scaled.jpg', label: 'Mk 5 build' },
  { src: '/images/PXL_20220207_112308184-scaled.jpg', label: 'Mk 5.1 refinements' },
  { src: '/images/PXL_20220208_093524176-scaled.jpg', label: 'Mk 5.2 testing' },
  { src: '/images/PXL_20220209_155039849-scaled.jpg', label: 'Mk 5.3 assembly' },
  { src: '/images/PXL_20220310_113051011-scaled.jpg', label: 'Mk 5.4 refinements' },
  { src: '/images/PXL_20220324_135343336-scaled.jpg', label: 'Mk 5.4 — Circular Track & Slide' },
  { src: '/images/PXL_20220325_085842118-scaled.jpg', label: 'Final prototype — March 2022' },
]
</script>

<style scoped>
.custom-caption {
  text-align: left;
  padding: 12px 16px;
  color: white;
  background: rgba(0, 0, 0, 0.55);
}
</style>
