"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[785],{2785:(b,o,e)=>{e.r(o),e.d(o,{DemoModule:()=>E});var d=e(177),l=e(3600),r=e(6377),m=e(5778),t=e(4438),F=e(1626),c=e(9018),u=e(5206),g=e(4113);const p=()=>["/documentation"];const k=[{path:"",component:(()=>{class n{constructor(i){this.http=i,this.snippets={install:"",require:"",directive:"",settings:"",template:"",data:"",dataTemplate:"",basicFull:""}}ngOnInit(){this.loadSnippets()}loadSnippets(){["install","require","directive","settings","template","data","data-template","basic-full"].forEach(a=>{this.http.get(`assets/snippets/${a}.md`,{responseType:"text"}).subscribe(s=>{const j=a.replace(/-([a-z])/g,f=>f[1].toUpperCase());this.snippets[j]=s})})}static#t=this.\u0275fac=function(a){return new(a||n)(t.rXU(F.Qq))};static#e=this.\u0275cmp=t.VBU({type:n,selectors:[["app-demo"]],decls:99,vars:12,consts:[["tagline","Quick Start & Demo"],[1,"main-content"],["id","getting-started","href","#getting-started","aria-hidden","true",1,"anchor"],["aria-hidden","true",1,"octicon","octicon-link"],["id","installation","href","#installation","aria-hidden","true",1,"anchor"],["language","bash",3,"highlight"],["id","examples","href","#examples","aria-hidden","true",1,"anchor"],["id","minimal-setup","href","#minimal-setup","aria-hidden","true",1,"anchor"],["language","typescript",3,"highlight"],[3,"routerLink"],[1,"with-source"],["href","https://github.com/bacali95/ngx-json-table/blob/master/projects/demo/src/app/shared/components/basic-example/basic-example-data.component.ts","target","_blank",1,"source"]],template:function(a,s){1&a&&(t.nrm(0,"app-header",0),t.j41(1,"section",1)(2,"h2")(3,"a",2),t.nrm(4,"span",3),t.k0s(),t.EFF(5,"Getting Started "),t.k0s(),t.j41(6,"p"),t.EFF(7,"Hello and Welcome!"),t.k0s(),t.j41(8,"h3")(9,"a",4),t.nrm(10,"span",3),t.k0s(),t.EFF(11,"Installation "),t.k0s(),t.j41(12,"p"),t.EFF(13," The library is available as npm package, so all you need to do is to run the following command: "),t.k0s(),t.j41(14,"pre"),t.EFF(15,"    "),t.nrm(16,"code",5),t.EFF(17,"\n  "),t.k0s(),t.j41(18,"p"),t.EFF(19," This command will create a record in your `package.json` file and install the package into the npm modules folder. "),t.k0s(),t.j41(20,"h2")(21,"a",6),t.nrm(22,"span",3),t.k0s(),t.EFF(23,"Examples "),t.k0s(),t.j41(24,"h3")(25,"a",7),t.nrm(26,"span",3),t.k0s(),t.EFF(27,"Minimal Setup Example "),t.k0s(),t.j41(28,"p"),t.EFF(29,"First thing you need to do is to import the ngx-json-table directives into your component."),t.k0s(),t.j41(30,"pre"),t.EFF(31,"    "),t.nrm(32,"code",8),t.EFF(33,"\n  "),t.k0s(),t.j41(34,"p"),t.EFF(35,"Then register it by adding to the list of directives of your module:"),t.k0s(),t.j41(36,"pre"),t.EFF(37,"    "),t.nrm(38,"code",8),t.EFF(39,"\n  "),t.k0s(),t.j41(40,"p"),t.EFF(41," Now, we need to configure the table and add it into the template. There is "),t.j41(42,"strong"),t.EFF(43,"no required"),t.k0s(),t.EFF(44," setting for the component to start working, but we will use the full feature settings object for the demo. Let's register "),t.j41(45,"i"),t.EFF(46,"settings"),t.k0s(),t.EFF(47," property inside of the component where we want to have the table ("),t.j41(48,"a",9),t.EFF(49,"Settings documentation"),t.k0s(),t.EFF(50,"): "),t.k0s(),t.j41(51,"pre"),t.EFF(52,"    "),t.nrm(53,"code",8),t.EFF(54,"\n  "),t.k0s(),t.j41(55,"p"),t.EFF(56,"Finally let's put the ngx-json-table component inside of the template:"),t.k0s(),t.j41(57,"pre"),t.EFF(58,"    "),t.nrm(59,"code",8),t.EFF(60,"\n  "),t.k0s(),t.j41(61,"p"),t.EFF(62," At this step you will have a minimally configured table which should look something like this: "),t.k0s(),t.j41(63,"div"),t.nrm(64,"app-basic-example"),t.k0s(),t.nrm(65,"p"),t.j41(66,"p"),t.EFF(67," By making the table editable, all functions are available, so you already able to add/edit/delete rows or sort the table, etc. "),t.k0s(),t.j41(68,"p"),t.EFF(69," But it feels like something is missing... Right, there is no data in the table by default. To add some, let's create any valid JSON object. "),t.k0s(),t.j41(70,"pre"),t.EFF(71,"    "),t.nrm(72,"code",8),t.EFF(73,"\n  "),t.k0s(),t.j41(74,"p"),t.EFF(75,"And pass the data to the table:"),t.k0s(),t.j41(76,"pre"),t.EFF(77,"    "),t.nrm(78,"code",8),t.EFF(79,"\n  "),t.k0s(),t.j41(80,"p"),t.EFF(81,"Now you have some data in the table:"),t.k0s(),t.j41(82,"div"),t.nrm(83,"app-basic-example-data"),t.k0s(),t.nrm(84,"p"),t.j41(85,"p"),t.EFF(86," That's it for a minimal setup, our final component should look like this, pretty simple, huh? "),t.k0s(),t.j41(87,"pre",10),t.EFF(88,"    "),t.j41(89,"a",11),t.EFF(90,"Demo Source"),t.k0s(),t.EFF(91,"\n    "),t.nrm(92,"code",8),t.EFF(93,"\n  "),t.k0s(),t.j41(94,"p"),t.EFF(95,"Full component documentation you can find "),t.j41(96,"a",9),t.EFF(97,"here"),t.k0s(),t.EFF(98,"."),t.k0s()()),2&a&&(t.R7$(16),t.Y8G("highlight",s.snippets.install),t.R7$(16),t.Y8G("highlight",s.snippets.install),t.R7$(6),t.Y8G("highlight",s.snippets.directive),t.R7$(10),t.Y8G("routerLink",t.lJ4(10,p)),t.R7$(5),t.Y8G("highlight",s.snippets.settings),t.R7$(6),t.Y8G("highlight",s.snippets.template),t.R7$(13),t.Y8G("highlight",s.snippets.data),t.R7$(6),t.Y8G("highlight",s.snippets.dataTemplate),t.R7$(14),t.Y8G("highlight",s.snippets.basicFull),t.R7$(4),t.Y8G("routerLink",t.lJ4(11,p)))},dependencies:[l.Wk,c.l,u.Q,g.W,r.f4],encapsulation:2})}return n})()}];let E=(()=>{class n{static#t=this.\u0275fac=function(a){return new(a||n)};static#e=this.\u0275mod=t.$C({type:n});static#s=this.\u0275inj=t.G2t({imports:[d.MD,l.iI.forChild(k),m.G,r.fw]})}return n})()}}]);