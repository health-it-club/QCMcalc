
# QCMCalc

## Description

QCMcalc is a web-based tool designed by Health IT Club to help users calculate grades for Multiple Choice Questions (QCMs) exams. It provides a flexible interface for inputting exam details, correct answers, and user responses, then calculates the final grade based on different scoring methods.

## Features

- Dynamic generation of answer inputs based on the number of questions
- Support for multiple exam types:
  - QCSs
  - QCMs Tout ou Rien
  - QCMs Partielle Positive
  - QCMs Partielle Négative
- Responsive design for both desktop and mobile devices
- Real-time grade calculation

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Open Sans)

## Setup and Usage

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/health-it-club/QCMcalc
   ```

2. Navigate to the project directory:
   ```
   cd QCMcalc
   ```

3. Open the `index.html` file in a web browser.

4. Use the interface to:
   - Enter the number of questions
   - Select the exam type
   - Input the correct answers
   - Input your answers
   - Calculate your grade

## File Structure

- `index.html`: Main HTML file containing the structure of the web page
- `style.css`: CSS file for styling the web page
- `script.js`: JavaScript file containing the logic for generating inputs and calculating grades
- `HealthIT White.png`: Logo image file

## Customization

You can customize the appearance of the calculator by modifying the CSS variables in the `:root` selector within the `style.css` file:

```css
:root {
    --whiteColor: #f5f7f6;
    --blackColor: #0c0c0c;
    --primaryColor: #568DFC;
    font-family: "Open Sans", sans-serif;

    --titleSize: 4rem;
    --subTitleSize: 2rem;
    --subDivisionSize: 1.5rem;
    --paragraphSize: 1rem;

    --titleBoldness: 700;
    --subtitleBoldness: 500;
    --paragraphBoldness: 600;

    color: var(--whiteColor);
    padding: 0;
    margin: 0;
}
```

## Contributing

Contributions to improve QCMcalc are welcome. Please feel free to submit a Pull Request.
