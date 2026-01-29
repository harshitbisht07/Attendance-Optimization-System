"""
Flask Backend for Attendance Optimization System
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from algorithms import process_subjects
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    """Serve the frontend"""
    return send_file('../index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate_attendance():
    """
    Calculate attendance metrics for all subjects.
    Expected JSON: { "subjects": [...], "threshold": 75 }
    """
    try:
        data = request.get_json()
        subjects = data.get('subjects', [])
        threshold = data.get('threshold', 75)
        
        if not isinstance(subjects, list):
            return jsonify({'error': 'Invalid subjects format'}), 400
        
        if not (0 <= threshold <= 100):
            return jsonify({'error': 'Threshold must be between 0 and 100'}), 400
        
        results = process_subjects(subjects, threshold)
        return jsonify(results), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
