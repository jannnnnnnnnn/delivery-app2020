//https://repl.it/@jannnnnnnnnn/Class-lab-DOM-todo-list#index.html

document.querySelector("button").addEventListener("click", myList);

function myList() {
  const x = document.createElement("li");
  x.innerHTML = document.querySelector("input").value;
  x.id = document.querySelector("input").value;
  document.querySelector("ul").appendChild(x);
}
