import type { ArtworkVariant } from '@/components/ProjectArtwork';
import type { TechKey } from '@/components/icons/TechIcon';

/**
 * Single source of truth for marketing copy.
 *
 * Pages, cards and the JSON-LD structured data all read from here, so the
 * price quoted on the homepage can never drift from the price on /services
 * or from what Google indexes in the Service schema.
 */

export const SITE = {
    name: 'PandaPath',
    url: 'https://pandapath.in',
    email: 'contactpanda@pandapath.in',
    phone: '+917411147986',
    whatsapp: 'https://wa.me/917411147986',
    city: 'Bangalore',
    region: 'Karnataka',
    country: 'IN',
    tagline: 'AI products for Indian startups, shipped in weeks.',
} as const;

/* ── Services ───────────────────────────────────────────────────── */

export interface Service {
    slug: string;
    icon: 'chat' | 'brain' | 'rocket' | 'compass';
    title: string;
    /** Short keyword-bearing phrase used as the card subtitle and in schema. */
    summary: string;
    priceFrom: string;
    timeline: string;
    description: string;
    features: string[];
    technologies: string[];
    stack: TechKey[];
    accent: 'emerald' | 'purple' | 'blue' | 'amber';
}

export const services: Service[] = [
    {
        slug: 'whatsapp-ai-bot',
        icon: 'chat',
        title: 'WhatsApp AI Bot',
        summary: 'Automated WhatsApp support and lead capture',
        priceFrom: '₹25,000',
        timeline: '2 weeks',
        description:
            'A WhatsApp assistant that answers customer questions, captures leads and books appointments around the clock — in Hindi and English, on the number your customers already message.',
        features: [
            'Natural conversation in Hindi and English',
            'Trained on your catalogue, pricing and FAQs',
            'Leads pushed straight to your CRM or Google Sheet',
            'Automatic follow-ups on unanswered enquiries',
            'Dashboard showing what customers actually ask',
        ],
        technologies: ['WhatsApp Business API', 'LLMs', 'Node.js', 'Webhooks'],
        stack: ['whatsapp', 'node', 'anthropic', 'gemini'],
        accent: 'emerald',
    },
    {
        slug: 'rag-knowledge-system',
        icon: 'brain',
        title: 'RAG Knowledge System',
        summary: 'Your documents turned into a searchable AI assistant',
        priceFrom: '₹40,000',
        timeline: '3 weeks',
        description:
            'Point it at your PDFs, SOPs, Notion pages and contracts, and your team can ask questions in plain English. Answers cite the source document, so nobody has to take the model on faith.',
        features: [
            'Ingests PDFs, Notion, Google Docs and websites',
            'Every answer cites the document it came from',
            'Private deployment — your data never trains a public model',
            'Ships as a Slack bot, WhatsApp bot or web widget',
            'Role-based access so teams only see their own material',
        ],
        technologies: ['RAG', 'Vector DB', 'Python', 'Claude / Gemini'],
        stack: ['python', 'langchain', 'anthropic', 'postgres'],
        accent: 'purple',
    },
    {
        slug: 'full-ai-product-build',
        icon: 'rocket',
        title: 'Full AI Product Build',
        summary: 'End-to-end web or mobile product with AI built in',
        priceFrom: '₹80,000',
        timeline: '4–6 weeks',
        description:
            'The whole thing: product design, front end, APIs, database, AI features and production deployment. You finish with a live product, the source code and a running CI pipeline.',
        features: [
            'Full-stack web app or cross-platform mobile app',
            'AI features — chat, search, recommendations, automation',
            'Production deployment with CI/CD and monitoring',
            'Direct WhatsApp line to the developer building it',
            '30 days of post-launch support included',
        ],
        technologies: ['Next.js', 'React Native', 'AI APIs', 'AWS / GCP'],
        stack: ['nextjs', 'react', 'typescript', 'gcp'],
        accent: 'blue',
    },
    {
        slug: 'ai-business-audit',
        icon: 'compass',
        title: 'AI Business Audit',
        summary: 'Find out where AI actually pays off in your business',
        priceFrom: '₹6,000',
        timeline: '2 hours',
        description:
            'A two-hour working session where we map your operations and tell you which three things are worth automating — and, just as usefully, which are not.',
        features: [
            'Two-hour deep dive with a senior engineer',
            'Written report on your top 3 AI opportunities',
            'Honest cost-versus-benefit for each one',
            'Recommended tools and the order to build them in',
            'Fee credited against your first project with us',
        ],
        technologies: ['Strategy', 'Process mapping', 'Tooling review'],
        stack: ['python', 'anthropic', 'gemini'],
        accent: 'amber',
    },
];

/* ── Process ────────────────────────────────────────────────────── */

