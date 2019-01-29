import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icon/iron-icon.js';
import './api-sample.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';


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

      paper-input iron-icon {
        color: var(--paper-grey-600);
      }
    </style>

    <div class="layout horizontal center-justified">
      <div>
        <api-sample data="{{dataFromApi}}" page="{{page}}" size="{{size}}" sort-property="[[sortProperty]]" total-elements="{{totalElements}}" total-pages="{{totalPages}}">
        </api-sample>

        <paper-card heading="Sortable, paginable, filterable, draggable (fruit and color), with toggle column">

          <div class="horizontal end-justified center layout">
            <paper-input no-label-float="" label="Search">
              <iron-icon icon="paper-datatable-api-icons:search" prefix=""></iron-icon>
            </paper-input>
            <paper-menu-button ignore-select="" horizontal-align="right">
              <paper-icon-button icon="paper-datatable-api-icons:menu" class="dropdown-trigger"></paper-icon-button>
              <paper-listbox class="dropdown-content">
                <template is="dom-repeat" items="[[toggleColumns]]" as="column" index-as="index">
                  <paper-icon-item column-property="[[column.property]]" on-tap="_hideColumn">
                    <template is="dom-if" if="[[!column.hidden]]">
                      <iron-icon icon="paper-datatable-api-icons:visibility-off" item-icon=""></iron-icon>
                    </template>
                    <template is="dom-if" if="[[column.hidden]]">
                      <iron-icon disabled="" icon="paper-datatable-api-icons:visibility" item-icon=""></iron-icon>
                    </template>
                    [[column.header]]
                  </paper-icon-item>
                </template>
              </paper-listbox>
            </paper-menu-button>
          </div>

          <div class="card-content">
            <paper-datatable-api paginate="" selectable="" filters="" data="[[dataFromApi]]" page="{{page}}" size="{{size}}" available-size="[2, 4]" toggle-columns="{{toggleColumns}}" on-sort="_handleSort" on-filter="_handleFilter" selected-rows="{{selectedRows}}" on-selection-changed="_handleSelectionChanged" total-elements="[[totalElements]]" total-pages="[[totalPages]]" selectable-data-key="fruit">
              <paper-datatable-api-column header="Fruit" property="fruit" filter="" choices="[{&quot;key&quot;: &quot;banana&quot;,&quot;label&quot;: &quot;banana&quot;},{&quot;key&quot;: &quot;apple&quot;,&quot;label&quot;: &quot;apple&quot;},{&quot;key&quot;: &quot;orange&quot;,&quot;label&quot;: &quot;orange&quot;},{&quot;key&quot;:&quot;strawberry&quot;,&quot;label&quot;: &quot;strawberry&quot;}]" sortable="" draggable-column="" hideable="">
                <template>
                  <span>[[value]]</span>
                </template>
              </paper-datatable-api-column>
              <paper-datatable-api-column header="Color" property="color" draggable-column="" filter="">
                <template>
                  <span>[[value]]</span>
                </template>
              </paper-datatable-api-column>
              <paper-datatable-api-column header="Weight" property="weight" hideable="">
                <template>
                  <span>[[value.kg]]</span>
                </template>
              </paper-datatable-api-column>
            </paper-datatable-api>
          </div>
        </paper-card>
        <paper-card id="paperCardEvent" heading="Events">
          <div class="card-content"></div>
        </paper-card>
        <paper-card id="paperCardSelectedRows" heading="Selected Rows attribute">
          <div class="card-content">
            <template is="dom-repeat" items="[[selectedRows]]" as="selectedRow">
              <div>
                Row [[selectedRow]] selected
              </div>
            </template>
          </div>
        </paper-card>
      </div>
    </div>
`,

  is: 'advanced-demo',

  properties: {
    sortProperty: {
      type: String,
    },
    selectedRows: {
      type: Array,
      value: [],
    },
  },

  ready: function() {
    // this.$$('paper-datatable-api').changeColumnOrder(['color', 'fruit', 'weight']);
  },

  _hideColumn: function(event) {
    var property = event.currentTarget.columnProperty;
    this.$$('paper-datatable-api').toggleColumn(property);
  },

  _handleSort: function(event) {
    this.sortProperty = event.detail.sort.property + ',' + event.detail.sort.direction;
  },

  _handleFilter: function(event) {
    var divLocal = document.createElement('div');
    var filter = event.detail.filter.value;
    var column = event.detail.filter.property;
    var eventRow = document.createTextNode(filter + ' is filtered on ' + column + ' column');
    dom(divLocal).appendChild(eventRow);
    dom(this.$.paperCardEvent).querySelector('.card-content').appendChild(divLocal);
  },

  _handleSelectionChanged: function(event) {
    var divLocal = document.createElement('div');
    if (event.detail.selected) {
      var eventRow = document.createTextNode('Row ' + event.detail.selected + ' selected');
      dom(divLocal).appendChild(eventRow);
      var eventData = document.createTextNode('Data : ' + JSON.stringify(event.detail.data));
      var brLocal = document.createElement('br');
      dom(divLocal).appendChild(brLocal);
      dom(divLocal).appendChild(eventData);
    } else {
      var eventRow = document.createTextNode('Row ' + event.detail.deselected + ' deselected');
      dom(divLocal).appendChild(eventRow);
    }
    dom(this.$.paperCardEvent).querySelector('.card-content').appendChild(divLocal);
  }
});
