

let opened = false;

function toggleForm(buttonClass, formContainerClass) {
    let addButton = document.getElementsByClassName(buttonClass)[0];
    let formContainer = document.getElementsByClassName(formContainerClass)[0];

    addButton.addEventListener('click', () => {
        if (!opened) {
            formContainer.style.display = 'inline';
            opened = true;
        } else {
            formContainer.style.display = 'none';
            opened = false;
        }
    });
}
populateSelectFromLocalStorage()




toggleForm("add-task-tgl", "pre-task-form-container");
toggleForm("add-person-btn", "post-person-form-container");

toggleForm("add-cat-btn", "category-form-container");



// collecting data from forms
    // person form

    function populateSelectFromLocalStorage() {
        let selectTaskPerson = document.getElementById('task-person');
        selectTaskPerson.innerHTML = ''; // Clear existing options
    
        // Retrieve people from local storage
        let existingPeople = JSON.parse(localStorage.getItem('people')) || [];
    
        // Add each person as an option in the select dropdown
        existingPeople.forEach(person => {
            let option = document.createElement('option');
            option.value = person.name;
            option.textContent = person.name;
            selectTaskPerson.appendChild(option);
        });
    }
    populateSelectFromLocalStorage()
    populateSelectCategoriesFromLocalStorage()


    let submitPerson = document.getElementById('submit-person');

    if (submitPerson) {
        submitPerson.addEventListener('click', (e) => {
            e.preventDefault();

            let personName = document.getElementById('person_name').value;
            let personOrganization = document.getElementById('person_organization').value;
            const person={
                name:personName,
                org: personOrganization

            }
            let existingPeople = JSON.parse(localStorage.getItem('people')) || [];
            existingPeople.push(person);
            localStorage.setItem('people', JSON.stringify(existingPeople));
            

            populateSelectFromLocalStorage()

            document.getElementById('person_name').value = '';
            document.getElementById('person_organization').value = '';

        });
    }


