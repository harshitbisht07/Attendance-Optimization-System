"""
Attendance Optimization Algorithms
Time Complexity: O(N) where N is the number of subjects
"""

import math

def calculate_attendance_percentage(present, total):
    """
    Calculate attendance percentage for a subject.
    Time Complexity: O(1)
    """
    if total == 0:
        return 0.0
    return round((present / total) * 100, 2)

def calculate_classes_needed(present, total, threshold=75):
    """
    Calculate how many classes needed to reach minimum threshold.
    Formula: ceil((threshold% × (T + X) - P) / (1 - threshold%))
    Time Complexity: O(1)
    """
    threshold_decimal = threshold / 100
    
    if total == 0:
        return 0
    
    current_percentage = (present / total) * 100
    
    if current_percentage >= threshold:
        return 0
    
    # Solve: (P + X) / (T + X) >= threshold/100
    # X >= (threshold * T - P) / (1 - threshold)
    numerator = (threshold_decimal * total) - present
    denominator = 1 - threshold_decimal
    
    if denominator == 0:
        return 0
    
    classes_needed = math.ceil(numerator / denominator)
    return max(0, classes_needed)

def calculate_skippable_classes(present, total, threshold=75):
    """
    Calculate how many classes can be safely skipped.
    Formula: floor((P - threshold% × T) / threshold%)
    Time Complexity: O(1)
    """
    if total == 0:
        return 0
    
    threshold_decimal = threshold / 100
    current_percentage = (present / total) * 100
    
    if current_percentage < threshold:
        return 0
    
    # Solve: (P - X) / T >= threshold/100
    # X <= P - (threshold * T)
    numerator = present - (threshold_decimal * total)
    
    if numerator <= 0:
        return 0
    
    skippable = math.floor(numerator / threshold_decimal)
    return max(0, skippable)

def process_subjects(subjects, threshold=75):
    """
    Process all subjects and calculate attendance metrics.
    Time Complexity: O(N) where N is number of subjects
    """
    results = []
    total_present = 0
    total_lectures = 0
    
    for subject in subjects:
        name = subject.get('subject', 'Unknown')
        total = subject.get('total', 0)
        present = subject.get('present', 0)
        
        # Validate inputs
        if total < 0 or present < 0 or present > total:
            continue
        
        percentage = calculate_attendance_percentage(present, total)
        classes_needed = calculate_classes_needed(present, total, threshold)
        can_skip = calculate_skippable_classes(present, total, threshold)
        
        status = "Safe" if percentage >= threshold else "Danger"
        
        results.append({
            'subject': name,
            'total': total,
            'present': present,
            'percentage': percentage,
            'status': status,
            'classes_needed': classes_needed,
            'can_skip': can_skip
        })
        
        total_present += present
        total_lectures += total
    
    # Calculate aggregate
    aggregate_percentage = calculate_attendance_percentage(total_present, total_lectures)
    
    return {
        'subjects': results,
        'aggregate': {
            'total_present': total_present,
            'total_lectures': total_lectures,
            'percentage': aggregate_percentage,
            'status': "Safe" if aggregate_percentage >= threshold else "Danger"
        }
    }
