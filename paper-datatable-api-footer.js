import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
class DtPaperDatatableApiFooter
  extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment">
      :host {
        display: block;
      }

      .foot {
        font-size: 12px;
        font-weight: normal;
        height: 55px;
        border-top: 1px solid;
        border-color: rgba(0, 0, 0, var(--dark-divider-opacity));
        padding: 0 14px 0 0;
        color: rgba(0, 0, 0, var(--dark-secondary-opacity));
      }

      .foot .left {
        padding: 0 0 0 14px;
      }

      .foot paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
        margin-left: 24px;
      }

      .foot .status {
        margin: 0 8px 0 32px;
      }

      .foot .size {
        width: 64px;
        text-align: right;
      }

      .size paper-dropdown-menu {
        --paper-input-container-underline: {
          display: none;
        };
        --paper-input-container-input: {
          text-align: right;
          font-size: 12px;
          font-weight: 500;
          color: var(--paper-datatable-navigation-bar-text-color, rgba(0,0,0,.54));
        };
        --paper-dropdown-menu-icon: {
          color: var(--paper-datatable-navigation-bar-text-color, rgba(0,0,0,.54));
        };
      }
    </style>
    <div class\$="layout horizontal center foot [[_computePosition(footerPosition)]]">
      <div class\$="[[footerPosition]]">
        <div class="layout horizontal end-justified center">
          <div class="layout horizontal center">
            <div>
              [[localize('rowPerPage')]]:
            </div>
            <div class="size">
              <paper-dropdown-menu no-label-float="" vertical-align="bottom">
                <paper-listbox attr-for-selected="size" on-iron-select="_newSizeIsSelected" selected="[[size]]" slot="dropdown-content">
                  <template is="dom-repeat" items="[[availableSize]]" as="size">
                    <paper-item size="[[size]]">[[size]]</paper-item>
                  </template>
                </paper-listbox>
              </paper-dropdown-menu>
            </div>
          </div>
          <div class="status">
            [[_computeCurrentSize(page, size)]]-[[_computeCurrentMaxSize(page, size, totalElements)]] [[localize('of')]]
            [[totalElements]]
          </div>
          <template is="dom-if" if="[[!_prevButtonEnabled(page)]]">
            <paper-icon-button icon="chevron-left" disabled="" on-tap="_prevPage"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[_prevButtonEnabled(page)]]">
            <paper-icon-button icon="chevron-left" on-tap="_prevPage"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[!_nextButtonEnabled(page, totalPages)]]">
            <paper-icon-button icon="chevron-right" disabled="" on-tap="_nextPage"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[_nextButtonEnabled(page, totalPages)]]">
            <paper-icon-button icon="chevron-right" on-tap="_nextPage"></paper-icon-button>
          </template>
        </div>
      </div>
    </div>
`;
  }

  static get is() {
    return 'paper-datatable-api-footer';
  }

  static get properties() {
    return {
      footerPosition: String,
      size: {
        type: Number,
        notify: true,
      },
      page: {
        type: Number,
        notify: true,
      },
      availableSize: Array,
    };
  }

  _computeCurrentSize(page, size) {
    return page * size + 1;
  }

  _computeCurrentMaxSize(page, size, totalElements) {
    const maxSize = size * (page + 1);
    return maxSize > totalElements ? totalElements : maxSize;
  }

  _nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page = this.page + 1;
    }
  }

  _prevPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    }
  }

  _nextButtonEnabled(page, totalPages) {
    return page + 1 < totalPages;
  }

  _prevButtonEnabled(page) {
    return page > 0;
  }

  _newSizeIsSelected() {
    const newSize = this.$$('paper-listbox').selected;
    if (newSize) {
      if (this.oldPage !== null && this.oldPage !== undefined) {
        this.page = 0;
      }
      this.size = newSize;
    }
  }

  _computePosition(position) {
    if (position === 'right') {
      return 'end-justified';
    }
    return '';
  }
}

customElements.define(DtPaperDatatableApiFooter.is, DtPaperDatatableApiFooter);
