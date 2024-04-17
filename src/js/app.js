document.addEventListener("DOMContentLoaded", getFromStorage);
document.addEventListener('mousedown', mover);
document.addEventListener('click', toButtonsResponce);
document.addEventListener('mouseover', taskDelBtnAppearance);


function mover(event) {
    if (!event.target.classList.contains("task-box")) { return; };
    if (event.target.classList.contains('editable')){ return; };
    if (event.target.classList.contains('close')){ return; };
    const task = event.target;
    let elemBelow = null;
    let motherRow = null;
    const removeX = task.closest(".task-box").querySelector(".close");
    if (removeX !== null) {
        removeX.remove();
    }
    const width = task.getBoundingClientRect().width + 'px';
    motherRow = task.closest(".tasks-container");
       
        const shiftX = event.clientX - task.getBoundingClientRect().left;
        const shiftY = event.clientY - task.getBoundingClientRect().top;
        const placeholder =  document.createElement("li");
        placeholder.classList.add("blank");
        placeholder.style.height = task.getBoundingClientRect().height + 6  + 'px';
        placeholder.style.width = task.getBoundingClientRect().width  + 'px';
        task.closest(".tasks-container").insertBefore(placeholder, task);
        motherRow = placeholder.closest(".tasks-container");
        task.style.position = 'absolute';
        task.style.zIndex = 1000;
        task.style.width = width;
        document.body.append(task);
        moveAt(event.pageX, event.pageY);

      
        function moveAt(pageX, pageY) {
            task.style.left = pageX - shiftX + 'px';
            task.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {

            placeholder.remove();
            moveAt(event.pageX, event.pageY);
            task.hidden = true;
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            task.hidden = false;

        function enterDroppable(currentDroppable) {
            let blank = document.querySelector(".blank");
            if (blank != null && !currentDroppable.classList.contains('blank')) {
                blank.remove();
            }
            else {
                blank = document.createElement("li");
                blank.classList.add("blank");
                blank.style.height = task.getBoundingClientRect().height + 'px';
                blank.style.width = task.getBoundingClientRect().width  + 'px';
                if (droppableBelow.classList.contains("desk-rows")) {
                    droppableBelow.querySelector(".tasks-container").appendChild(blank);

                } else {
                    droppableBelow.closest(".tasks-container").insertBefore(blank, droppableBelow);
                };
                    
            };

        };

            if (!elemBelow) return;

            const droppableBelow = elemBelow.closest('.task-box');

            if (droppableBelow !== null) {
                enterDroppable(droppableBelow);     
            };
        };

        document.addEventListener('mousemove', onMouseMove);
 

        task.onmouseup = function(event) {
            document.removeEventListener('mousemove', onMouseMove);
            createX(event);
            if (!elemBelow && placeholder.closest('.tasks-container') != null) {             
                placeholder.closest('.tasks-container').insertBefore(task, placeholder);
                task.style.removeProperty('position');
                task.style.removeProperty('width');
                task.style.removeProperty('z-index');
                task.style.removeProperty('left');
                task.style.removeProperty('top');
                placeholder.remove();
                return;};
            task.onmouseup = null;
            const blank = document.querySelector(".blank");
            let parent = null;
            if (blank !== null) {
                if(elemBelow.classList.contains('task-box')) {
                    blank.closest('.tasks-container').insertBefore(task, blank);
                    task.style.removeProperty('position');
                    task.style.removeProperty('width');
                    task.style.removeProperty('z-index');
                    task.style.removeProperty('left');
                    task.style.removeProperty('top');
                    blank.remove();
                    motherRow = task.closest(".tasks-container");
                } 
                else if (elemBelow.classList.contains('desk-rows')) {
                    parent = elemBelow.querySelector(".tasks-container");
                    parent.appendChild(task);
                    task.style.removeProperty('position');
                    task.style.removeProperty('width');
                    task.style.removeProperty('z-index');
                    task.style.removeProperty('left');
                    task.style.removeProperty('top');
                    blank.remove();
                }
                else if (elemBelow.classList.contains('tasks-container')) {
                    elemBelow.appendChild(task);
                    task.style.removeProperty('position');
                    task.style.removeProperty('width');
                    task.style.removeProperty('z-index');
                    task.style.removeProperty('left');
                    task.style.removeProperty('top');
                    blank.remove();
                }
                else if (elemBelow.classList.contains('blank')) {
                    blank.closest('.tasks-container').insertBefore(task, blank);
                    task.style.removeProperty('position');
                    task.style.removeProperty('width');
                    task.style.removeProperty('z-index');
                    task.style.removeProperty('left');
                    task.style.removeProperty('top');
                    blank.remove();
                } 
                else {
                    blank.closest('.tasks-container').insertBefore(task, blank);
                    task.style.removeProperty('position');
                    task.style.removeProperty('width');
                    task.style.removeProperty('z-index');
                    task.style.removeProperty('left');
                    task.style.removeProperty('top');
                    blank.remove();
                }
                motherRow = task.closest(".tasks-container");

            } else {
                if (elemBelow.classList.contains('desk-rows')) {
                    parent = elemBelow.querySelector(".tasks-container");
                }
                else if (elemBelow.classList.contains('tasks-container')) {
                    parent = elemBelow;
                }
                
                if (parent === null) {
                    parent = motherRow;

                }

                parent.appendChild(task);
                task.style.removeProperty('position');
                task.style.removeProperty('width');
                task.style.removeProperty('z-index');
                task.style.removeProperty('left');
                task.style.removeProperty('top');
                
            };
            if (event.target == task) {
               saveToStorage();
            }
            
        };
    
    task.ondragstart = function() {
    return false;
    };
}

const newTasksAttachers = document.querySelectorAll(".add-msg");

newTasksAttachers.forEach(attacher => attacher.addEventListener('click', (e) => {
    e.preventDefault();
    newTasksAttachers.forEach(adder => adder.classList.remove("disabled"));
    document.querySelectorAll(".add-btn").forEach(el => el.classList.add("hidden"));
    const editable = document.querySelectorAll(".editable");
    if (editable.length) {
        editable.forEach(el => el.remove());
    }
    const row = findAncestor(attacher, ".desk-rows");
    const container = row.querySelector(".tasks-container");
    container.appendChild(createTaskBox());
    container.lastElementChild.querySelector(".task-text").focus();
    container.addEventListener('input', checkInput);
}

));

function toButtonsResponce(e) {
    e.preventDefault();
    if (e.target.classList.contains('close')){
        e.target.closest('.task-box').remove();
        saveToStorage();
    }
    if (e.target.classList.contains("add-btn")) { 
        newTasksAttachers.forEach(adder => adder.classList.remove("disabled"));
        return; };
    if (!(e.target.closest(".add-msg") || e.target.classList.contains("task-text")) ){
        const editable = document.querySelectorAll(".editable");
        editable.forEach(el => el.remove());
        document.querySelectorAll(".add-btn").forEach(el => el.classList.add("hidden"));
        newTasksAttachers.forEach(adder => adder.classList.remove("disabled"));
    };
}


function createTaskBox() {

    const li = document.createElement('li');
    li.classList.add("task-box", "editable");
    const input = document.createElement('input');
    input.type = "text";
    input.classList.add("task-text");
    input.placeholder = "Input new task here";
    li.appendChild(input);
   return li;
}

function findAncestor (el, sel) {
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel)));
    return el;
}

