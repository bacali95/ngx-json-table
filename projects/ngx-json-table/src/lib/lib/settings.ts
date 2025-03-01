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
    add?: boolean;
    edit?: {
      key?: boolean;
      value?: boolean;
    };
    delete?: boolean;
  };
  sortable?: boolean;
  sortDirection?: SortType;
  expandAll?: boolean;
  loadFromFile?: boolean;
  iconPackage?: 'basic' | 'font-awesome' | 'material-design';
  icons?: Icons;
};

export type Icons = {
  notSorted: string;
  sortedAsc: string;
  sortedDesc: string;
  expand: string;
  collapse: string;
  simpleChild: string;
  addChild: string;
  editChild: string;
  confirmEditChild: string;
  cancelEditChild: string;
  deleteChild: string;
  uploadFile: string;
};

export type SortType = 'asc' | 'desc';

export type IconsPackages = { [name: string]: Icons };

export const iconsPackages: IconsPackages = {
  basic: {
    notSorted: '<span class="table-icon icon-not-sorted">&#8693;</span>',
    sortedAsc: '<span class="table-icon icon-sorted-asc">&#10515;</span>',
    sortedDesc: '<span class="table-icon icon-sorted-desc">&#10514;</span>',
    expand: '<span class="table-icon icon-expand">&#8853;</span>',
    collapse: '<span class="table-icon icon-collapse">&#8854;</span>',
    simpleChild: '<span class="table-icon icon-simple-child">&#62;</span>',
    addChild:
      '<span class="table-icon icon-add-child" style="color: green; cursor: pointer">&#8853;</span>',
    editChild:
      '<span class="table-icon icon-edit-child" style="color: orange; cursor: pointer">&#10000;</span>',
    confirmEditChild:
      '<span class="table-icon icon-confirm-edit-child" style="color: green; cursor: pointer">&#10162;</span>',
    cancelEditChild:
      '<span class="table-icon icon-cancel-edit-child" style="color: indianred; cursor: pointer">&#8855;</span>',
    deleteChild:
      '<span class="table-icon icon-delete-child" style="color: indianred; cursor: pointer">&#8861;</span>',
    uploadFile: `<span class="table-icon icon-upload-file" style="cursor: pointer;"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-upload" class="svg-inline--fa fa-file-upload fa-w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"/></svg></span>`,
  },
  'font-awesome': {
    notSorted: '<i class="table-icon icon-not-sorted fa fa-sort" />',
    sortedAsc: '<i class="table-icon icon-sorted-asc fa fa-sort-amount-asc" />',
    sortedDesc: '<i class="table-icon icon-sorted-desc fa fa-sort-amount-desc" />',
    expand: '<i class="table-icon icon-expand fa fa-plus-circle" />',
    collapse: '<i class="table-icon icon-collapse fa fa-minus-circle" />',
    simpleChild: '<i class="table-icon icon-simple-child fa fa-angle-right" />',
    addChild: '<i class="table-icon icon-add-child fa fa-plus-circle" style="color: green" />',
    editChild: '<i class="table-icon icon-edit-child fa fa-pencil" style="color: orange" />',
    confirmEditChild:
      '<i class="table-icon icon-confirm-edit-child fa fa-check-circle" style="color: green" />',
    cancelEditChild:
      '<i class="table-icon icon-cancel-edit-child fa fa-times-circle" style="color: indianred" />',
    deleteChild:
      '<i class="table-icon icon-delete-child fa fa-minus-circle" style="color: indianred" />',
    uploadFile: '<i class="table-icon icon-upload-file fa fa-upload" />',
  },
  'material-design': {
    notSorted: '<i class="table-icon icon-not-sorted material-icons">swap_vert</i>',
    sortedAsc: '<i class="table-icon icon-sorted-asc material-icons">trending_up</i>',
    sortedDesc: '<i class="table-icon icon-sorted-desc material-icons">trending_down</i>',
    expand: '<i class="table-icon icon-expand material-icons">control_point</i>',
    collapse: '<i class="table-icon icon-collapse material-icons">remove_circle_outline</i>',
    simpleChild: '<i class="table-icon icon-simple-child material-icons">keyboard_arrow_right</i>',
    addChild:
      '<i class="table-icon icon-add-child material-icons" style="color: green">add_circle</i>',
    editChild:
      '<i class="table-icon icon-edit-child material-icons" style="color: orange">create</i>',
    confirmEditChild:
      '<i class="table-icon icon-confirm-edit-child material-icons" style="color: green">check_circle</i>',
    cancelEditChild:
      '<i class="table-icon icon-cancel-edit-child material-icons" style="color: indianred">cancel</i>',
    deleteChild:
      '<i class="table-icon icon-delete-child material-icons" style="color: indianred">remove_circle</i>',
    uploadFile: '<i class="table-icon icon-upload-file material-icons">backup</i>',
  },
};
