export const personalInfo = {
  name: "Victor Ebube Okoroji",
  title: "Frontend Engineer",
  subtitle: "Frontend Engineer | React • Next.js • TypeScript",
  tagline: "Building production-grade React applications that drive real business impact",
  email: "okorojiebube2@gmail.com",
  phone: "+234 814 667 2411",
  location: "Lagos, Nigeria",
  linkedIn: "https://www.linkedin.com/in/victorebubeokoroji/",
  github: "https://github.com/vickymarz",
  gitlab: "https://gitlab.com/victorokoroji",
  twitter: "https://x.com/okoroji_ebube",
  resumeUrl: "/resume.pdf",
};

export const stats = [
  { label: "Years Experience", value: "4+" },
  { label: "Projects Delivered", value: "10+" },
  { label: "Users Impacted", value: "11K+" },
];

export const skills = [
  "React & Next.js",
  "TypeScript",
  "React Native",
  "Node.js & APIs",
  "TailwindCSS",
  "State Management",
  "Testing (Jest, Cypress)",
];

export const projects = [
  {
    id: 1,
    title: "Enterprise E-Invoicing Platform",
    year: "2025",
    company: "Centrify",
    description: "Multi-tenant invoicing platform with government API integration and automated workflows.",
    tags: ["Next.js", "TypeScript", "OAuth", "RBAC", "SFTP"],
    image: "/projects/invoice-platform.jpg",
    category: ["Enterprise", "Featured"],
    metrics: [
      "90% reduction in manual processing",
      "Enterprise-grade security"
    ],
    liveUrl: "https://kpmg-invoicing.vercel.app/",
    githubUrl: null,
    featured: true,
  },
  {
    id: 2,
    title: "Tixtango - Events & Ticketing Platform",
    year: "2025",
    company: "Tixtango",
    description: "Full-stack ticketing platform handling 10K+ monthly transactions.",
    tags: ["Next.js", "React Native", "TypeScript", "Paystack", "Monorepo"],
    image: "/projects/tixtango.jpg",
    category: ["SaaS", "Featured"],
    metrics: [
      "10K+ monthly transactions",
      "12% conversion increase",
      "<3s load time"
    ],
    liveUrl: "https://www.tixtango.com/",
    githubUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "UnykEd - Study Abroad SaaS Platform",
    year: "2023-2025",
    company: "UnykEd",
    description: "Education platform serving 11K+ students with AI document review.",
    tags: ["Next.js", "TypeScript", "WebSockets", "Stripe", "Real-time"],
    image: "/projects/unyked.jpg",
    category: ["SaaS", "Featured"],
    metrics: [
      "11K+ active users",
      "30% faster processing",
      "Real-time messaging"
    ],
    liveUrl: "https://unyked.com",
    githubUrl: null,
    featured: true,
  },
  {
    id: 4,
    title: "Hydrogen Payroll System",
    year: "2023",
    company: "Hydrogen",
    description: "Automated payroll management with compliance features.",
    tags: ["React.js", "TypeScript", "TailwindCSS"],
    image: "/projects/payroll.jpg",
    category: ["Enterprise"],
    metrics: [
      "Automated payroll",
      "Tax compliance"
    ],
    liveUrl: "http://hydrogenpayroll.netlify.app",
    githubUrl: null,
    featured: false,
  },
  {
    id: 5,
    title: "HydrogenHR - HRIS Platform",
    year: "2023",
    company: "Hydrogen",
    description: "Enterprise HR management for recruitment and performance.",
    tags: ["React.js", "TypeScript", "TailwindCSS"],
    image: "/projects/hydrogenhr.jpg",
    category: ["Enterprise"],
    metrics: [
      "Enterprise clients",
      "HR automation"
    ],
    liveUrl: "https://hydrogenhr.com",
    githubUrl: null,
    featured: false,
  },
  {
    id: 6,
    title: "CatchUp App",
    year: "2022",
    company: "Workshop",
    description: "Social event scheduling and invitation platform.",
    tags: ["React", "ContextAPI", "TailwindCSS"],
    image: "/projects/catchup.jpg",
    category: ["SaaS"],
    metrics: [],
    liveUrl: "https://catchups.netlify.app/",
    githubUrl: "https://github.com/workshopapps/dinnerwithfriends.web",
    featured: false,
  },
];