export const processSteps = [
    {
        number: '01',
        icon: 'search' as const,
        title: 'Scope',
        duration: 'Day 1',
        description: 'One call to understand the problem. You leave with a fixed quote and a delivery date — not a proposal deck.',
    },
    {
        number: '02',
        icon: 'pen' as const,
        title: 'Design',
        duration: 'Days 2–4',
        description: 'Flows and screens agreed before a line of code. Cheap to change now, expensive to change later.',
    },
    {
        number: '03',
        icon: 'code' as const,
        title: 'Build',
        duration: 'Weeks 1–3',
        description: 'You get a working link within days and it updates continuously. Feedback goes straight to the developer.',
    },
    {
        number: '04',
        icon: 'rocket' as const,
        title: 'Ship',
        duration: 'Launch week',
        description: 'Deployed to your own cloud with monitoring, backups and a rollback path. Source code handed over.',
    },
    {
        number: '05',
        icon: 'trend' as const,
        title: 'Support',
        duration: '30 days+',
        description: 'A month of fixes and tuning included. Stay on a retainer or take it in-house — your call.',
    },
];

/* ── Featured work (homepage) ───────────────────────────────────── */

export interface Project {
    slug: string;
    title: string;
    /** Honest sector descriptor — we don't invent client names. */
    descriptor: string;
    problem: string;
    outcome: string;
    metrics: { value: string; label: string }[];
    technologies: string[];
    artwork: ArtworkVariant;
    category: string;
}

export const featuredProjects: Project[] = [
    {
        slug: 'whatsapp-sales-assistant',
        title: 'WhatsApp Sales Assistant',
        descriptor: 'D2C brand · Bangalore',
        problem:
            'Two staff were answering the same product questions on WhatsApp all day, and enquiries that arrived after 8pm went cold overnight.',
        outcome:
            'An assistant that handles catalogue questions, sizing and order status on its own, and hands the genuinely complex ones to a human with the conversation already summarised.',
        metrics: [
            { value: '24/7', label: 'response cover' },
            { value: '3 sec', label: 'median first reply' },
            { value: '2 wks', label: 'design to live' },
        ],
        technologies: ['WhatsApp API', 'Node.js', 'Claude', 'PostgreSQL'],
        artwork: 'conversation',
        category: 'AI',
    },
    {
        slug: 'internal-knowledge-assistant',
        title: 'Internal Knowledge Assistant',
        descriptor: 'B2B SaaS · Mumbai',
        problem:
            'Support agents were digging through four years of scattered PDFs and Notion pages to answer a single customer ticket.',
        outcome:
            'A retrieval system over the whole document estate. Agents ask in plain English and get an answer with the source paragraph attached, so they can verify before they send.',
        metrics: [
            { value: '4 yrs', label: 'of docs indexed' },
            { value: '100%', label: 'answers cite source' },
            { value: '3 wks', label: 'design to live' },
        ],
        technologies: ['Python', 'Vector DB', 'RAG', 'Slack API'],
        artwork: 'knowledge',
        category: 'AI',
    },
    {
        slug: 'operations-analytics-platform',
        title: 'Operations Analytics Platform',
        descriptor: 'Logistics startup · Delhi',
        problem:
            'Daily operating numbers lived in five spreadsheets that were reconciled by hand every morning before the standup.',
        outcome:
            'A live dashboard fed straight from their systems, with anomaly alerts that flag a route or depot drifting out of range before it turns into a customer complaint.',
        metrics: [
            { value: 'Live', label: 'replaces manual reports' },
            { value: '5 → 1', label: 'sources consolidated' },
            { value: '4 wks', label: 'design to live' },
        ],
        technologies: ['Next.js', 'Python', 'PostgreSQL', 'Redis'],
        artwork: 'analytics',
        category: 'Web',
    },
];

/* ── Case studies ───────────────────────────────────────────────── */

