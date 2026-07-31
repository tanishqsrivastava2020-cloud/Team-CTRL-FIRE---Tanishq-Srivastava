// ========== DATABASE INITIALIZATION ==========

class RealTimeDB {
    constructor() {
        this.init();
        this.setupStorageListener();
    }

    init() {
        if (!localStorage.getItem('campusDB')) {
            const initialData = {
                admin: {
                    username: 'admin',
                    password: 'admin123'
                },

                students: [
                    {
                        email: 'student1@college.edu',
                        password: 'student123',
                        regNo: 'CS2021001',
                        name: 'Aarav Sharma',
                        room: '101',
                        proctorId: 'P001',
                        parentId: 'PAR001'
                    },
                    {
                        email: 'student2@college.edu',
                        password: 'student123',
                        regNo: 'CS2021002',
                        name: 'Diya Patel',
                        room: '102',
                        proctorId: 'P001',
                        parentId: 'PAR002'
                    },
                    {
                        email: 'student3@college.edu',
                        password: 'student123',
                        regNo: 'CS2021003',
                        name: 'Vihaan Kumar',
                        room: '201',
                        proctorId: 'P002',
                        parentId: 'PAR003'
                    },
                    {
                        email: 'student4@college.edu',
                        password: 'student123',
                        regNo: 'CS2021004',
                        name: 'Ananya Singh',
                        room: '202',
                        proctorId: 'P002',
                        parentId: 'PAR004'
                    }
                ],

                faculty: [
                    {
                        id: 'F001',
                        email: 'faculty1@college.edu',
                        password: 'faculty123',
                        name: 'Dr. Rajesh Kumar',
                        subject: 'Mathematics'
                    },
                    {
                        id: 'F002',
                        email: 'faculty2@college.edu',
                        password: 'faculty123',
                        name: 'Dr. Priya Menon',
                        subject: 'Physics'
                    },
                    {
                        id: 'F003',
                        email: 'faculty3@college.edu',
                        password: 'faculty123',
                        name: 'Prof. Amit Sharma',
                        subject: 'Chemistry'
                    }
                ],

                proctors: [
                    {
                        id: 'P001',
                        email: 'proctor1@college.edu',
                        password: 'proctor123',
                        name: 'Prof. Suresh Babu'
                    },
                    {
                        id: 'P002',
                        email: 'proctor2@college.edu',
                        password: 'proctor123',
                        name: 'Dr. Lakshmi Devi'
                    }
                ],

                parents: [
                    {
                        id: 'PAR001',
                        email: 'parent1@email.com',
                        password: 'parent123',
                        studentRegNo: 'CS2021001',
                        studentName: 'Aarav Sharma',
                        mobile: '+91-9876543210',
                        address: '123 Main St, Mumbai'
                    },
                    {
                        id: 'PAR002',
                        email: 'parent2@email.com',
                        password: 'parent123',
                        studentRegNo: 'CS2021002',
                        studentName: 'Diya Patel',
                        mobile: '+91-9876543211',
                        address: '456 Park Ave, Delhi'
                    },
                    {
                        id: 'PAR003',
                        email: 'parent3@email.com',
                        password: 'parent123',
                        studentRegNo: 'CS2021003',
                        studentName: 'Vihaan Kumar',
                        mobile: '+91-9876543212',
                        address: '789 Hill Rd, Bangalore'
                    },
                    {
                        id: 'PAR004',
                        email: 'parent4@email.com',
                        password: 'parent123',
                        studentRegNo: 'CS2021004',
                        studentName: 'Ananya Singh',
                        mobile: '+91-9876543213',
                        address: '321 Lake View, Chennai'
                    }
                ],

                hr: [
                    {
                        email: 'hr@college.edu',
                        password: 'hr123',
                        name: 'Hostel Manager'
                    }
                ],

                leaves: [],
                assignments: [],
                hostelIssues: [],
                attendance: [],
                activeQR: null,
                submittedAssignments: []
            };

            localStorage.setItem('campusDB', JSON.stringify(initialData));
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('campusDB'));
    }

    setData(data) {
        localStorage.setItem('campusDB', JSON.stringify(data));
        this.triggerUpdate();
    }

