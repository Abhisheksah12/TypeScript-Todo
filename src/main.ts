import './style.css';


interface Todo {
  title:string;
  iscompleted:boolean;
  readonly id: string;
}

const todos:Todo[] = [];

const todoContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByName("title") [0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as  HTMLFormElement;


myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  
  const todo:Todo = {
    title:todoInput.value,
    iscompleted:false,
    id:String(Math.random()*100)
  };
  todos.push(todo);
  todoInput.value="";
  renderTodo(todos);
}
const generateTodoitem =(title:string,isCompleted:boolean,id:string) =>{
  const todo:HTMLDivElement = document.createElement("div");
  todo.className="todo";

  // creating a checkbox
  const checkBox:HTMLInputElement =document.createElement("input");
  checkBox.setAttribute("type","checkbox");
  checkBox.className="isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item)=>{
      if(item.id===id) item.iscompleted = checkBox.checked;
    });
    
    paragraph.className = checkBox.checked ? "textCut" : "";
  }

  // creating p for title
  const paragraph:HTMLParagraphElement =document.createElement("p");
  paragraph.innerText=title;
  paragraph.className = isCompleted ? "textCut" : "";
  
  //creating the delete button
  const btn:HTMLButtonElement= document.createElement("button");
  btn.innerText="X";
  btn.className="deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }

  // Appending all to TodoItem
  todo.append(checkBox,paragraph,btn)
  todoContainer.append(todo);
}

const deleteTodo = (id:string) => {
  const idx = todos.findIndex((item) => item.id===id);
  todos.splice(idx,1);
  renderTodo(todos);
}

const renderTodo =(todos:Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach(item=>{
    generateTodoitem(item.title,item.iscompleted,item.id)
  })
}