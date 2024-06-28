// Function to toggle form visibility
function toggleForm(buttonClass, formContainerClass) {
    let addButton = document.getElementsByClassName(buttonClass)[0];
    let formContainer = document.getElementsByClassName(formContainerClass)[0];
    let opened = false;

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



toggleForm("add-task-tgl", "pre-task-form-container");
toggleForm("add-person-btn", "post-person-form-container");

toggleForm("add-cat-btn", "category-form-container");
