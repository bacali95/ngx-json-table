export type Settings = {
  key?: {
    headerText?: string;
    width?: string;
  };
  value?: {
    headerText?: string;
    width?: string;
  };
  options?: {
    add?: boolean,
    edit?: {
      key?: boolean,
      value?: boolean
    },
    delete?: boolean
  };
  sortable?: boolean;
  sortDirection?: SortType;
  expandAll?: boolean;
  iconPackage?: 'basic' | 'font-awesome' | 'material-design';
  icons?: Icons;
};

export type Icons = {
  notSorted?: Icon;
  sortedAsc?: Icon;
  sortedDesc?: Icon;
  expand?: Icon;
  collapse?: Icon;
  simpleChild?: Icon;
  addChild?: Icon;
  editChild?: Icon;
  confirmEditChild?: Icon;
  cancelEditChild?: Icon;
  deleteChild?: Icon;
};

export type Icon = {
  innerText?: string;
  class?: string;
  color?: string;
  html?: string;
};

export type SortType = 'asc' | 'desc';

export type IconsPackages = { [name: string]: Icons };

export const iconsPackages: IconsPackages = {
  basic: {
    notSorted: {html: '<span class="ngx-json-table-icon">&#8693;</span>'},
    sortedAsc: {html: '<span class="ngx-json-table-icon">&#10515;</span>'},
    sortedDesc: {html: '<span class="ngx-json-table-icon">&#10514;</span>'},
    expand: {html: '<span class="ngx-json-table-icon">&#8853;</span>'},
    collapse: {html: '<span class="ngx-json-table-icon">&#8854;</span>'},
    simpleChild: {html: '<span class="ngx-json-table-icon">&#62;</span>'},
    addChild: {html: '<span class="ngx-json-table-icon" style="color: green; cursor: pointer">&#8853;</span>'},
    editChild: {html: '<span class="ngx-json-table-icon" style="color: orange; cursor: pointer">&#10000;</span>'},
    confirmEditChild: {html: '<span class="ngx-json-table-icon" style="color: green; cursor: pointer">&#10162;</span>'},
    cancelEditChild: {html: '<span class="ngx-json-table-icon" style="color: indianred; cursor: pointer">&#8855;</span>'},
    deleteChild: {html: '<span class="ngx-json-table-icon" style="color: indianred; cursor: pointer">&#8861;</span>'}
  },
  'font-awesome': {
    notSorted: {class: 'fa fa-sort'},
    sortedAsc: {class: 'fa fa-sort-amount-asc'},
    sortedDesc: {class: 'fa fa-sort-amount-desc'},
    expand: {class: 'fa fa-plus-circle'},
    collapse: {class: 'fa fa-minus-circle'},
    simpleChild: {class: 'fa fa-angle-right'},
    addChild: {
      class: 'fa fa-plus-circle',
      color: 'green'
    },
    editChild: {
      class: 'fa fa-pencil',
      color: 'orange'
    },
    confirmEditChild: {
      class: 'fa fa-check-circle',
      color: 'green'
    },
    cancelEditChild: {
      class: 'fa fa-times-circle',
      color: 'indianred'
    },
    deleteChild: {
      class: 'fa fa-minus-circle',
      color: 'indianred'
    }
  },
  'material-design': {
    notSorted: {
      class: 'material-icons',
      innerText: 'swap_vert'
    },
    sortedAsc: {
      class: 'material-icons',
      innerText: 'trending_up'
    },
    sortedDesc: {
      class: 'material-icons',
      innerText: 'trending_down'
    },
    expand: {
      class: 'material-icons',
      innerText: 'control_point'
    },
    collapse: {
      class: 'material-icons',
      innerText: 'remove_circle_outline'
    },
    simpleChild: {
      class: 'material-icons',
      innerText: 'keyboard_arrow_right'
    },
    addChild: {
      class: 'material-icons',
      innerText: 'add_circle',
      color: 'green'
    },
    editChild: {
      class: 'material-icons',
      innerText: 'create',
      color: 'orange'
    },
    confirmEditChild: {
      class: 'material-icons',
      innerText: 'check_circle',
      color: 'green'
    },
    cancelEditChild: {
      class: 'material-icons',
      innerText: 'cancel',
      color: 'indianred'
    },
    deleteChild: {
      class: 'material-icons',
      innerText: 'remove_circle',
      color: 'indianred'
    }
  },
};
