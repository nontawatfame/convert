import {Directive, ElementRef, HostListener, Input, isDevMode, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective implements OnInit {

  regexStr = '^[0-9]*$';

  constructor(private el: ElementRef, private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer2.setAttribute(this.el.nativeElement, 'autocomplete', 'off');
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: any) {
    const e = <KeyboardEvent>event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 65 && e.metaKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.metaKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.metaKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.metaKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      // let it happen, don't do anything
      return;
    }
    const ch = String.fromCharCode(e.keyCode);
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(ch) && e.key === ch) {
      return
    } else {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event : any) {
    const pastedText = event.clipboardData?.getData('text');
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(pastedText)) {
      return
    } else {
      event.preventDefault();
    }
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    const textData = event.dataTransfer?.getData('text') as string;
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(textData)) {
      return
    } else {
      event.preventDefault();
    }
  }
}
