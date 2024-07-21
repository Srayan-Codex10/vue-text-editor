import { Heading } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";
import { v4 as uuidv4 } from "uuid";

export default Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    // debugger;
    const id = uuidv4();
    // console.log(this);
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { id: id }),
      0,
    ];
  },
});
