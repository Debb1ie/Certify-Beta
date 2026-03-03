# CertifyCS

A structured certification and learning platform for BS Computer Science and BS Information Technology students — covering every core subject from 1st year to 4th year, with employer-verifiable certificates.

---

## Overview

CertifyCS bridges the gap between university academic learning and industry readiness. Students follow a year-by-year course roadmap aligned with standard CS and IT curricula, earn verifiable certifications upon completion, and present those credentials to partner employers through a built-in verification system.

---

## Features

### For Students
- Browse 16+ courses organized by year level (1st to 4th Year)
- Filter courses by program track (CS, IT, or both)
- Search courses by title
- View full course details: description, curriculum, duration, modules, and enrollment count
- Enroll in courses directly from the platform
- Track enrolled courses under the Certifications page
- Earn digital certificates with unique verification codes
- Follow a structured CS or IT 4-year learning roadmap

### For Employers
- Verify candidate certificates instantly using a unique certificate code
- View partner employer directory with open role counts
- Apply to become a verified partner employer
- Access student talent from 24,000+ active learners

### Platform
- Animated UI with scroll-triggered fade-in and counter animations
- Sticky frosted-glass navbar with active page state
- Course detail modal with tabbed content (Overview, Curriculum, Certificate)
- Certification detail modal with requirements
- Toast notifications for enrollment actions
- Fully responsive grid layouts

---

## Pages

| Page | Description |
|---|---|
| Home | Hero section, animated stats, 4-year path preview, featured courses, testimonials, CTA |
| Courses | Full course browser with year tabs, field filter, and search |
| Certifications | All 8 certifications with detail modals and enrolled course progress |
| Employers | Certificate verifier, partner benefits, and partner employer directory |
| Roadmap | Visual 4-year learning path for CS and IT tracks |
| About | Mission, feature highlights, and origin story |

---

## Course Catalog

### 1st Year
- Introduction to Programming (Python)
- Computer Fundamentals
- Discrete Mathematics
- Web Development Basics (HTML/CSS/JS)

### 2nd Year
- Data Structures & Algorithms (Java/C++)
- Object-Oriented Programming (Java)
- Database Management Systems (SQL)
- Computer Networks

### 3rd Year
- Operating Systems (C/Linux)
- Software Engineering
- Cybersecurity Fundamentals
- Machine Learning Basics (Python)

### 4th Year
- Cloud Computing & DevOps (AWS/Docker)
- Artificial Intelligence (Python)
- Mobile App Development (React Native)
- Capstone & System Design

---

## Certifications

| Certificate | Year Level | Tag |
|---|---|---|
| Certified Junior Developer | 1st Year | Foundation |
| Certified Web Foundations | 1st Year | Specialization |
| Certified DSA Specialist | 2nd Year | Core |
| Certified Database Engineer | 2nd Year | Specialization |
| Certified Security Analyst | 3rd Year | Specialization |
| Certified ML Practitioner | 3rd Year | Emerging Tech |
| Certified Cloud Architect | 4th Year | Industry-Ready |
| Certified AI Engineer | 4th Year | Advanced |

---

## Employer Verification

Employers can verify a student certificate by entering the unique certificate code on the Employers page.

**Demo codes for testing:**

| Code | Result |
|---|---|
| `cert-2024-dsa` | Juan Dela Cruz — Certified DSA Specialist |
| `cert-2024-web` | Maria Santos — Certified Web Foundations |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (functional components with hooks) |
| Styling | Inline styles + CSS-in-JS via `<style>` tag |
| Animations | IntersectionObserver API (custom `useInView` hook) |
| State Management | React `useState` |
| No external UI libraries | Fully custom components |

---

## Project Structure

```
CertifyCS/
├── src/
│   └── App.jsx          # Single-file application (all components, data, and styles)
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/certifycs.git
cd certifycs

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite) or `http://localhost:3000` (Create React App).

### Build for Production

```bash
npm run build
```

---

## Customization

### Adding a New Course

In `App.jsx`, locate the `COURSES` object and add an entry under the appropriate year key:

```js
"1st Year": [
  {
    id: 17,
    title: "Your Course Title",
    lang: "Language/Tool",
    duration: "X weeks",
    level: "Beginner", // Beginner | Intermediate | Advanced | Expert
    field: "CS & IT",  // CS | IT | CS & IT
    modules: 10,
    enrolled: 0,
    desc: "Short course description shown on the card and modal.",
    lessons: ["Lesson 1", "Lesson 2", "..."]
  }
]
```

### Adding a New Certification

Locate the `CERTS` array and add:

```js
{
  id: 9,
  name: "Your Certificate Name",
  year: "3rd Year",
  tag: "Specialization",
  description: "Full description of this certification.",
  requirements: ["Course A", "Course B"],
  color: "#f0fdf4",
  accent: "#16a34a"
}
```

### Adding an Employer

Locate the `EMPLOYERS` array and add:

```js
{
  name: "Company Name",
  industry: "Industry Type",
  location: "City, PH",
  openRoles: 5,
  verified: true,
  description: "Short company description."
}
```

---

## Roadmap (Planned Features)

- [ ] User authentication (sign up, log in, profile)
- [ ] Per-module progress tracking with completion states
- [ ] Quiz engine at the end of each module
- [ ] Certificate PDF download and shareable link
- [ ] Admin dashboard for managing courses and employers
- [ ] Student leaderboard and achievement badges
- [ ] API backend integration (Node.js / Supabase)
- [ ] Mobile app version (React Native)

---

## License

MIT License. Free to use, modify, and distribute with attribution.

---

## Author

Built for Filipino CS and IT students. - Created by Precious Manucom  
Designed and developed as part of a capstone-ready full-stack project template.
