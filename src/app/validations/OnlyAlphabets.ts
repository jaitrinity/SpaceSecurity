import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyAlphabets]'
})
export class OnlyAlphabets {

  constructor(private el: ElementRef) { }

  @Input() OnlyAlphabets: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.OnlyAlphabets) {
      if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39) || 
        // Allow: A to Z
        (e.keyCode > 64 && e.keyCode < 91) || 
        // Allow: a to z
        (e.keyCode > 96 && e.keyCode < 123) || 
        // Allow: 0 to 9
        (e.keyCode > 47 && e.keyCode < 58) ||
        // Allow: backspace
        e.keyCode == 8 || 
        // Allow: space
        e.keyCode == 32 || 
        // Allow: Tab
        e.keyCode == 9
        ) {
          // let it happen, don't do anything
          return;
        }
        // prevent all spacial character
        if ((e.keyCode >= 33 && e.keyCode <= 47) || (e.keyCode >= 58 && e.keyCode <= 64) || 
            (e.keyCode >= 91 && e.keyCode <= 96) || (e.keyCode >= 123 && e.keyCode <= 126) || 
            (e.keyCode >= 186 && e.keyCode <= 191) || (e.keyCode >= 219 && e.keyCode <= 222)) {
            e.preventDefault();
        }
      }
  }
}