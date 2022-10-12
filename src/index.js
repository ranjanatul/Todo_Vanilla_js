const todo_box = document.getElementById("todo_display");
const todo_local = localStorage.getItem("todo");
let todo_items = todo_local && JSON.parse(todo_local);

const todo_submit = document.getElementById("todo_submit");
const todo_item_action = document.getElementById("todo_item_action");

if (todo_items && todo_items.length > 0) {
  todo_items.map(({ index, desc, done }) => {
    if ((index, desc)) {
      const li = document.createElement("li");
      li.setAttribute("id", index);
      li.innerHTML = `<div class="todo_item">
        <input type="checkbox" class="todo_checked" ${done ? "checked" : ""}/>
        <span class="todo_item_desc" style="text-decoration:${
          done ? "line-through" : ""
        }" >${desc}</span>
        <input type="button" class="todo_item_action" value="X" >
      </div>`;
      todo_box.append(li);
    }
    return null;
  });
} else {
  todo_items = [];
  todo_box.innerHTML = `<div class="todo_item">
No Items to display
</div>`;
}

todo_submit.addEventListener("click", function () {
  const todo_input = document.getElementById("todo_input").value;
  if (todo_input && todo_input !== "") {
    if (todo_items.length === 0) {
      todo_box.innerHTML = "";
    }
    const ind = Math.round(Math.random() * 100000000);
    todo_items.push({ index: ind, desc: todo_input, done: false });
    localStorage.setItem("todo", JSON.stringify(todo_items));
    const li = document.createElement("li");
    li.setAttribute("id", ind);
    li.innerHTML = `<div class="todo_item">
        <input type="checkbox" class="todo_checked" />
        <span class="todo_item_desc">${todo_input}</span>
        <input type="button" class="todo_item_action" value="X" >
      </div>`;
    todo_box.append(li);
  }
});

todo_box.addEventListener("click", function (event) {
  const parentEle = event.target.parentElement.parentElement;
  if (event.target.className === "todo_item_action") {
    if (parentEle) {
      parentEle.remove();
    }
    const eleId = parentEle.id;
    todo_items = todo_items.filter(({ desc, index }) => index != eleId);
    localStorage.setItem("todo", JSON.stringify(todo_items));
    if (todo_items.length === 0) {
      todo_box.innerHTML = `<div class="todo_item">
No Items to display
</div>`;
    }
  }
  if (event.target.className === "todo_checked") {
    const ele = event.target.nextElementSibling;
    if (ele) {
      console.log(event.target.value);
      if (event.target.checked == true) {
        ele.style.textDecoration = "line-through";
        todo_items = todo_items.map(({ desc, index, done }) => {
          if (index == parentEle.id) {
            return { index, desc, done: false };
          }
          return { index, desc, done };
        });
      } else {
        ele.style.textDecoration = "";
        todo_items = todo_items.map(({ desc, index, done }) => {
          if (index == parentEle.id) {
            return { index, desc, done: true };
          }
          return { index, desc, done };
        });
      }
      localStorage.setItem("todo", JSON.stringify(todo_items));
    }
    return null;
  }
});