function populateSelectCategoriesFromLocalStorage() {
    let selectTaskCategory = document.getElementById('task-category');
    selectTaskCategory.innerHTML = ''; 


    let existingCategories = JSON.parse(localStorage.getItem('categories')) || [];


    existingCategories.forEach(category => {
        let option = document.createElement('option');
        option.value = category.name.toLowerCase();
        option.textContent = category.name;
        selectTaskCategory.appendChild(option);
    });
}

    document.addEventListener('DOMContentLoaded', function() {
        let categoryForm = document.querySelector('.task-category-form');
    
        if (categoryForm) {
            categoryForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                
                let categoryNameInput = document.getElementById('category-name');
                let categoryName = categoryNameInput.value.trim();

                const cat={
                    name:categoryName,

                }

                let existingcat = JSON.parse(localStorage.getItem('categories'))|| []
                existingcat.push(cat)
                localStorage.setItem('categories',JSON.stringify(existingcat))
    
                if (categoryName) { 
                    populateSelectCategoriesFromLocalStorage()
    

    
                    categoryNameInput.value = '';
    
                    console.log(`Added category: ${categoryName}`);
                } else {
                    alert('Please enter a category name.');
                }
            });
        }
    });


    
    

    // sending cats and people to local storage

    document.addEventListener('DOMContentLoaded', function() {

        let taskForm = document.getElementById('task-form');

        if (taskForm) {
            taskForm.addEventListener('submit', function(e) {
                e.preventDefault();
        
                let taskName = document.querySelector('.task-name').value.trim();
                let taskDesc = document.getElementById('task-desc').value.trim();
                let taskCategory = document.getElementById('task-category').value;
                let taskPerson = document.getElementById('task-person').value;
                let taskDueDate = document.getElementById('task-due-date').value;
                let taskDueTime = document.getElementById('task-due-time').value;
        
                // Combine date and time into a single dueDateTime string
                let dueDateTime = taskDueDate + 'T' + taskDueTime;
                let dueDateObj = new Date(dueDateTime);
                let currentDateObj = new Date();
                let timeDiff = dueDateObj.getTime() - currentDateObj.getTime();
                let timeDiffHours = timeDiff / (1000 * 60 * 60);
                let color = '';
                let taskStatus;
                let deleted = false; // Default value for deleted
        
                if (timeDiff <= 0) {
                    taskStatus = 'past due';
                    color = '#D94949';
                } else if (timeDiffHours <= 1) {
                    taskStatus = 'SOON';
                    color = '#DC841D';
                } else {
                    taskStatus = 'pending';
                    color = '#49B7D9';
                }
        
                // Generate a random 6-digit number for task id
                let taskId = Math.floor(100000 + Math.random() * 900000);
        
                const task = {
                    id: taskId,
                    name: taskName,
                    description: taskDesc,
                    category: taskCategory,
                    person: taskPerson,
                    dueDate: taskDueDate,
                    dueTime: taskDueTime,
                    status: taskStatus,
                    deleted: deleted // Assign deleted property here
                };
        
                let existingTasks = JSON.parse(localStorage.getItem('tasks1')) || [];
                existingTasks.push(task);
                localStorage.setItem('tasks1', JSON.stringify(existingTasks));
        
                // Render tasks immediately after adding new task
                renderTasks();
        
                // Clear form inputs after submission (optional)
                document.querySelector('.task-name').value = '';
                document.getElementById('task-desc').value = '';
                document.getElementById('task-category').value = '';
                document.getElementById('task-person').value = '';
                document.getElementById('task-due-date').value = '';
                document.getElementById('task-due-time').value = '';
        
                console.log('Task Object:', task);
            });
        }
        
        // Function to render tasks from local storage
        // Function to render tasks from local storage
        function renderTasks() {
            let tasksContainer = document.querySelector('.tasks-dashboard');
            tasksContainer.innerHTML = ''; // Clear existing tasks
        
            // Retrieve tasks from local storage
            let existingTasks = JSON.parse(localStorage.getItem('tasks1')) || [];
        
            // Map over existingTasks to create an array of task HTML strings
            let tasksHTML = existingTasks.map(task => {
                if(!task.deleted){
                    console.log(task.deleted)
                // Safely access task properties with default values or empty strings
                let taskName = task && task.name ? task.name : '';
                let taskCategory = task && task.category ? task.category : '';
                let taskPerson = task && task.person ? task.person : '';
                let taskStatus = task && task.status ? task.status.toUpperCase() : '';
                let taskDueTime = task && task.dueTime ? task.dueTime : '';
                let taskID = task && task.id ? task.id : '';
                let taskColor = ''; // Initialize task color variable
        
                // Determine color based on task status
                if (taskStatus === 'PAST DUE') {
                    taskColor = '#D94949';
                } else if (taskStatus === 'SOON') {
                    taskColor = '#DC841D';
                }else if(taskStatus==='PASSED'){
                    taskColor='#0FBC2B'

                } 
                else {
                    taskColor = '#49B7D9';
                }
                
        
                // Create task info HTML
                let taskInfoHTML = `
                    <div class="task-info">
                        <h3>${taskName}</h3>
                        <h5>${taskCategory}</h5>
                        <h5>${taskPerson}</h5>
                    </div>
                `;
        
                // Create task buttons HTML
                let taskBtnHTML = `
                    <div class="task-btn">
                        <i class="fa-regular fa-circle-check" data-id="${taskID}"></i>
                        <i class="fa-solid fa-trash" data-id="${taskID}"></i>
                    </div>
                `;
        
                // Create task status HTML with dynamically set color
                let taskStatusHTML = `
                    <div class="task-status">
                        <span><i class="fa-solid fa-circle" style="color: ${taskColor};"></i>
                        <h5 style="color: ${taskColor};">${taskStatus}</h5></span>
                        ${taskDueTime ? `<h5 style="color: ${taskColor};">${taskDueTime}</h5>` : ''}
                    </div>
                `;
        
                // Combine all HTML parts into a single task HTML
                return `
                    <div class="task" data-id="${taskID}">
                        ${taskInfoHTML}
                        ${taskBtnHTML}
                        ${taskStatusHTML}
                    </div>
                `;
        }
    });
        
            // Join all task HTML strings and set the innerHTML of tasksContainer
            tasksContainer.innerHTML = tasksHTML.join('');


            // task checked coded here 
            let checkIcons = tasksContainer.querySelectorAll('.fa-regular.fa-circle-check');
            checkIcons.innerHTML=`<i class="fa-solid fa-circle-check"></i>`
            checkIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    let taskId = this.getAttribute('data-id');
                    toggleTaskCompletion(taskId);
                });
            });


            function toggleTaskCompletion(taskId) {
                let existingTasks = JSON.parse(localStorage.getItem('tasks1')) || [];
        
                existingTasks.forEach(task => {
                    if (parseInt(task.id) === parseInt(taskId)) {
                        task.status = 'PASSED';
                    }
                });
        
                localStorage.setItem('tasks1', JSON.stringify(existingTasks));
        
                renderTasks(); // Update the UI after toggling completion
            }
    
        
            // Add event listener to trash icons
            let trashIcons = tasksContainer.querySelectorAll('.fa-trash');
            trashIcons.forEach(icon => {
                icon.addEventListener('click', function () {
                    let taskId = this.getAttribute('data-id');
                    deleteTask(taskId);
                });
            });
        }
        
        function deleteTask(taskId) {
            // Retrieve tasks from local storage
            let existingTasks = JSON.parse(localStorage.getItem('tasks1')) || [];
        
            // Filter out the task with the given taskId
            existingTasks = existingTasks.filter(task => parseInt(task.id) !== parseInt(taskId));
        
            // Update local storage with the filtered tasks array
            localStorage.setItem('tasks1', JSON.stringify(existingTasks));
        
            // Remove the task element from the DOM
            let taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
            if (taskElement) {
                taskElement.remove();
            }
        
            console.log(`Task with ID ${taskId} removed.`);
            
            // Optional: Render tasks again to update the UI
            renderTasks();
        }
        
        renderTasks();



  

    });


    // responsiveness menu

    document.addEventListener('DOMContentLoaded', function() {
        let menuIcons = document.getElementsByClassName('menu-bar');
        let sideBars = document.getElementsByClassName('left-side-bar');
    
        // Ensure there is at least one sidebar
        if (sideBars.length > 0) {
            let sideBar = sideBars[0]; // Assuming you want to target the first sidebar
    
            // Convert HTMLCollection to an array and iterate over each element
            Array.from(menuIcons).forEach(icon => {
                icon.addEventListener('click', () => {
                    if(
                    sideBar.style.display === 'none'

                    ){
                    sideBar.style.display = 'flex';

                    }
                    else{
                    sideBar.style.display = 'none';

                    }
                });
            });
        }
    });
    
    
    