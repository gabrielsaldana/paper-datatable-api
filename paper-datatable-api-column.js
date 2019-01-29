/**

`paper-datatable-api-column` is a column which is used in `paper-datatable-api`.

    <paper-datatable-api-column header="Fruit" property="fruit">
      <template>
        <span>{{value}}</span>
      </template>
    </paper-datatable-api-column>

@element paper-datatable-api-column
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { templatize } from '@polymer/polymer/lib/utils/templatize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { Templatizer } from '@polymer/polymer/lib/legacy/templatizer-behavior.js';
/* global customElements */
class DtPaperDatatableApiColumn
  extends mixinBehaviors([Templatizer], PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <slot></slot>
`;
  }

  static get is() {
    return 'paper-datatable-api-column';
  }

  static get properties() {
    return {
      /**
       * The name of the header for this column.
       */
      header: String,
      /**
       * Property which will be available in data (throught paper-datatable-api).
       */
      property: String,
      /**
       * If set, these other properties will be available in data (throught paper-datatable-api).
       * Usefull to keep id of the object.
       */
      otherProperties: {
        type: Array,
        value: [],
      },
      /**
       * If true, the colum can be sort.
       */
      sortable: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, the column can be draggable.
       */
      draggableColumn: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, the column is hidden.
       */
      hidden: {
        type: Boolean,
        value: false,
      },
      /**
       * Current sort direction (asc or desc).
       */
      sortDirection: String,
      /**
       * If true, the column is currently sorted.
       */
      sorted: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, the column can be filtered.
       */
      filter: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, a date picker is displayed when the column is sorted.
       */
      date: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, the column can be hidden.
       */
      hideable: {
        type: Boolean,
        value: false,
      },
      /**
       * Position of the column in the table.
       */
      position: Number,
      activeFilter: {
        type: Boolean,
        value: false,
      },
      /**
       * If true, the column apply the --paper-datatable-api-custom-td mixin.
       */
      tdCustomStyle: {
        type: Boolean,
        value: false,
      },
      /**
       * If setted, the choices are displayed in place of the paper-input (in filter mode)
       */
      choices: Array,
    };
  }

  constructor() {
    super();
    this.instances = [];
  }

  connectedCallback() {
    if (!this.ctor) {
      const props = {
        __key__: true,
        [this.header]: true,
        [this.property]: true,
      };
      const template = this.querySelector('template');
      this.ctor = templatize(template, this, {
        instanceProps: props,
        forwardHostProp(prop, value) {
          this.instances.forEach((inst) => {
            inst.forwardHostProp(prop, value);
          });
        },
      });
    }
  }


  /**
   * Stamp the value in template (according to property).
   *
   * @property fillTemplate
   * @param {String} value The value of the property.
   */
  fillTemplate(value, otherValues) {
    const instance = new this.ctor({ value, otherValues });
    this.instances.push(instance);
    return instance;
  }
}

customElements.define(DtPaperDatatableApiColumn.is, DtPaperDatatableApiColumn);
