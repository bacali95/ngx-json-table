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
  loadFromFile?: boolean;
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
  uploadFile?: Icon;
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
    deleteChild: {html: '<span class="ngx-json-table-icon" style="color: indianred; cursor: pointer">&#8861;</span>'},
    uploadFile: {html: `<span class="ngx-json-table-icon" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"/></svg></span>`},
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
    },
    uploadFile: {class: 'fa fa-upload'}
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
    },
    uploadFile: {
      class: 'material-icons',
      innerText: 'backup',
    }
  },
};
