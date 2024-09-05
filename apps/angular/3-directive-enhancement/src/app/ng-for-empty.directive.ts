import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
  ],
})
export class NgForEmptyDirective<T> implements OnChanges {
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private ref?: EmbeddedViewRef<unknown>;

  @Input() ngForOf: T[] = [];
  @Input() ngForEmpty!: TemplateRef<unknown>;

  ngOnChanges() {
    this.ref?.destroy();
    if (this.ngForOf.length === 0 && this.ngForEmpty) {
      this.ref = this.viewContainerRef.createEmbeddedView(this.ngForEmpty);
    } else {
      this.ref?.destroy();
    }
  }
}
