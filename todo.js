/* global variables */
let todo=[];            // array to store list
let i=0;                // temporary variale
let str;                // temporary variale   
let len=0;              // variable for maintaining length of todo list 
let completedTasks = 0; // counter for completed tasks
/* function definitions */
window.onload = function(){
    console.log("WELCOME.....To DO List Initiated......");       
    window.newtask = document.getElementById('newtask');
    window.addtask = document.getElementById('addtask');
    window.deleteall = document.getElementById('deleteall');
    window.list = document.getElementById('todolist1');
    window.deletecomplete = document.getElementById('deletecomplete');
    window.sortcomplete = document.getElementById('sortcomplete');
    //calling getlist function
    getList();
    // on addtask button click event handler
    addtask.onclick = function(){   
        if(newtask.value == ''){
            let temp = prompt("Please enter a Valid Text....!!", "");
            if (temp == null || temp == "") {    
            } else {
                newtask.value=temp
                let t =new TodoList(newtask.value);     
                todo.push(t);              
            }
        }
        else{
        let t =new TodoList(newtask.value);     
        todo.push(t);
        } 
    saveList();                                                    //when a new task is added calling save list and get list function
    getList();                                                     //to maintain update copy of list in local storage and on webpage  
    newtask.value="";                                              // setting value to empty so that the previous value does not remains in the text box 
    }
    /*  function to sort list  */
    sortcomplete.onclick = function(){
        let temp;
        let flag=1;
        len=todo.length
        if(len==0){
            alert("Empty List....!!");
        }else{
        for(i=len-1;i>=0;i--){
            if(todo[i].completed == true){
                todo.push(todo[i])
                todo.splice(i, 1);
                flag=0;          
            }
        }
        if(flag){
            alert("No Task Completed....!!");
        }
        }
        saveList();                                                    //when a new task is added calling save list and get list function
        getList(); 
    }
    /* funtion to delete completed tasks from the list  */
    deletecomplete.onclick = function(){
        let flag=1;                                                // flag variable to check wether there is any completed tasks in the todo list or not
        if(len==0){
            alert("List is empty can not delete items...!");       //if the list is empty alert user
        }else{
            for(i=len-1;i>=0;i--){
                if(todo[i].completed == true){
                    todo.splice(i, 1);                              // deleting completed tasks
                    flag=0                                          // set flag to indicate the user has got completed tasks
                }               
            }
            if(flag){
                alert("You got no completed task to delete....!!");     // alert user if there is no completed task
            }
        }       
        completedTasks=0;
        len=0
        saveList();
        getList();                                                  // Refresing/Updating the list after deleting completed tasks
    }
    /* function to delete entire list  */
    deleteall.onclick = function(){
        if(todo.length==0){
         alert("Empty List....can not delete...!!");
        }else{
            completedTasks=0;
            len=0
            localStorage.clear();
            localStorage.setItem("todolist", "");                       // clearing off the list from the local storage
            getList();
        }
    }
}
    /* Class to create list object/instances */
    function TodoList(name){
        this.name = name;
        this.completed = false;
    }
    /* retrieve list from local strorage */
    function getList(){
    todo=[];                                                        // resetting todo to prevent duplicate values in the list
    let s='';                                                       // variable to stitch html tags and task to pass to innerHTML
    completedTasks=0;                                               //checking if list is not empty using if() condition
    if(localStorage.getItem("todolist") != "" && localStorage.getItem("todolist") != "[]" ){ 
        let str = localStorage.getItem("todolist");
        if(str != null){                                             //condition check to prevent empty list from parsing
            todo = JSON.parse(str)  
        }
        if(todo.length >0){                                          //condition check to prevent empty list from printing
             len = todo.length                                       
            for(i=0;i<len;i++){
                let index=i+1;
                s+='<li class="list-group-item "><div class="row"> ';
                s+=' <div class="col-md-1"><input type="checkbox" value="done" id="cb" class="form-check-input" onclick="check('+index+')" '; 
                if(todo[i].completed == true){                        // condition check to strike through the completed tasks
                completedTasks++;                                     // maintaining the count of the completed tasks
                s+='style="text-decoration: line-through;" checked></div>';
                s+='<div class="col-md-2">'+index+' . <strike><b>'+todo[i].name+'</b></strike></div>';            
                }else{
                s+="></div>  ";
                s+='<div class="col-md-2">'+index+' . <b>'+todo[i].name+'</b></div>';            
                }
                if(len == 1 && i==0){
                    s+='<div class="col-md-3"><button style="font-size:18px" class="btn btn-basic" title="Modify"  onclick="modifyTask('+index+')"> <i class="fa fa-pencil"></i></button> <button style="font-size:18px" title="Delete task" id="delete" class="btn btn-danger" onclick="deleteTask('+index+')"><i class="fa fa-remove"></i></button></li></div></div>';
                }
                else if(i==0){                                              // condition check to remove the move up button from the first element of the list
                    s+=' <div class="col-md-7"><button style="font-size:18px" class="btn btn-basic" title="Move Down" onclick="moveDwn('+index+')"> <i class="fa fa-sort-desc"></i></button> <button style="font-size:18px" class="btn btn-basic" title="Modify"  onclick="modifyTask('+index+')"> <i class="fa fa-pencil"></i></button> <button style="font-size:18px" title="Delete task" id="delete" class="btn btn-danger" onclick="deleteTask('+index+')"><i class="fa fa-remove"></i></button></li></div></div>';
                }
                else if(i == len-1){                                   // condition check to remove the move down button from the last element of the list
                    s+=' <div class="col-md-5">   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <button style="font-size:18px" title="Move Top" id="movetop" class="btn btn-success" onclick="moveTop('+index+')"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></button><button style="font-size:18px" class="btn btn-basic" title="Move Up" onclick="moveUp('+index+')" > <i class="fa fa-sort-asc"></i></button>  <button style="font-size:18px" class="btn btn-basic" title="Modify"  onclick="modifyTask('+index+')"> <i class="fa fa-pencil"></i></button> <button style="font-size:18px" title="Delete task" id="delete" class="btn btn-danger" onclick="deleteTask('+index+')"><i class="fa fa-remove"></i></button></li></div></div>';
                }
                else{
                    s+=' <div class="col-md-6"><button style="font-size:18px" title="Move Top" id="movetop" class="btn btn-success" onclick="moveTop('+index+')"><i class="fa fa-long-arrow-up" aria-hidden="true"></i></button> <button style="font-size:18px" class="btn btn-basic" title="Move Up" onclick="moveUp('+index+')"> <i class="fa fa-sort-asc"></i></button> <button style="font-size:18px" class="btn btn-basic" title="Move Down" onclick="moveDwn('+index+')"> <i class="fa fa-sort-desc"></i></button> <button style="font-size:18px" class="btn btn-basic" title="Modify"  onclick="modifyTask('+index+')"> <i class="fa fa-pencil"></i></button> <button style="font-size:18px" title="Delete task" id="delete" class="btn btn-danger" onclick="deleteTask('+index+')"><i class="fa fa-remove"></i></button></div></div></li>';
                }
                }
                list.innerHTML=s;
        }
        }else{
            list.innerHTML="<b> EMPTY LIST <b>";                                //displaying empty list message
        }
        let totalTask = document.getElementById('totaltask');
        totalTask.innerText='Total Task(s) : '+len;                             //setting total tasks count in the navbar
        let taskcompleted = document.getElementById('taskcompleted');
        if(completedTasks<(len-completedTasks)){
            taskcompleted.innerHTML='<i class="fa fa-warning" style="color:red"></i>Total Task(s) Completed : '+completedTasks;
        }else{
            taskcompleted.innerText='Total Task(s) Completed : '+completedTasks;    //setting total completed tasks count in the navbar
        }
        let taskremaining = document.getElementById('taskremaining');
        taskremaining.innerText='Total Task(s) Remaining : '+(len-completedTasks);  // setting remaining tasks count in the navbar
    }    
 /* Saves data to local storage to make list persistent */
  function saveList(){   
    str = JSON.stringify(todo);
    localStorage.clear();
    localStorage.setItem("todolist", str);
}
/* function to mark particular task as completed based on index */
function check(index){
    if(todo[index-1].completed == false){                                   //condition check to toggle the tasks status between completed and not completed
        todo[index-1].completed=true;
    }else{
        todo[index-1].completed=false;    
    }
    saveList();
    getList();
}
/* function to delete a particular task based on index */
function deleteTask(index){
    index=index-1
    todo.splice(index, 1);
    completedTasks=0;
    len=0
    saveList();
    getList();
}
/* function to move up a task in the list */
function moveUp(index){
    let tempName;
    let tempCompleted;
    index--
    tempName=todo[index].name
    tempCompleted=todo[index].completed
    todo[index].name=todo[index-1].name
    todo[index].completed=todo[index-1].completed
    todo[index-1].name=tempName
    todo[index-1].completed=tempCompleted
  saveList();
  getList();
}
/* function to move down a task in the list */
function moveDwn(index){
    let tempName;
    let tempCompleted;
    index--
    tempName=todo[index].name
    tempCompleted=todo[index].completed
    todo[index].name=todo[index+1].name
    todo[index].completed=todo[index+1].completed
    todo[index+1].name=tempName
    todo[index+1].completed=tempCompleted
    saveList();
    getList();
}
/* function to modify task  */
function modifyTask(index){
    index--
    let temp = prompt("Please enter new task", todo[index].name);
    if(temp != null){
    todo[index].name=temp
    saveList();
    getList();
    }
}
/* function to move task to top */
function moveTop(index){
    index--
    todo.unshift(todo[index])
    todo.splice(index+1,1)
  saveList();
  getList();
}
