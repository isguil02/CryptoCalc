async function loadStudents() {
    const status = document.getElementById("status");
    const studentBody = document.getElementById("studentBody");

    try {
        status.textContent = "Loading...";
        studentBody.innerHTML = "";

        const response = await fetch("/students");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const students = await response.json();

        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.grade}</td>
            `;
            studentBody.appendChild(row);
        });

        status.textContent = `${students.length} students loaded!`;

    } catch (error) {
        status.textContent = "Error loading students: " + error.message;
        console.error(error);
    }
}