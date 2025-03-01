import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import hljs from 'highlight.js';

@Directive({
  selector: 'code[appHighlight]',
})
export class HighlightCodeDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    hljs.highlightElement(this.elRef.nativeElement);
  }
}
