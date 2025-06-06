
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
  readTime: string;
  content: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a new project with React and TypeScript, and understand the benefits of using TypeScript with React.",
    date: "2023-05-15",
    image: "/lovable-uploads/0ec78c73-9c6e-4488-89cd-44adb4eb62e9.png",
    category: "React",
    readTime: "5 min read",
    content: `
      # Getting Started with React and TypeScript

      TypeScript is a powerful addition to your React projects. It helps catch errors early and provides better developer experience through enhanced IDE support.

      ## Setting Up Your Project

      You can create a new React project with TypeScript using Create React App:

      \`\`\`bash
      npx create-react-app my-app --template typescript
      # or
      yarn create react-app my-app --template typescript
      \`\`\`

      ## Benefits of TypeScript with React

      1. **Type Safety**: Catch errors during development instead of runtime
      2. **Better IDE Support**: Get autocomplete and documentation as you code
      3. **Improved Component Props**: Define clear interfaces for your components
      4. **Easier Refactoring**: Make changes with confidence

      ## Example Component

      \`\`\`tsx
      interface GreetingProps {
        name: string;
        age?: number;
      }

      const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
        return (
          <div>
            <h2>Hello, {name}!</h2>
            {age && <p>You are {age} years old.</p>}
          </div>
        );
      };

      export default Greeting;
      \`\`\`
    `,
    slug: "getting-started-with-react-and-typescript"
  },
  {
    id: "2",
    title: "Building Modern UIs with Tailwind CSS",
    excerpt: "Discover the utility-first approach of Tailwind CSS and how it can speed up your UI development process.",
    date: "2023-06-22",
    image: "/lovable-uploads/94de8ccc-f0d2-434d-9f51-947ca673755e.png",
    category: "CSS",
    readTime: "8 min read",
    content: `
      # Building Modern UIs with Tailwind CSS

      Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. 

      ## Why Choose Tailwind?

      - **No more custom CSS files**: Build UIs without writing custom CSS
      - **Responsive designs**: Built-in responsive utilities
      - **Dark mode**: Easy dark mode implementation
      - **Customizable**: Extend the default configuration

      ## Getting Started

      Install Tailwind CSS:

      \`\`\`bash
      npm install tailwindcss postcss autoprefixer
      npx tailwindcss init -p
      \`\`\`

      Configure your template paths in \`tailwind.config.js\`:

      \`\`\`js
      module.exports = {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
          extend: {},
        },
        plugins: [],
      }
      \`\`\`

      ## Example Button Component

      \`\`\`jsx
      const Button = ({ children, primary }) => {
        return (
          <button className={\`px-4 py-2 rounded-md transition-colors \${
            primary 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }\`}>
            {children}
          </button>
        );
      };
      \`\`\`
    `,
    slug: "building-modern-uis-with-tailwind-css"
  },
  {
    id: "3",
    title: "Introduction to State Management with Redux",
    excerpt: "Learn the fundamental concepts of Redux and how to implement it in your React applications.",
    date: "2023-08-05",
    image: "/lovable-uploads/5f035d53-2887-4137-887f-3c33afbd550a.png",
    category: "React",
    readTime: "12 min read",
    content: `
      # Introduction to State Management with Redux

      Redux is a predictable state container for JavaScript applications. It helps you write applications that behave consistently and can be tested easily.

      ## Core Concepts

      1. **Store**: The single source of truth for your application state
      2. **Actions**: Plain JavaScript objects that describe what happened
      3. **Reducers**: Pure functions that specify how state changes
      4. **Dispatch**: The method used to send actions to the store

      ## Basic Example

      \`\`\`jsx
      // Action types
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';

      // Action creators
      const increment = () => ({ type: INCREMENT });
      const decrement = () => ({ type: DECREMENT });

      // Reducer
      const counterReducer = (state = { count: 0 }, action) => {
        switch (action.type) {
          case INCREMENT:
            return { count: state.count + 1 };
          case DECREMENT:
            return { count: state.count - 1 };
          default:
            return state;
        }
      };

      // Store
      import { createStore } from 'redux';
      const store = createStore(counterReducer);

      // Usage
      store.dispatch(increment()); // { count: 1 }
      store.dispatch(increment()); // { count: 2 }
      store.dispatch(decrement()); // { count: 1 }
      \`\`\`

      ## With React

      With the React Redux library, you can connect your React components to the Redux store.
    `,
    slug: "introduction-to-state-management-with-redux"
  },
  {
    id: "4",
    title: "Using Supabase for Backend and Authentication",
    excerpt: "Explore how to build a full-stack application with Supabase as your backend solution.",
    date: "2023-09-18",
    image: "/lovable-uploads/8548e38d-82b6-4f90-974d-dd42da729751.png",
    category: "Backend",
    readTime: "10 min read",
    content: `
      # Using Supabase for Backend and Authentication

      Supabase is an open-source Firebase alternative providing all the backend services you need for your application.

      ## Key Features

      - **Database**: PostgreSQL database with real-time capabilities
      - **Authentication**: Built-in auth with Row Level Security
      - **Storage**: File storage with access controls
      - **API**: Auto-generated APIs for your database

      ## Getting Started

      Sign up at Supabase and create a new project. Then, install the client library:

      \`\`\`bash
      npm install @supabase/supabase-js
      \`\`\`

      Initialize the client in your application:

      \`\`\`jsx
      import { createClient } from '@supabase/supabase-js';

      const supabaseUrl = 'YOUR_SUPABASE_URL';
      const supabaseKey = 'YOUR_SUPABASE_KEY';
      const supabase = createClient(supabaseUrl, supabaseKey);
      \`\`\`

      ## Authentication Example

      \`\`\`jsx
      // Sign up a new user
      const { user, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
      });

      // Sign in a user
      const { user, error } = await supabase.auth.signIn({
        email: 'example@email.com',
        password: 'example-password',
      });

      // Sign out
      const { error } = await supabase.auth.signOut();
      \`\`\`

      ## Database Operations

      \`\`\`jsx
      // Insert data
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title: 'Learn Supabase', user_id: user.id }]);

      // Select data
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      // Update data
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', 1);

      // Delete data
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', 1);
      \`\`\`
    `,
    slug: "using-supabase-for-backend-and-authentication"
  },
  {
    id: "5",
    title: "Responsive Design Best Practices",
    excerpt: "Essential techniques and patterns for creating websites that work well on all devices.",
    date: "2023-10-30",
    image: "/lovable-uploads/81010666-d040-4f2e-af62-e66b55e10be3.png",
    category: "CSS",
    readTime: "7 min read",
    content: `
      # Responsive Design Best Practices

      Creating websites that look and function well across all devices is essential in today's multi-device world.

      ## Core Principles

      1. **Fluid Layouts**: Use relative units like percentages rather than fixed pixels
      2. **Media Queries**: Adapt your design at different breakpoints
      3. **Flexible Images**: Ensure images scale properly on different screens
      4. **Mobile-First Approach**: Start with mobile design, then enhance for larger screens

      ## Media Query Example

      \`\`\`css
      /* Base styles for mobile */
      .container {
        padding: 15px;
      }

      /* Medium screens (tablets) */
      @media (min-width: 768px) {
        .container {
          padding: 30px;
          max-width: 720px;
          margin: 0 auto;
        }
      }

      /* Large screens (desktops) */
      @media (min-width: 1024px) {
        .container {
          padding: 40px;
          max-width: 960px;
        }
      }
      \`\`\`

      ## Responsive Images

      \`\`\`html
      <img 
        src="small.jpg" 
        srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w" 
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        alt="Responsive image example"
      >
      \`\`\`

      ## Testing Tips

      - Use browser dev tools to emulate different devices
      - Test on actual devices whenever possible
      - Consider accessibility across all screen sizes
      - Check performance, especially on slower mobile connections
    `,
    slug: "responsive-design-best-practices"
  }
];
