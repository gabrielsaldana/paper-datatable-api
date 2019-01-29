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

        <paper-card heading="Dynamic headers demo">
          <div class="card-content">

            <paper-datatable-api data="[[data]]">

              <template is="dom-repeat" items="[[headers]]" as="header">

                <div>[[header.name]]</div>
                <paper-datatable-api-column header="[[header.name]]" property="[[header.property]]">
                  <template>
                    <span>[[value]]</span>
                  </template>
                </paper-datatable-api-column>

              </template>
            </paper-datatable-api>

          </div>
        </paper-card>
      </div>
    </div>
`,

  is: 'dynamic-headers-demo',

  properties: {
    data: Array,
    headers: {
      type: Array,
      value: [
        { name: 'Fruit', property: 'fruit' },
        { name: 'Weight', property: 'weight.kg' }
      ],
    },
  },

  attached: function() {
    this.async(() => {
      this.headers = [];
      this.async(() => {
        this.headers = [
          { name: 'Fruit', property: 'fruit' },
          { name: 'Color', property: 'color' },
        ];
      });
    }, 1000);
  }
});
