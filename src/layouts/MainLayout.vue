<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-10 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" class="lt-md" />
        <q-toolbar-title>
          <router-link to="/" class="text-white text-weight-bold no-decoration">
            <q-avatar square size="32px" class="q-mr-sm">
              <img src="/images/site-logo.png" />
            </q-avatar>
            James Morris
          </router-link>
        </q-toolbar-title>
        <div class="row q-gutter-sm gt-sm">
          <q-btn flat no-caps to="/" label="Home" />
          <q-btn flat no-caps to="/full-project-3d-view" label="Full Project" />
          <q-btn flat no-caps to="/control-system-3d-view" label="Control" />
          <q-btn flat no-caps to="/power-system-3d-view" label="Power" />
          <q-btn flat no-caps to="/passive-system-3d-view" label="Passive" />
          <q-btn flat no-caps to="/attachments-3d-view" label="Attachments" />
          <q-btn flat no-caps to="/videos" label="Videos" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-10 text-white">
      <q-list>
        <q-item-label header class="text-grey-4 text-overline q-mt-md">Navigation</q-item-label>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item-label header class="text-grey-5 text-overline">3D Views</q-item-label>
        <q-item clickable v-ripple to="/full-project-3d-view">
          <q-item-section avatar><q-icon name="view_in_ar" /></q-item-section>
          <q-item-section>Full Project</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/control-system-3d-view">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Control System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/power-system-3d-view">
          <q-item-section avatar><q-icon name="bolt" /></q-item-section>
          <q-item-section>Power System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/passive-system-3d-view">
          <q-item-section avatar><q-icon name="linear_scale" /></q-item-section>
          <q-item-section>Passive System</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/attachments-3d-view">
          <q-item-section avatar><q-icon name="extension" /></q-item-section>
          <q-item-section>Attachments</q-item-section>
        </q-item>
        <q-item-label header class="text-grey-5 text-overline">Media</q-item-label>
        <q-item clickable v-ripple to="/videos">
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
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.no-decoration { text-decoration: none; }
</style>
