var sex = "male";
var units = "metric";

function setSex(value) {
    sex = value;
    document.getElementById("maleBtn").classList.remove("active");
    document.getElementById("femaleBtn").classList.remove("active");

    if (value === "male") {
        document.getElementById("maleBtn").classList.add("active");
    } else {
        document.getElementById("femaleBtn").classList.add("active");
    }
}


function setUnits(value) {
    units = value;
    document.getElementById("unitMetricBtn").classList.toggle("active", value === "metric");
    document.getElementById("unitImperialBtn").classList.toggle("active", value === "imperial");
    document.getElementById("heightMetric").classList.toggle("hidden", value !== "metric");
    document.getElementById("heightImperial").classList.toggle("hidden", value !== "imperial");
    document.getElementById("weightMetric").classList.toggle("hidden", value !== "metric");
    document.getElementById("weightImperial").classList.toggle("hidden", value !== "imperial");
}

function getHeightCm() {
    if (units === "metric") {
        return Number(document.getElementById("heightCm").value);
    }

    var heightFt = Number(document.getElementById("heightFt").value);
    var heightIn = Number(document.getElementById("heightIn").value) || 0;
    return (heightFt * 30.48) + (heightIn * 2.54);
}

function getWeightKg() {
    if (units === "metric") {
        return Number(document.getElementById("weightKg").value);
    }

    var weightLb = Number(document.getElementById("weightLb").value);
    return weightLb * 0.45359237;
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) {
        return { label: "Underweight", status: "Low" };
    }
    if (bmi < 25) {
        return { label: "Normal", status: "Healthy" };
    }
    if (bmi < 30) {
        return { label: "Overweight", status: "Increased Risk" };
    }
    return { label: "Obese", status: "High Risk" };
}

function updateBmiVisuals(bmi) {
    var marker = document.getElementById("bmiMarker");
    var minBmi = 10;
    var maxBmi = 40;
    var percent = (bmi - minBmi) / (maxBmi - minBmi);
    percent = Math.min(Math.max(percent, 0), 1);
    marker.style.left = (percent * 100) + "%";

    var category = getBmiCategory(bmi).label;
    var highlightMap = {
        Underweight: "rgba(155, 183, 212, 0.28)",
        Normal: "rgba(157, 191, 158, 0.28)",
        Overweight: "rgba(201, 181, 122, 0.28)",
        Obese: "rgba(200, 138, 122, 0.28)"
    };
    var table = document.querySelector(".bmi-table");
    if (table && highlightMap[category]) {
        table.style.setProperty("--active-row", highlightMap[category]);
    }
    document.querySelectorAll(".bmi-segment").forEach(function (segment) {
        segment.classList.toggle("active", segment.dataset.category === category);
    });
    document.querySelectorAll(".bmi-table tbody tr").forEach(function (row) {
        row.classList.toggle("active", row.dataset.category === category);
    });
}

function updateActivityChart(bmr) {
    var rows = document.querySelectorAll("#activityChart .chart-row");
    var maxCalories = 0;
    var caloriesByRow = [];

    rows.forEach(function (row) {
        var activity = Number(row.dataset.activity);
        var calories = bmr * activity;
        caloriesByRow.push(calories);
        if (calories > maxCalories) {
            maxCalories = calories;
        }
    });

    rows.forEach(function (row, index) {
        var calories = caloriesByRow[index];
        var bar = row.querySelector(".chart-bar span");
        var value = row.querySelector(".chart-value");
        var percent = maxCalories ? (calories / maxCalories) * 100 : 0;
        bar.style.width = percent + "%";
        value.textContent = Math.round(calories);
    });
}

function calculate() {
    var age = Number(document.getElementById("age").value);
    var activity = Number(document.getElementById("activity").value);


    var heightCm = getHeightCm();
    var weightKg = getWeightKg();

    if (!age || !heightCm || !weightKg) {
        return;
    }

    var bmi = weightKg / ((heightCm / 100) * (heightCm / 100));
    document.getElementById("bmiValue").textContent = bmi.toFixed(1);

    updateBmiVisuals(bmi);

    var bmr;
    if (sex === "male") {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }

    var calories = bmr * activity;

    document.getElementById("bmrValue").textContent = Math.round(bmr);
    document.getElementById("caloriesValue").textContent = Math.round(calories);

    updateActivityChart(bmr);

    var category = getBmiCategory(bmi);
    var insightText = "Your BMI is " + bmi.toFixed(1) + " (" + category.label + "). ";
    insightText += "Your BMR is about " + Math.round(bmr) + " calories per day at rest. ";
    insightText += "With " + document.getElementById("activity").selectedOptions[0].text + " activity, ";
    insightText += "your daily calories are around " + Math.round(calories) + ".";


    document.getElementById("insights").textContent = insightText;
}

document.addEventListener("DOMContentLoaded", function () {
    setSex(sex);
    setUnits(units);
});
