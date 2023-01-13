import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

  showValidationErrors!: boolean

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo, private api: ApiService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {

    if(form.valid){
      this.api.postTodo(form.value)
      .subscribe({
        next:(res) => {
          alert("Tarefa criada com sucesso!");
          form.reset();
          this.dialogRef.close('salvo');
        },
        error:() => {
          alert("Erro ao criar a tarefa!")
        }
      })
    }
  }

}
