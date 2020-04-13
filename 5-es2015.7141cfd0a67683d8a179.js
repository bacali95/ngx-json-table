(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{B3sx:function(e,n,t){"use strict";t.r(n),n.default="data: any = {\n  product: 'NGX JSON Table',\n  version: 1.0,\n  releaseDate: '2014-06-25T00:00:00.000Z',\n  demo: true,\n  person: {\n    id: 12345,\n    name: 'John Doe',\n    phones: {\n      home: '800-123-4567',\n      mobile: '877-123-1234'\n    },\n    email: ['jd@example.com', 'jd@example.org'],\n    dateOfBirth: '1980-01-02T00:00:00.000Z',\n    registered: true,\n    emergencyContacts: [\n      {\n        name: 'Jane Doe',\n        phone: '888-555-1212',\n        relationship: 'spouse'\n      },\n      {\n        name: 'Justin Doe',\n        phone: '877-123-1212',\n        relationship: 'parent'\n      }\n    ]\n  }\n};\n"},CHVS:function(e,n,t){"use strict";t.r(n),n.default='// ...\n\n@Component({\n  template: `\n    <ngx-json-table [settings]="settings"></ngx-json-table>\n  `\n})\n// ...\n'},PeCp:function(e,n,t){"use strict";t.r(n),n.default="import { NgxJsonTableModule } from 'ngx-json-table';\n"},YhRS:function(e,n,t){"use strict";t.r(n),n.default="// ...\n\n@NgModule({\n  imports: [\n    // ...\n    \n    NgxJsonTableModule,\n    \n    // ...\n  ],\n  declarations: [ ... ]\n})\n// ...\n"},cHIK:function(e,n,t){"use strict";t.r(n),n.default="settings: Settings = {\n  sortable: true,\n  sortDirection: 'desc',\n  expandAll: true,\n  options: {\n    add: true,\n    edit: {\n      key: true,\n      value: true\n    },\n    delete: true,\n  }\n};\n"},j1Yg:function(e,n,t){"use strict";t.r(n),n.default='// ...\n\n@Component({\n  template: `\n    <ngx-json-table [data]="data" [settings]="settings"></ngx-json-table>\n  `\n})\n// ...\n'},"m+vt":function(e,n,t){"use strict";t.r(n),t.d(n,"DemoModule",(function(){return d}));var a=t("2kYt"),o=t("sEIs"),i=t("PCNd"),s=t("EM62"),r=t("aZ8m"),c=t("FT7q"),l=t("UjQs"),b=t("ObOt");const m=function(){return["/documentation"]},p=[{path:"",component:(()=>{class e{constructor(){this.snippets={install:t("vxW1").default,require:t("PeCp").default,directive:t("YhRS").default,settings:t("cHIK").default,template:t("CHVS").default,data:t("B3sx").default,dataTemplate:t("j1Yg").default,basicFull:t("x09U").default}}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=s.Db({type:e,selectors:[["demo"]],decls:107,vars:12,consts:[["tagline","Quick Start & Demo"],[1,"main-content"],["id","getting-started","href","#getting-started","aria-hidden","true",1,"anchor"],["aria-hidden","true",1,"octicon","octicon-link"],["id","installation","href","#installation","aria-hidden","true",1,"anchor"],["highlight","",1,"bash"],["id","examples","href","#examples","aria-hidden","true",1,"anchor"],["id","minimal-setup","href","#minimal-setup","aria-hidden","true",1,"anchor"],["highlight","",1,"typescript"],[3,"routerLink"],[1,"with-source"],["href","https://github.com/bacali95/ngx-json-table/blob/master/projects/demo/src/app/pages/shared/components/basic-example/basic-example-data.component.ts","target","_blank",1,"source"]],template:function(e,n){1&e&&(s.Kb(0,"header-component",0),s.Ob(1,"section",1),s.Ob(2,"h2"),s.Ob(3,"a",2),s.Kb(4,"span",3),s.Nb(),s.mc(5,"Getting Started"),s.Nb(),s.Ob(6,"p"),s.mc(7," Hello and Welcome! "),s.Nb(),s.Ob(8,"h3"),s.Ob(9,"a",4),s.Kb(10,"span",3),s.Nb(),s.mc(11,"Installation"),s.Nb(),s.Ob(12,"p"),s.mc(13," The library is available as npm package, so all you need to do is to run the following command: "),s.Nb(),s.Ob(14,"pre"),s.mc(15,"    "),s.Ob(16,"code",5),s.mc(17),s.Nb(),s.mc(18,"\n  "),s.Nb(),s.Ob(19,"p"),s.mc(20,"This command will create a record in your `package.json` file and install the package into the npm modules folder."),s.Nb(),s.Ob(21,"h2"),s.Ob(22,"a",6),s.Kb(23,"span",3),s.Nb(),s.mc(24,"Examples"),s.Nb(),s.Ob(25,"h3"),s.Ob(26,"a",7),s.Kb(27,"span",3),s.Nb(),s.mc(28,"Minimal Setup Example"),s.Nb(),s.Ob(29,"p"),s.mc(30," First thing you need to do is to import the ngx-json-table directives into your component. "),s.Nb(),s.Ob(31,"pre"),s.mc(32,"    "),s.Ob(33,"code",8),s.mc(34),s.Nb(),s.mc(35,"\n  "),s.Nb(),s.Ob(36,"p"),s.mc(37," Then register it by adding to the list of directives of your module: "),s.Nb(),s.Ob(38,"pre"),s.mc(39,"    "),s.Ob(40,"code",8),s.mc(41),s.Nb(),s.mc(42,"\n  "),s.Nb(),s.Ob(43,"p"),s.mc(44," Now, we need to configure the table and add it into the template. There is "),s.Ob(45,"strong"),s.mc(46,"no required"),s.Nb(),s.mc(47," setting for the component to start working, but we will use the full feature settings object for the demo. Let's register "),s.Ob(48,"i"),s.mc(49,"settings"),s.Nb(),s.mc(50," property inside of the component where we want to have the table ("),s.Ob(51,"a",9),s.mc(52,"Settings documentation"),s.Nb(),s.mc(53,"): "),s.Nb(),s.Ob(54,"pre"),s.mc(55,"    "),s.Ob(56,"code",8),s.mc(57),s.Nb(),s.mc(58,"\n  "),s.Nb(),s.Ob(59,"p"),s.mc(60," Finally let's put the ngx-json-table component inside of the template: "),s.Nb(),s.Ob(61,"pre"),s.mc(62,"    "),s.Ob(63,"code",8),s.mc(64),s.Nb(),s.mc(65,"\n  "),s.Nb(),s.Ob(66,"p"),s.mc(67," At this step you will have a minimally configured table which should look something like this: "),s.Nb(),s.Ob(68,"div"),s.Kb(69,"basic-example"),s.Nb(),s.Kb(70,"p"),s.Ob(71,"p"),s.mc(72," By making the table editable, all functions are available, so you already able to add/edit/delete rows or sort the table, etc. "),s.Nb(),s.Ob(73,"p"),s.mc(74," But it feels like something is missing... Right, there is no data in the table by default. To add some, let's create any valid JSON object. "),s.Nb(),s.Ob(75,"pre"),s.mc(76,"    "),s.Ob(77,"code",8),s.mc(78),s.Nb(),s.mc(79,"\n  "),s.Nb(),s.Ob(80,"p"),s.mc(81,"And pass the data to the table:"),s.Nb(),s.Ob(82,"pre"),s.mc(83,"    "),s.Ob(84,"code",8),s.mc(85),s.Nb(),s.mc(86,"\n  "),s.Nb(),s.Ob(87,"p"),s.mc(88,"Now you have some data in the table:"),s.Nb(),s.Ob(89,"div"),s.Kb(90,"basic-example-data"),s.Nb(),s.Kb(91,"p"),s.Ob(92,"p"),s.mc(93," That's it for a minimal setup, our final component should look like this, pretty simple, huh? "),s.Nb(),s.Ob(94,"pre",10),s.mc(95,"    "),s.Ob(96,"a",11),s.mc(97,"Demo Source"),s.Nb(),s.mc(98,"\n    "),s.Ob(99,"code",8),s.mc(100),s.Nb(),s.mc(101,"\n  "),s.Nb(),s.Ob(102,"p"),s.mc(103,"Full component documentation you can find "),s.Ob(104,"a",9),s.mc(105,"here"),s.Nb(),s.mc(106,"."),s.Nb(),s.Nb()),2&e&&(s.zb(17),s.nc(n.snippets.install),s.zb(17),s.nc(n.snippets.require),s.zb(7),s.nc(n.snippets.directive),s.zb(10),s.bc("routerLink",s.cc(10,m)),s.zb(6),s.nc(n.snippets.settings),s.zb(7),s.nc(n.snippets.template),s.zb(14),s.nc(n.snippets.data),s.zb(7),s.nc(n.snippets.dataTemplate),s.zb(15),s.nc(n.snippets.basicFull),s.zb(4),s.bc("routerLink",s.cc(11,m)))},directives:[r.a,c.a,o.b,l.a,b.a],encapsulation:2}),e})()}];let d=(()=>{class e{}return e.\u0275mod=s.Hb({type:e}),e.\u0275inj=s.Gb({factory:function(n){return new(n||e)},imports:[[a.b,o.c.forChild(p),i.a]]}),e})()},vxW1:function(e,n,t){"use strict";t.r(n),n.default="npm install --save ngx-json-table\n"},x09U:function(e,n,t){"use strict";t.r(n),n.default="import { Component } from '@angular/core';\nimport { Settings } from 'ngx-json-table';\n\n@Component({\n  selector: 'basic-example-data',\n  template: `\n    <ngx-json-table [data]=\"data\" [settings]=\"settings\"></ngx-json-table>\n  `,\n})\nexport class BasicExampleDataComponent {\n\n  settings: Settings = {\n    sortable: true,\n    sortDirection: 'desc',\n    expandAll: true,\n    options: {\n      add: true,\n      edit: {\n        key: true,\n        value: true\n      },\n      delete: true,\n    }\n  };\n\n  data: any = {\n    product: 'NGX JSON Table',\n    version: 1.0,\n    releaseDate: '2014-06-25T00:00:00.000Z',\n    demo: true,\n    person: {\n      id: 12345,\n      name: 'John Doe',\n      phones: {\n        home: '800-123-4567',\n        mobile: '877-123-1234'\n      },\n      email: ['jd@example.com', 'jd@example.org'],\n      dateOfBirth: '1980-01-02T00:00:00.000Z',\n      registered: true,\n      emergencyContacts: [\n        {\n          name: 'Jane Doe',\n          phone: '888-555-1212',\n          relationship: 'spouse'\n        },\n        {\n          name: 'Justin Doe',\n          phone: '877-123-1212',\n          relationship: 'parent'\n        }\n      ]\n    }\n  };\n}\n"}}]);