    triggerUpdate() {
        window.dispatchEvent(new CustomEvent('campusDBUpdate'));
    }

    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'campusDB') {
                window.dispatchEvent(new CustomEvent('campusDBUpdate'));
            }
        });
    }

    addLeave(leave) {
        const data = this.getData();
        leave.id = 'L' + Date.now();
        leave.timestamp = new Date().toISOString();
        data.leaves.push(leave);
        this.setData(data);
        return leave.id;
    }

    updateLeave(leaveId, updates) {
        const data = this.getData();
        const leave = data.leaves.find(l => l.id === leaveId);

        if (leave) {
            Object.assign(leave, updates);
            this.setData(data);
        }
    }

    addAssignment(assignment) {
        const data = this.getData();
        assignment.id = 'A' + Date.now();
        assignment.timestamp = new Date().toISOString();
        data.assignments.push(assignment);
        this.setData(data);
        return assignment.id;
    }

    submitAssignment(submission) {
        const data = this.getData();
        submission.id = 'S' + Date.now();
        submission.timestamp = new Date().toISOString();
        submission.status = 'submitted';

        data.submittedAssignments.push(submission);
        this.setData(data);

        return submission.id;
    }

    updateSubmission(submissionId, updates) {
        const data = this.getData();
        const submission = data.submittedAssignments.find(s => s.id === submissionId);

        if (submission) {
            Object.assign(submission, updates);
            this.setData(data);
        }
    }

    addHostelIssue(issue) {
        const data = this.getData();
        issue.id = 'H' + Date.now();
        issue.timestamp = new Date().toISOString();
        issue.status = 'pending';

        data.hostelIssues.push(issue);
        this.setData(data);

        return issue.id;
    }

    updateHostelIssue(issueId, updates) {
        const data = this.getData();
        const issue = data.hostelIssues.find(i => i.id === issueId);

        if (issue) {
            Object.assign(issue, updates);
            this.setData(data);
        }
    }

    addAttendance(attendance) {
        const data = this.getData();
        attendance.id = 'AT' + Date.now();
        attendance.timestamp = new Date().toISOString();

        data.attendance.push(attendance);
        this.setData(data);
    }

    setActiveQR(qrData) {
        const data = this.getData();
        data.activeQR = qrData;
        this.setData(data);
    }

    addStudent(student) {
        const data = this.getData();

        student.regNo =
            'CS2021' + String(data.students.length + 1).padStart(3, '0');

        student.email =
            student.email || `${student.regNo}@college.edu`;

        data.students.push(student);
        this.setData(data);

        return student.regNo;
    }

    addFaculty(faculty) {
        const data = this.getData();

        faculty.id =
            'F' + String(data.faculty.length + 1).padStart(3, '0');

        data.faculty.push(faculty);
        this.setData(data);

        return faculty.id;
    }

    addProctor(proctor) {
        const data = this.getData();

        proctor.id =
            'P' + String(data.proctors.length + 1).padStart(3, '0');

        data.proctors.push(proctor);
        this.setData(data);

        return proctor.id;
    }

    addParent(parent) {
        const data = this.getData();

        parent.id =
            'PAR' + String(data.parents.length + 1).padStart(3, '0');

        data.parents.push(parent);
        this.setData(data);

        return parent.id;
    }
}

const db = new RealTimeDB();

let currentUser = null;
let currentRole = null;
let qrTimer = null;

// ========== UTILITY FUNCTIONS ==========

  function generate5CharCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 5; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }

        function showToast(message, type = 'info', title = 'Notification') {
            const toast = document.getElementById('toast');
            const toastIcon = document.getElementById('toastIcon');
            const toastTitle = document.getElementById('toastTitle');
            const toastMessage = document.getElementById('toastMessage');

            const icons = {
                success: '✅',
                error: '❌',
                info: '🔔',
                warning: '⚠️'
            };

            toast.className = 'toast show toast-' + type;
            toastIcon.textContent = icons[type] || icons.info;
            toastTitle.textContent = title;
            toastMessage.textContent = message;

            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }

        function formatDateOnly(dateString) {
            return new Date(dateString).toLocaleDateString();
        }
  function updateNotificationBadge(elementId, count) {
    const element = document.getElementById('elementId');
    if (!element) return;

    let badge = element.querySelector('.notification-badge');

    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'notification-badge';
            element.style.position = 'relative';
            element.appendChild(badge);
        }

        badge.textContent = count;
    } else if (badge) {
        badge.remove();
    }
}