export const caseStudies = [
  {
    id: 1,
    title: "Enterprise E-Invoicing Platform",
    company: "Centrify",
    year: "2025",
    duration: "6 months",
    image: "/case-studies/invoice-hero.jpg",
    overview: "Multi-tenant invoicing platform for government compliance",
    role: "Lead Frontend Engineer",
    challenge: [
      "Manual invoice processing taking hours",
      "Complex government validation requirements",
      "Need for enterprise security and audit trails"
    ],
    solution: [
      "Implemented JWT/OAuth authentication with RBAC",
      "Integrated government validation APIs",
      "Built automated SFTP data exchange system",
      "Created digital signature workflows"
    ],
    techStack: ["Next.js", "TypeScript", "JWT/OAuth", "SFTP", "REST APIs"],
    features: [
      "Multi-tenant architecture",
      "Real-time government API validation",
      "Automated secure data exchanges",
      "Complete audit trail system"
    ],
    results: [
      "90% reduction in manual processing time",
      "Zero security incidents",
      "Enabled compliant invoice processing for enterprise clients",
      "Improved data accuracy and traceability"
    ],
    screenshots: []
  },
  {
    id: 2,
    title: "Tixtango - Events & Ticketing Platform",
    company: "Tixtango",
    year: "2025",
    duration: "8 months",
    image: "/case-studies/tixtango-hero.jpg",
    overview: "Full-stack ticketing platform with mobile and web apps",
    role: "Full Stack Engineer (Frontend Lead)",
    challenge: [
      "Handle high-traffic ticket purchases",
      "Secure payment processing",
      "Cross-platform consistency (web + mobile)",
      "Page performance optimization"
    ],
    solution: [
      "Architected scalable frontend with Next.js",
      "Implemented secure Paystack payment integration",
      "Created shared monorepo for web and React Native mobile",
      "Optimized checkout flow with code splitting and lazy loading"
    ],
    techStack: ["Next.js", "React Native", "TypeScript", "Paystack", "Monorepo", "QR Code"],
    features: [
      "Real-time inventory synchronization",
      "Promo code validation engine",
      "Automated QR ticket delivery",
      "Mobile-first responsive design"
    ],
    results: [
      "10,000+ monthly ticket transactions",
      "12% increase in transaction completion rates",
      "<3 second page load time",
      "35% development efficiency through shared codebase"
    ],
    liveUrl: "#",
    screenshots: []
  },
  {
    id: 3,
    title: "UnykEd - Study Abroad SaaS Platform",
    company: "UnykEd",
    year: "2023-2025",
    duration: "2 years",
    image: "/case-studies/unyked-hero.jpg",
    overview: "Education management platform serving 11K+ students",
    role: "Frontend Engineer",
    challenge: [
      "Complex scholarship discovery workflows",
      "Real-time communication needs",
      "AI integration for document review",
      "Subscription billing management"
    ],
    solution: [
      "Built scalable React/Next.js architecture",
      "Implemented WebSocket real-time messaging",
      "Integrated AI document review with fallback to human review",
      "Set up Stripe subscription and installment billing"
    ],
    techStack: ["Next.js", "TypeScript", "WebSockets", "Stripe", "AI APIs"],
    features: [
      "Real-time messaging and notifications",
      "AI-powered document review",
      "Scholarship matching algorithm",
      "Flexible payment options"
    ],
    results: [
      "11,000+ active users",
      "30% reduction in document review turnaround",
      "Improved student engagement with real-time features",
      "Successful monetization through subscription model"
    ],
    liveUrl: "https://unyked.com",
    screenshots: []
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "Victor consistently delivered high-quality code and showed exceptional problem-solving skills. His work on our invoicing platform was instrumental to our success.",
    name: "Donice Ubaru",
    role: "Project Lead at Centrify",
    company: "Centrify",
    avatar: "/testimonials/avatar1.jpg"
  },
  {
    id: 2,
    quote: "Working with Victor was fantastic. He's not only technically skilled but also great at communicating complex ideas to the team.",
    name: "Emmanuel Orji",
    role: "CTO at UnykEd",
    company: "UnykEd",
    avatar: "/testimonials/avatar2.jpg"
  },
  {
    id: 3,
    quote: "Victor's contributions to Tixtango were invaluable. He played a key role in building our ticketing platform and ensuring its success.",
    name: "CEO and Co-founder of Tixtango",
    role: "CTO at Tixtango",
    company: "Tixtango",
    avatar: "/testimonials/avatar3.jpg"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the architectural patterns and best practices for building React applications that scale...",
    image: "/blog/scalable-react.jpg",
    readTime: "8 min",
    date: "2025-01-15",
    url: "#"
  },
  {
    id: 2,
    title: "TypeScript Best Practices for 2025",
    excerpt: "Discover the latest TypeScript features and patterns that will improve your codebase...",
    image: "/blog/typescript.jpg",
    readTime: "6 min",
    date: "2025-01-08",
    url: "#"
  },
  {
    id: 3,
    title: "Optimizing Next.js Performance",
    excerpt: "Deep dive into performance optimization techniques for Next.js applications...",
    image: "/blog/nextjs-performance.jpg",
    readTime: "10 min",
    date: "2024-12-20",
    url: "#"
  },
  {
    id: 4,
    title: "State Management: Redux vs Zustand",
    excerpt: "Comparing modern state management solutions and when to use each one...",
    image: "/blog/state-management.jpg",
    readTime: "7 min",
    date: "2024-12-10",
    url: "#"
  }
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Case Studies", href: "#case-studies" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
