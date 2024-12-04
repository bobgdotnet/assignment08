// CREATE AN ARRAY OF EMPLOYEES
const initialEmployees = [
    { id: 12345678, name: "Washington Irving", extension: 1783, email: "wirving@deadwriters.com", department: "Engineering" },
    { id: 87654321, name: "William Shakespeare", extension: 1564, email: "wshakespeare@deadwriters.com", department: "Marketing" },
    { id: 24681357, name: "Fyodor Dostoevsky", extension: 1821, email: "fdostoevsky@deadwriters.com", department: "Sales" },
    { id: 98765432, name: "Charles Dickens", extension: 1812, email: "cdickens@deadwriters.com", department: "QA" },
    { id: 34567890, name: "Alexandre Dumas", extension: 1802, email: "adumas@deadwriters.com", department: "Administrative" }
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
	//if (localStorage.getItem("employees")) {
	//    employees = JSON.parse(localStorage.getItem("employees"));
	//}
let employees = JSON.parse(localStorage.getItem("employees")) || [...initialEmployees];

// GET DOM ELEMENTS
const empTable = document.getElementById("empTable");
const tbody = empTable.querySelector("tbody");
const form = document.getElementById("addForm");
const empCount = document.getElementById("empCount");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
document.addEventListener("DOMContentLoaded", buildGrid);

// ADD EMPLOYEE
form.addEventListener("submit", (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const extension = parseInt(document.getElementById("extension").value);
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    const newEmployee = { id, name, extension, email, department };

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();

    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById("id").focus();
});

// DELETE EMPLOYEE
empTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        // CONFIRM THE DELETE
        if (confirm("Are you sure you want to delete this employee?")) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            const rowIndex = e.target.parentNode.parentNode.rowIndex - 1;

            // REMOVE EMPLOYEE FROM ARRAY
            employees.splice(rowIndex, 1);

            // BUILD THE GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    tbody.innerHTML = "";

   // REPOPULATE EMPLOYEES FROM INITIAL DATA IF EMPTY
    if (employees.length === 0) {
        employees = [...initialEmployees];
    }


    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (const employee of employees) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class="btn btn-danger btn-sm delete">Delete</button></td>
        `;

        // APPEND THE ROW TO THE TBODY
        tbody.appendChild(row);
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);

    // UPDATE EMPLOYEE COUNT
    empCount.textContent = `(${employees.length})`;

    // STORE THE ARRAY IN STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
}