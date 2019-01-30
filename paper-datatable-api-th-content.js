import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import './paper-datatable-api-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-input/paper-input.js';
// import './node_modules/range-datepicker/range-datepicker-input.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { flush } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
/* global customElements */
class DtPaperDatatableApiThContent extends mixinBehaviors(
  [AppLocalizeBehavior],
  PolymerElement
) {
  static get template() {
    return html`
    <style include="iron-flex iron-flex-alignment"></style>

    <style>
      :host {
        display: block;
      }

      :host>div {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      paper-input {
        min-width: var(--paper-datatable-api-min-width-input-filter, 120px);
        --paper-input-container-underline-focus: {
          display: block;
        }
        ;
        --paper-input-container-label: {
          position: initial;
        }
        ;
        --paper-input-container: {
          padding: 0;
        }
        ;
        --paper-input-container-input: {
          font-size: 12px;
        }
        ;
      }

      paper-icon-button {
        --paper-icon-button-hover: {
          @apply --paper-datatable-api-header-sorted;
        }
        ;
        min-width: 36px;
        min-height: 36px;
        transition: transform .2s linear;
        @apply --paper-datatable-api-header-sorted-no-active;
      }

      paper-icon-button[sortable].filter {
        color: rgba(0, 0, 0, .26);
      }

      paper-icon-button[sortable].filter.active {
        @apply --paper-datatable-api-header-sorted;
      }

      paper-icon-button.sort {
        color: rgba(0, 0, 0, .26);
      }

      paper-icon-button[sorted].sort {
        @apply --paper-datatable-api-header-sorted;
      }

      paper-icon-button.sort:not([sorted]):not([sort-direction='desc']) {
        transform: rotate(0deg);
      }

      paper-icon-button.sort[sorted]:not([sort-direction='desc']),
      paper-icon-button.sort:not([sorted]) {
        transform: rotate(180deg);
      }

      paper-menu-button {
        padding: 0;
      }

      paper-icon-button[icon="arrow-drop-down"] {
        color: rgba(0, 0, 0, .26);
      }

      iron-icon[icon="check-box"] {
        color: var(--paper-datatable-api-checked-checkbox-color, --primary-color);
      }

      iron-icon[icon="check-box-outline-blank"] {
        color: var(--paper-datatable-api-unchecked-checkbox-color, --primary-text-color);
      }
    </style>

    <div class\$="[[_draggableClass(column.draggableColumn)]]" draggable\$="[[_isDraggable(column.draggableColumn, focused)]]">

      <template is="dom-if" if="[[equals(positionSortIcon, 'left')]]">

        <!-- Sort -->
        <template is="dom-if" if="[[column.sortable]]">
          <paper-icon-button icon="paper-datatable-api-icons:arrow-downward" sorted\$="[[sorted]]" class="sort" on-tap="_handleSort" sort-direction\$="[[sortDirection]]"></paper-icon-button>
        </template>

        <!-- Filter icon -->
        <template is="dom-if" if="[[column.filter]]">
          <template is="dom-if" if="[[column.activeFilter]]">
            <paper-icon-button icon="paper-datatable-api-icons:clear" sortable\$="[[sortable]]" class="filter active" on-tap="_handleFilter"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[!column.activeFilter]]">
            <paper-icon-button icon="paper-datatable-api-icons:search" sortable\$="[[sortable]]" class="filter" on-tap="_handleFilter"></paper-icon-button>
          </template>
        </template>

      </template>

      <!-- Header with filter active -->
      <template is="dom-if" if="[[column.activeFilter]]" on-dom-change="_handleActiveFilterChange">
        <template is="dom-if" if="[[!column.date]]" restamp="">
          <template is="dom-if" if="[[!column.choices]]" restamp="">
            <paper-input class="flex" value="{{column.activeFilterValue}}" no-label-float="" placeholder="[[column.header]]" on-keyup="_handleKeyDownInput" focused="{{focused}}"></paper-input>
          </template>
        </template>
       <!-- range picker disabled for polymer 3 compatibility
        <template is="dom-if" if="[[column.date]]" restamp="">
          <range-datepicker-input class="flex" horizontal-align="right" locale="[[language]]" date-format="[[dateFormat]]" date-from="{{_dateFrom}}" date-to="{{_dateTo}}">
            <template>
              <paper-input class="flex" focused="{{focused}}" placeholder="[[column.header]]" no-label-float="" value="[[_displayPickerDate(dateFrom, dateTo)]]" readonly=""></paper-input>
            </template>
          </range-datepicker-input>
        </template>
        -->
      </template>

      <!-- Header with filter inactive -->
      <template is="dom-if" if="[[!column.activeFilter]]">
        <div class="flex" on-tap="_handleFilter">
          <template is="dom-if" if="[[!column.choices]]" restamp="">
            [[column.header]]
          </template>

          <template is="dom-if" if="[[column.choices]]" restamp="">

            <paper-menu-button ignore-select="" dynamic-align="">
              <div slot="dropdown-trigger" class="layout horizontal center">
                <span class="flex">[[column.header]]</span>
                <paper-icon-button icon="arrow-drop-down"></paper-icon-button>
              </div>
              <paper-listbox slot="dropdown-content" selected-values="{{_selectedChoices}}" multi="" attr-for-selected="name" on-iron-select="_handleChoiceChanged" on-iron-deselect="_handleChoiceChanged">
                <template is="dom-repeat" items="[[column.choices]]" as="choice">
                  <paper-icon-item name="[[choice.key]]">
                    <iron-icon slot="item-icon" icon\$="[[_computeIconName(choice.key, _selectedChoices.*)]]"></iron-icon>
                    <paper-item-body style\$="[[choice.style]]">
                      [[choice.label]]
                    </paper-item-body>
                  </paper-icon-item>
                </template>
              </paper-listbox>
            </paper-menu-button>

          </template>
        </div>
      </template>

      <template is="dom-if" if="[[equals(positionSortIcon, 'right')]]">

        <!-- Filter icon -->
        <template is="dom-if" if="[[column.filter]]">
          <template is="dom-if" if="[[column.activeFilter]]">
            <paper-icon-button icon="paper-datatable-api-icons:clear" sortable\$="[[sortable]]" class="filter active" on-tap="_handleFilter"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[!column.activeFilter]]">
            <paper-icon-button icon="paper-datatable-api-icons:search" sortable\$="[[sortable]]" class="filter" on-tap="_handleFilter"></paper-icon-button>
          </template>
        </template>

        <!-- Sort -->
        <template is="dom-if" if="[[column.sortable]]">
          <paper-icon-button icon="paper-datatable-api-icons:arrow-downward" sorted\$="[[sorted]]" class="sort" on-tap="_handleSort" sort-direction\$="[[sortDirection]]"></paper-icon-button>
        </template>

      </template>

    </div>
`;
  }

  static get is() {
    return 'paper-datatable-api-th-content';
  }

  static get properties() {
    return {
      language: String,
      column: {
        type: Object,
        notify: true,
        value: () => ({}),
      },
      positionSortIcon: String,
      sortable: {
        type: Boolean,
        value: () => false,
      },
      sorted: {
        type: Boolean,
        value: () => false,
      },
      sortDirection: {
        type: String,
        value: () => 'asc',
      },
      previousValue: {
        type: String,
        value: () => '',
      },
      currentValue: {
        type: String,
        value: () => '',
      },
      timeoutFilter: Number,
      focused: {
        type: Boolean,
        value: false,
      },
      _dateFrom: Number,
      _dateTo: Number,
      dateFormat: String,
    };
  }

  static get observers() {
    return ['_dateChanged(_dateTo)'];
  }

  _dateChanged() {
    if (this._dateFrom && this._dateTo) {
      this.column.activeFilterValue = {
        dateFrom: this._dateFrom,
        dateTo: this._dateTo,
      };
      this.fire('date-input-change-th-content', {
        column: this.column,
        value: this.column.activeFilterValue,
      });
    }
  }

  _displayPickerDate(dateFrom, dateTo) {
    if (dateFrom && dateTo) {
      return `${dateFrom} - ${dateTo}`;
    }
    return '';
  }

  _handleSort() {
    this.fire('sort-th-content', { column: this.column });
  }

  _handleFilter() {
    if (this.column.filter) {
      if (this.column.activeFilter) {
        const paperInput = this.shadowRoot.querySelector('paper-input');
        if (paperInput) {
          paperInput.value = '';
        }
        this.previousValue = null;
      }
      this.fire('filter-th-content', { column: this.column });
    }
  }

  setPaperInputValue(value) {
    this.shadowRoot.querySelector('paper-input').value = value;
  }

  _handleChoiceChanged() {
    this.fire('input-change-th-content', { column: this.column, value: this._selectedChoices });
  }

  _handleActiveFilterChange(event) {
    const parentDiv = event.currentTarget.parentNode;
    flush();
    microTask.run(() => {
      let paperInput;
      if (!this.column.date && !this.column.choices) {
        paperInput = parentDiv.querySelector('paper-input');
        if (paperInput) {
          paperInput.setAttribute('tabindex', 1);
          paperInput.focus();
          if (this.column.activeFilterValue) {
            this.previousValue = this.column.activeFilterValue;
          }
        }
      } else if (this.column.date) {
        const datePicker = parentDiv.querySelector('range-datepicker-input');
        if (datePicker) {
          if (this.column.activeFilterValue) {
            this.previousValue = this.column.activeFilterValue;
          }
        }
      } else {
        this._selectedChoices = [];
      }
    });
  }

  _handleKeyDownInput(event) {
    const input = event.currentTarget;
    this.currentValue = input.value;
    if (this.previousValue !== this.currentValue) {
      if (event.keyCode === 13) {
        this.fire('input-change-th-content', { column: this.column, value: this.currentValue });
        this.previousValue = this.currentValue;
      } else {
        clearTimeout(this.timeoutFilter);
        this.timeoutFilter = setTimeout(() => {
          if (this.previousValue !== this.currentValue) {
            this.fire('input-change-th-content', { column: this.column, value: this.currentValue });
          }
          this.previousValue = this.currentValue;
        }, 1000);
      }
    }
  }

  equals(targetedValue, value) {
    return value === targetedValue;
  }

  _draggableClass(draggable) {
    if (draggable) {
      return 'draggable';
    }
    return '';
  }

  _isDraggable(draggableColumn, focused) {
    if (draggableColumn && !focused) {
      return 'true';
    }
    return 'false';
  }

  _computeIconName(choice, selectedChoices) {
    if (selectedChoices.base.indexOf(choice) === -1) {
      return 'check-box-outline-blank';
    }
    return 'check-box';
  }
}

customElements.define(DtPaperDatatableApiThContent.is, DtPaperDatatableApiThContent);
