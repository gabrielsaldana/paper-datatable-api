import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/marked-element/marked-element.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment"></style>
    <style>
      div.layout > div {
        width: 600px;
      }

      paper-card {
        width: 100%;
      }

      div > paper-card:not(:first-child) {
        margin-top: 16px;
      }

      .json {
        white-space: pre;
        font-family: monospace;
      }
    </style>

    <div class="layout horizontal center-justified">
      <div>
        <iron-ajax auto="" url="data/data.json" last-response="{{data}}"></iron-ajax>

        <paper-card heading="Edit demo">
          <div class="card-content">
            <paper-datatable-api data="[[data]]">
              <paper-datatable-api-column header="Fruit" property="fruit" other-properties="[&quot;id&quot;]">
                <template>
                  <edit-wrapper content-id="[[otherValues.id]]" on-edit-value="_handleEditValue" value="[[value]]"></edit-wrapper>
                </template>
              </paper-datatable-api-column>
            </paper-datatable-api>
          </div>
        </paper-card>

        <paper-card heading="Event">
          <div class="card-content event">
          </div>
        </paper-card>

        <paper-card heading="Data">
          <div class="card-content json">
          </div>
        </paper-card>

      </div>
    </div>
`,

  is: 'edit-demo',

  properties: {
    data: {
      type: Array,
      observer: '_dataChanged',
    },
    _markdown: String,
  },

  _handleEditValue: function(event) {
    this.$$('.event').appendChild(document.createTextNode(JSON.stringify(event.detail, null, 4)));
    this.$$('.event').appendChild(document.createElement('br'));
  },

  _dataChanged: function(data) {
    this.$$('.json').appendChild(document.createTextNode(JSON.stringify(data, null, 4)));
  }
});
Polymer({
  _template: html`
    <style include="iron-flex iron-flex-alignment"></style>

    <div class="layout horizontal center">
      <template is="dom-if" if="[[_edit]]">
        <paper-input class="flex" no-label-float="" value="{{_tmpValue}}"></paper-input>
        <paper-icon-button icon="paper-datatable-api-icons:check" value="[[value]]" on-tap="_validEdit"></paper-icon-button>
      </template>
      <template is="dom-if" if="[[!_edit]]">
        <div class="flex">
          [[value]]
        </div>
        <paper-icon-button icon="paper-datatable-api-icons:mode-edit" on-tap="_activeEdit"></paper-icon-button>
      </template>
    </div>
`,

  is: 'edit-wrapper',

  properties: {
    value: {
      type: String,
    },
    contentId: {
      type: String,
    },
    _edit: {
      type: Boolean,
      value: false,
    },
    _tmpValue: String,
  },

  _activeEdit: function() {
    this._tmpValue = this.value;
    this._edit = true;
  },

  _validEdit: function () {
    if (this._tmpValue !== this.value) {
      this.value = this._tmpValue;
      this.fire('edit-value', { value: this.value, id: this.contentId });
    }
    this._edit = false;
  }
});
