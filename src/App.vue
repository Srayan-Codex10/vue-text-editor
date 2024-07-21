<script>
import Editor from './components/Editor.vue';
import 'remixicon/fonts/remixicon.css';

export default {
  data() {
    return {
      editorContent: ''
    }
  },
  methods: {
  },
  components: {
    Editor
  }
}
</script>

<template>
  <!-- <Select></Select> -->
  <div class="text-editor">
    <Editor v-model="editorContent"></Editor>
  </div>
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
