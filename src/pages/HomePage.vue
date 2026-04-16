<template>
  <q-page class="jm-page">

    <!-- ═══ HERO — full bleed render, teal banner, logo championed ═══ -->
    <div class="jm-hero">
      <img src="/images/full-monty-render.png" class="jm-hero-bg" alt="" />

      <!-- Dark vignette so text is always readable -->
      <div class="jm-hero-vignette"></div>

      <!-- Top-left logo mark — large and proud -->
      <div class="jm-hero-logo">
        <img src="/images/site-logo.png" class="jm-hero-logomark" alt="JM" />
      </div>

      <!-- Teal banner at the bottom — just like the PDF cover -->
      <div class="jm-hero-banner">
        <div class="jm-hero-banner-inner">
          <div class="jm-hero-eyebrow">A Level Design Technology — Major Project</div>
          <h1 class="jm-hero-title">The Standing Desk</h1>
          <p class="jm-hero-sub">
            A fully designed, prototyped and 3D-printed standing desk conversion system —
            designed and built as part of my A Level DT major project at Bishop's Stortford College.
          </p>
          <div class="jm-hero-btns">
            <q-btn to="/full-project-3d-view" class="jm-hero-btn-solid" no-caps label="3D Models" icon="view_in_ar" />
            <q-btn to="/flipbooks" class="jm-hero-btn-outline" no-caps label="Sketchbook" icon="menu_book" outline />
            <q-btn to="/photos" class="jm-hero-btn-outline" no-caps label="Pictures" icon="photo_library" outline />
          </div>
        </div>
        <div class="jm-hero-credit">JAMES MORRIS COLLETT</div>
      </div>
    </div>

    <!-- ═══ ABOUT ME — large photo, text alongside ═══ -->
    <div class="jm-about-section">
      <div class="jm-about-inner">
        <div class="jm-about-photo-col">
          <img src="/images/james-alevel-award.jpg" alt="James Morris" class="jm-about-photo" />
          <div class="jm-about-photo-caption">Receiving the DT A Level Prize</div>
        </div>
        <div class="jm-about-text-col">
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
            through many iterations but all with that exact principle. Thanks to the complexity of
            the mechanism and my digital approach, I now have a much greater understanding of
            Adobe InDesign and Fusion 360. Overall I'm very happy with the project as a whole;
            I had a blast making it and am very proud of what I have produced.
          </p>

          <div class="jm-subsection-title">Doing It Differently</div>
          <p class="jm-body">
            For my project I wanted to do it a bit differently. I enjoy trying new technology
            and so bought a reMarkable 2 tablet at the tail end of lower sixth. I decided to do
            my entire project digitally, using Adobe InDesign to present it. This digital
            sketchbook gave me the flexibility to compile all my work in a logical order,
            as opposed to the classic chronological order of a sketchbook. This has definitely
            posed a challenge to my workflow but one I embraced and have enjoyed.
          </p>

          <div class="jm-about-cta">
            <q-btn to="/videos" class="jm-btn-outline" label="Watch Build Videos" icon="play_circle" no-caps outline />
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ FLIPBOOKS ═══ -->
    <div class="jm-flipbooks-section">
      <div class="jm-section-eyebrow">Documents</div>
      <h2 class="jm-section-title">Sketchbook &amp; Manufacturing Pack</h2>
      <p class="jm-body jm-flip-intro">
        Browse the full project sketchbook and manufacturing pack below.
        Click the page edges or use the arrow controls to turn pages.
      </p>
      <div class="jm-flipbook-list">
        <FlipbookViewer
          title="Design Sketchbook"
          desc="Full design process — research, ideation, development and final design."
          pdfUrl="https://drive.google.com/uc?export=download&id=1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39"
          driveUrl="https://drive.google.com/file/d/1yYwP8BtXqhwKVnwMZ48AzlQJqITeAA39/view"
        />
        <FlipbookViewer
          title="Manufacturing Pack"
          desc="Component orthographics, renders, and full manufacturing specification."
          pdfUrl="/docs/manufacturing-pack.pdf"
          driveUrl="https://drive.google.com/file/d/1yUyRqo6PfEtlER3tD8t0cVe7HTv1OxFj/view"
        />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import FlipbookViewer from 'components/FlipbookViewer.vue'
</script>

