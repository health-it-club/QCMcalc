# QCMcalc By HealthIT

## Description
QCMcalc By HealthIT is a web-based tool designed by Health IT Club to help users calculate grades for Multiple Choice Questions (QCMs) exams. It provides a flexible interface for inputting exam details, correct answers, and user responses, then calculates the final grade based on different scoring methods. The tool is built using modern technologies and offers an intuitive user experience with a responsive design.

## Features
- **Exam Selection & Input**
  - Direct selection of exam type from a dropdown menu.
  - Instant answer input fields with auto-validation.
  - Dynamic generation of answer inputs based on the number of questions.
- **Educational Resources**
  - Dedicated "How Does It work" page with visual explanations and methodology documentation.
  - Detailed guides for different scoring methods: QCSs, QCMs Tout ou Rien, QCMs Partielle Positive, QCMs Partielle Négative.
- **Core Functionalities**
  - Real-time grade calculation with color-coded feedback.
  - Support for multiple exam types.
  - Responsive design for both desktop and mobile devices.

## Technologies Used
- **Frontend Framework**: Next.js (React framework) with TypeScript
- **Styling**: Tailwind CSS + Custom Theme
- **Component Libraries**:
  - Magic UI
  - Fancy Components
  - Hero UI
  - Shadcn
- **State Management**: Context API + Recoil
- **Deployment**: Vercel, GitHub Pages
- **Other Tools**:
  - React Hook Form (form validation)
  - Headless UI (accessible components)

## File Structure
``` bash
├── app/
│   ├── ConstantineExams/
│   │   ├── examForm.tsx
│   │   ├── examPageContent.tsx
│   │   ├── examSelector.tsx
│   │   ├── gradeSelector.tsx
│   │   ├── page.tsx
│   │   ├── specialitySelector.tsx
│   │   └── yearSelector.tsx
│   ├── home/
│   │   ├── MainSection.tsx
│   │   ├── numbreOfQuestions.tsx
│   │   └── typeOfCorrection.tsx
│   ├── HowDoesItWork/
│   │   ├── HowDoesItWorkLanding.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── AppComponents/
│   ├── logic/
│   │   ├── calculator.tsx
│   │   └── checkboxGroup.tsx
│   ├── navigation/
│   │   ├── dropdownMenuButton.tsx
│   │   ├── logo.tsx
│   │   ├── navDropdownMenu.tsx
│   │   └── navigationBar.tsx
│   └── UI/
│       ├── background.tsx
│       ├── CustomAccordion.tsx
│       ├── CustomButton.tsx
│       └── IconButton.tsx
│
├── components/
│   ├── magicui/
│   │   ├── flickerin-grid.tsx
│   │   ├── interactive-hover-button.tsx
│   │   └── sparkles-text.tsx
│   └── ui/
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       └── label.tsx
│
├── data/
│   └── exams.ts
│
├── lib/
│   └── utils.ts
│
├── public/
│   ├── data/
│   │   ├── dataTemplate.txt
│   │   └── exams.json
│   ├── favicon-16x16.png
│   └── favicon-32x32.png
│
├── .next/
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```


## Deployment
### Vercel
- Deploy directly from GitHub or upload the project files.
- [Vercel Documentation](https://vercel.com/docs)

### GitHub Pages
- Configure the `package.json` scripts for deployment.
- Use `npm run build` to generate the production build.
- Push the `dist` folder to the `gh-pages` branch.

## Customization
1. **Theme**: Modify `tailwind.config.js` for custom colors, breakpoints, and spacing.
2. **Behavior**: Adjust scoring logic in `logic/calculator.ts`.
3. **Content**: Update methodology content in `app/home/HowDoesItWork/HowDoesItWorkLanding.tsx`.

## Testing
- **Unit Tests**: Use Jest and React Testing Library `npm run test`.
- **E2E Tests**: Add Cypress tests for end-to-end functionality.

## Contributing
1. Fork the repository.
2. Create your feature branch `git checkout -b feature/new-component`.
3. Commit changes `git commit -m 'Add new feature'`.
4. Push to branch `git push origin feature/new-component`.
5. Open a pull request.

## Credits
- **Lead Developer**: [Marouane](https://github.com/mArOOu)
- **Design & Testing**: Health IT Club Community

## Social Media
- Follow us on social media: [Health IT Club](https://linktr.ee/Health._it)

## Roadmap / Future Plans
- **UI Upgrade**: Enhance the user interface with more polished designs.
- **Additional Exams**: Add support for more exam types and scoring methods.
- **Correction Submission**: Implement the ability to create corrections and submit them to the team.

## Contact
For inquiries or feedback, visit our [Contact Page](https://linktr.ee/Health._it).

---
