import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description?: string;
  reminder?: string;
  status: 'new' | 'pending' | 'completed';
  isPriority?: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  tasks: Task[] = [];
  newTitle = '';
  newDescription = '';
  newReminder?: string;
  errorMessage = '';
  warningMessage = '';
  //newReminder: string = '';
  reminderFocused: boolean = false;
  readonly statuses: Array<'new' | 'pending' | 'completed'> = ['new', 'pending', 'completed'];

  addTask() {
    const title = this.newTitle.trim();
    const description = this.newDescription.trim();
    const now = new Date();
    const reminderDate = this.newReminder ? new Date(this.newReminder) : undefined;

    if (!title) {
      this.errorMessage = 'Task title is required.';
      return;
    }

    if (reminderDate && reminderDate < now) {
      this.errorMessage = 'Reminder cannot be in the past.';
      return;
    }

    if (this.tasks.some(t => t.title.toLowerCase() === title.toLowerCase())) {
      this.errorMessage = 'Task title must be unique.';
      return;
    }

    if (this.tasks.length >= 15) {
      this.errorMessage = 'Task limit reached. Delete a task to add more.';
      return;
    }

    const task: Task = {
      title,
      description,
      reminder: this.newReminder,
      status: 'new',
      isPriority: false
    };

    this.tasks.push(task);
    this.resetForm();
    this.checkWarning();
  }

  resetForm() {
    this.newTitle = '';
    this.newDescription = '';
    this.newReminder = '';
    this.errorMessage = '';
  }

  checkWarning() {
    this.warningMessage = this.tasks.length === 10 ? 'You can only add 5 more tasks.' : '';
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.checkWarning();
  }

  markAsPending(task: Task) {
    task.status = 'pending';
  }

  markAsCompleted(task: Task) {
    task.status = 'completed';
  }

  toggleEdit(task: Task) {
    task.isEditing = !task.isEditing;
  }

  saveEdit(task: Task) {
    task.isEditing = false;
  }

  getTasksByStatus(status: 'new' | 'pending' | 'completed') {
    const now = new Date();
    return this.tasks
      .filter(task => task.status === status)
      .map(task => {
        if (task.reminder && new Date(task.reminder) <= now) {
          task.isPriority = true;
        }
        return task;
      });
  }

  onInputChange() {
    this.errorMessage = '';
  }

  getMinDateTime() {
    return new Date().toISOString().slice(0, 16);
  }
}
