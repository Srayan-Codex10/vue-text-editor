<script>
export default {
  data() {
    return {
      selected: null,
      items: [{ message: 'Foo' }, { message: 'Bar' }],
      options: [
        { name: 'Georgia', id: 1 },
        { name: 'Roboto', id: 2 },
        { name: 'Arial', id: 3 }],
      defaultFont: 1
    }
  },
  props: [
    'editor',
    'selectedFont'
  ],
  methods: {
    setOptions() {

    },
    setValue(selectedFont) {
      let fontName = this.options.find(({ id }) => id === selectedFont).name;
      this.$props.editor.chain().focus().setFontFamily(fontName).run();
      // console.log(this.$props.editor.getAttributes('text'));
      // console.log(this.$props.editor.isActive('textStyle', { fontFamily: selectedFont }));
    },
    initFont() {
      debugger
      this.selected = this.$props.selectedFont ? this.$props.selectedFont : this.defaultFont;
      this.setValue(this.selected);
    }
  },
  mounted() {
    this.initFont();
    // console.log(this.$props.editor);
    // this.selected ,= this.options.find(({ name }) => name === this.defaultFont).id;
  },
  watch: {
    selectedFont(newFont, oldFont) {
      debugger
      if (newFont && newFont !== oldFont) {
        this.selected = newFont;
        this.setValue(newFont);
      }
    }
  }
}
</script>

<template>
  <select v-model='selected' id="fonts" @change="setValue(selected)">
    <option v-for="item in options" :value="item.id">{{ item.name }}</option>
  </select>
</template>

<style>
body {
  padding: 50px;
}

#fonts {
  width: 8em !important;
  height: 2.3em;
  border: none !important;
  padding: 6px 5px;
  border-radius: 3px;
  font-family: CURSIVE;
  background-color: rgba(221, 209, 209, 0.465);
}
</style>
