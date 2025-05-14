# 🎓 E-Learning Platform (Frontend)

This is the frontend of an interactive e-learning platform, inspired by Udemy, built using **Angular**. It allows users to browse courses, watch lessons, and take interactive quizzes to test their knowledge.

## 🚀 Features

- 🔐 User authentication (login, registration)
- 🎥 Browse and watch video courses
- 🧩 Interactive quizzes with instant feedback
- 🧑‍🏫 Instructor dashboard for managing content
- 📝 Course details, modules, and video organization
- 📱 Fully responsive design

## 🛠️ Tech Stack

- **Framework**: Angular 16+
- **Styling**: Tailwind CSS
- **Routing**: Angular Router
- **State Management**: Services & RxJS
- **Forms**: Reactive Forms
- **HTTP**: Angular HttpClient
- **Icons**: FontAwesome / Custom SVG

### Backend:
- **Framework:** ASP.NET Core API
- **Repository:** [E-Learning Backend Repo](https://github.com/Adelmuhammad-23/e-learning-platform) (integrated separately)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/omarazam163/e-learning-front-end.git
cd e-learning-front-end
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🧪 Quizzes Feature

- Each course module can contain quizzes.
- Supports multiple choice and true/false types.
- Instant feedback after each answer.
- Score calculated at the end of each quiz.

## 📁 Project Structure

```bash
src/
├── app/
│   ├── auth/           # Login & registration
│   ├── courses/        # Course list and details
│   ├── quiz/           # Quiz components and logic
│   ├── shared/         # Reusable components & services
│   └── core/           # App-level services and guards
├── assets/             # Images, icons, etc.
├── environments/       # Environment configs
```

## 🧑‍💻 Development Notes

- This project uses **Angular CLI** version 16+.
- Tailwind CSS is integrated for utility-first styling.
- You can generate new components using:

```bash
ng generate component your-component-name
```

## ✅ TODOs / Future Enhancements

- Add course reviews and ratings
- Enable student progress tracking
- Integrate real-time chat/Q&A
- Add admin dashboard
- Improve quiz analytics and reporting

## 📬 Contact

If you have any questions or suggestions, feel free to reach out:

- GitHub: [@omarazam163](https://github.com/omarazam163)

---

> Built with ❤️ using Angular & Tailwind CSS
