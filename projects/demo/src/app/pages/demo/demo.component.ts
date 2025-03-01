import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  snippets: { [key: string]: string } = {
    install: '',
    require: '',
    directive: '',
    settings: '',
    template: '',
    data: '',
    dataTemplate: '',
    basicFull: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSnippets();
  }

  private loadSnippets() {
    const snippetNames = [
      'install',
      'require',
      'directive',
      'settings',
      'template',
      'data',
      'data-template',
      'basic-full',
    ];

    snippetNames.forEach(name => {
      this.http.get(`assets/snippets/${name}.md`, { responseType: 'text' })
        .subscribe(content => {
          // Convert kebab-case to camelCase for the keys
          const key = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          this.snippets[key] = content;
        });
    });
  }
}
