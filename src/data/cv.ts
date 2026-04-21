/** Structured CV data consumed by /cv. Kept separate from the homepage
 *  Experience section so each surface can evolve independently. */

export type CvEntry = {
  title: string;
  org?: string;
  location?: string;
  date: string;
  body: string;
};

export const education: CvEntry[] = [
  {
    title: "Ph.D. in Biomedical Engineering",
    org: "University of Connecticut",
    location: "Storrs, CT",
    date: "Conferred 2026",
    body: "Dissertation: <em>Graph Signal Processing & Graph Neural Networks for Multimodal Biomedical Data.</em> Introduced the first GSP framework for biomedical signals (EDA, ERG) and a probabilistic graph-attention architecture for multimodal MRI stroke-lesion detection.",
  },
  {
    title: "M.S. in Computer Science & Engineering",
    org: "University of Connecticut",
    location: "Storrs, CT",
    date: "Conferred 2025",
    body: "Pursued in parallel to the Ph.D. to formalize CS foundations — algorithms, distributed systems, advanced ML, and the software-engineering practices behind production AI.",
  },
  {
    title: "B.S. in Biomedical Engineering",
    org: "Universidad del Valle de Guatemala",
    date: "Conferred 2022",
    body: "Undergraduate research in automation, electronics, and computational science. Worked on graph-based protein-interaction analysis and metabolomics with MAIT.",
  },
];

export const experience: CvEntry[] = [
  {
    title: "Research Scientist",
    org: "UConn — Chon Lab & collaborators",
    location: "Storrs, CT",
    date: "2022 — Present",
    body: "Lead research on multimodal AI and graph neural networks applied to healthcare and neuroscience. Released the first graph-based pipelines for EDA and ERG analysis; collaborated on wearable PPG arrhythmia detection; built attention-based MRI models for stroke.",
  },
  {
    title: "Research Student",
    org: "Intelligent Machines & Pattern Recognition Lab",
    date: "2014 — 2022",
    body: "Undergraduate research on automation, electronics, and computational science. Graph-based protein-interaction analysis, SVM-driven structural prediction, and metabolomics with the MAIT package.",
  },
];

export const awards: CvEntry[] = [
  {
    title: "First-author publications across Q1 venues",
    date: "2023 — 2026",
    body: "Applied Sciences, Bioengineering, and proceedings including ICMI — all covering graph signal processing of biomedical signals or multimodal ML for health.",
  },
];

export const skillsSummary = {
  modeling: [
    "PyTorch / PyTorch Geometric",
    "Graph Neural Networks (GAT, GCN, probabilistic variants)",
    "Bayesian inference",
    "Multimodal fusion",
  ],
  signals: ["EEG", "ECG / EKG", "PPG", "EDA", "ERG", "MRI / fMRI"],
  systems: [
    "CI/CD with GitHub Actions",
    "Docker",
    "Reproducible data pipelines",
    "Astro / TypeScript",
  ],
  languages: ["Python", "R", "C / C++", "Rust", "Go", "TypeScript"],
};
