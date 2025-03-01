import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';

describe('SanitizeHtmlPipe', () => {
  let pipe: SanitizeHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SanitizeHtmlPipe(sanitizer);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize HTML string', () => {
    const htmlString = '<div>Test</div>';
    const result = pipe.transform(htmlString);

    // The result should be a SafeHtml object
    expect(result).not.toBe(htmlString);
    expect(result.toString()).toContain('SafeValue');
  });

  it('should sanitize null input', () => {
    const result = pipe.transform(null);

    // The result should be a SafeHtml object
    expect(result).not.toBe(null);
    expect(result.toString()).toContain('SafeValue');
  });

  it('should sanitize undefined input', () => {
    const result = pipe.transform(undefined);

    // The result should be a SafeHtml object
    expect(result).not.toBe(undefined);
    expect(result.toString()).toContain('SafeValue');
  });

  it('should handle complex HTML', () => {
    const htmlString =
      '<div class="test"><span style="color: red;">Test</span><script>alert("XSS")</script></div>';
    const result = pipe.transform(htmlString);

    // The result should be a SafeHtml object
    expect(result).not.toBe(htmlString);
    expect(result.toString()).toContain('SafeValue');
  });
});
