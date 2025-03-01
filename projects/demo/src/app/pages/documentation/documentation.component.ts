import { Component } from '@angular/core';

@Component({
  selector: 'demo',
  styleUrls: ['./documentation.component.scss'],
  templateUrl: './documentation.component.html',
})
export class DocumentationComponent {
  exampleIconInnerText: string = '<i>innerText</i>';
  exampleIconClass: string = '<i class="class"></i>';
  exampleIconColor: string = '<i style="color: #1e6bb8"></i>';
  exampleIconHtml: string = '<i class="custom-html" style="color: #55a532">customInnerText</i>';
}
