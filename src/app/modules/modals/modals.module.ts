import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Po UI */
import { PoFieldModule, PoModalModule } from '@po-ui/ng-components';

/* COmponents */
import { ProfessorModalComponent } from './professor-modal/professor-modal.component';

/* Services */
import { NotificationMessageService } from 'src/app/core/helpers/notification-message.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfessorModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    PoModalModule,
    PoFieldModule,

    SharedModule
  ],
  exports: [
    ProfessorModalComponent
  ],
  providers: [
    NotificationMessageService
  ]
})
export class ModalsModule { }