function showPortal(role) {
    document.querySelectorAll('.portal').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));

    const portal = document.getElementById(role + 'Portal');

    if (portal) {
        portal.classList.add('active');
        currentRole = role;

        const button = document.getElementById(role + 'RoleBtn');

        if (button) {
            button.classList.add('active');
        }
    }
}

function logout() {
    currentUser = null;
    currentRole = null;

    if (qrTimer) clearInterval(qrTimer);

    location.reload();
}

function switchTab(event, portal, tab) {
    const tabs = document.querySelectorAll(`#${portal}Dashboard .tab`);
    tabs.forEach(t => t.classList.remove('active'));

    event.target.classList.add('active');

    const contents = document.querySelectorAll(`#${portal}Dashboard .tab-content`);
    contents.forEach(c => c.classList.remove('active'));

    const content = document.getElementById(`${portal}-${tab}`);

    if (content) {
        content.classList.add('active');
    }
}

function populateDropdowns() {
    const data = db.getData();

    // Student Dropdown
    const studentSelect = document.getElementById('studentSelect');
    studentSelect.innerHTML =
        '<option value="">-- Select Student --</option>' +
        data.students
            .map(
                s =>
                    `<option value="${s.regNo}">${s.name} (${s.regNo})</option>`
            )
            .join('');

    // Faculty Dropdown
    const facultySelect = document.getElementById('facultySelect');
    facultySelect.innerHTML =
        '<option value="">-- Select Faculty --</option>' +
        data.faculty
            .map(
                f =>
                    `<option value="${f.id}">${f.name} - ${f.subject}</option>`
            )
            .join('');

    // Proctor Dropdown
    const proctorSelect = document.getElementById('proctorSelect');
    proctorSelect.innerHTML =
        '<option value="">-- Select Proctor --</option>' +
        data.proctors
            .map(
                p =>
                    `<option value="${p.id}">${p.name}</option>`
            )
            .join('');

    // Parent Dropdown
    const parentSelect = document.getElementById('parentSelect');
    parentSelect.innerHTML =
        '<option value="">-- Select Parent Account --</option>' +
        data.parents
            .map(
                p =>
                    `<option value="${p.id}">Parent of ${p.studentName}</option>`
            )
            .join('');

    // Admin Student Dropdown
    const assignStudentSelect =
        document.getElementById('assignStudentSelect');

    if (assignStudentSelect) {
        assignStudentSelect.innerHTML =
            '<option value="">-- Select Student --</option>' +
            data.students
                .map(
                    s =>
                        `<option value="${s.regNo}">${s.name} (${s.regNo})</option>`
                )
                .join('');
    }

    // Admin Proctor Dropdown
    const assignProctorSelect =
        document.getElementById('assignProctorSelect');

    if (assignProctorSelect) {
        assignProctorSelect.innerHTML =
            '<option value="">-- Select Proctor --</option>' +
            data.proctors
                .map(
                    p =>
                        `<option value="${p.id}">${p.name}</option>`
                )
                .join('');
    }

    // Parent Registration Dropdown
    const newParentStudentRegNo =
        document.getElementById('newParentStudentRegNo');

    if (newParentStudentRegNo) {
        newParentStudentRegNo.innerHTML =
            '<option value="">-- Select Student --</option>' +
            data.students
                .map(
                    s =>
                        `<option value="${s.regNo}">${s.name} (${s.regNo})</option>`
                )
                .join('');
    }

    // Proctor Student Dropdown
    const proctorStudentSelect =
        document.getElementById('proctorStudentSelect');

    if (
        proctorStudentSelect &&
        currentUser &&
        currentRole === 'proctor'
    ) {
        const myStudents = data.students.filter(
            s => s.proctorId === currentUser.id
        );

        proctorStudentSelect.innerHTML =
            '<option value="">-- Select Student --</option>' +
            myStudents
                .map(
                    s =>
                        `<option value="${s.regNo}">${s.name} (${s.regNo})</option>`
                )
                .join('');
    }
}

// ===================== PASSWORD MANAGEMENT =====================

function openPasswordModal() {
    document.getElementById('passwordModal').classList.add('show');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('show');
}

