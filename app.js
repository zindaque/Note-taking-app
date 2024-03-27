// slectors
const addBox=document.querySelector(".add-box");
const popupBox=document.querySelector(".popup-box");
const closeIcon=document.querySelector("header i");
const addBtn=popupBox.querySelector("form button")
const titleTag=document.querySelector("input")
const descTag=document.querySelector("textarea")

const months=["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

const notes=JSON.parse(localStorage.getItem("notes") || "[]");

const popupTitle=document.querySelector("header p");
let isUpdate=false, UpdateId;

// event listners
// getting the popup box
addBox.addEventListener("click", function(){
    titleTag.focus();
    popupBox.classList.add("show");
});

// closing the popup box icon
closeIcon.addEventListener("click", function(){
    titleTag.value="";
    descTag.value="";
    addBtn.innerText="Add Note";
    popupTitle.innerText="Add a new Note";
    popupBox.classList.remove("show");
});

// using the add btn only when title and desc are filled/ also storing the data in localstorage
addBtn.addEventListener("click", function(e){
    e.preventDefault();
    let noteTitile=titleTag.value;
    let noteDesc=descTag.value;

    if(noteTitile || noteDesc){
// adding the current date 
        let dateObj= new Date(),
        month=months[dateObj.getMonth()],
        day=dateObj.getDate(),
        year=dateObj.getFullYear();

        let noteInfo={
            title: noteTitile, description: noteDesc, date: `${month} ${day}, ${year}`
        }
    if(!isUpdate){
        notes.push(noteInfo);
    }else {
        isUpdate =false;
        notes[UpdateId]= noteInfo;
    }
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

// functions

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note,index)=>{
        let liTag=`<ul class="note">
                        <div class="details">
                            <p class="title">${note.title}</p>
                            <div class="desc">
                            <span class="description">${note.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span class="date">${note.date}</span>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                    <div class="menu">
                                        <li onclick="updateNote(${index},'${note.title}','${note.description}')"><i class="fa-solid fa-pen">Edit</i></li>
                                        <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash">Delete</i></li>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </ul>`;
                    addBox.insertAdjacentHTML("afterend",liTag);
    });
};
showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show")
        }
    });
}

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this item?");
    if(!confirmDel) return;

    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId,title,desc){
    isUpdate=true;
    UpdateId=noteId;
    addBox.click();
    titleTag.value=title;
    descTag.value=desc;
    addBtn.innerText="Update Note";
    popupTitle.innerText="Update a Note";
}