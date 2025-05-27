import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent {
  newTask: string = '';
  tasks: Task[] = [];

  addTask(): void {
    const trimmedTask = this.newTask.trim();

    if (trimmedTask && !this.tasks.some(task => task.name.toLowerCase() === trimmedTask.toLowerCase())) {
      this.tasks.push({ name: trimmedTask, completed: false });
    }

    this.newTask = '';
  }

  markAsDone(task: Task): void {
    task.completed = true;
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => !task.completed);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.completed);
  }
}