<style scoped>
.jm-page { background: #f2f2f2; color: #333233; }

/* ── HERO ── */
.jm-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.jm-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 30%;
}
.jm-hero-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.15) 0%,
    rgba(0,0,0,0.0)  35%,
    rgba(0,0,0,0.35) 75%,
    rgba(0,0,0,0.55) 100%
  );
}
/* Logo mark — top-left, large, white */
.jm-hero-logo {
  position: absolute;
  top: 28px; left: 32px;
  z-index: 2;
}
.jm-hero-logomark {
  height: 72px;
  width: auto;
  filter: brightness(0) invert(1);
  opacity: 0.95;
}

/* Teal banner — exact PDF cover style */
.jm-hero-banner {
  position: relative;
  z-index: 2;
  background: #32a9b1;
  padding: 28px 48px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.jm-hero-banner-inner { flex: 1; min-width: 0; }
.jm-hero-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: rgba(255,255,255,0.75);
  margin-bottom: 6px;
}
.jm-hero-title {
  font-size: 36px; font-weight: 800; color: #ffffff;
  margin: 0 0 10px; letter-spacing: -0.02em; line-height: 1.05;
}
.jm-hero-sub {
  font-size: 15px; color: rgba(255,255,255,0.85);
  margin: 0 0 20px; max-width: 600px; line-height: 1.6;
}
.jm-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
.jm-hero-btn-solid {
  background: #ffffff !important; color: #32a9b1 !important;
  font-weight: 700 !important; border-radius: 4px !important;
  padding: 9px 20px !important;
}
.jm-hero-btn-solid:hover { background: #f0f0f0 !important; }
.jm-hero-btn-outline {
  color: #ffffff !important; border-color: rgba(255,255,255,0.7) !important;
  font-weight: 600 !important; border-radius: 4px !important;
  padding: 9px 20px !important;
}
.jm-hero-btn-outline:hover { border-color: #ffffff !important; background: rgba(255,255,255,0.1) !important; }
.jm-hero-credit {
  flex-shrink: 0;
  font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(255,255,255,0.7);
  text-align: right; white-space: nowrap;
  align-self: flex-end;
}

/* ── ABOUT ── */
.jm-about-section {
  background: #ffffff;
  padding: 72px 64px;
  border-bottom: 1px solid #d8d8d8;
}
.jm-about-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; gap: 72px; align-items: flex-start;
}
.jm-about-photo-col {
  flex-shrink: 0; width: 320px; text-align: center;
  position: sticky; top: 96px;
}
.jm-about-photo {
  width: 100%; border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  border: 1px solid #d8d8d8;
}
.jm-about-photo-caption {
  font-size: 13px; color: #7c7c7c; margin-top: 12px; font-style: italic;
}
.jm-about-text-col { flex: 1; min-width: 0; }
.jm-section-eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: #32a9b1; margin-bottom: 8px;
}
.jm-section-title {
  font-size: 32px; font-weight: 800; color: #333233;
  margin: 0 0 24px; letter-spacing: -0.02em;
}
.jm-subsection-title {
  font-size: 17px; font-weight: 700; color: #333233; margin: 28px 0 10px;
}
.jm-body { font-size: 15px; line-height: 1.8; color: #555455; margin-bottom: 4px; }
.jm-about-cta { margin-top: 32px; }
.jm-btn-outline {
  color: #32a9b1 !important; border-color: #32a9b1 !important;
  font-weight: 600 !important; border-radius: 4px !important;
}

/* ── FLIPBOOKS ── */
.jm-flipbooks-section {
  background: #f2f2f2; padding: 64px 64px 80px;
}
.jm-flip-intro { max-width: 600px; margin-bottom: 36px; }
.jm-flipbook-list {
  display: flex; flex-direction: column; gap: 40px; max-width: 1100px;
}

/* ── RESPONSIVE ── */
@media (max-width: 860px) {
  .jm-about-inner { flex-direction: column; gap: 40px; }
  .jm-about-photo-col { width: 100%; max-width: 340px; position: static; }
  .jm-about-section { padding: 40px 24px; }
  .jm-flipbooks-section { padding: 40px 20px 56px; }
  .jm-hero-banner { padding: 24px 24px; flex-direction: column; align-items: flex-start; gap: 16px; }
  .jm-hero-title { font-size: 26px; }
  .jm-hero-credit { align-self: flex-start; }
  .jm-hero-logomark { height: 52px; }
}
</style>
