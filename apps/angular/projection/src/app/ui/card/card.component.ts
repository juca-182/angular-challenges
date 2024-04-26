import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

interface Identifier {
  id?: number;
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content select="[image]"></ng-content>
    @for (item of list; track item.id) {
      <ng-container
        *ngTemplateOutlet="
          rowTemplate;
          context: { $implicit: item }
        "></ng-container>
    }
    <ng-content select="[addButton]"></ng-content>
  `,
  standalone: true,
  imports: [ListItemComponent, CommonModule],
  host: {
    class: 'border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3',
  },
})
export class CardComponent<T extends Identifier> {
  @Input() list: T[] | null = null;
  @Input() customClass = '';

  @ContentChild('rowRef', { read: TemplateRef })
  rowTemplate!: TemplateRef<{ $implicit: T }>;
}
