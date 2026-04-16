<template>
  <q-page class="q-pa-xl bg-grey-10 text-white" style="min-height: 100vh">
    <div class="text-h4 q-mb-lg">Projects</div>
    <div class="row q-gutter-md">
      <q-card v-for="p in projects" :key="p.title" class="bg-grey-9 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ p.title }}</div>
          <div class="text-grey-4 q-mt-sm">{{ p.description }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
const projects = [
  { title: 'Project One', description: 'Description placeholder' },
  { title: 'Project Two', description: 'Description placeholder' }
]
</script>
