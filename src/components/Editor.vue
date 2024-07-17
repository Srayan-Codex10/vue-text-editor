<template>
    <div class="container">
        <div v-if="editor" class="toolbar">
            <div class="button-group">
                <Select :editor="editor" :selectedFont="fontCheck" :header="headerCheck"></Select>
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
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';

export default {
    data() {
        return {
            fontCheck: 3,
            headerCheck: 0,
            editor: null,
            fonts: [
                { name: 'Georgia', id: 1 },
                { name: 'Roboto', id: 2 },
                { name: 'Arial', id: 3 }],
            headings: [
                { name: 'Normal', id: 0 },
                { name: 'Heading 1', id: 1 },
                { name: 'Heading 2', id: 2 },
                { name: 'Heading 3', id: 3 },
                { name: 'Heading 4', id: 4 },
                { name: 'Heading 5', id: 5 },
                { name: 'Heading 6', id: 6 },
            ]
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
        },
        changeHeadingDropdown(editor) {
            for (const header of this.headings) {
                if (header.id !== 0) {
                    if (editor.isActive('heading', { level: header.id })) {
                        this.headerCheck = header.id;
                    }
                } else if (header.id === 0) {
                    if (editor.isActive('paragraph')) {
                        this.headerCheck = header.id;
                    }
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
                FontFamily,
                Heading
            ],
            onUpdate: () => {
                this.$emit('update: modelValue', this.editor.getHTML());
            },
            onSelectionUpdate: ({ editor }) => {
                this.changeFontDropdown(editor);
                this.changeHeadingDropdown(editor);
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
    padding: 0.7em 0.1em;
    border-bottom: 1px solid gray;
    width: 100%;
    display: flex;
    box-sizing: border-box;
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