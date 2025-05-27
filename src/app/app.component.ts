import { Component } from '@angular/core';
import { TaskManagerComponent } from './task-manager/task-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskManagerComponent],  // Only import the component you use
  templateUrl: './app.component.html',
  template: `<app-task-manager></app-task-manager>`
})
export class AppComponent {}