function checkInput (e) {
    if (e.target.value.length > 0) {
        const container = findAncestor (e.target, ".desk-rows");
        const button = container.querySelector(".add-btn");
        const taskAttacher = container.querySelector(".add-msg");
        button.classList.remove("hidden");
        taskAttacher.classList.add("disabled");
        const editable = container.querySelector('.editable');
        button.onclick = (e) => {
            e.preventDefault();
            addTask(button, editable);
            newTasksAttachers.forEach(adder => adder.classList.remove("disabled"));
            container.querySelector(".tasks-container").removeEventListener('input', checkInput);
        };
    };
}

function addTask(button, taskBox) {
    const textArea = taskBox.querySelector(".task-text");
    saveToStorage();
    textArea.setAttribute('disabled', 'true');
    textArea.style.pointerEvents = "none";
    button.classList.add("hidden");
    taskBox.classList.remove('editable');
    newTasksAttachers.forEach(adder => adder.classList.remove("disabled"));
    findAncestor(button, ".rows-footer").querySelector(".add-msg").classList.remove("disabled");
    textArea.textContent = textArea.value;
}

function createX(e) {
    e.preventDefault();
    if (e.target.classList.contains('close')) { return; }
    if (e.target.classList.contains('editable')) { return; }
    if (e.target.classList.contains('task-box')) {
        const removeXcopy = e.target.querySelectorAll('.close');
        if (removeXcopy.length > 0) {
            removeXcopy.forEach(copy => copy.remove());
        };
        const removeX = document.createElement('div');
        removeX.classList.add("close");
        removeX.innerHTML = "&#x2716";
        removeX.style.visibility = 'hidden';
        setTimeout(() => {
            const {left,  top, width}  = e.target.getBoundingClientRect();
            removeX.style.position = 'absolute';
            removeX.style.top = top + 'px';
            removeX.style.left = left + width -20 + 'px';
            removeX.style.zIndex = "999";
            removeX.style.removeProperty('visibility');}, 300);
        e.target.closest(".task-box").appendChild(removeX);

    };
 
}


function taskDelBtnAppearance(e) {
    if (e.target.classList.contains('task-box')) {
        createX(e);
    }
    if (!(e.target.classList.contains("close") || e.target.classList.contains("task-box"))) {   
        removeX();
    }
};


function removeX() {
    document.querySelectorAll(".close").forEach(copy => copy.remove());
}


function saveToStorage() {
    const data = {};
    const rows = document.querySelectorAll(".desk-rows");
    rows.forEach((row, i) => {const tasks = row.querySelectorAll(".task-text");
        if (tasks.length > 0){
            const tasksTexts = [];
            tasks.forEach(task => {
                
                tasksTexts.push(task.value);
            });
            data[i] = tasksTexts;
        };
    
    });

    localStorage.setItem("data", JSON.stringify(data));
}





function getFromStorage() {
    if (localStorage.getItem("data")){
        const parsedData = JSON.parse(localStorage.getItem("data"));
        const rows = document.querySelectorAll(".tasks-container");
        rows.forEach((row, i) => { if (Object.keys(parsedData).includes(String(i))) parsedData[String(i)].forEach(el => {
            const taskBox = createTaskBox();
            const textArea = taskBox.querySelector(".task-text");
            textArea.value = el;
            textArea.setAttribute('disabled', 'true');
            textArea.style.pointerEvents = "none";
            taskBox.classList.remove("editable");
            row.appendChild(taskBox);
            });
            
        }
    );};
}
