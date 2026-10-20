// Company page people (plan 7.3-7.5). Bios and credentials are the plan's wording.
// LinkedIn URLs come from the old site (SaaviGenAI confirmed they are unchanged).
// Photos: public/images/team/*.webp, made by `npm run images` (scripts/optimize-images.mjs).

export type Person = {
  id: string; // also the #anchor on /company/, e.g. /company/#nanda-kumar
  name: string;
  role?: string;
  bio?: string;
  photo: string;
  linkedin: string;
};

export const founder: Person & { credentialsLine?: string } = {
  id: "nanda-kumar",
  name: "Nanda Kumar",
  role: "Founder & CEO",
  bio: "Nanda has 23 years of enterprise experience across Cisco, HPE and Aruba Networks, spanning engineering, security architecture, enterprise AI adoption and LLM security. He has designed and operated real systems at scale, and brings that experience to SaaviAIDR.",
  photo: "/images/team/nanda-kumar.webp",
  linkedin: "https://www.linkedin.com/in/nandakumar80/",
};

export const advisor: Person & { credentials: string[]; experience: string } = {
  id: "jamuna-swamy",
  name: "Jamuna Swamy",
  role: "Senior Advisor & Mentor",
  experience: "43+ years in governance, risk and compliance",
  credentials: ["CISA", "PMP", "ISO 27001 Lead Auditor", "ISACA"],
  bio: "Jamuna has more than 43 years of experience in governance, risk and compliance, information security and IT management. She served as Chief Information Security Officer at Hexaware Technologies and is an active contributor to the ISACA community. She guides SaaviGenAI's security and governance approach.",
  // [TO SUPPLY] the source photo is only 193x193px; replace with a larger headshot.
  photo: "/images/team/jamuna-swamy.webp",
  linkedin: "https://www.linkedin.com/in/jamuna-swamy-27a5a46/",
};

export const foundingMembers: Person[] = [
  { id: "aamir-hamza", name: "Aamir Hamza", photo: "/images/team/aamir-hamza.webp", linkedin: "https://www.linkedin.com/in/aamir-hamza-tabani/" },
  { id: "atharv-chouhan", name: "Atharv Chouhan", photo: "/images/team/atharv-chouhan.webp", linkedin: "https://www.linkedin.com/in/atharv-chouhan-94a074384" },
  { id: "tulasi-patil", name: "Tulasi Patil", photo: "/images/team/tulasi-patil.webp", linkedin: "https://www.linkedin.com/in/tulasi-patil-728216441" },
  { id: "yasar-ameen", name: "Yasar Ameen H N", photo: "/images/team/yasar-ameen.webp", linkedin: "https://www.linkedin.com/in/yasar-ameen-965385201" },
];

// Article authors (plan 6 author box). Keys match `author:` in content/insights/*.md.
export const authors: Record<string, { name: string; role?: string; bio?: string; photo?: string; linkedin: string; companyAnchor?: string }> = {
  "nanda-kumar": {
    name: "Nanda Kumar",
    role: "Founder & CEO, SaaviGenAI",
    bio: "23 years of enterprise experience across Cisco, HPE and Aruba Networks, spanning security architecture, enterprise AI adoption and LLM security.",
    photo: founder.photo,
    linkedin: founder.linkedin,
    companyAnchor: "/company/#nanda-kumar",
  },
  saavigenai: {
    name: "SaaviGenAI",
    linkedin: "https://www.linkedin.com/company/saavigenai",
    companyAnchor: "/company/",
  },
};
