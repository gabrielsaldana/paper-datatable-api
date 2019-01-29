import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-card/paper-card.js';
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
    </style>

    <div class="layout horizontal center-justified">
      <div>
        <iron-ajax auto="" url="data/data.json" last-response="{{data}}"></iron-ajax>

        <paper-card heading="Simple demo">
          <div class="card-content">
            <paper-datatable-api data="[[data]]">
              <paper-datatable-api-column header="Fruit" property="fruit" other-properties="[&quot;color&quot;]">
                <template>
                  <span>[[value]], color: [[otherValues.color]]</span>
                </template>
              </paper-datatable-api-column>
              <paper-datatable-api-column header="Weight (kg)" property="weight">
                <template>
                  <span>[[value.kg]]</span>
                </template>
              </paper-datatable-api-column>
              <paper-datatable-api-column header="Weight (gr)" property="weight.gr">
                <template>
                  <span>[[value]]</span>
                </template>
              </paper-datatable-api-column>
              <paper-datatable-api-column header="Hidden by default" property="hiddenColumn" hideable="">
                <template>
                  <span>[[value]]</span>
                </template>
              </paper-datatable-api-column>
            </paper-datatable-api>
          </div>
        </paper-card>
      </div>
    </div>
`,

  is: 'simple-demo',

  properties: {
    data: {
      type: Array,
      observer: '_dataChanged',
    },
    alreadyHidden: {
      type: Boolean,
      value: false,
    },
  },

  _dataChanged: function() {
    if (!this.alreadyHidden) {
      this.$$('paper-datatable-api').toggleColumn(3);
      this.alreadyHidden = true;
    }
  }
});
