<template>
    <div class="container">
        <div v-if="editor" class="toolbar">
            <div class="button-group">
                <Select :editor="editor" :selectedFont="fontCheck"></Select>
            </div>
        </div>
        <editor-content :editor="editor"></editor-content>
    </div>
</template>
<script>
import Select from './Select.vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';

export default {
    data() {
        return {
            fontCheck: 3,
            editor: null,
            fonts: [
                { name: 'Georgia', id: 1 },
                { name: 'Roboto', id: 2 },
                { name: 'Arial', id: 3 }]
        }
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ["update: modelValue"],
    watch: {
        modelValue(value) {
            const isUpdate = this.editor.getHTML() === value;
            if (isUpdate) {
                return;
            }
            this.editor.commands.setContent(value, false);
        }
    },
    methods: {
        changeFontDropdown(editor) {
            for (const font of this.fonts) {
                if (editor.isActive('textStyle', { fontFamily: font.name })) {
                    this.fontCheck = this.fonts.find(({ name }) => name === font.name).id;
                }
            }
        }
    },
    mounted() {
        this.editor = new Editor({
            content: '<p> <span style="font-family: \'Arial\'">Test Font</span> </p>',
            extensions: [
                Document,
                Text,
                Paragraph,
                TextStyle,
                FontFamily
            ],
            onUpdate: () => {
                this.$emit('update: modelValue', this.editor.getHTML());
            },
            onSelectionUpdate: ({ editor }) => {
                debugger
                // console.log(editor.isActive('textStyle', { fontFamily: 'Arial' }));
                this.changeFontDropdown(editor);
            }
        })
    },
    beforeUnmount() {
        this.editor.destroy();
    },
    components: {
        EditorContent,
        Select
    }
}
</script>

<style>
.container {
    width: 50%;
    height: 50%;
    border: 1px solid gray;
    /* padding: 2em; */
}

.button-group {
    padding: 0.7em;
    border-bottom: 1px solid gray;
}

.tiptap:focus {
    outline: none;
}

/* .toolbar {
    padding: 1px;
} */

.tiptap {
    padding: 0.5em;
}
</style>