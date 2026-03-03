import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Courses", "Certifications", "Employers", "Roadmap", "About"];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const YEAR_COLORS = {
  "1st Year": { bg: "#f0fdf4", accent: "#16a34a", light: "#dcfce7" },
  "2nd Year": { bg: "#eff6ff", accent: "#2563eb", light: "#dbeafe" },
  "3rd Year": { bg: "#fff7ed", accent: "#ea580c", light: "#fed7aa" },
  "4th Year": { bg: "#faf5ff", accent: "#9333ea", light: "#e9d5ff" },
};

const COURSES = {
  "1st Year": [
    { id: 1, title: "Introduction to Programming", lang: "Python", duration: "6 weeks", level: "Beginner", field: "CS & IT", modules: 8, enrolled: 3241, desc: "Learn the fundamentals of programming using Python. Topics include variables, control flow, functions, and basic data structures.", lessons: ["Python Setup & Syntax", "Variables & Data Types", "Conditionals & Loops", "Functions & Scope", "Lists, Tuples & Dicts", "File I/O Basics", "Error Handling", "Mini Project: Calculator"] },
    { id: 2, title: "Computer Fundamentals", lang: "General", duration: "4 weeks", level: "Beginner", field: "CS & IT", modules: 6, enrolled: 2890, desc: "Understand how computers work, from hardware components to basic software principles and binary systems.", lessons: ["Number Systems & Binary", "Computer Architecture", "Memory & Storage", "Input/Output Devices", "Operating System Intro", "Intro to Networking"] },
    { id: 3, title: "Discrete Mathematics", lang: "Math", duration: "8 weeks", level: "Beginner", field: "CS", modules: 10, enrolled: 1540, desc: "A foundational course covering logic, sets, relations, graph theory, and combinatorics essential for computer science.", lessons: ["Logic & Propositions", "Set Theory", "Relations & Functions", "Proof Techniques", "Graph Theory Basics", "Trees & Traversals", "Counting & Combinatorics", "Boolean Algebra", "Automata Intro", "Problem Sets"] },
    { id: 4, title: "Web Development Basics", lang: "HTML/CSS/JS", duration: "6 weeks", level: "Beginner", field: "IT", modules: 9, enrolled: 4120, desc: "Build your first websites using HTML, CSS, and JavaScript. Covers responsive design and DOM manipulation.", lessons: ["HTML5 Structure", "CSS Styling & Layouts", "Flexbox & Grid", "JavaScript Basics", "DOM Manipulation", "Events & Listeners", "Fetch API Intro", "Responsive Design", "Final Project: Portfolio Site"] },
  ],
  "2nd Year": [
    { id: 5, title: "Data Structures & Algorithms", lang: "Java/C++", duration: "10 weeks", level: "Intermediate", field: "CS & IT", modules: 14, enrolled: 2780, desc: "Master core data structures and algorithmic thinking. Essential for technical interviews and software development.", lessons: ["Big-O Notation", "Arrays & Strings", "Linked Lists", "Stacks & Queues", "Hash Tables", "Binary Trees", "Heaps & Priority Queues", "Graphs & BFS/DFS", "Sorting Algorithms", "Divide & Conquer", "Dynamic Programming", "Greedy Algorithms", "Problem-Solving Patterns", "Mock Interview Problems"] },
    { id: 6, title: "Object-Oriented Programming", lang: "Java", duration: "8 weeks", level: "Intermediate", field: "CS & IT", modules: 11, enrolled: 3100, desc: "Deep dive into OOP principles: encapsulation, inheritance, polymorphism, and abstraction using Java.", lessons: ["Classes & Objects", "Constructors & Methods", "Encapsulation", "Inheritance", "Polymorphism", "Abstract Classes", "Interfaces", "Exception Handling", "Collections Framework", "Design Patterns Intro", "OOP Project"] },
    { id: 7, title: "Database Management Systems", lang: "SQL", duration: "7 weeks", level: "Intermediate", field: "CS & IT", modules: 10, enrolled: 3450, desc: "Learn relational database design, SQL querying, normalization, and transaction management.", lessons: ["Relational Model", "SQL SELECT Basics", "Joins & Subqueries", "Aggregations & GROUP BY", "Database Design & ERD", "Normalization (1NF-3NF)", "Indexes & Performance", "Transactions & ACID", "Stored Procedures", "NoSQL Overview"] },
    { id: 8, title: "Computer Networks", lang: "General", duration: "8 weeks", level: "Intermediate", field: "IT", modules: 12, enrolled: 2200, desc: "Understand how data travels across networks. Covers TCP/IP, DNS, HTTP, routing, and network security basics.", lessons: ["OSI & TCP/IP Models", "IP Addressing & Subnetting", "DNS & DHCP", "Routing Protocols", "TCP vs UDP", "HTTP & HTTPS", "Firewalls & NAT", "Wireless Networks", "Network Security Basics", "Packet Analysis with Wireshark", "VPNs & Tunneling", "Network Design Project"] },
  ],
  "3rd Year": [
    { id: 9, title: "Operating Systems", lang: "C/Linux", duration: "10 weeks", level: "Advanced", field: "CS", modules: 13, enrolled: 1890, desc: "Explore OS internals: process management, memory allocation, file systems, and concurrency.", lessons: ["OS Architecture", "Process & Threads", "CPU Scheduling", "Synchronization & Mutex", "Deadlocks", "Memory Management", "Virtual Memory & Paging", "File Systems", "I/O Systems", "Linux Shell Scripting", "System Calls in C", "Kernel Concepts", "OS Security"] },
    { id: 10, title: "Software Engineering", lang: "General", duration: "9 weeks", level: "Advanced", field: "CS & IT", modules: 12, enrolled: 2100, desc: "Learn the full software development lifecycle, agile methodologies, testing, and system design principles.", lessons: ["SDLC Models", "Agile & Scrum", "Requirements Engineering", "UML Diagrams", "Software Architecture", "Design Patterns", "Unit & Integration Testing", "CI/CD Pipelines", "Code Review Practices", "DevOps Overview", "Technical Documentation", "Team Capstone"] },
    { id: 11, title: "Cybersecurity Fundamentals", lang: "General", duration: "8 weeks", level: "Advanced", field: "IT", modules: 11, enrolled: 3300, desc: "Understand threats, vulnerabilities, and defenses in modern systems. Covers ethical hacking basics and security frameworks.", lessons: ["Security Principles & CIA Triad", "Cryptography Basics", "Authentication & Authorization", "Common Vulnerabilities (OWASP)", "Network Attacks & Defense", "Web Security (XSS, SQLi)", "Malware & Ransomware", "Incident Response", "Security Auditing", "Ethical Hacking Intro", "Security Certifications Guide"] },
    { id: 12, title: "Machine Learning Basics", lang: "Python", duration: "12 weeks", level: "Advanced", field: "CS", modules: 15, enrolled: 4500, desc: "Introduction to ML concepts using Python and scikit-learn. Covers supervised, unsupervised learning, and model evaluation.", lessons: ["ML Overview & Applications", "Python for Data Science", "Data Preprocessing", "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "K-Means Clustering", "Dimensionality Reduction", "Neural Network Intro", "Model Evaluation Metrics", "Cross-validation", "Feature Engineering", "ML Pipeline", "Capstone: Predict Housing Prices"] },
  ],
  "4th Year": [
    { id: 13, title: "Cloud Computing & DevOps", lang: "AWS/Docker", duration: "10 weeks", level: "Expert", field: "CS & IT", modules: 14, enrolled: 2650, desc: "Master cloud infrastructure, containerization, and CI/CD pipelines using AWS, Docker, and Kubernetes.", lessons: ["Cloud Models (IaaS, PaaS, SaaS)", "AWS Core Services", "EC2 & S3 Hands-on", "Docker Fundamentals", "Docker Compose", "Kubernetes Basics", "CI/CD with GitHub Actions", "Infrastructure as Code", "Monitoring & Logging", "Serverless Computing", "Cloud Security", "Cost Optimization", "Multi-cloud Strategy", "Capstone: Deploy Full-Stack App"] },
    { id: 14, title: "Artificial Intelligence", lang: "Python", duration: "12 weeks", level: "Expert", field: "CS", modules: 16, enrolled: 3900, desc: "Advanced AI topics including deep learning, NLP, computer vision, and reinforcement learning using TensorFlow and PyTorch.", lessons: ["AI History & Overview", "Search Algorithms", "Knowledge Representation", "Deep Learning Fundamentals", "CNNs for Vision", "RNNs & LSTMs", "Transformers & Attention", "NLP with BERT", "Reinforcement Learning", "Generative AI & GANs", "AI Ethics", "Model Deployment", "Edge AI", "AI in Industry", "Research Paper Review", "AI Capstone"] },
    { id: 15, title: "Mobile App Development", lang: "React Native", duration: "10 weeks", level: "Expert", field: "IT", modules: 13, enrolled: 2400, desc: "Build cross-platform mobile apps using React Native. Covers navigation, state management, and device APIs.", lessons: ["React Native Setup", "JSX & Components", "StyleSheet & Layouts", "Navigation (Stack/Tab)", "State & Props", "Redux Toolkit", "REST API Integration", "Camera & Location APIs", "Push Notifications", "Local Storage & AsyncStorage", "App Deployment (iOS/Android)", "Performance Optimization", "Capstone: Social App"] },
    { id: 16, title: "Capstone & System Design", lang: "General", duration: "14 weeks", level: "Expert", field: "CS & IT", modules: 18, enrolled: 1800, desc: "Tie everything together with large-scale system design, architecture patterns, and a full capstone project presented to industry mentors.", lessons: ["System Design Thinking", "Scalability Principles", "Load Balancing", "Caching Strategies", "Database Sharding", "Microservices Architecture", "API Design (REST/GraphQL)", "Message Queues", "Event-Driven Architecture", "Security by Design", "Observability & Tracing", "Disaster Recovery", "Product Thinking", "Stakeholder Presentations", "Code Review Culture", "Documentation Standards", "Capstone Build Sprint", "Final Demo Day"] },
  ],
};

const CERTS = [
  { id: 1, name: "Certified Junior Developer", year: "1st Year", tag: "Foundation", description: "Awarded upon completing all 1st year CS & IT core courses. Validates fundamental programming and computer science knowledge.", requirements: ["Introduction to Programming", "Computer Fundamentals", "Web Development Basics"], color: "#f0fdf4", accent: "#16a34a" },
  { id: 2, name: "Certified Web Foundations", year: "1st Year", tag: "Specialization", description: "Recognizes proficiency in HTML, CSS, and JavaScript web development fundamentals.", requirements: ["Web Development Basics", "Introduction to Programming"], color: "#eff6ff", accent: "#2563eb" },
  { id: 3, name: "Certified DSA Specialist", year: "2nd Year", tag: "Core", description: "Demonstrates mastery in data structures, algorithms, and computational thinking — the foundation of technical interviews.", requirements: ["Data Structures & Algorithms", "Object-Oriented Programming"], color: "#eff6ff", accent: "#2563eb" },
  { id: 4, name: "Certified Database Engineer", year: "2nd Year", tag: "Specialization", description: "Validates expertise in relational databases, SQL, and data modeling for real-world applications.", requirements: ["Database Management Systems", "Data Structures & Algorithms"], color: "#fff7ed", accent: "#ea580c" },
  { id: 5, name: "Certified Security Analyst", year: "3rd Year", tag: "Specialization", description: "Recognizes foundational knowledge in cybersecurity principles, threat analysis, and defense strategies.", requirements: ["Cybersecurity Fundamentals", "Computer Networks", "Operating Systems"], color: "#fff7ed", accent: "#ea580c" },
  { id: 6, name: "Certified ML Practitioner", year: "3rd Year", tag: "Emerging Tech", description: "Awarded for demonstrated understanding of machine learning algorithms and data science workflows.", requirements: ["Machine Learning Basics", "Database Management Systems"], color: "#faf5ff", accent: "#9333ea" },
  { id: 7, name: "Certified Cloud Architect", year: "4th Year", tag: "Industry-Ready", description: "Validates expertise in cloud infrastructure, DevOps practices, and containerized deployments.", requirements: ["Cloud Computing & DevOps", "Software Engineering", "Computer Networks"], color: "#f0fdf4", accent: "#16a34a" },
  { id: 8, name: "Certified AI Engineer", year: "4th Year", tag: "Advanced", description: "The highest certification level. Recognizes deep expertise in AI, ML, and large-scale system design.", requirements: ["Artificial Intelligence", "Machine Learning Basics", "Capstone & System Design"], color: "#faf5ff", accent: "#9333ea" },
];

const EMPLOYERS = [
  { name: "TechCorp Philippines", industry: "Software Development", location: "Taguig, PH", openRoles: 12, verified: true, description: "Leading software solutions company building enterprise systems for APAC clients." },
  { name: "CloudBase Inc.", industry: "Cloud Infrastructure", location: "BGC, PH", openRoles: 7, verified: true, description: "Specializes in cloud migration and managed infrastructure services." },
  { name: "DataMinds Analytics", industry: "Data & AI", location: "Makati, PH", openRoles: 9, verified: true, description: "Data analytics firm powering business intelligence for Fortune 500 companies." },
  { name: "SecureNet Solutions", industry: "Cybersecurity", location: "Ortigas, PH", openRoles: 5, verified: true, description: "Provides SOC services, penetration testing, and security consulting." },
  { name: "AppBuilders Co.", industry: "Mobile Development", location: "Cebu, PH", openRoles: 8, verified: true, description: "Top-rated mobile agency with 200+ apps launched across iOS and Android." },
  { name: "AIventures Lab", industry: "Artificial Intelligence", location: "Remote", openRoles: 11, verified: true, description: "AI startup building LLM-powered tools for education and healthcare sectors." },
];

const ROADMAP = {
  CS: [
    { year: "1st Year", focus: "Foundations", courses: ["Intro to Programming (Python)", "Computer Fundamentals", "Discrete Mathematics", "Web Development Basics"], outcome: "Write basic programs, understand computer architecture" },
    { year: "2nd Year", focus: "Core Engineering", courses: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Computer Networks"], outcome: "Build data-driven applications, solve algorithmic problems" },
    { year: "3rd Year", focus: "Systems & Intelligence", courses: ["Operating Systems", "Software Engineering", "Machine Learning Basics", "Cybersecurity Fundamentals"], outcome: "Design robust systems, understand ML pipelines" },
    { year: "4th Year", focus: "Industry Readiness", courses: ["Artificial Intelligence", "Cloud Computing & DevOps", "Capstone & System Design", "Mobile App Development"], outcome: "Build and deploy production-grade software" },
  ],
  IT: [
    { year: "1st Year", focus: "Digital Foundations", courses: ["Computer Fundamentals", "Web Development Basics", "Intro to Programming (Python)", "IT Infrastructure Basics"], outcome: "Set up systems, build basic web pages" },
    { year: "2nd Year", focus: "Networking & Data", courses: ["Computer Networks", "Database Management Systems", "OOP with Java", "System Administration"], outcome: "Manage databases, configure networks" },
    { year: "3rd Year", focus: "Security & Engineering", courses: ["Cybersecurity Fundamentals", "Software Engineering", "Mobile Dev Intro", "Cloud Foundations"], outcome: "Secure systems, lead development projects" },
    { year: "4th Year", focus: "Cloud & Deployment", courses: ["Cloud Computing & DevOps", "Mobile App Development", "Capstone Project", "IT Governance & Management"], outcome: "Deploy cloud-native applications end-to-end" },
  ],
};

const TESTIMONIALS = [
  { name: "Maria Santos", role: "Software Engineer at TechCorp PH", year: "Graduated 2024", quote: "CertifyCS helped me structure my self-study around my degree. The certifications gave me something concrete to show during interviews beyond my GPA." },
  { name: "Jerico Reyes", role: "Data Analyst at DataMinds", year: "Graduated 2024", quote: "The ML Practitioner cert was recognized by my employer during the hiring process. It showed I had hands-on experience beyond what the classroom taught." },
  { name: "Anna Lim", role: "Junior DevOps Engineer at CloudBase", year: "Graduated 2023", quote: "Following the 4-year roadmap kept me focused. By graduation I had 4 certifications and 3 job offers. I can't recommend this platform enough." },
];

const levelColor = { Beginner: "#16a34a", Intermediate: "#2563eb", Advanced: "#ea580c", Expert: "#9333ea" };
const levelBg = { Beginner: "#f0fdf4", Intermediate: "#eff6ff", Advanced: "#fff7ed", Expert: "#faf5ff" };

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView();
  const translate = direction === "up" ? "translateY(28px)" : direction === "left" ? "translateX(-28px)" : direction === "right" ? "translateX(28px)" : "translateY(0)";
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : translate, transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [fieldFilter, setFieldFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeCourseTab, setActiveCourseTab] = useState("overview");
  const [roadmapTrack, setRoadmapTrack] = useState("CS");
  const [employerCode, setEmployerCode] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [toast, setToast] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2800); };

  const enroll = (course) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, { ...course, progress: 0 }]);
      showToast(`Enrolled in "${course.title}"`);
    } else {
      showToast(`You are already enrolled in "${course.title}"`);
    }
    setSelectedCourse(null);
  };

  const filteredCourses = COURSES[selectedYear].filter(c => {
    const matchField = fieldFilter === "All" || c.field.includes(fieldFilter);
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchField && matchSearch;
  });

  const verifyEmployer = () => {
    if (employerCode.trim().toLowerCase() === "cert-2024-dsa") {
      setVerifyResult({ valid: true, name: "Juan Dela Cruz", cert: "Certified DSA Specialist", level: "2nd Year Core", issued: "January 15, 2025", expires: "January 15, 2027", id: "CCS-2025-00341" });
    } else if (employerCode.trim().toLowerCase() === "cert-2024-web") {
      setVerifyResult({ valid: true, name: "Maria Santos", cert: "Certified Web Foundations", level: "1st Year Specialization", issued: "March 3, 2025", expires: "March 3, 2027", id: "CCS-2025-00128" });
    } else {
      setVerifyResult({ valid: false });
    }
  };

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const styles = {
    page: { fontFamily: "'Inter', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#f9fafb", color: "#111827" },
    nav: { background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 100 },
    navInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 },
    logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
    logoBox: { width: 34, height: 34, background: "#111827", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" },
    main: { maxWidth: 1100, margin: "0 auto", padding: "0 24px" },
    card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "22px 20px", cursor: "pointer", transition: "box-shadow 0.22s, transform 0.22s" },
    btn: { background: "#111827", color: "#fff", border: "none", borderRadius: 10, padding: "12px 26px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.18s, transform 0.18s" },
    btnOutline: { background: "#fff", color: "#111827", border: "1.5px solid #d1d5db", borderRadius: 10, padding: "12px 26px", fontSize: 14, cursor: "pointer", transition: "background 0.18s" },
    tag: (color, bg) => ({ background: bg, color: color, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase" }),
    section: { padding: "56px 0" },
    h1: { fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.12, margin: "0 0 16px" },
    h2: { fontSize: 22, fontWeight: 750, letterSpacing: "-0.5px", margin: "0 0 8px" },
  };

  return (
    <div style={styles.page}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse-ring { 0%{transform:scale(0.92);opacity:0.6} 100%{transform:scale(1.1);opacity:0} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .course-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09) !important; transform: translateY(-3px) !important; }
        .cert-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09) !important; transform: translateY(-3px) !important; }
        .nav-btn:hover { background: #f3f4f6 !important; }
        .nav-btn.active { background: #111827 !important; color: #fff !important; }
        .primary-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .outline-btn:hover { background: #f9fafb !important; }
        .year-tab:hover { background: #f3f4f6 !important; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "#111827", color: "#fff", padding: "13px 24px", borderRadius: 12, zIndex: 9999, fontSize: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", animation: "slide-up 0.3s ease", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo} onClick={() => navigate("Home")}>
            <div style={styles.logoBox}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>C</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>CertifyCS</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {NAV_LINKS.map(link => (
              <button key={link} className={`nav-btn${page === link ? " active" : ""}`} onClick={() => navigate(link)} style={{ background: page === link ? "#111827" : "transparent", color: page === link ? "#fff" : "#6b7280", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13.5, cursor: "pointer", fontWeight: page === link ? 600 : 400, transition: "all 0.18s" }}>
                {link}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="outline-btn" style={styles.btnOutline}>Log in</button>
            <button className="primary-btn" style={{ ...styles.btn, padding: "8px 18px", fontSize: 13 }}>Sign up free</button>
          </div>
        </div>
      </nav>

      <main style={styles.main}>

        {/* ===== HOME ===== */}
        {page === "Home" && (
          <div>
            {/* Hero */}
            <div style={{ textAlign: "center", padding: "90px 20px 70px" }}>
              <FadeIn delay={0}>
                <div style={{ display: "inline-block", background: "#f3f4f6", borderRadius: 20, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#6b7280", marginBottom: 24 }}>
                  For CS and IT Students — Year 1 to Year 4
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 style={styles.h1}>
                  Learn. Certify.<br />
                  <span style={{ color: "#6b7280" }}>Get Hired.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 }}>
                  A structured certification platform covering every CS and IT subject across your 4-year degree — with certificates recognized by top employers.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="primary-btn" onClick={() => navigate("Courses")} style={styles.btn}>Explore Courses</button>
                  <button className="outline-btn" onClick={() => navigate("Certifications")} style={styles.btnOutline}>View Certifications</button>
                </div>
              </FadeIn>
            </div>

            {/* Stats */}
            <FadeIn delay={0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 70 }}>
                {[{ label: "Active Learners", val: 24000, suffix: "+" }, { label: "Courses Available", val: 80, suffix: "+" }, { label: "Certifications Issued", val: 15000, suffix: "+" }, { label: "Partner Employers", val: 120, suffix: "+" }].map(s => (
                  <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "28px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1.5px", color: "#111827" }}>
                      <Counter target={s.val} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* 4-Year Path */}
            <div style={{ marginBottom: 70 }}>
              <FadeIn><h2 style={{ ...styles.h2, marginBottom: 6 }}>Your 4-Year Learning Path</h2></FadeIn>
              <FadeIn delay={0.05}><p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>Each year builds on the last — from fundamentals to industry-ready skills.</p></FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                {YEARS.map((y, i) => {
                  const col = YEAR_COLORS[y];
                  return (
                    <FadeIn key={y} delay={i * 0.08}>
                      <div className="cert-card" onClick={() => { navigate("Courses"); setSelectedYear(y); }} style={{ ...styles.card, background: col.bg, borderColor: col.light }}>
                        <div style={{ width: 40, height: 40, background: col.accent + "18", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                          <div style={{ width: 16, height: 16, background: col.accent, borderRadius: 4 }} />
                        </div>
                        <div style={{ fontWeight: 700, marginBottom: 5, fontSize: 15 }}>{y}</div>
                        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>{COURSES[y].length} courses available</div>
                        <div style={{ fontSize: 12, color: col.accent, fontWeight: 600 }}>Explore courses →</div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>

            {/* Featured Courses */}
            <div style={{ marginBottom: 70 }}>
              <FadeIn><h2 style={{ ...styles.h2, marginBottom: 6 }}>Most Popular Courses</h2></FadeIn>
              <FadeIn delay={0.05}><p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>Highly enrolled courses across all year levels.</p></FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {[COURSES["1st Year"][0], COURSES["2nd Year"][0], COURSES["3rd Year"][3], COURSES["4th Year"][1]].map((c, i) => (
                  <FadeIn key={c.id} delay={i * 0.07}>
                    <div className="course-card" onClick={() => { setSelectedCourse(c); setActiveCourseTab("overview"); }} style={styles.card}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={styles.tag("#6b7280", "#f3f4f6")}>{c.lang}</span>
                        <span style={styles.tag(levelColor[c.level], levelBg[c.level])}>{c.level}</span>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{c.title}</h3>
                      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 14, lineHeight: 1.6 }}>{c.desc.slice(0, 80)}...</p>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9ca3af" }}>
                        <span>{c.duration}</span>
                        <span>{c.enrolled.toLocaleString()} enrolled</span>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div style={{ marginBottom: 70 }}>
              <FadeIn><h2 style={{ ...styles.h2, marginBottom: 28 }}>What Students Say</h2></FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {TESTIMONIALS.map((t, i) => (
                  <FadeIn key={t.name} delay={i * 0.08}>
                    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "26px 22px" }}>
                      <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 38, height: 38, background: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#374151" }}>
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
                          <div style={{ fontSize: 12, color: "#9ca3af" }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* CTA */}
            <FadeIn>
              <div style={{ background: "#111827", borderRadius: 20, padding: "52px 40px", textAlign: "center", marginBottom: 70, color: "#fff" }}>
                <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.8px", marginBottom: 12 }}>Start your certification journey today.</h2>
                <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 28 }}>Join 24,000+ students building job-ready skills alongside their degree.</p>
                <button className="primary-btn" onClick={() => navigate("Courses")} style={{ background: "#fff", color: "#111827", border: "none", borderRadius: 10, padding: "13px 30px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Get started — it's free
                </button>
              </div>
            </FadeIn>
          </div>
        )}

        {/* ===== COURSES ===== */}
        {page === "Courses" && (
          <div style={styles.section}>
            <FadeIn><h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 6 }}>Browse Courses</h1></FadeIn>
            <FadeIn delay={0.05}><p style={{ color: "#9ca3af", marginBottom: 32 }}>Structured by year level for CS and IT degree students.</p></FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search courses..." style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 16px", fontSize: 14, outline: "none", flex: "1 1 220px", maxWidth: 300, color: "#111827", background: "#fff" }} />
                <div style={{ display: "flex", gap: 6 }}>
                  {["All", "CS", "IT"].map(f => (
                    <button key={f} className="year-tab" onClick={() => setFieldFilter(f)} style={{ background: fieldFilter === f ? "#111827" : "#fff", color: fieldFilter === f ? "#fff" : "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "9px 18px", fontSize: 13, cursor: "pointer", fontWeight: fieldFilter === f ? 700 : 400, transition: "all 0.18s" }}>{f}</button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
                {YEARS.map(y => {
                  const col = YEAR_COLORS[y];
                  return (
                    <button key={y} className="year-tab" onClick={() => setSelectedYear(y)} style={{ background: selectedYear === y ? "#111827" : "#fff", color: selectedYear === y ? "#fff" : "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "9px 20px", fontSize: 13.5, fontWeight: selectedYear === y ? 700 : 400, cursor: "pointer", transition: "all 0.18s" }}>
                      {y}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18 }}>
              {filteredCourses.map((c, i) => (
                <FadeIn key={c.id} delay={i * 0.05}>
                  <div className="course-card" onClick={() => { setSelectedCourse(c); setActiveCourseTab("overview"); }} style={styles.card}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <span style={styles.tag("#6b7280", "#f3f4f6")}>{c.lang}</span>
                      <span style={styles.tag(levelColor[c.level], levelBg[c.level])}>{c.level}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{c.title}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 14 }}>{c.desc.slice(0, 90)}...</p>
                    <div style={{ fontSize: 12, color: "#9ca3af", display: "flex", gap: 12, marginBottom: 14 }}>
                      <span>{c.duration}</span>
                      <span>{c.modules} modules</span>
                      <span>{c.enrolled.toLocaleString()} enrolled</span>
                    </div>
                    {enrolledCourses.find(e => e.id === c.id) && (
                      <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "#16a34a", fontWeight: 700 }}>Currently enrolled</div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
            {filteredCourses.length === 0 && <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>No courses match your filter.</div>}
          </div>
        )}

        {/* ===== CERTIFICATIONS ===== */}
        {page === "Certifications" && (
          <div style={styles.section}>
            <FadeIn><h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 6 }}>Certifications</h1></FadeIn>
            <FadeIn delay={0.05}><p style={{ color: "#9ca3af", marginBottom: 36 }}>Complete required courses to earn certificates verified by partner employers.</p></FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18, marginBottom: 50 }}>
              {CERTS.map((c, i) => (
                <FadeIn key={c.id} delay={i * 0.05}>
                  <div className="cert-card" onClick={() => setSelectedCert(c)} style={{ ...styles.card, background: c.color, borderColor: c.accent + "33", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <span style={styles.tag(c.accent, c.accent + "18")}>{c.tag}</span>
                      <span style={{ fontSize: 11, color: "#9ca3af" }}>{c.year}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{c.name}</h3>
                    <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.65, marginBottom: 16 }}>{c.description.slice(0, 80)}...</p>
                    <div style={{ fontSize: 12, color: c.accent, fontWeight: 600 }}>View requirements →</div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {enrolledCourses.length > 0 && (
              <FadeIn>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "28px 24px" }}>
                  <h2 style={{ ...styles.h2, marginBottom: 20 }}>Your Enrolled Courses</h2>
                  {enrolledCourses.map(c => (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #f3f4f6" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>{c.duration} — {c.modules} modules</div>
                      </div>
                      <div style={{ background: "#f0fdf4", color: "#16a34a", borderRadius: 8, padding: "5px 14px", fontSize: 12, fontWeight: 700 }}>In Progress</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        )}

        {/* ===== EMPLOYERS ===== */}
        {page === "Employers" && (
          <div style={styles.section}>
            <FadeIn><h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 6 }}>Employer Portal</h1></FadeIn>
            <FadeIn delay={0.05}><p style={{ color: "#9ca3af", marginBottom: 40 }}>Verify certifications instantly or find top student talent.</p></FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
              <FadeIn delay={0.1}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "30px 26px" }}>
                  <h2 style={{ ...styles.h2, marginBottom: 6 }}>Verify a Certificate</h2>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Enter a candidate's certificate code to instantly verify authenticity.<br /><span style={{ color: "#374151" }}>Try: cert-2024-dsa or cert-2024-web</span></p>
                  <input value={employerCode} onChange={e => { setEmployerCode(e.target.value); setVerifyResult(null); }} placeholder="Enter certificate code..." style={{ width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 16px", fontSize: 14, outline: "none", marginBottom: 12, color: "#111827" }} />
                  <button className="primary-btn" onClick={verifyEmployer} style={{ ...styles.btn, width: "100%" }}>Verify Certificate</button>
                  {verifyResult && (
                    <div style={{ marginTop: 16, background: verifyResult.valid ? "#f0fdf4" : "#fef2f2", borderRadius: 12, padding: "18px 18px", border: `1px solid ${verifyResult.valid ? "#bbf7d0" : "#fecaca"}`, animation: "slide-up 0.3s ease" }}>
                      {verifyResult.valid ? (
                        <div>
                          <div style={{ fontWeight: 700, color: "#15803d", marginBottom: 12, fontSize: 14 }}>Certificate Verified</div>
                          {[["Holder", verifyResult.name], ["Certification", verifyResult.cert], ["Level", verifyResult.level], ["Issued", verifyResult.issued], ["Expires", verifyResult.expires], ["Certificate ID", verifyResult.id]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                              <span style={{ color: "#6b7280" }}>{k}</span>
                              <span style={{ fontWeight: 600 }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontWeight: 600, color: "#dc2626", fontSize: 14 }}>Invalid certificate code. Please check and try again.</div>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "30px 26px" }}>
                  <h2 style={{ ...styles.h2, marginBottom: 6 }}>Become a Partner</h2>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Post roles, access certified candidates, and integrate our verification API into your HR system.</p>
                  {[["Access to certified talent pool", "Instant certificate verification API", "Post jobs visible to 24,000+ students", "Priority listing in partner directory", "Monthly talent report & analytics"]].flat().map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: 13, color: "#374151" }}>
                      <div style={{ width: 18, height: 18, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <div style={{ width: 6, height: 6, background: "#16a34a", borderRadius: "50%" }} />
                      </div>
                      {b}
                    </div>
                  ))}
                  <button className="primary-btn" style={{ ...styles.btn, marginTop: 20, width: "100%" }}>Apply as Partner Employer</button>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <h2 style={{ ...styles.h2, marginBottom: 20 }}>Current Partner Employers</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {EMPLOYERS.map((e, i) => (
                  <FadeIn key={e.name} delay={i * 0.05}>
                    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{e.name}</div>
                        <span style={styles.tag("#16a34a", "#f0fdf4")}>Verified</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>{e.industry} — {e.location}</div>
                      <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 12 }}>{e.description}</p>
                      <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600 }}>{e.openRoles} open roles</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        )}

        {/* ===== ROADMAP ===== */}
        {page === "Roadmap" && (
          <div style={styles.section}>
            <FadeIn><h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 6 }}>Learning Roadmap</h1></FadeIn>
            <FadeIn delay={0.05}><p style={{ color: "#9ca3af", marginBottom: 28 }}>Follow a structured path tailored to your degree program.</p></FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
                {["CS", "IT"].map(t => (
                  <button key={t} className="year-tab" onClick={() => setRoadmapTrack(t)} style={{ background: roadmapTrack === t ? "#111827" : "#fff", color: roadmapTrack === t ? "#fff" : "#6b7280", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.18s" }}>
                    {t === "CS" ? "Computer Science" : "Information Technology"}
                  </button>
                ))}
              </div>
            </FadeIn>
            <div>
              {ROADMAP[roadmapTrack].map((step, i) => {
                const col = YEAR_COLORS[step.year];
                return (
                  <FadeIn key={step.year} delay={i * 0.1}>
                    <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                        <div style={{ width: 44, height: 44, background: col.accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>{i + 1}</div>
                        {i < 3 && <div style={{ width: 2, flex: 1, background: "#e5e7eb", minHeight: 32, marginTop: 4 }} />}
                      </div>
                      <div style={{ background: "#fff", border: `1px solid ${col.light}`, borderRadius: 16, padding: "24px 24px", flex: 1, borderLeft: `3px solid ${col.accent}` }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontWeight: 800, fontSize: 16 }}>{step.year}</span>
                          <span style={styles.tag(col.accent, col.light)}>{step.focus}</span>
                        </div>
                        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>Outcome: {step.outcome}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {step.courses.map(c => (
                            <span key={c} style={{ background: col.bg, border: `1px solid ${col.light}`, borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#374151" }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== ABOUT ===== */}
        {page === "About" && (
          <div style={{ ...styles.section, maxWidth: 780 }}>
            <FadeIn><h1 style={{ ...styles.h1, fontSize: 28, marginBottom: 16 }}>About CertifyCS</h1></FadeIn>
            <FadeIn delay={0.05}>
              <p style={{ color: "#374151", lineHeight: 1.85, marginBottom: 18, fontSize: 15 }}>
                CertifyCS is a certification and learning platform built specifically for BS Computer Science and BS Information Technology students in the Philippines. We bridge the gap between academic learning and industry readiness by offering structured courses aligned with the 4-year university curriculum.
              </p>
              <p style={{ color: "#374151", lineHeight: 1.85, marginBottom: 40, fontSize: 15 }}>
                Our certifications are verifiable by registered employer partners, giving students a way to demonstrate their skills beyond grades and diplomas — and giving hiring managers a trusted, instant way to validate a candidate's knowledge.
              </p>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 50 }}>
              {[["Academic Alignment", "Every course maps directly to standard CS and IT university syllabi, year by year."], ["Employer Trust", "Our certifications are verifiable through a unique code system used by 120+ partner companies."], ["Learn at Your Pace", "Access all course content on any device, asynchronously, around your class schedule."], ["Verified Credentials", "Earn digital certificates with a unique ID that employers can validate in seconds."]].map(([title, desc], i) => (
                <FadeIn key={title} delay={i * 0.08}>
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "22px 20px" }}>
                    <div style={{ width: 10, height: 10, background: "#111827", borderRadius: "50%", marginBottom: 14 }} />
                    <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <div style={{ background: "#111827", borderRadius: 16, padding: "36px 32px", color: "#fff", textAlign: "center" }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>Built in the Philippines. Built for Filipino students.</h2>
                <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>We started CertifyCS because we saw the gap between university curricula and what companies actually need. This platform is our answer.</p>
                <button className="primary-btn" onClick={() => navigate("Courses")} style={{ background: "#fff", color: "#111827", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  Start learning for free
                </button>
              </div>
            </FadeIn>
          </div>
        )}

      </main>

      {/* ===== COURSE MODAL ===== */}
      {selectedCourse && (
        <div onClick={() => setSelectedCourse(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20, backdropFilter: "blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: 0, maxWidth: 560, width: "100%", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.18)", animation: "slide-up 0.3s ease" }}>
            <div style={{ padding: "28px 28px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={styles.tag(levelColor[selectedCourse.level], levelBg[selectedCourse.level])}>{selectedCourse.level}</span>
                  <span style={styles.tag("#6b7280", "#f3f4f6")}>{selectedCourse.field}</span>
                </div>
                <button onClick={() => setSelectedCourse(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>x</button>
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 10 }}>{selectedCourse.title}</h2>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>
                <span>{selectedCourse.duration}</span>
                <span>{selectedCourse.modules} modules</span>
                <span>{selectedCourse.lang}</span>
                <span>{selectedCourse.enrolled.toLocaleString()} enrolled</span>
              </div>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #e5e7eb", marginBottom: 24 }}>
                {["overview", "curriculum", "certificate"].map(tab => (
                  <button key={tab} onClick={() => setActiveCourseTab(tab)} style={{ background: "none", border: "none", borderBottom: activeCourseTab === tab ? "2px solid #111827" : "2px solid transparent", padding: "10px 18px", fontSize: 13.5, fontWeight: activeCourseTab === tab ? 700 : 400, color: activeCourseTab === tab ? "#111827" : "#9ca3af", cursor: "pointer", transition: "all 0.18s", textTransform: "capitalize" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: "0 28px 28px" }}>
              {activeCourseTab === "overview" && (
                <div>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 22 }}>{selectedCourse.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                    {[["Duration", selectedCourse.duration], ["Modules", `${selectedCourse.modules} modules`], ["Language", selectedCourse.lang], ["Enrolled", selectedCourse.enrolled.toLocaleString()]].map(([k, v]) => (
                      <div key={k} style={{ background: "#f9fafb", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.5px" }}>{k}</div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeCourseTab === "curriculum" && (
                <div>
                  <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>{selectedCourse.modules} modules in this course</p>
                  {selectedCourse.lessons.map((lesson, i) => (
                    <div key={lesson} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < selectedCourse.lessons.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                      <div style={{ width: 28, height: 28, background: "#f3f4f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#6b7280", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontSize: 14, color: "#374151" }}>{lesson}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeCourseTab === "certificate" && (
                <div>
                  <div style={{ background: "#f9fafb", borderRadius: 14, padding: "28px", textAlign: "center", border: "1px dashed #d1d5db", marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Certificate of Completion</div>
                    <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }}>{selectedCourse.title}</div>
                    <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>Issued by CertifyCS — Valid 2 years</div>
                    <div style={{ width: 60, height: 2, background: "#111827", margin: "0 auto" }} />
                  </div>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>
                    Upon completing all {selectedCourse.modules} modules and passing the final assessment, you will receive a digitally signed certificate with a unique verification code. This certificate can be shared with employers through the CertifyCS verification portal.
                  </p>
                </div>
              )}
              <button className="primary-btn" onClick={() => enroll(selectedCourse)} style={{ ...styles.btn, width: "100%", marginTop: 24, padding: "14px" }}>
                {enrolledCourses.find(c => c.id === selectedCourse.id) ? "Already Enrolled" : "Enroll Now — Free"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== CERT MODAL ===== */}
      {selectedCert && (
        <div onClick={() => setSelectedCert(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20, backdropFilter: "blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", maxWidth: 480, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.18)", animation: "slide-up 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={styles.tag(selectedCert.accent, selectedCert.accent + "18")}>{selectedCert.tag}</span>
              <button onClick={() => setSelectedCert(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#9ca3af" }}>x</button>
            </div>
            <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 8 }}>{selectedCert.name}</h2>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>{selectedCert.year}</div>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 24 }}>{selectedCert.description}</p>
            <div style={{ background: "#f9fafb", borderRadius: 12, padding: "18px 18px", marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Required Courses</div>
              {selectedCert.requirements.map((r, i) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < selectedCert.requirements.length - 1 ? 10 : 0 }}>
                  <div style={{ width: 6, height: 6, background: selectedCert.accent, borderRadius: "50%" }} />
                  <span style={{ fontSize: 13, color: "#374151" }}>{r}</span>
                </div>
              ))}
            </div>
            <button className="primary-btn" onClick={() => { setSelectedCert(null); navigate("Courses"); }} style={{ ...styles.btn, width: "100%", background: selectedCert.accent }}>
              Start Earning This Certificate
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", marginTop: 60, padding: "32px 24px", color: "#9ca3af", fontSize: 13 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, background: "#111827", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>C</span>
            </div>
            <span style={{ fontWeight: 700, color: "#374151" }}>CertifyCS</span>
            <span style={{ color: "#e5e7eb" }}>|</span>
            <span>Built for CS and IT students in the Philippines</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Contact"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
