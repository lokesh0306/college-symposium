/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SymposiumEvent, Registration, Stats } from '../types';

const INITIAL_EVENTS: SymposiumEvent[] = [
  {
    id: 'evt-1',
    title: 'WebCraft Frontend Challenge',
    description: 'Design and build a gorgeous, responsive, and accessible modern landing page in 3 hours.',
    longDescription: 'Showcase your frontend mastery by coding a stunning user experience from scratch. Participants will receive a surprise design brief and assets, and must translate it into an interactive, lightning-fast web layout utilizing custom typography, animations, and Tailwind CSS.',
    department: 'Web Technology',
    type: 'technical',
    date: '2026-09-18',
    time: '09:00 AM - 12:00 PM',
    venue: 'Web Dev Lab, Block 3',
    fee: 150,
    teamSize: 'Individual',
    maxSeats: 60,
    registeredCount: 42,
    coordinators: [
      { name: 'Lokesh Jayaraman', phone: '+91 90432 10123' },
      { name: 'Hemashree M', phone: '+91 91234 56711' }
    ],
    rules: [
      'Participants must write standard HTML/CSS/JS or use React/Tailwind.',
      'No pre-made templates are allowed; projects must be initialized from scratch.',
      'The final output must be responsive across mobile, tablet, and desktop viewports.',
      'Submissions must be hosted on Netlify, Vercel, or GitHub Pages.'
    ],
    prizes: ['₹10,000 First Prize', '₹5,000 Second Prize', '₹2,500 Third Prize'],
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-2',
    title: 'FullStack Speed-Run',
    description: 'Build a database-driven web application with CRUD operations under a tight 4-hour clock.',
    longDescription: 'A relentless challenge for full-stack developers! Build a lightweight web service with a functional backend API and structured database. Secure user authentication, responsive controls, and high-performance querying are key evaluation parameters.',
    department: 'Web Technology',
    type: 'technical',
    date: '2026-09-18',
    time: '01:00 PM - 05:00 PM',
    venue: 'Advanced Coding Centre, Block 2',
    fee: 250,
    teamSize: 'Team of 1-2',
    maxSeats: 40,
    registeredCount: 19,
    coordinators: [
      { name: 'Aswin S', phone: '+91 92345 67822' }
    ],
    rules: [
      'Any stack (MERN, Next.js, Django, Laravel, etc.) can be used.',
      'The application must connect to a persistent database (PostgreSQL, MongoDB, etc.).',
      'Full CRUD capabilities must be demonstrable by the end of the session.',
      'The code must be pushed to a public GitHub repository with a clear README.'
    ],
    prizes: ['₹15,000 Winner', '₹8,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-3',
    title: 'UI/UX Landing Page Jam',
    description: 'Design a high-converting, visually outstanding interactive mockup using Figma or Adobe XD.',
    longDescription: 'Design is not just what it looks like, it is how it feels! The UI/UX Landing Page Jam challenges creators to draft and prototype high-fidelity web experiences, focusing on user journeys, negative space, gorgeous typography pairings, and micro-interactions.',
    department: 'Design Council',
    type: 'technical',
    date: '2026-09-19',
    time: '10:00 AM - 01:00 PM',
    venue: 'Mac Lab, Design Block',
    fee: 100,
    teamSize: 'Individual or Duo',
    maxSeats: 50,
    registeredCount: 31,
    coordinators: [
      { name: 'Pradheepa K', phone: '+91 94567 89044' }
    ],
    rules: [
      'Submissions must be created in Figma, Adobe XD, or Penpot.',
      'A mini design system with clear color tokens and type scale must be presented.',
      'Must include at least 1 interactive prototype connection showing navigation.',
      'All layouts must be designed for both mobile and desktop views.'
    ],
    prizes: ['₹8,000 Winner', '₹4,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-4',
    title: 'E-Commerce Web Portal Hack',
    description: 'Develop a fully interactive e-commerce product catalog with interactive carts and search filters.',
    longDescription: 'Challenge yourself to construct a lightning-fast online store web portal. The portal must offer state-driven product filtering, interactive cart additions/deletions, custom layouts, and a beautifully polished simulated checkout page.',
    department: 'Web Technology',
    type: 'technical',
    date: '2026-09-19',
    time: '01:30 PM - 04:30 PM',
    venue: 'Web Dev Lab, Block 3',
    fee: 200,
    teamSize: 'Team of 2-3',
    maxSeats: 35,
    registeredCount: 24,
    coordinators: [
      { name: 'Vishnu S', phone: '+91 93456 78933' }
    ],
    rules: [
      'The client application must use standard state management for items and shopping cart.',
      'Must implement at least 3 categories and instant client-side searching.',
      'Simulated payment processing with responsive error/success prompts is required.',
      'Clean code styling and component separation are mandatory.'
    ],
    prizes: ['₹12,000 Winner', '₹6,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-5',
    title: 'Creative Web Portfolio Showcase',
    description: 'Create the most immersive, highly animated, and structurally unique developer web portfolio.',
    longDescription: 'A developer portfolio is their digital calling card! This event evaluates your unique aesthetic taste and layout creativity. Build a web portfolio featuring custom scrolling animations, 3D/canvas background accents, and interactive projects layouts.',
    department: 'Web Technology',
    type: 'non-technical',
    date: '2026-09-18',
    time: '10:00 AM - 01:00 PM',
    venue: 'Computing Centre, Block 3',
    fee: 100,
    teamSize: 'Individual',
    maxSeats: 80,
    registeredCount: 55,
    coordinators: [
      { name: 'Hemashree M', phone: '+91 91234 56711' }
    ],
    rules: [
      'The portfolio must be responsive and contain interactive contact forms.',
      'Animations should enhance usability and storytelling, not distract the user.',
      'Frameworks like Next.js, Vite, Astro, or Svelte are highly encouraged.',
      'The project must be live and accessible via a standard URL.'
    ],
    prizes: ['₹8,000 Winner', '₹4,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-6',
    title: 'AI-Powered Web Apps Hackathon',
    description: 'Integrate smart features and generative AI services (like Gemini API) into a responsive web application.',
    longDescription: 'AI is reshaping the web landscape. Build an intelligent web application that makes API calls to language models, image generators, or translator services to offer smart, context-aware web features (e.g. smart note-taking, automated web form generation, interactive educational bots).',
    department: 'AI & Data Science',
    type: 'technical',
    date: '2026-09-19',
    time: '09:30 AM - 03:30 PM',
    venue: 'NVIDIA AI Lab, Block 1',
    fee: 300,
    teamSize: 'Team of 2-4',
    maxSeats: 30,
    registeredCount: 21,
    coordinators: [
      { name: 'Lokesh Jayaraman', phone: '+91 90432 10123' }
    ],
    rules: [
      'Must use a real AI SDK or proxy API server (e.g. Google GenAI SDK).',
      'API keys must not be exposed directly in client-side client builds (secure proxy is preferred).',
      'The application must showcase a clear interactive user-facing use-case.',
      'Plagiarism or wrapping standard chats without custom context is not allowed.'
    ],
    prizes: ['₹18,000 First Place', '₹10,000 Second Place'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-7',
    title: 'Responsive CSS Battle',
    description: 'Replicate highly complex, nested, fluid website layouts using pure CSS/Tailwind grid.',
    longDescription: 'A test of pure layout control and CSS speed! Participants are shown static high-density multi-column website layouts and must reproduce them using fluid CSS columns, flexbox, CSS grids, and responsive breakpoints under strict time targets.',
    department: 'Web Technology',
    type: 'technical',
    date: '2026-09-19',
    time: '10:00 AM - 12:00 PM',
    venue: 'Web Dev Lab, Block 3',
    fee: 100,
    teamSize: 'Individual',
    maxSeats: 70,
    registeredCount: 44,
    coordinators: [
      { name: 'Aswin S', phone: '+91 92345 67822' }
    ],
    rules: [
      'Only standard CSS, PostCSS, or Tailwind is permitted (no custom image rendering).',
      'The submission will be evaluated on exact visual pixel matching and responsiveness.',
      'The code must be readable, optimized, and dry (Don\'t Repeat Yourself).',
      'Use of third-party JS libraries for layout rendering is forbidden.'
    ],
    prizes: ['₹5,000 Winner', '₹3,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'evt-8',
    title: 'API & Server-Side Showdown',
    description: 'Develop a robust server-side web API layer with standard routing, validation, and schema relationships.',
    longDescription: 'Go deep into backend systems! This track focuses exclusively on the server side of websites. Design high-performance REST/GraphQL API structures, secure router protocols, request validations, error payloads, and mock ORM database schemas.',
    department: 'Web Technology',
    type: 'technical',
    date: '2026-09-18',
    time: '02:00 PM - 05:00 PM',
    venue: 'Advanced Coding Centre, Block 2',
    fee: 150,
    teamSize: 'Individual or Duo',
    maxSeats: 45,
    registeredCount: 28,
    coordinators: [
      { name: 'Vishnu S', phone: '+91 93456 78933' }
    ],
    rules: [
      'Must build using Node.js/Express, Python/FastAPI, Go, or similar server runtimes.',
      'A comprehensive collection file (e.g. Postman, Thunder Client) must be included.',
      'Security features (CORS headers, rate limiters, sanitized inputs) will be evaluated.',
      'Error structures must be detailed, standard, and typed.'
    ],
    prizes: ['₹10,000 Winner', '₹5,000 Runner-Up'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
  }
];

const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-1',
    eventId: 'evt-1',
    eventTitle: 'WebCraft Frontend Challenge',
    participantName: 'Lokesh Jayaraman',
    email: 'lokeshjayaraman7299@gmail.com',
    phone: '+91 90432 10123',
    college: 'Wyntrix Institute of Technology',
    department: 'Web Technology',
    year: '3rd Year',
    registrationDate: '2026-07-14T10:15:00Z',
    paymentStatus: 'completed',
    status: 'approved',
    ticketCode: 'TIC-WC-948120',
    fee: 150
  },
  {
    id: 'reg-2',
    eventId: 'evt-1',
    eventTitle: 'WebCraft Frontend Challenge',
    participantName: 'Hemashree M',
    email: 'hemashree.m@example.com',
    phone: '+91 91234 56711',
    college: 'Kovai Engineering College',
    department: 'Computer Science',
    year: '4th Year',
    registrationDate: '2026-07-14T11:45:00Z',
    paymentStatus: 'completed',
    status: 'approved',
    ticketCode: 'TIC-WC-582910',
    fee: 150
  },
  {
    id: 'reg-3',
    eventId: 'evt-2',
    eventTitle: 'FullStack Speed-Run',
    participantName: 'Aswin S',
    email: 'aswin.s@example.com',
    phone: '+91 92345 67822',
    college: 'Wyntrix Institute of Technology',
    department: 'Web Technology',
    year: '3rd Year',
    registrationDate: '2026-07-14T14:20:00Z',
    paymentStatus: 'completed',
    status: 'pending',
    ticketCode: 'TIC-FS-110293',
    fee: 250
  },
  {
    id: 'reg-4',
    eventId: 'evt-6',
    eventTitle: 'AI-Powered Web Apps Hackathon',
    participantName: 'Vishnu S',
    email: 'vishnu.s@example.com',
    phone: '+91 93456 78933',
    college: 'PSG College of Technology',
    department: 'Information Technology',
    year: '2nd Year',
    registrationDate: '2026-07-14T15:30:00Z',
    paymentStatus: 'completed',
    status: 'approved',
    ticketCode: 'TIC-AI-776102',
    fee: 300
  },
  {
    id: 'reg-5',
    eventId: 'evt-3',
    eventTitle: 'UI/UX Landing Page Jam',
    participantName: 'Pradheepa K',
    email: 'pradheepa.k@example.com',
    phone: '+91 94567 89044',
    college: 'Wyntrix Institute of Technology',
    department: 'Design Council',
    year: '3rd Year',
    registrationDate: '2026-07-15T02:10:00Z',
    paymentStatus: 'completed',
    status: 'pending',
    ticketCode: 'TIC-UI-489104',
    fee: 100
  }
];

export class StorageService {
  static init() {
    if (!localStorage.getItem('symposium_events_v3')) {
      localStorage.setItem('symposium_events_v3', JSON.stringify(INITIAL_EVENTS));
    }
    if (!localStorage.getItem('symposium_registrations_v3')) {
      localStorage.setItem('symposium_registrations_v3', JSON.stringify(INITIAL_REGISTRATIONS));
    }
  }

  static getEvents(): SymposiumEvent[] {
    this.init();
    const data = localStorage.getItem('symposium_events_v3');
    return data ? JSON.parse(data) : [];
  }

  static saveEvents(events: SymposiumEvent[]) {
    localStorage.setItem('symposium_events_v3', JSON.stringify(events));
  }

  static getRegistrations(): Registration[] {
    this.init();
    const data = localStorage.getItem('symposium_registrations_v3');
    return data ? JSON.parse(data) : [];
  }

  static saveRegistrations(registrations: Registration[]) {
    localStorage.setItem('symposium_registrations_v3', JSON.stringify(registrations));
  }

  // Event methods
  static getEventById(id: string): SymposiumEvent | undefined {
    return this.getEvents().find(e => e.id === id);
  }

  static addEvent(event: Omit<SymposiumEvent, 'id' | 'registeredCount'>): SymposiumEvent {
    const events = this.getEvents();
    const newEvent: SymposiumEvent = {
      ...event,
      id: `evt-${Date.now()}`,
      registeredCount: 0
    };
    events.push(newEvent);
    this.saveEvents(events);
    return newEvent;
  }

  static updateEvent(id: string, updatedFields: Partial<SymposiumEvent>): SymposiumEvent | null {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;

    events[index] = { ...events[index], ...updatedFields };
    this.saveEvents(events);
    return events[index];
  }

  static deleteEvent(id: string): boolean {
    const events = this.getEvents();
    const filtered = events.filter(e => e.id !== id);
    if (filtered.length === events.length) return false;
    this.saveEvents(filtered);
    
    // Also cleanup registrations
    const regs = this.getRegistrations();
    const filteredRegs = regs.filter(r => r.eventId !== id);
    this.saveRegistrations(filteredRegs);
    return true;
  }

  // Registration methods
  static registerParticipant(registrationData: Omit<Registration, 'id' | 'registrationDate' | 'status' | 'ticketCode' | 'paymentStatus'>): Registration {
    const registrations = this.getRegistrations();
    
    const randomTicket = `TIC-${registrationData.eventTitle.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReg: Registration = {
      ...registrationData,
      id: `reg-${Date.now()}`,
      registrationDate: new Date().toISOString(),
      paymentStatus: registrationData.fee > 0 ? 'completed' : 'completed', // auto pay standard simulation
      status: 'pending', // Default requires admin approval for realistic simulation
      ticketCode: randomTicket
    };

    registrations.push(newReg);
    this.saveRegistrations(registrations);

    // Increment registered count for the event
    const event = this.getEventById(registrationData.eventId);
    if (event) {
      this.updateEvent(registrationData.eventId, {
        registeredCount: event.registeredCount + 1
      });
    }

    return newReg;
  }

  static updateRegistrationStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Registration | null {
    const regs = this.getRegistrations();
    const index = regs.findIndex(r => r.id === id);
    if (index === -1) return null;

    regs[index].status = status;
    this.saveRegistrations(regs);
    return regs[index];
  }

  static deleteRegistration(id: string): boolean {
    const regs = this.getRegistrations();
    const reg = regs.find(r => r.id === id);
    if (!reg) return false;

    const filtered = regs.filter(r => r.id !== id);
    this.saveRegistrations(filtered);

    // Decrement registered count
    const event = this.getEventById(reg.eventId);
    if (event && event.registeredCount > 0) {
      this.updateEvent(reg.eventId, {
        registeredCount: event.registeredCount - 1
      });
    }

    return true;
  }

  // Stats calculation
  static getStats(): Stats {
    const events = this.getEvents();
    const regs = this.getRegistrations();

    const totalEvents = events.length;
    const totalRegistrations = regs.length;
    const pendingApprovals = regs.filter(r => r.status === 'pending').length;
    
    // Revenue is calculated from event fees for approved/completed registrations
    const totalRevenue = regs
      .filter(r => r.status === 'approved' || r.status === 'pending')
      .reduce((sum, r) => {
        const ev = events.find(e => e.id === r.eventId);
        return sum + (ev ? ev.fee : 0);
      }, 0);

    return {
      totalEvents,
      totalRegistrations,
      pendingApprovals,
      totalRevenue
    };
  }
}
