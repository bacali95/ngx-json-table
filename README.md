[![Build Status](https://travis-ci.org/bacali95/ngx-json-table.svg?branch=master)](https://travis-ci.org/bacali95/ngx-json-table)

# Angular JSON Table 

ngx-json-table component made to represent JSON object as a simple HTML table.

### Demo

<a target="_blank" href="https://bacali95.github.io/ngx-json-table/">Live Demo</a>

## Installation

The library is available as npm package, so all you need to do is to run the following command:

```
npm install --save ngx-json-table
```

This command will create a record in your `package.json` file and install the package into the npm modules folder.

## Minimal Setup Example

First thing you need to do is to import the ngx-json-table directives into your component.

```

import { Ng2JsonTableModule } from 'ngx-json-table';

```

Then register it by adding to the list of directives of your module:

```
// ...

@NgModule({
  imports: [
    // ...
    
    Ng2JsonTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...
```

Now, we need to configure the table and add it into the template. There is <strong>no required</strong> setting for the component to start working ([Settings documentation](https://bacali95.github.io/ngx-json-table/#/documentation)):
So let's put the ngx-json-table component inside of the template:

```
// ...

@Component({
  template: `
    <ngx-json-table></ngx-json-table>
  `
})
// ...
```

Still it seems like something is missing... Right, there is no data in the table by default. To add some, let's create any valid JSON object.

```
data: any = {
  product: 'NGX JSON Table',
  version: 1.0,
  releaseDate: '2014-06-25T00:00:00.000Z',
  demo: true,
  person: {
    id: 12345,
    name: 'John Doe',
    phones: {
      home: '800-123-4567',
      mobile: '877-123-1234'
    },
    email: ['jd@example.com', 'jd@example.org'],
    dateOfBirth: '1980-01-02T00:00:00.000Z',
    registered: true,
    emergencyContacts: [
      {
        name: 'Jane Doe',
        phone: '888-555-1212',
        relationship: 'spouse'
      },
      {
        name: 'Justin Doe',
        phone: '877-123-1212',
        relationship: 'parent'
      }
    ]
  }
};
```

And pass the data to the table:

```
// ...

@Component({
  template: `
    <ngx-json-table [data]="data"></ngx-json-table>
  `
})
// ...
```

Now you have some data in the table.
 
## Further Documentation
Installation, customization and other useful articles: https://bacali95.github.io/ngx-json-table/

## Features
* Inline Add/Edit/Delete
* Sorting

## License
[MIT](LICENSE.txt) license.
