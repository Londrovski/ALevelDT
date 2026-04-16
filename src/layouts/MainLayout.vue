<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="jm-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" class="lt-md jm-icon-btn" />
        <q-toolbar-title>
          <router-link to="/" class="jm-brand">
            <img src="/images/site-logo.png" class="jm-logo" alt="JM" />
            <span class="jm-brand-name gt-sm">James Morris</span>
          </router-link>
        </q-toolbar-title>
        <div class="row q-gutter-xs gt-sm">
          <q-btn flat no-caps to="/" label="Home" class="jm-nav-btn" />
          <q-btn flat no-caps to="/full-project-3d-view" label="Full Project" class="jm-nav-btn" />
          <q-btn flat no-caps to="/control-system-3d-view" label="Control" class="jm-nav-btn" />
          <q-btn flat no-caps to="/power-system-3d-view" label="Power" class="jm-nav-btn" />
          <q-btn flat no-caps to="/passive-system-3d-view" label="Passive" class="jm-nav-btn" />
          <q-btn flat no-caps to="/attachments-3d-view" label="Attachments" class="jm-nav-btn" />
          <q-btn flat no-caps to="/flipbooks" label="Flipbooks" class="jm-nav-btn" />
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
        <q-item-label header class="jm-drawer-header">3D Views</q-item-label>
        <q-item clickable v-ripple to="/full-project-3d-view" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="view_in_ar" /></q-item-section>
          <q-item-section>Full Project</q-item-section>
        </q-item>
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
        <q-item-label header class="jm-drawer-header">Documents</q-item-label>
        <q-item clickable v-ripple to="/flipbooks" class="jm-drawer-item">
          <q-item-section avatar><q-icon name="menu_book" /></q-item-section>
          <q-item-section>Flipbooks</q-item-section>
        </q-item>
        <q-item-label header class="jm-drawer-header">Media</q-item-label>
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
.jm-header {
  background: #ffffff !important;
  border-bottom: 1px solid #d8d8d8 !important;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07) !important;
}
.jm-nav-btn {
  color: #333233 !important;
  font-size: 13px !important;
  font-weight: 500 !important;
}
.jm-nav-btn:hover { background: rgba(50,169,177,0.08) !important; color: #32a9b1 !important; }
.jm-nav-btn.router-link-active { color: #32a9b1 !important; }
.jm-icon-btn { color: #333233 !important; }
.jm-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #333233 !important; }
.jm-logo { height: 36px; width: auto; }
.jm-brand-name { font-weight: 700; font-size: 16px; letter-spacing: 0.01em; color: #333233; }
.jm-drawer { background: #ffffff !important; border-right: 1px solid #d8d8d8 !important; }
.jm-drawer-logo { border-bottom: 1px solid #d8d8d8; }
.jm-drawer-item { color: #333233 !important; }
.jm-drawer-item.router-link-active { color: #32a9b1 !important; border-left: 3px solid #32a9b1; }
.jm-drawer-header { color: #7c7c7c !important; font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; }
</style>
