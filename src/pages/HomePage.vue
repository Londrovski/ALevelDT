<template>
  <q-page class="jm-page">

    <!-- Project intro -->
    <div class="jm-intro">
      <div class="jm-intro-inner">
        <div class="jm-intro-text-col">
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
        <div class="jm-intro-image-col">
          <img src="/images/full-monty-render.png" alt="The Full Monty standing desk render" class="jm-intro-render" />
        </div>
      </div>
    </div>

    <!-- Slideshow -->
    <div class="jm-slideshow-wrap">
      <q-carousel
        v-model="slide" animated arrows navigation infinite :autoplay="7000"
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

    <!-- About Me + award photo -->
    <div class="jm-about-section">
      <div class="jm-about-inner">
        <div class="jm-about-text">
          <div class="jm-section-eyebrow">About Me</div>
          <h2 class="jm-section-title">James Morris</h2>
          <p class="jm-body">
            I very much enjoyed my time at Bishop's Stortford College where I studied Physics,
            Maths, Further Maths, and Design &amp; Technology. I loved giving all of my time to
            my DT Major Project which is showcased here on this website. Since achieving 4 A*s
            at A Level and receiving both the DT and Further Maths A Level Prizes at the College,
            I went on to study Mechanical Engineering at the University of Bath.
          </p>

          <div class="jm-subsection-title">My Project</div>
          <p class="jm-body">
            I looked into a way of converting a standard school desk into a standing desk, for
            benefits to both health and focus. I focused on the mechanics of a scissor leg system;
            if one pivot is stationary and the other moving, I can generate lift. The project went
            through many iterations but all with that exact principle, finding a way to get the
            second pivot to move. Thanks to the complexity of the mechanism and my digital approach,
            I now have a much greater understanding of Adobe InDesign and Fusion 360. Overall I'm
            very happy with the project as a whole; I had a blast making it and am very proud of
            what I have produced.
          </p>

          <div class="jm-subsection-title">Doing It Differently</div>
          <p class="jm-body">
            For my project however I wanted to do it a bit differently. I enjoy trying new
            technology and so bought a reMarkable 2 tablet at the tail end of lower sixth. I
            decided to do my entire project digitally, using Adobe InDesign to present it. This
            digital sketchbook gave me the flexibility to compile all my work in a logical order,
            as opposed to the classic chronological order of a sketchbook where you may have
            multiple projects going in tandem. This has definitely posed a challenge to my workflow
            but one I embraced and have enjoyed.
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

    <!-- Flipbooks inline — below about section -->
    <div class="jm-flipbooks-section">
      <div class="jm-section-eyebrow">Documents</div>
      <h2 class="jm-section-title">Sketchbook &amp; Manufacturing Pack</h2>
      <p class="jm-body jm-flip-intro">
        Digital versions of the full project sketchbook and manufacturing pack — browse them below or open in Google Drive.
      </p>
      <div class="jm-flipbook-list">
        <div v-for="book in books" :key="book.id" class="jm-flipbook-block">
          <div class="jm-flipbook-header">
            <div>
              <div class="jm-flipbook-title">{{ book.title }}</div>
              <div class="jm-flipbook-desc">{{ book.desc }}</div>
            </div>
            <a :href="book.driveUrl" target="_blank" class="jm-open-link">
              Open in Drive <q-icon name="open_in_new" size="13px" />
            </a>
          </div>
          <div class="jm-embed-wrap">
            <iframe
              :src="`https://drive.google.com/file/d/${book.id}/preview`"
              class="jm-embed" allow="autoplay" frameborder="0"
            ></iframe>
          </div>
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

const books = [
  {
    id: '1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39',
    title: 'Design Sketchbook',
    desc: 'Full design process — research, ideation, development and final design.',
    driveUrl: 'https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view'
  },
  {
    id: '1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj',
    title: 'Manufacturing Pack',
    desc: 'Component orthographics, renders, and full manufacturing specification.',
    driveUrl: 'https://drive.google.com/file/d/1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj/view'
  }
]
</script>

