// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector("#grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list")
const clearBtn = document.querySelector(".clear-btn")


// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit",addItem)

clearBtn.addEventListener("click",clearItems)



// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){
        const element = document.createElement("article");
        element.classList.add("grocery-item");

        //add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `

        //append child
        list.appendChild(element);
        const editBtn = element.querySelector(".edit-btn")
        const deleteBtn = element.querySelector(".delete-btn")

        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);
        container.classList.add("show-container");
        setBackToDefault();
        displayAlert("added item successfully","success")
        addToLocalStorage(id,value);
    } else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert("value changed","success")

        //edit local storage
        editLocalStorage(editID,value)
        setBackToDefault();
        
    } else{
        displayAlert("please enter value","danger")
    }

} 


//edit items
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editFlag = true;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editID = element.dataset.id;
    submitBtn.innerText = "edit";
}


//delete items
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
       container.classList.remove("show-container");
    }
    displayAlert("Deleted Successfully","danger")
    setBackToDefault();

    //remove from local storage
    removeFromLocalStorage(id);
}


//clear Items
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach((item)=>{
            list.removeChild(item);
        })
    }

    container.classList.remove("show-container");
    displayAlert("empty list","success");
    //localStorage.removeItem('list');
    setBackToDefault();
}

//set back to default
function setBackToDefault(){
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.innerText = "submit";
}



// display alert
function displayAlert(text,action){
    alert.innerText = text;
    alert.classList.add(`alert-${action}`)

    //remove alert
    setTimeout(function(){
        alert.innerText = "";
        alert.classList.remove(`alert-${action}`)
    },2000)
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
    const grocery = {id,value};
    localStorage.setItem("list",JSON.stringify([value]));
}

function removeFromLocalStorage(id){

}

function editLocalStorage(id,value){

}
// ****** SETUP ITEMS **********
