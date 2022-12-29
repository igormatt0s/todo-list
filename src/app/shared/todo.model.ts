export class Todo {

    constructor(
      public id: number,
      public text: string,
      public descricao: string,
      public criacao: Date,
      public conclusao: Date,
      public checked: boolean = false
    ) {}
  }
  