import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-card/paper-card.js';
import 'polymerfire/firebase-app.js';
import 'polymerfire/firebase-document.js';
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

        <firebase-app auth-domain="paper-datatable-api-ca8cd.firebaseapp.com" api-key="AIzaSyDZojHwPBzKX_62EI4nd59flJKzWwPZoqA" database-url="https://paper-datatable-api-ca8cd.firebaseio.com">
        </firebase-app>

        <firebase-document path="/fruits" data="{{data}}">
        </firebase-document>

        <paper-card heading="Data from firebase">
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
            </paper-datatable-api>
          </div>
        </paper-card>

      </div> 
    </div>
`,

  is: 'firebase-demo',

  properties: {
    data: {
      type: Array,
      value: [],
    },
  }
});
