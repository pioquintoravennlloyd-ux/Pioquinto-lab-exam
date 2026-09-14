import {
    calculateFinalGrade,
    getAcademicStatus,
    getPerformanceRemark,
    calculateClassAverage,
    countPassingStudents,
    getTopStudent
} from "./gradeUtils.js";


export function displayStudents(students) {
    const studentList = document.querySelector("#studentList");

    studentList.innerHTML = "";

    if (students.length === 0) {
        displayMessage("No students found");
        return;
    }

    displayMessage("");

    students.forEach(student => {
        const {
            id,
            name,
            block,
            quiz,
            lab,
            exam
        } = student;

        const finalGrade = calculateFinalGrade(student);
        const academicStatus = getAcademicStatus(finalGrade);
        const performanceRemark = getPerformanceRemark(finalGrade);

        const article = document.createElement("article");

        article.className = "student-card";

        article.innerHTML = `
            <div class="student-header">
                <div>
                    <h3>${name}</h3>
                    <p>ID: ${id}</p>
                </div>

                <span class="status">
                    ${academicStatus}
                </span>
            </div>

            <p class="block">
                <strong>Block:</strong> ${block}
            </p>

            <div class="scores">
                <div>
                    <span>Quiz</span>
                    <strong>${quiz}</strong>
                </div>

                <div>
                    <span>Laboratory</span>
                    <strong>${lab}</strong>
                </div>

                <div>
                    <span>Prelim Exam</span>
                    <strong>${exam}</strong>
                </div>
            </div>

            <div class="grade-result">
                <p>
                    <strong>Final Grade:</strong>
                    ${finalGrade.toFixed(2)}
                </p>

                <p>
                    <strong>Academic Status:</strong>
                    ${academicStatus}
                </p>

                <p>
                    <strong>Performance Remark:</strong>
                    ${performanceRemark}
                </p>
            </div>
        `;

        studentList.appendChild(article);
    });
}


export function displaySummary(students) {
    const classAverage = document.querySelector("#classAverage");
    const passingCount = document.querySelector("#passingCount");
    const displayedCount = document.querySelector("#displayedCount");
    const topStudent = document.querySelector("#topStudent");

    const average = calculateClassAverage(students);
    const passing = countPassingStudents(students);
    const top = getTopStudent(students);

    classAverage.textContent = average.toFixed(2);
    passingCount.textContent = passing;
    displayedCount.textContent = students.length;

    if (top === null) {
        topStudent.textContent = "None";
    } else {
        const topGrade = calculateFinalGrade(top);

        topStudent.textContent =
            `${top.name} (${topGrade.toFixed(2)})`;
    }
}


export function displayMessage(message) {
    const messageArea = document.querySelector("#messageArea");

    messageArea.textContent = message;
}