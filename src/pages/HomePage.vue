<template>
  <q-page class="jm-page">

    <!-- Project intro banner -->
    <div class="jm-intro">
      <div class="jm-intro-inner">
        <div class="jm-intro-label">A Level Design Technology — Major Project</div>
        <h1 class="jm-intro-title">The Standing Desk</h1>
        <p class="jm-intro-text">
          A fully designed, prototyped and 3D-printed motorised standing desk conversion system —
          built from scratch as part of my A Level DT major project. This site documents the
          design process, component breakdowns, and build progression from first prototype
          through to the final assembly.
        </p>
        <div class="jm-intro-cta">
          <q-btn to="/full-project-3d-view" class="jm-btn-accent" label="Explore 3D Models" icon="view_in_ar" no-caps />
          <q-btn to="/flipbooks" class="jm-btn-outline" label="View Sketchbook" icon="menu_book" no-caps outline />
        </div>
      </div>
    </div>

    <!-- Slideshow -->
    <div class="jm-slideshow-wrap">
      <q-carousel
        v-model="slide" animated arrows navigation infinite autoplay :autoplay-speed="4500"
        transition-prev="slide-right" transition-next="slide-left"
        class="jm-carousel"
      >
        <q-carousel-slide
          v-for="(photo, i) in photos" :key="i" :name="i"
          :img-src="photo.src" class="jm-slide"
        >
          <div class="jm-caption">{{ photo.label }}</div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- About Me + Award photo -->
    <div class="jm-about-section">
      <div class="jm-about-inner">
        <div class="jm-about-text">
          <div class="jm-section-eyebrow">About Me</div>
          <h2 class="jm-section-title">James Morris</h2>
          <p class="jm-body">
            I achieved 4 A*s at A Level and was awarded both the Design Technology and
            Further Mathematics A Level prizes. I went on to study Mechanical Engineering
            at the University of Bath.
          </p>
          <p class="jm-body">
            This website showcases my DT A Level major project — an interactive record of
            the design and engineering process, including digital flipbook versions of my
            Sketchbook and Manufacturing Pack, interactive 3D views of the components I
            designed and 3D printed, and video footage of the prototypes in action.
          </p>
          <div class="jm-about-cta">
            <q-btn to="/videos" class="jm-btn-outline" label="Watch Build Videos" icon="play_circle" no-caps outline />
          </div>
        </div>
        <div class="jm-about-image">
          <img src="/images/james-alevel-award.jpg" alt="James Morris receiving his A Level award" class="jm-award-img" />
          <div class="jm-award-caption">Receiving the DT A Level Prize</div>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const slide = ref(0)
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
.jm-page { background: #f2f2f2; color: #333233; }

/* Intro banner */
.jm-intro {
  background: #ffffff;
  border-bottom: 1px solid #d8d8d8;
  padding: 48px 32px 52px;
}
.jm-intro-inner { max-width: 760px; margin: 0 auto; }
.jm-intro-label {
  font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 12px;
}
.jm-intro-title {
  font-size: 40px; font-weight: 800; color: #333233;
  margin: 0 0 16px; letter-spacing: -0.02em; line-height: 1.1;
}
.jm-intro-text {
  font-size: 17px; line-height: 1.7; color: #555455;
  margin-bottom: 28px; max-width: 640px;
}
.jm-intro-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.jm-btn-accent {
  background: #32a9b1 !important; color: #fff !important;
  font-weight: 600 !important; padding: 10px 20px !important;
  border-radius: 4px !important;
}
.jm-btn-accent:hover { background: #248d94 !important; }
.jm-btn-outline {
  color: #32a9b1 !important; border-color: #32a9b1 !important;
  font-weight: 600 !important; padding: 10px 20px !important;
  border-radius: 4px !important;
}

/* Slideshow */
.jm-slideshow-wrap { border-bottom: 1px solid #d8d8d8; }
.jm-carousel { height: 65vh; min-height: 360px; background: #1a1a1a; }
.jm-slide { background-size: cover; background-position: center; }
.jm-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 10px 20px;
  background: rgba(0,0,0,0.5);
  color: #fff; font-size: 15px; font-weight: 500;
}

/* About section */
.jm-about-section {
  background: #ffffff;
  border-top: 1px solid #d8d8d8;
  padding: 56px 32px 64px;
}
.jm-about-inner {
  max-width: 960px; margin: 0 auto;
  display: flex; gap: 56px; align-items: flex-start;
}
.jm-about-text { flex: 1; min-width: 0; }
.jm-section-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 8px;
}
.jm-section-title {
  font-size: 28px; font-weight: 700; color: #333233;
  margin: 0 0 20px; letter-spacing: -0.01em;
}
.jm-body {
  font-size: 16px; line-height: 1.75; color: #555455; margin-bottom: 16px;
}
.jm-about-cta { margin-top: 28px; }
.jm-about-image { flex-shrink: 0; width: 280px; text-align: center; }
.jm-award-img {
  width: 100%; border-radius: 6px;
  border: 1px solid #d8d8d8;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.jm-award-caption {
  font-size: 13px; color: #7c7c7c; margin-top: 10px; font-style: italic;
}

/* Responsive — stack on mobile */
@media (max-width: 700px) {
  .jm-about-inner { flex-direction: column-reverse; gap: 32px; }
  .jm-about-image { width: 100%; max-width: 320px; margin: 0 auto; }
  .jm-intro-title { font-size: 28px; }
}
</style>
