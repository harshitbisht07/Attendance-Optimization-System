# 📚 Attendance Optimization Engine

A Design and Analysis of Algorithms (DAA) project that helps students track and optimize their class attendance to meet minimum attendance requirements.

## 🎯 Features

- **Dynamic Subject Management**: Add/remove subjects with O(1) complexity
- **Real-time Attendance Calculation**: Calculate attendance percentage for each subject
- **Aggregate Dashboard**: View overall attendance across all subjects
- **Optimization Algorithm**: Calculate how many classes needed to reach minimum threshold
- **Skip Class Calculator**: Determine how many classes can be safely skipped
- **Color-coded Status**: Visual indicators (Red/Green) for quick assessment
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ System Architecture

### Frontend Layer
- **Technology**: HTML5, CSS (Bootstrap), Vanilla JavaScript
- **Components**:
  - Dynamic input table for subject data
  - Dashboard header with aggregate statistics
  - Action cards with color-coded status indicators

### Logic Layer
- **Technology**: Python 3.x with Flask framework
- **Algorithms**:
  - Attendance Percentage: O(N) linear iteration
  - Classes Needed: Mathematical optimization using ceiling function
  - Skip Class: Mathematical optimization using floor function
  - Aggregate Calculation: O(N) sum aggregation

### Data Structure
- **Input**: List of dictionaries (JSON format)
- **Processing**: Iteration over subject list
- **Output**: Enhanced data with calculated fields

## 📊 Algorithm Complexity

- **Time Complexity**: O(N) where N = number of subjects
- **Space Complexity**: O(N) for storing results
- **Add/Remove Subject**: O(1) DOM operation

## 🚀 Getting Started

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Clone or download the project**

2. **Install Python dependencies**:
```bash
pip install -r backend/requirements.txt
```

3. **Start the Flask backend**:
```bash
cd backend
python app.py
```

The server will start on `http://localhost:5000`

4. **Open the application**:
   - Visit `http://localhost:5000` in your web browser
   - The single-page application will load automatically

### Alternative: Run Frontend Only (Without Backend)

If you want to test the UI without the backend, you can open `index.html` directly in your browser. However, the "Calculate" button will require the backend server to be running.

## 📖 Usage

1. **Add Subjects**: Click "Add Subject" to add rows for your courses
2. **Enter Data**: Fill in subject name, total lectures, and present count
3. **Set Threshold**: Adjust the minimum attendance threshold (default: 75%)
4. **Calculate**: Click "Calculate Attendance" to see results
5. **View Results**: See color-coded cards with:
   - Current attendance percentage
   - Status (Safe/Danger)
   - Classes needed (if below threshold)
   - Classes you can skip (if above threshold)

## 🧮 Formulas Used

### Attendance Percentage
```
Percentage = (Present / Total) × 100
```

### Classes Needed
```
X = ceil((threshold × (T + X) - P) / (1 - threshold))
where T = total lectures, P = present, X = classes needed
```

### Skippable Classes
```
X = floor((P - threshold × T) / threshold)
where P = present, T = total lectures
```

## 🎨 Color Coding

- **🟢 Green (Safe)**: Attendance meets or exceeds threshold
- **🔴 Red (Danger)**: Attendance below threshold, needs attention

## 📁 Project Structure

```
attendance-optimizer/
├── backend/
│   ├── app.py              # Flask server and API endpoints
│   ├── algorithms.py       # Attendance calculation algorithms
│   └── requirements.txt    # Python dependencies
├── index.html              # Single-page application (HTML + CSS + JS)
└── README.md               # Project documentation
```

## 🔧 API Endpoints

### POST /api/calculate
Calculate attendance metrics for all subjects.

**Request Body**:
```json
{
  "subjects": [
    { "subject": "TCS-401", "total": 10, "present": 4 },
    { "subject": "DAA-402", "total": 15, "present": 12 }
  ],
  "threshold": 75
}
```

**Response**:
```json
{
  "subjects": [
    {
      "subject": "TCS-401",
      "total": 10,
      "present": 4,
      "percentage": 40.0,
      "status": "Danger",
      "classes_needed": 14,
      "can_skip": 0
    }
  ],
  "aggregate": {
    "total_present": 16,
    "total_lectures": 25,
    "percentage": 64.0,
    "status": "Danger"
  }
}
```

## 🎓 DAA Concepts Demonstrated

1. **Time Complexity Analysis**: O(N) linear algorithms
2. **Mathematical Optimization**: Ceiling and floor functions
3. **Efficient Data Structures**: Lists and dictionaries
4. **Algorithm Design**: Iterative processing with constant-time operations

## 🧪 Test Cases

### Test Case 1: Below Threshold
- Subject: TCS-401
- Total: 10, Present: 4
- Expected: 40%, Danger, 14 classes needed

### Test Case 2: Above Threshold
- Subject: DAA-402
- Total: 15, Present: 12
- Expected: 80%, Safe, 1 class can be skipped

### Test Case 3: Edge Case (Zero Lectures)
- Subject: Test
- Total: 0, Present: 0
- Expected: 0%, handled gracefully

## 🤝 Contributing

This is an academic project for DAA coursework. Feel free to fork and enhance!

## 📝 License

This project is created for educational purposes as part of a Design and Analysis of Algorithms course.

## 👨‍💻 Author

Created as a DAA PBL (Project-Based Learning) assignment.

---

**Note**: Make sure the Flask backend is running before using the application. The frontend communicates with the backend via REST API calls.
