// Attendance Optimizer - Frontend Logic
// Time Complexity: O(N) for processing N subjects

const API_URL = 'http://localhost:5000/api';

// State management
let subjects = [];

// DOM Elements
const subjectTableBody = document.getElementById('subjectTableBody');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const thresholdInput = document.getElementById('thresholdInput');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const aggregatePercentage = document.getElementById('aggregatePercentage');
const aggregateStatus = document.getElementById('aggregateStatus');
const aggregateStats = document.getElementById('aggregateStats');

// Initialize with one empty row
document.addEventListener('DOMContentLoaded', () => {
    addSubjectRow();
});

// Add Subject Row - O(1) complexity
addSubjectBtn.addEventListener('click', () => {
    addSubjectRow();
});

function addSubjectRow() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" class="form-control subject-name" placeholder="e.g., TCS-401" maxlength="50"></td>
        <td><input type="number" class="form-control total-lectures" placeholder="0" min="0" max="999"></td>
        <td><input type="number" class="form-control present-lectures" placeholder="0" min="0" max="999"></td>
        <td><button class="btn-remove" onclick="removeSubjectRow(this)">Remove</button></td>
    `;
    subjectTableBody.appendChild(row);
}

// Remove Subject Row - O(1) complexity
function removeSubjectRow(button) {
    const row = button.closest('tr');
    row.remove();
}

// Collect subject data from table
function collectSubjectData() {
    const rows = subjectTableBody.querySelectorAll('tr');
    const subjects = [];
    
    rows.forEach(row => {
        const name = row.querySelector('.subject-name').value.trim();
        const total = parseInt(row.querySelector('.total-lectures').value) || 0;
        const present = parseInt(row.querySelector('.present-lectures').value) || 0;
        
        if (name && total >= 0 && present >= 0) {
            subjects.push({
                subject: name,
                total: total,
                present: present
            });
        }
    });
    
    return subjects;
}

// Calculate Attendance - Calls backend API
calculateBtn.addEventListener('click', async () => {
    const subjects = collectSubjectData();
    
    if (subjects.length === 0) {
        alert('Please add at least one subject with valid data.');
        return;
    }
    
    const threshold = parseInt(thresholdInput.value) || 75;
    
    if (threshold < 0 || threshold > 100) {
        alert('Threshold must be between 0 and 100.');
        return;
    }
    
    calculateBtn.classList.add('loading');
    calculateBtn.textContent = 'Calculating...';
    
    try {
        const response = await fetch(`${API_URL}/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subjects: subjects,
                threshold: threshold
            })
        });
        
        if (!response.ok) {
            throw new Error('Calculation failed');
        }
        
        const data = await response.json();
        displayResults(data);
        updateAggregateDashboard(data.aggregate, threshold);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to calculate attendance. Make sure the backend server is running.');
    } finally {
        calculateBtn.classList.remove('loading');
        calculateBtn.textContent = 'Calculate Attendance';
    }
});

// Display Results - O(N) complexity
function displayResults(data) {
    resultsContainer.innerHTML = '';
    resultsSection.classList.remove('d-none');
    
    data.subjects.forEach(subject => {
        const card = createResultCard(subject);
        resultsContainer.appendChild(card);
    });
}

// Create Result Card for each subject
function createResultCard(subject) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const statusClass = subject.status === 'Safe' ? 'safe' : 'danger';
    
    col.innerHTML = `
        <div class="result-card ${statusClass}">
            <h5>${subject.subject}</h5>
            <div class="percentage">${subject.percentage}%</div>
            <div class="info-row">
                <span>Status:</span>
                <strong>${subject.status}</strong>
            </div>
            <div class="info-row">
                <span>Present/Total:</span>
                <strong>${subject.present}/${subject.total}</strong>
            </div>
            ${subject.status === 'Danger' ? `
                <div class="info-row">
                    <span>Classes Needed:</span>
                    <strong>${subject.classes_needed}</strong>
                </div>
            ` : `
                <div class="info-row">
                    <span>Can Skip:</span>
                    <strong>${subject.can_skip} classes</strong>
                </div>
            `}
        </div>
    `;
    
    return col;
}

// Update Aggregate Dashboard
function updateAggregateDashboard(aggregate, threshold) {
    aggregatePercentage.textContent = `${aggregate.percentage}%`;
    aggregateStats.textContent = `${aggregate.total_present}/${aggregate.total_lectures} lectures`;
    
    const statusBadge = aggregateStatus;
    statusBadge.textContent = aggregate.status;
    statusBadge.className = `badge ${aggregate.status === 'Safe' ? 'status-safe' : 'status-danger'}`;
}

// Reset Form
resetBtn.addEventListener('click', () => {
    subjectTableBody.innerHTML = '';
    addSubjectRow();
    resultsSection.classList.add('d-none');
    resultsContainer.innerHTML = '';
    aggregatePercentage.textContent = '0.00%';
    aggregateStatus.textContent = 'Calculating...';
    aggregateStatus.className = 'badge';
    aggregateStats.textContent = '0/0 lectures';
    thresholdInput.value = 75;
});

// Make removeSubjectRow available globally
window.removeSubjectRow = removeSubjectRow;
