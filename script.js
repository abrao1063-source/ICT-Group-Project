document.addEventListener('DOMContentLoaded', () => {
    const formFields = ['dob', 'collegeType', 'percentage', 'eyesight', 'height', 'weight'];
    const statusBox = document.getElementById('status-box');

    function updateEligibility() {
        const college = document.getElementById('collegeType').value;
        const dobValue = document.getElementById('dob').value;
        const marks = parseFloat(document.getElementById('percentage').value);
        const vision = document.getElementById('eyesight').value;
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);

        if (!dobValue || isNaN(marks)) return;

        // 1. Calculate Age (Assuming April 1st Admission Cycle)
        const birthDate = new Date(dobValue);
        const targetDate = new Date('2026-04-01');
        let age = targetDate.getFullYear() - birthDate.getFullYear();
        const m = targetDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && targetDate.getDate() < birthDate.getDate())) age--;

        let errors = [];

        // 2. Specific Logic Checks
        // Age Check (General 12-14 range)
        if (age < 11.5 || age > 14.5) {
            errors.push(`Age (${age}) is outside the acceptable range.`);
        }

        // PAF Vision Check
        if (college === 'paf' && vision === 'weak') {
            errors.push("PAF requires 6/6 vision without glasses.");
        }

        // Academic Check
        const minMarks = (college === 'atchison') ? 75 : 60;
        if (marks < minMarks) {
            errors.push(`Minimum ${minMarks}% marks required for ${college}.`);
        }

        // Height Check (5ft = 60 inches)
        if (height < 58) {
            errors.push("Height is significantly below the standard requirement.");
        }

        // BMI Check (Weight to Height Ratio)
        if (height > 0 && weight > 0) {
            const meters = height * 0.0254;
            const bmi = weight / (meters * meters);
            if (bmi < 14.5) errors.push("Underweight for medical standards.");
            if (bmi > 26) errors.push("Overweight for physical standards.");
        }

        // Update UI
        if (errors.length === 0) {
            statusBox.innerHTML = "✅ High Probability of Eligibility!";
            statusBox.className = "status-neutral status-eligible";
        } else {
            statusBox.innerHTML = "❌ Criteria Alert: " + errors[0];
            statusBox.className = "status-neutral status-ineligible";
        }
    }

    // Add listeners to all relevant fields
    formFields.forEach(id => {
        document.getElementById(id).addEventListener('input', updateEligibility);
    });
});