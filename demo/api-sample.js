import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-ajax/iron-ajax.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <iron-ajax auto="" url="data/data-page=[[page]]&amp;size=[[size]]&amp;sort=[[sortProperty]].json" on-response="_handleResponse">
  </iron-ajax>
`,

  is: 'api-sample',

  properties: {
    page: {
      type: Number,
      notify: true,
      value: 0,
    },
    size: {
      type: Number,
      notify: true,
      value: 2,
    },
    totalElements: {
      type: Number,
      notify: true,
      value: 0,
    },
    totalPages: {
      type: Number,
      notify: true,
      value: 0,
    },
    data: {
      type: Array,
      notify: true,
    },
    sortProperty: String,
  },

  _handleResponse: function(event) {
    var response = event.detail.response;
    this.data = response._embedded.data;
    this.page = response.page.number;
    this.size = response.page.size;
    this.totalElements = response.page.totalElements;
    this.totalPages = response.page.totalPages;
  }
});
