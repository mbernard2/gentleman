import { valOrDefault, isEmpty, defProp } from "zenkai";
import { BaseStructure } from "./structure.js";


export const BaseAttribute = {
    /** @type {string} */
    target: null,
    /** @type {string} */
    accept: null,
    /** @type {string} */
    object: "attribute",

    init(value) {
        const self = this;

        var concept = this.model.createConcept(this.target, {
            value: value,
            accept: this.accept,
            alias: this.alias,
            parent: this.concept.id,
            min: this.min,
            refname: this.name,
            reftype: "attribute",
            projection: this.projectionSchema,
            action: this.actionSchema,
        });

        this.value = concept;

        return this;
    },
    render() {
        this.container = null;
        if (Array.isArray(this.value)) {
            return this.value.forEach((item) => item.render());
        } else {
            return this.value.render();
        }
    },
    getValue() { return this.value.value; },

    delete() {
        if (Array.isArray(this.value)) {
            this.value.forEach((item) => item.delete());
        } else {
            this.value.delete();
        }

        return this.concept.removeAttribute(this.name);
    },

    export() {
        var output = {
            [`${this.name}`]: this.value.export()
        };

        return output;
    },
    toString() {
        return {
            [`attribute.${this.name}`]: this.value.toString()
        };
        // return {
        //     [`${this.name}@attribute`]: this.value.toString()
        // };
    }
};

export const Attribute = Object.assign(
    Object.create(BaseStructure),
    BaseAttribute
);

defProp(Attribute, 'target', { get() { return this.schema.target; } });
defProp(Attribute, 'accept', { get() { return this.schema.accept; } });
defProp(Attribute, 'min', { get() { return this.schema.min; } });
defProp(Attribute, 'projectionSchema', { get() { return this.schema.projection; } });
defProp(Attribute, 'actionSchema', { get() { return valOrDefault(this.schema.action, {}); } });