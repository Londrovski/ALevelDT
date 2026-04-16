<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="jm-header">
      <q-toolbar class="jm-toolbar">
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" class="lt-md jm-icon-btn" size="md" />
        <q-toolbar-title>
          <router-link to="/" class="jm-brand">
            <img src="/images/site-logo.png" class="jm-logo" alt="JM" />
            <span class="jm-brand-name gt-sm">James Morris</span>
          </router-link>
        </q-toolbar-title>
        <div class="row q-gutter-sm gt-sm items-center">
          <q-btn flat no-caps to="/" label="Home" class="jm-nav-btn" />
          <q-btn flat no-caps to="/full-project-3d-view" label="Full Project 3D View" class="jm-nav-btn" />
          <q-btn flat no-caps label="Parts 3D View" class="jm-nav-btn" icon-right="expand_more">
            <q-menu>
              <q-list style="min-width:200px; background:#ffffff">
                <q-item clickable v-close-popup to="/control-system-3d-view"><q-item-section>Control System</q-item-section></q-item>
                <q-item clickable v-close-popup to="/power-system-3d-view"><q-item-section>Power System</q-item-section></q-item>
                <q-item clickable v-close-popup to="/passive-system-3d-view"><q-item-section>Passive System</q-item-section></q-item>
                <q-item clickable v-close-popup to="/attachments-3d-view"><q-item-section>Attachments</q-item-section></q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat no-caps to="/flipbooks" label="Sketchbook" class="jm-nav-btn" />
          <q-btn flat no-caps to="/photos" label="Pictures" class="jm-nav-btn" />
          <q-btn flat no-caps to="/videos" label="Videos" class="jm-nav-btn" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="jm-drawer">
      <div class="jm-drawer-logo q-pa-md">
        <img src="/images/site-logo.png" style="height:40px" alt="JM" />
      </div>
      <q-separator />
      <q-list>
        <q-item clickable v-ripple to="/" exact class="jm-drawer-item">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/full-project-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="view_in_ar" /></q-item-section>
          <q-item-section>Full Project 3D View</q-item-section>
        </q-item>
        <q-item-label header class="jm-drawer-header">Parts 3D View</q-item-label>
        <q-item clickable v-ripple to="/control-system-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Control System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/power-system-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="bolt" /></q-item-section>
          <q-item-section>Power System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/passive-system-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="linear_scale" /></q-item-section>
          <q-item-section>Passive System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/attachments-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="extension" /></q-item-section>
          <q-item-section>Attachments</q-item-section>
        </q-item>
        <q-item-label header class="jm-drawer-header">Documents & Media</q-item-label>
        <q-item clickable v-ripple to="/flipbooks" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Sketchbook</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/photos" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="photo_library" /></q-item-section>
          <q-item-section>Pictures</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/videos" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="play_circle" /></q-item-section>
          <q-item-section>Videos</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const leftDrawerOpen = ref(false)
function toggleLeftDrawer () { leftDrawerOpen.value = !leftDrawerOpen.value }
</script>

<style scoped>
.jm-header { background: #333233 !important; border-bottom: none !important; box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important; }
.jm-toolbar { height: 72px !important; min-height: 72px !important; padding: 0 20px !important; }
.jm-nav-btn { color: rgba(255,255,255,0.85) !important; font-size: 14px !important; font-weight: 500 !important; padding: 8px 14px !important; }
.jm-nav-btn:hover { color: #ffffff !important; background: rgba(255,255,255,0.08) !important; }
.jm-nav-btn.router-link-active { color: #32a9b1 !important; }
.jm-icon-btn { color: #ffffff !important; }
.jm-brand { display: flex; align-items: center; gap: 20px; text-decoration: none; }
.jm-logo { height: 44px; width: auto; filter: brightness(0) invert(1); }
.jm-brand-name { font-weight: 700; font-size: 35px; color: #ffffff; letter-spacing: 0.01em; }
.jm-drawer { background: #ffffff !important; border-right: 1px solid #d8d8d8 !important; }
.jm-drawer-logo { border-bottom: 1px solid #d8d8d8; }
.jm-drawer-item { color: #333233 !important; }
.jm-drawer-item.router-link-active { color: #32a9b1 !important; border-left: 3px solid #32a9b1; }
.jm-drawer-header { color: #7c7c7c !important; font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
</style>