<style scoped>
.jm-page { background: #f2f2f2; color: #333233; }

.jm-intro { background: #ffffff; border-bottom: 1px solid #d8d8d8; padding: 48px 48px 52px; }
.jm-intro-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 48px; }
.jm-intro-text-col { flex: 1; min-width: 0; }
.jm-intro-image-col { flex-shrink: 0; width: 380px; display: flex; align-items: center; justify-content: center; }
.jm-intro-render { width: 100%; height: auto; display: block; }
.jm-intro-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #32a9b1; margin-bottom: 12px; }
.jm-intro-title { font-size: 40px; font-weight: 800; color: #333233; margin: 0 0 16px; letter-spacing: -0.02em; line-height: 1.1; }
.jm-intro-text { font-size: 17px; line-height: 1.7; color: #555455; margin-bottom: 28px; max-width: 640px; }
.jm-intro-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.jm-btn-accent { background: #32a9b1 !important; color: #fff !important; font-weight: 600 !important; padding: 10px 20px !important; border-radius: 4px !important; }
.jm-btn-accent:hover { background: #248d94 !important; }
.jm-btn-outline { color: #32a9b1 !important; border-color: #32a9b1 !important; font-weight: 600 !important; padding: 10px 20px !important; border-radius: 4px !important; }

.jm-slideshow-wrap { border-bottom: 1px solid #d8d8d8; }
.jm-carousel { height: 52vh; min-height: 360px; background: #1a1a1a; }
.jm-slide { background-size: cover; background-position: center; }
.jm-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 20px; background: rgba(0,0,0,0.5); color: #fff; font-size: 15px; font-weight: 500; }

.jm-about-section { background: #ffffff; border-top: 1px solid #d8d8d8; padding: 56px 48px 64px; }
.jm-about-inner { max-width: 980px; margin: 0 auto; display: flex; gap: 56px; align-items: flex-start; }
.jm-about-text { flex: 1; min-width: 0; }
.jm-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #32a9b1; margin-bottom: 8px; }
.jm-section-title { font-size: 28px; font-weight: 700; color: #333233; margin: 0 0 20px; letter-spacing: -0.01em; }
.jm-subsection-title { font-size: 17px; font-weight: 700; color: #333233; margin: 28px 0 10px; }
.jm-body { font-size: 15px; line-height: 1.75; color: #555455; margin-bottom: 4px; }
.jm-about-cta { margin-top: 28px; }
.jm-about-image { flex-shrink: 0; width: 260px; text-align: center; align-self: flex-start; padding-top: 120px; }
.jm-award-img { width: 100%; border-radius: 6px; border: 1px solid #d8d8d8; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.jm-award-caption { font-size: 13px; color: #7c7c7c; margin-top: 10px; font-style: italic; }

.jm-flipbooks-section { background: #f2f2f2; padding: 56px 48px 72px; }
.jm-flip-intro { max-width: 620px; margin-bottom: 32px; }
.jm-flipbook-list { display: flex; flex-direction: column; gap: 40px; max-width: 980px; }
.jm-flipbook-block { background: #ffffff; border: 1px solid #d8d8d8; border-radius: 6px; overflow: hidden; }
.jm-flipbook-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px 16px; border-bottom: 1px solid #ebebeb; }
.jm-flipbook-title { font-size: 18px; font-weight: 700; color: #333233; margin-bottom: 4px; }
.jm-flipbook-desc { font-size: 13px; color: #7c7c7c; }
.jm-open-link { font-size: 13px; font-weight: 600; color: #32a9b1; text-decoration: none; white-space: nowrap; margin-left: 16px; display: flex; align-items: center; gap: 4px; padding-top: 2px; }
.jm-open-link:hover { color: #248d94; }
.jm-embed-wrap { width: 100%; background: #1a1a1a; }
.jm-embed { display: block; width: 100%; height: 78vh; min-height: 480px; border: none; }

@media (max-width: 720px) {
  .jm-about-inner { flex-direction: column-reverse; gap: 32px; }
  .jm-about-image { width: 100%; max-width: 300px; margin: 0 auto; }
  .jm-intro-title { font-size: 28px; }
  .jm-about-section, .jm-flipbooks-section { padding: 36px 20px 48px; }
}
</style>
