<script>
export default {
  data() {
    return {
      isShow: false,
      fontFamily: null,
      anchorHeaders: [],
      selectedHeading: 0,
      items: [{ message: 'Foo' }, { message: 'Bar' }],
      options: [
        { name: 'Georgia', id: 1 },
        { name: 'Roboto', id: 2 },
        { name: 'Arial', id: 3 }],
      headers: [
        { name: 'Normal', id: 0 },
        { name: 'Heading 1', id: 1 },
        { name: 'Heading 2', id: 2 },
        { name: 'Heading 3', id: 3 },
        { name: 'Heading 4', id: 4 },
        { name: 'Heading 5', id: 5 },
        { name: 'Heading 6', id: 6 },
      ],
      defaultFont: 1,
      defaultHeading: 0
    }
  },
  props: [
    'editor',
    'selectedFont',
    'header'
  ],
  methods: {
    setHead(value) {
      if (value === 0) {
        this.$props.editor.chain().focus().setParagraph().run();
      } else {
        this.$props.editor.chain().focus().setHeading({ level: value }).run();
      }
      this.setValue(this.fontFamily);
    },
    setValue(selectedFont) {
      let fontName = this.options.find(({ id }) => id === selectedFont).name;
      this.$props.editor.chain().focus().setFontFamily(fontName).run();
    },
    initFont() {
      this.fontFamily = this.$props.selectedFont ? this.$props.selectedFont : this.defaultFont;
      this.setValue(this.fontFamily);
    },
    initHeading() {
      this.selectedHeading = this.$props.header ? this.$props.header : this.defaultHeading;
    },
    anchorSections() {
      // debugger
      this.anchorHeaders = [];
      let headers = this.$props.editor.$nodes('heading');
      headers.forEach(node => {
        this.anchorHeaders.push({
          id: node.element.id,
          name: node.textContent
        })
      })
      console.log(this.anchorHeaders);
      this.isShow = !this.isShow;
    }
  },
  mounted() {
    this.initFont();
    this.initHeading();
  },
  watch: {
    selectedFont(newFont, oldFont) {
      if (newFont && newFont !== oldFont) {
        this.fontFamily = newFont;
      }
    },
    header(newHeading, oldHeading) {
      if (newHeading !== null && newHeading !== oldHeading) {
        this.selectedHeading = newHeading;
      }
    }
  }
}
</script>

<template>
  <div class="button-wrapper">
    <select v-model='fontFamily' class="select-box" @change="setValue(fontFamily)">
      <option v-for="item in options" :value="item.id">{{ item.name }}</option>
    </select>
    <select v-model="selectedHeading" class="select-box" id="headers" @change="setHead(selectedHeading)">
      <option v-for="head in headers" :value="head.id">{{ head.name }}</option>
    </select>
    <button @click="anchorSections()">
      <i class="ri-link-m"></i>
    </button>
    <div v-if="isShow" class="header-sections">
      <div class="head-item" v-for="(head, index) in anchorHeaders" :key="index" :value="head.id">{{ head.name }}</div>
    </div>
  </div>
</template>

<style>
body {
  padding: 50px;
}

.head-item {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}

.button-wrapper {
  width: 50%;
  display: flex;
  gap: 0.5em;
  padding: 0 1.5px;
}

.select-box {
  width: 8em !important;
  height: 2.3em;
  border: none !important;
  padding: 6px 5px;
  border-radius: 3px;
  font-family: CURSIVE;
  background-color: rgba(221, 209, 209, 0.465);
  /* margin-left: 10px; */
}
</style>
