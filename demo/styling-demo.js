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
	    :host {
	      display: block;

        --paper-datatable-api-table: {
          table-layout: fixed;
        }

        --paper-datatable-api-header: {
          color: var(--paper-light-blue-900);
        }

        --paper-datatable-api-checked-checkbox-color: var(--paper-green-500);

        --paper-datatable-api-tr-selected-background: #D9FFA9;

        --paper-datatable-api-tr-hover-background-color: var(--paper-yellow-100);

        --paper-datatable-api-tr-even-background-color: var(--paper-blue-grey-50);

        --paper-datatable-api-tr-odd-background-color: var(--paper-light-blue-50);
      }
     
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

        <paper-card heading="Styling demo">
          <div class="card-content">
            <paper-datatable-api data="[[data]]" selectable="">
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

  is: 'styling-demo'
});
