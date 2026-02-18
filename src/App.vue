<script setup lang="ts">
// import Editor from './components/Editor.vue';
import EditorViewer from './components/EditorWindow/EditorViewer.vue';
import 'remixicon/fonts/remixicon.css';

</script>

<template>
  <!-- <Select></Select> -->
  <v-app>
    <v-main>
      <EditorViewer></EditorViewer>
    </v-main>
  </v-app>>
</template>

<style>
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  scroll-margin-top: 10px;
}

.text-editor {
  height: 100vh;
  width: 100vw;
  background-color: rgba(204, 204, 204, 0.438);
  display: flex;
  justify-content: center;
  align-items: center;
  /* overflow: auto; */
}
</style>
