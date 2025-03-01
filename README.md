# Angular JSON Table

[![CI Status](https://github.com/bacali95/ngx-json-table/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bacali95/ngx-json-table/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/ngx-json-table.svg)](https://badge.fury.io/js/ngx-json-table)

ngx-json-table is a flexible Angular component designed to display and edit JSON objects as HTML tables. The library provides powerful features for data manipulation, including inline adding, editing, and deleting of JSON properties and values.

## Demo

<a target="_blank" href="https://bacali95.github.io/ngx-json-table/">Live Demo</a>

## Features

- Display JSON objects and arrays in a structured HTML table
- Inline add/edit/delete capabilities for both keys and values
- Sorting functionality with customizable direction
- Expandable/collapsible nested objects and arrays
- JSON file import functionality
- Multiple icon packages support (Basic, Font Awesome, Material Design)
- Fully customizable table styling
- Two-way data binding support
- Type-safe with TypeScript

## Installation

Install the library using npm or yarn:

```bash
# Using npm
npm install --save ngx-json-table

# Using yarn
yarn add ngx-json-table
```

## Basic Usage

1. Import the NgxJsonTableModule in your application module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxJsonTableModule } from 'ngx-json-table';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxJsonTableModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. Use the component in your template:

```html
<!-- Basic usage with default settings -->
<table ngx-json-table [data]="yourJsonData"></table>

<!-- With custom settings -->
<table ngx-json-table [data]="yourJsonData" [settings]="tableSettings"></table>
```

3. Define your data and settings in your component:

```typescript
import { Component } from '@angular/core';
import { Settings, JsonValue } from 'ngx-json-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Your JSON data
  yourJsonData: JsonValue = {
    product: 'NGX JSON Table',
    version: 1.0,
    features: ['Sorting', 'Editing', 'Nested objects'],
    configuration: {
      sortable: true,
      editable: true,
    },
  };

  // Optional settings
  tableSettings: Settings = {
    sortable: true,
    sortDirection: 'asc',
    expandAll: true,
    loadFromFile: true,
    options: {
      add: true,
      edit: {
        key: true,
        value: true,
      },
      delete: true,
    },
  };
}
```

## Configuration Options

The `Settings` interface provides various options to customize your table:

```typescript
export type Settings = {
  // Customize the key column
  key?: {
    headerText?: string; // Default: "Key"
    width?: string; // Default: "40%"
  };

  // Customize the value column
  value?: {
    headerText?: string; // Default: "Value"
    width?: string; // Default: "60%"
  };

  // Enable/disable operations
  options?: {
    add?: boolean; // Enable adding new properties
    edit?: {
      key?: boolean; // Enable editing keys
      value?: boolean; // Enable editing values
    };
    delete?: boolean; // Enable deleting properties
  };

  sortable?: boolean; // Enable sorting
  sortDirection?: 'asc' | 'desc'; // Default sort direction
  expandAll?: boolean; // Expand all nested objects by default
  loadFromFile?: boolean; // Show button to load JSON from file

  // Icon package to use
  iconPackage?: 'basic' | 'font-awesome' | 'material-design';
};
```

## Events

The component provides events to react to data changes:

```html
<table ngx-json-table [data]="data" (dataChange)="onDataChange($event)"></table>
```

```typescript
onDataChange(newData: JsonValue) {
  console.log('Data changed:', newData);
  // Update your application state or perform other actions
}
```

## Icon Packages

ngx-json-table supports three icon packages out of the box:

1. **Basic**: Default package using HTML entities (no external dependencies)
2. **Font Awesome**: Requires Font Awesome to be installed
3. **Material Design**: Requires Material Icons to be installed

To use a specific icon package:

```typescript
tableSettings: Settings = {
  iconPackage: 'material-design',
  // other settings...
};
```

## Complete Example

Here's a complete example with all features enabled:

```typescript
import { Component } from '@angular/core';
import { Settings, JsonValue } from 'ngx-json-table';

@Component({
  selector: 'app-example',
  template: `
    <table
      ngx-json-table
      [data]="data"
      [settings]="settings"
      (dataChange)="onDataChange($event)"></table>
  `,
})
export class ExampleComponent {
  settings: Settings = {
    key: {
      headerText: 'Property',
      width: '30%',
    },
    value: {
      headerText: 'Data',
      width: '70%',
    },
    sortable: true,
    sortDirection: 'asc',
    expandAll: true,
    loadFromFile: true,
    iconPackage: 'font-awesome',
    options: {
      add: true,
      edit: {
        key: true,
        value: true,
      },
      delete: true,
    },
  };

  data: JsonValue = {
    // Your JSON data here...
  };

  onDataChange(newData: JsonValue) {
    console.log('Data updated:', newData);
    this.data = newData;
  }
}
```

## Browser Support

ngx-json-table supports all major browsers and platforms, including:

- Chrome, Firefox, Edge, Safari, Opera
- Mobile browsers (iOS, Android)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE.txt) license.
