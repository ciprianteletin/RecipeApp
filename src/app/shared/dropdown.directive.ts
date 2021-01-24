import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private currentElement: ElementRef,
              private render: Renderer2) {
  }

  @HostListener('click') onClick(): void {
    if (!this.currentElement.nativeElement.classList.contains('open')) {
      this.render.addClass(this.currentElement.nativeElement, 'open');
    } else {
      this.render.removeClass(this.currentElement.nativeElement, 'open');
    }
  }
}
