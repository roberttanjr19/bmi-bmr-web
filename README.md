# BMR and BMI Dashboard

A responsive web-based calculator that computes **Body Mass Index (BMI)**, **Basal Metabolic Rate (BMR)**, and **daily calorie needs** based on activity level.  
The website provides real-time visual feedback through an interactive BMI ribbon and a calorie activity comparison chart.

---

## Overview

This project helps users estimate core health metrics using standard formulas.  
It supports both **metric and imperial units** and updates results dynamically without page reload.

---

## Features

- BMI calculation with automatic category classification  
- BMR calculation using the Harris-Benedict equation  
- Daily calorie estimation based on selected activity level  
- Metric and imperial unit switching  
- Interactive BMI ribbon with visual marker  
- Highlighted BMI category table  
- Activity level calorie comparison chart  

---

## How It Works

### BMI Formula
BMI = weight (kg) / height (m²)

### BMR Formula
**Male**
BMR = 88.362 + (13.397 × weight kg) + (4.799 × height cm) − (5.677 × age)

**Female**
BMR = 447.593 + (9.247 × weight kg) + (3.098 × height cm) − (4.330 × age)


Daily calories are calculated by:
Daily Calories = BMR × Activity Factor


Activity factors range from **1.2 (Sedentary)** to **1.9 (Very Active)**.

---

## Technologies Used

- HTML  
- CSS  
- JavaScript  
- Google Fonts  

---

## Project Structure
index.html → Layout and dashboard structure
script.js → Logic for calculations and UI updates