function changePassword() {
    const currentPass =
        document.getElementById('currentPassword').value;

    const newPass =
        document.getElementById('newPassword').value;

    const confirmPass =
        document.getElementById('confirmPassword').value;

    if (!currentPass || !newPass || !confirmPass) {
        showToast('Please fill all fields', 'error', 'Error');
        return;
    }

    if (newPass !== confirmPass) {
        showToast('New passwords do not match', 'error', 'Error');
        return;
    }

    const data = db.getData();

    let currentPassword = '';
    let identifier = '';

    if (currentRole === 'admin') {
        currentPassword = data.admin.password;
        identifier = 'admin';
    } else if (currentRole === 'student') {
        currentPassword = currentUser.password;
        identifier = currentUser.regNo;
    } else if (currentRole === 'faculty') {
        currentPassword = currentUser.password;
        identifier = currentUser.id;
    } else if (currentRole === 'proctor') {
        currentPassword = currentUser.password;
        identifier = currentUser.id;
    } else if (currentRole === 'parent') {
        currentPassword = currentUser.password;
        identifier = currentUser.id;
    } else if (currentRole === 'hr') {
        currentPassword = currentUser.password;
        identifier = 'hr';
    }

    if (currentPass !== currentPassword) {
        showToast('Current password is incorrect', 'error', 'Error');
        return;
    }

    db.updatePassword(currentRole, identifier, newPass);
    currentUser.password = newPass;

    showToast(
        'Password updated successfully!',
        'success',
        'Success'
    );

    closePasswordModal();
}

// ===================== ADMIN LOGIN =====================

function adminLogin() {
    const username =
        document.getElementById('adminUsername').value;

    const password =
        document.getElementById('adminPassword').value;

    const data = db.getData();

    if (
        username === data.admin.username &&
        password === data.admin.password
    ) {
        currentUser = data.admin;

        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';

        showToast(
            'Welcome Admin!',
            'success',
            'Login Successful'
        );

        loadAdminDashboard();
    } else {
        showToast(
            'Invalid credentials',
            'error',
            'Login Failed'
        );
    }
}

function loadAdminDashboard() {
    const data = db.getData();

    document.getElementById('adminTotalStudents').textContent =
        data.students.length;

    document.getElementById('adminTotalFaculty').textContent =
        data.faculty.length;

    document.getElementById('adminTotalProctors').textContent =
        data.proctors.length;

    document.getElementById('adminTotalParents').textContent =
        data.parents.length;

    loadAdminUsers();
    loadCurrentAssignments();
    populateDropdowns();
}

function loadAdminUsers() {
    const data = db.getData();

    // Students
    const studentsList =
        document.getElementById('adminStudentsList');

    studentsList.innerHTML = data.students
        .map(s => {
            const proctor = data.proctors.find(
                p => p.id === s.proctorId
            );

            return `
<div class="user-card">
    <div class="user-info">
        <h4>${s.name} (${s.regNo})</h4>
        <p>
            Email: ${s.email} |
            Room: ${s.room} |
            Proctor: ${proctor ? proctor.name : 'Not Assigned'}
        </p>
    </div>

    <div class="user-actions">
        <button class="btn btn-sm"
            onclick="editUserPassword('student','${s.regNo}')">
            Reset Password
        </button>
    </div>
</div>`;
        })
        .join('');

    // Faculty
    const facultyList =
        document.getElementById('adminFacultyList');

    facultyList.innerHTML = data.faculty
        .map(
            f => `
<div class="user-card">
    <div class="user-info">
        <h4>${f.name} (${f.id})</h4>
        <p>Email: ${f.email} | Subject: ${f.subject}</p>
    </div>

    <div class="user-actions">
        <button class="btn btn-sm"
            onclick="editUserPassword('faculty','${f.id}')">
            Reset Password
        </button>
    </div>
</div>`
        )
        .join('');

    // Proctors
    const proctorsList =
        document.getElementById('adminProctorsList');

    proctorsList.innerHTML = data.proctors
        .map(p => {
            const studentCount =
                data.students.filter(
                    s => s.proctorId === p.id
                ).length;

            return `
<div class="user-card">
    <div class="user-info">
        <h4>${p.name} (${p.id})</h4>
        <p>Email: ${p.email} | Students: ${studentCount}</p>
    </div>

    <div class="user-actions">
        <button class="btn btn-sm"
            onclick="editUserPassword('proctor','${p.id}')">
            Reset Password
        </button>
    </div>
</div>`;
        })
        .join('');
}

function editUserPassword(role, identifier) {
    const newPassword = prompt('Enter new password:'); 

    if (newPassword) {
        db.updatePassword(role, identifier, newPassword);
        showToast(
            'Password updated successfully!',
            'success',
            'Success'
        );
    }
}
