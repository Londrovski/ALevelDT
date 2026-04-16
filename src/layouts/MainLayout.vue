<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-10 text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-weight-bold">James Morris</q-toolbar-title>
        <div class="row q-gutter-md gt-sm">
          <q-btn flat no-caps to="/" label="Home" />
          <q-btn flat no-caps to="/about" label="About" />
          <q-btn flat no-caps to="/projects" label="Projects" />
          <q-btn flat no-caps to="/sketchbooks" label="Sketchbooks" />
          <q-btn flat no-caps to="/models" label="3D Models" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-10 text-white">
      <q-list>
        <q-item-label header class="text-grey-4 text-overline q-mt-md">Navigation</q-item-label>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section avatar><q-icon name="person" /></q-item-section>
          <q-item-section>About</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/projects">
          <q-item-section avatar><q-icon name="work" /></q-item-section>
          <q-item-section>Projects</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/sketchbooks">
          <q-item-section avatar><q-icon name="book" /></q-item-section>
          <q-item-section>Sketchbooks</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/models">
          <q-item-section avatar><q-icon name="view_in_ar" /></q-item-section>
          <q-item-section>3D Models</q-item-section>
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