export interface CaseStudy {
    slug: string;
    title: string;
    descriptor: string;
    description: string;
    technologies: string[];
    category: string;
    artwork: ArtworkVariant;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: 'whatsapp-sales-assistant',
        title: 'WhatsApp Sales Assistant',
        descriptor: 'D2C brand · Bangalore',
        description:
            'A bilingual WhatsApp assistant handling catalogue questions, sizing and order status, escalating the complex cases to a human with context attached.',
        technologies: ['WhatsApp API', 'Node.js', 'Claude', 'PostgreSQL'],
        category: 'AI',
        artwork: 'conversation',
    },
    {
        slug: 'internal-knowledge-assistant',
        title: 'Internal Knowledge Assistant',
        descriptor: 'B2B SaaS · Mumbai',
        description:
            'Retrieval-augmented search across four years of support documentation, where every answer cites the paragraph it came from.',
        technologies: ['Python', 'Vector DB', 'RAG', 'Slack API'],
        category: 'AI',
        artwork: 'knowledge',
    },
    {
        slug: 'operations-analytics-platform',
        title: 'Operations Analytics Platform',
        descriptor: 'Logistics startup · Delhi',
        description:
            'Live operational dashboard replacing a manual five-spreadsheet reconciliation, with anomaly alerts on routes and depots.',
        technologies: ['Next.js', 'Python', 'PostgreSQL', 'Redis'],
        category: 'Web',
        artwork: 'analytics',
    },
    {
        slug: 'multi-vendor-marketplace',
        title: 'Multi-Vendor Marketplace',
        descriptor: 'Retail group · Delhi',
        description:
            'Marketplace with vendor onboarding, faceted search, split payments and inventory sync across sellers.',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Stripe'],
        category: 'Web',
        artwork: 'commerce',
    },
    {
        slug: 'payments-mobile-app',
        title: 'Payments Mobile App',
        descriptor: 'Fintech · Mumbai',
        description:
            'Cross-platform money transfer app with biometric login, real-time transaction status and an auditable ledger.',
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Stripe'],
        category: 'Mobile',
        artwork: 'fintech',
    },
    {
        slug: 'clinic-management-system',
        title: 'Clinic Management System',
        descriptor: 'Healthtech · Hyderabad',
        description:
            'Patient records, appointment scheduling and video consultations in one system, with role-based access across clinics.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC'],
        category: 'Web',
        artwork: 'health',
    },
    {
        slug: 'cloud-migration',
        title: 'Cloud Migration & Cost Reduction',
        descriptor: 'Enterprise · Bangalore',
        description:
            'Containerised a legacy on-premise stack and moved it to managed cloud with zero planned downtime and a smaller monthly bill.',
        technologies: ['Docker', 'Kubernetes', 'Terraform', 'GCP'],
        category: 'Cloud',
        artwork: 'cloud',
    },
    {
        slug: 'iot-monitoring-dashboard',
        title: 'IoT Monitoring Dashboard',
        descriptor: 'Manufacturing · Pune',
        description:
            'Real-time sensor telemetry from factory equipment with threshold alerting and predictive maintenance flags.',
        technologies: ['React', 'Python', 'MQTT', 'Time-series DB'],
        category: 'AI',
        artwork: 'iot',
    },
];

/* ── FAQ (also emitted as FAQPage structured data) ──────────────── */

export const faqs = [
    {
        question: 'How much does it cost to build an AI chatbot in India?',
        answer:
            'A production WhatsApp AI bot from PandaPath starts at ₹25,000 and goes live in about two weeks. A RAG knowledge system starts at ₹40,000, and a full AI product build starts at ₹80,000. Every project is quoted as a fixed price before work begins, so the number you are given at the start is the number you pay.',
    },
    {
        question: 'How long does an AI project take to build?',
        answer:
            'Most builds ship in two to four weeks. A WhatsApp bot typically takes two weeks, a RAG knowledge system three weeks, and a complete AI product four to six weeks. You get a working link to try within the first few days rather than waiting until the end.',
    },
    {
        question: 'What is a RAG system and does my business need one?',
        answer:
            'RAG — retrieval-augmented generation — lets an AI answer questions using your own documents instead of general internet knowledge, and cite where each answer came from. It is worth it if your team repeatedly hunts through PDFs, SOPs, policies or support history to answer the same questions. If your knowledge already fits on one page, you do not need one, and we will say so.',
    },
    {
        question: 'Do you work with startups outside Bangalore?',
        answer:
            'Yes. We are based in Bangalore and work with founders across India — Mumbai, Delhi NCR, Hyderabad, Pune and Chennai — as well as Indian founders operating abroad. Everything runs over calls and WhatsApp, so location has never been the constraint.',
    },
    {
        question: 'Who owns the code and the data?',
        answer:
            'You do. Source code is handed over at launch, deployments run in your own cloud accounts, and your data is never used to train a public model. There is no vendor lock-in — you can take the project in-house or to another team at any point.',
    },
    {
        question: 'What if I am not sure which AI tool my business needs?',
        answer:
            'Start with the ₹6,000 AI Business Audit. It is a two-hour session that maps your operations and produces a written report on the three highest-value automations, with honest cost-versus-benefit for each. The fee is credited against your first project if you go ahead.',
    },
    {
        question: 'Can you integrate AI into an existing product?',
        answer:
            'Yes. A large share of our work is adding AI features — search, chat, summarisation, recommendations or document processing — to products that already exist and already have users. We work against your current stack rather than asking you to rewrite it.',
    },
];
