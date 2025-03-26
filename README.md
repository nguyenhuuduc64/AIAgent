# Math Learning Platform

A modern web application for teaching and learning mathematics, built with React and Material-UI.

## Features

- 📚 Interactive lectures with video content
- 📝 Homework assignments and quizzes
- 📊 Progress tracking and statistics
- 📅 Course scheduling
- 👨‍🏫 Teacher dashboard for content management
- 👨‍🎓 Student dashboard for learning progress
- 🎯 Quiz creation and management
- 📱 Responsive design for all devices

## Tech Stack

- React.js
- Material-UI (MUI)
- React Router
- Styled Components
- Emotion (for styled components)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/math-learning-platform.git
cd math-learning-platform
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.js      # Main layout component with sidebar
│   └── ...
├── pages/             # Page components
│   ├── Dashboard.js   # Main dashboard
│   ├── Lectures.js    # Lecture management
│   ├── Homework.js    # Homework and quizzes
│   ├── CreateQuiz.js  # Quiz creation interface
│   ├── Quiz.js        # Quiz taking interface
│   ├── Profile.js     # User profile
│   ├── Schedule.js    # Course scheduling
│   ├── Statistics.js  # Learning statistics
│   └── Settings.js    # User settings
├── App.js             # Main application component
└── index.js           # Application entry point
```

## Features in Detail

### Dashboard

- Overview of learning progress
- Recent activities
- Upcoming tasks
- Quick access to courses and assignments

### Lectures

- Video-based learning content
- Progress tracking
- Chapter-based organization
- Interactive exercises

### Homework & Quizzes

- Multiple question types
- Time-limited assessments
- Automatic grading
- Progress tracking
- Detailed feedback

### Profile

- Personal information management
- Learning statistics
- Achievement tracking
- Notification preferences

### Schedule

- Course calendar
- Assignment deadlines
- Study reminders
- Custom scheduling

### Statistics

- Performance analytics
- Learning progress tracking
- Achievement metrics
- Study time analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- React team for the amazing framework
- All contributors who help improve this project

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
