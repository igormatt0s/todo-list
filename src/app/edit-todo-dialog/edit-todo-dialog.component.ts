import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public todo: Todo, private api: ApiService) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
   
    this.api.putTodo(form.value, this.todo.id)
    .subscribe({
      next:(res) => {
        alert("Tarefa atualizada com sucesso!");
        form.reset();
        this.dialogRef.close('atualizado');
      },
      error:() => {
        alert("Erro ao atualizar a Tarefa!");
      }
    })
  }
}
