import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  styleUrls: ['./documentation.component.scss'],
  templateUrl: './documentation.component.html',
})
export class DocumentationComponent {
  exampleIconInnerText = '<i>innerText</i>';
  exampleIconClass = '<i class="class"></i>';
  exampleIconColor = '<i style="color: #1e6bb8"></i>';
  exampleIconHtml = '<i class="custom-html" style="color: #55a532">customInnerText</i>';
}
