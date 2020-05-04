function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{B3sx:function(e,n,t){"use strict";t.r(n),n.default="data: any = {\n  product: 'NGX JSON Table',\n  version: 1.0,\n  releaseDate: '2014-06-25T00:00:00.000Z',\n  demo: true,\n  person: {\n    id: 12345,\n    name: 'John Doe',\n    phones: {\n      home: '800-123-4567',\n      mobile: '877-123-1234'\n    },\n    email: ['jd@example.com', 'jd@example.org'],\n    dateOfBirth: '1980-01-02T00:00:00.000Z',\n    registered: true,\n    emergencyContacts: [\n      {\n        name: 'Jane Doe',\n        phone: '888-555-1212',\n        relationship: 'spouse'\n      },\n      {\n        name: 'Justin Doe',\n        phone: '877-123-1212',\n        relationship: 'parent'\n      }\n    ]\n  }\n};\n"},CHVS:function(e,n,t){"use strict";t.r(n),n.default='// ...\n\n@Component({\n  template: `\n    <ngx-json-table [settings]="settings"></ngx-json-table>\n  `\n})\n// ...\n'},PeCp:function(e,n,t){"use strict";t.r(n),n.default="import { NgxJsonTableModule } from 'ngx-json-table';\n"},YhRS:function(e,n,t){"use strict";t.r(n),n.default="// ...\n\n@NgModule({\n  imports: [\n    // ...\n    \n    NgxJsonTableModule,\n    \n    // ...\n  ],\n  declarations: [ ... ]\n})\n// ...\n"},cHIK:function(e,n,t){"use strict";t.r(n),n.default="settings: Settings = {\n  sortable: true,\n  sortDirection: 'desc',\n  expandAll: true,\n  loadFromFile: true,\n  options: {\n    add: true,\n    edit: {\n      key: true,\n      value: true\n    },\n    delete: true,\n  }\n};\n"},j1Yg:function(e,n,t){"use strict";t.r(n),n.default='// ...\n\n@Component({\n  template: `\n    <ngx-json-table [data]="data" [settings]="settings"></ngx-json-table>\n  `\n})\n// ...\n'},"m+vt":function(e,n,t){"use strict";t.r(n),t.d(n,"DemoModule",(function(){return h}));var a,o,i=t("2kYt"),s=t("sEIs"),c=t("PCNd"),r=t("EM62"),l=t("aZ8m"),b=t("FT7q"),m=t("UjQs"),p=t("ObOt"),d=function(){return["/documentation"]},u=[{path:"",component:(a=function e(){_classCallCheck(this,e),this.snippets={install:t("vxW1").default,require:t("PeCp").default,directive:t("YhRS").default,settings:t("cHIK").default,template:t("CHVS").default,data:t("B3sx").default,dataTemplate:t("j1Yg").default,basicFull:t("x09U").default}},a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=r.Db({type:a,selectors:[["demo"]],decls:107,vars:12,consts:[["tagline","Quick Start & Demo"],[1,"main-content"],["id","getting-started","href","#getting-started","aria-hidden","true",1,"anchor"],["aria-hidden","true",1,"octicon","octicon-link"],["id","installation","href","#installation","aria-hidden","true",1,"anchor"],["highlight","",1,"bash"],["id","examples","href","#examples","aria-hidden","true",1,"anchor"],["id","minimal-setup","href","#minimal-setup","aria-hidden","true",1,"anchor"],["highlight","",1,"typescript"],[3,"routerLink"],[1,"with-source"],["href","https://github.com/bacali95/ngx-json-table/blob/master/projects/demo/src/app/pages/shared/components/basic-example/basic-example-data.component.ts","target","_blank",1,"source"]],template:function(e,n){1&e&&(r.Kb(0,"header-component",0),r.Ob(1,"section",1),r.Ob(2,"h2"),r.Ob(3,"a",2),r.Kb(4,"span",3),r.Nb(),r.mc(5,"Getting Started"),r.Nb(),r.Ob(6,"p"),r.mc(7," Hello and Welcome! "),r.Nb(),r.Ob(8,"h3"),r.Ob(9,"a",4),r.Kb(10,"span",3),r.Nb(),r.mc(11,"Installation"),r.Nb(),r.Ob(12,"p"),r.mc(13," The library is available as npm package, so all you need to do is to run the following command: "),r.Nb(),r.Ob(14,"pre"),r.mc(15,"    "),r.Ob(16,"code",5),r.mc(17),r.Nb(),r.mc(18,"\n  "),r.Nb(),r.Ob(19,"p"),r.mc(20,"This command will create a record in your `package.json` file and install the package into the npm modules folder."),r.Nb(),r.Ob(21,"h2"),r.Ob(22,"a",6),r.Kb(23,"span",3),r.Nb(),r.mc(24,"Examples"),r.Nb(),r.Ob(25,"h3"),r.Ob(26,"a",7),r.Kb(27,"span",3),r.Nb(),r.mc(28,"Minimal Setup Example"),r.Nb(),r.Ob(29,"p"),r.mc(30," First thing you need to do is to import the ngx-json-table directives into your component. "),r.Nb(),r.Ob(31,"pre"),r.mc(32,"    "),r.Ob(33,"code",8),r.mc(34),r.Nb(),r.mc(35,"\n  "),r.Nb(),r.Ob(36,"p"),r.mc(37," Then register it by adding to the list of directives of your module: "),r.Nb(),r.Ob(38,"pre"),r.mc(39,"    "),r.Ob(40,"code",8),r.mc(41),r.Nb(),r.mc(42,"\n  "),r.Nb(),r.Ob(43,"p"),r.mc(44," Now, we need to configure the table and add it into the template. There is "),r.Ob(45,"strong"),r.mc(46,"no required"),r.Nb(),r.mc(47," setting for the component to start working, but we will use the full feature settings object for the demo. Let's register "),r.Ob(48,"i"),r.mc(49,"settings"),r.Nb(),r.mc(50," property inside of the component where we want to have the table ("),r.Ob(51,"a",9),r.mc(52,"Settings documentation"),r.Nb(),r.mc(53,"): "),r.Nb(),r.Ob(54,"pre"),r.mc(55,"    "),r.Ob(56,"code",8),r.mc(57),r.Nb(),r.mc(58,"\n  "),r.Nb(),r.Ob(59,"p"),r.mc(60," Finally let's put the ngx-json-table component inside of the template: "),r.Nb(),r.Ob(61,"pre"),r.mc(62,"    "),r.Ob(63,"code",8),r.mc(64),r.Nb(),r.mc(65,"\n  "),r.Nb(),r.Ob(66,"p"),r.mc(67," At this step you will have a minimally configured table which should look something like this: "),r.Nb(),r.Ob(68,"div"),r.Kb(69,"basic-example"),r.Nb(),r.Kb(70,"p"),r.Ob(71,"p"),r.mc(72," By making the table editable, all functions are available, so you already able to add/edit/delete rows or sort the table, etc. "),r.Nb(),r.Ob(73,"p"),r.mc(74," But it feels like something is missing... Right, there is no data in the table by default. To add some, let's create any valid JSON object. "),r.Nb(),r.Ob(75,"pre"),r.mc(76,"    "),r.Ob(77,"code",8),r.mc(78),r.Nb(),r.mc(79,"\n  "),r.Nb(),r.Ob(80,"p"),r.mc(81,"And pass the data to the table:"),r.Nb(),r.Ob(82,"pre"),r.mc(83,"    "),r.Ob(84,"code",8),r.mc(85),r.Nb(),r.mc(86,"\n  "),r.Nb(),r.Ob(87,"p"),r.mc(88,"Now you have some data in the table:"),r.Nb(),r.Ob(89,"div"),r.Kb(90,"basic-example-data"),r.Nb(),r.Kb(91,"p"),r.Ob(92,"p"),r.mc(93," That's it for a minimal setup, our final component should look like this, pretty simple, huh? "),r.Nb(),r.Ob(94,"pre",10),r.mc(95,"    "),r.Ob(96,"a",11),r.mc(97,"Demo Source"),r.Nb(),r.mc(98,"\n    "),r.Ob(99,"code",8),r.mc(100),r.Nb(),r.mc(101,"\n  "),r.Nb(),r.Ob(102,"p"),r.mc(103,"Full component documentation you can find "),r.Ob(104,"a",9),r.mc(105,"here"),r.Nb(),r.mc(106,"."),r.Nb(),r.Nb()),2&e&&(r.zb(17),r.nc(n.snippets.install),r.zb(17),r.nc(n.snippets.require),r.zb(7),r.nc(n.snippets.directive),r.zb(10),r.bc("routerLink",r.cc(10,d)),r.zb(6),r.nc(n.snippets.settings),r.zb(7),r.nc(n.snippets.template),r.zb(14),r.nc(n.snippets.data),r.zb(7),r.nc(n.snippets.dataTemplate),r.zb(15),r.nc(n.snippets.basicFull),r.zb(4),r.bc("routerLink",r.cc(11,d)))},directives:[l.a,b.a,s.b,m.a,p.a],encapsulation:2}),a)}],h=((o=function e(){_classCallCheck(this,e)}).\u0275mod=r.Hb({type:o}),o.\u0275inj=r.Gb({factory:function(e){return new(e||o)},imports:[[i.b,s.c.forChild(u),c.a]]}),o)},vxW1:function(e,n,t){"use strict";t.r(n),n.default="npm install --save ngx-json-table\n"},x09U:function(e,n,t){"use strict";t.r(n),n.default="import { Component } from '@angular/core';\nimport { Settings } from 'ngx-json-table';\n\n@Component({\n  selector: 'basic-example-data',\n  template: `\n    <ngx-json-table [data]=\"data\" [settings]=\"settings\"></ngx-json-table>\n  `,\n})\nexport class BasicExampleDataComponent {\n\n  settings: Settings = {\n    sortable: true,\n    sortDirection: 'desc',\n    expandAll: true,\n    loadFromFile: true,\n    options: {\n      add: true,\n      edit: {\n        key: true,\n        value: true\n      },\n      delete: true,\n    }\n  };\n\n  data: any = {\n    product: 'NGX JSON Table',\n    version: 1.0,\n    releaseDate: '2014-06-25T00:00:00.000Z',\n    demo: true,\n    person: {\n      id: 12345,\n      name: 'John Doe',\n      phones: {\n        home: '800-123-4567',\n        mobile: '877-123-1234'\n      },\n      email: ['jd@example.com', 'jd@example.org'],\n      dateOfBirth: '1980-01-02T00:00:00.000Z',\n      registered: true,\n      emergencyContacts: [\n        {\n          name: 'Jane Doe',\n          phone: '888-555-1212',\n          relationship: 'spouse'\n        },\n        {\n          name: 'Justin Doe',\n          phone: '877-123-1212',\n          relationship: 'parent'\n        }\n      ]\n    }\n  };\n}\n"}}]);