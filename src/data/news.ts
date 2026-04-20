/** News feed shown in the #news section. Newest first. */
export interface NewsItem {
  date: string;        // MM/YYYY
  kind?: "milestone" | "publication" | "story";
  headline?: string;   // Optional bold lead
  body: string;        // Plain description
}

export const news: NewsItem[] = [
  { date: "04/2026", kind: "milestone", headline: "Ph.D. Defense", body: "Successfully defended my Ph.D. Thesis on April 2nd. I am now officially a Ph.D.! 🎉" },
  {
    date: "04/2026", kind: "story",
    headline: "Narrative Story: Emotion Recognition with EDA-Graphs",
    body: "In my paper “Continuous Emotion Recognition Using EDA-Graphs: A Graph Signal Processing Approach for Affective Dimension Estimation”, I explored how our skin’s electrical properties can reveal our emotional states. By modeling electrodermal activity (EDA) as a graph, we were able to capture complex patterns over time, leading to more accurate estimation of how people feel in real-time. This work bridges the gap between physiological signals and affective computing, paving the way for more emotionally intelligent systems.",
  },
  {
    date: "04/2026", kind: "story",
    headline: "Narrative Story: The ERG-Graph Project",
    body: "My latest publication, “ERG-Graph”, tells the story of our quest to better understand the electrical activity of the retina. By analyzing electroretinograms (ERGs) through the lens of graph signal processing, we uncovered new, efficient ways to classify neurodevelopmental disorders. This research significantly reduces computational complexity while maintaining high accuracy, making advanced diagnostics more accessible.",
  },
  { date: "11/2025", kind: "milestone", headline: "Dissertation Proposal", body: "Successfully defended my Dissertation Proposal in the Ph.D. in Biomedical Engineering. I’m a Ph.D. Candidate! 🎉" },
  { date: "10/2025", kind: "publication", headline: "Publication Accepted", body: "My co-first author paper, “A Multimodal Deep Learning Exploration for Pain Intensity Classification”, was accepted by 2025 Companion Proceedings of the 27th International Conference on Multimodal Interaction. Congrats to the first author Javier! 🎉" },
  { date: "09/2025", kind: "publication", headline: "Publication Accepted", body: "My first author paper, “Graph-Based Analysis of Electroretinograms for Reducing Computational Complexity and Classifying Neurodevelopmental Disorders”, was accepted by 2025 IEEE-EMBS 22nd International Conference on Body Sensor Networks (BSN)." },
  { date: "09/2025", kind: "publication", headline: "Publication Accepted", body: "My co-author paper, “Multiclass arrhythmia classification using multimodal smartwatch photoplethysmography signals collected in real-life settings”, was accepted by IEEE Transactions on Biomedical Engineering Journal. Congrats to the first author, Cassey! 🎉" },
  {
    date: "09/2025", kind: "story",
    headline: "Narrative Story: Stroke Detection with MRI and Graph Attention",
    body: "In “Graph-Based Multi-Modal MRI Analysis with Probabilistic Attention for Stroke Lesion Detection”, we tackled the critical challenge of identifying stroke lesions quickly and accurately. We developed a novel approach using Probabilistic Graph Attention Networks to analyze multimodal MRI data. This method allows the AI to focus on the most relevant parts of the brain scans, leading to improved detection rates and potentially life-saving early interventions.",
  },
  { date: "06/2025", kind: "publication", headline: "Publication Accepted", body: "My co-author paper, “Big team science reveals promises and limitations of machine learning efforts to model physiological markers of affective experience”, was accepted by Royal Society Open Science Journal. Congrats to the first author, Nicholas! 🎉" },
  { date: "05/2025", kind: "milestone", headline: "Master’s Defense", body: "Successfully defended my Master Thesis in Computer Science. I’m a Master in Computer Science now! 🎉" },
  { date: "04/2025", kind: "publication", headline: "Publication Accepted", body: "My co-author paper, “Multiclass Arrhythmia Classification using Smartwatch Photoplethysmography Signals Collected in Real-life Settings”, was accepted by ICASSP 2025. Congrats to the first author, Cassey! 🎉" },
  { date: "03/2025", kind: "publication", headline: "Publication Accepted", body: "My first author paper, “Artificial Intelligence Approaches for the Detection of Normal Pressure Hydrocephalus: A Systematic Review” was accepted by Applied Science Journal. Thank you! 🎉" },
  { date: "12/2024", kind: "publication", headline: "Publication Accepted", body: "My co-author paper, “Spectral analysis of light-adapted electroretinograms in neurodevelopmental disorders: Classification with machine learning”, was accepted by Bioengineering Journal." },
  { date: "12/2024", kind: "publication", headline: "Publication Accepted", body: "My first author paper, “Fractal analysis of electrodermal activity for emotion recognition…” was accepted by Sensors Journal. Thank you! 🎉" },
  { date: "07/2024", kind: "publication", headline: "Publication Accepted", body: "My first author paper, “Emotional States Detection Using Electrodermal Activity and Graph Signal Processing”, was accepted by IEEE-EMBS BSN." },
  { date: "06/2024", kind: "publication", headline: "Publication Accepted", body: "My co-first author paper, “Autoencoder Based Nonlinear Feature Extraction from EDA Signals for Emotion Recognition” was accepted by IEEE Sensors journal. 🎉" },
  { date: "05/2024", kind: "publication", headline: "Publication Accepted", body: "My first author paper, “EDA-graph: graph signal processing of electrodermal activity for emotional states detection” was accepted by IEEE JBHI. 🎉" },
  { date: "02/2024", kind: "publication", headline: "Publication Accepted", body: "My co-first author paper, “Detecting Autism Spectrum Disorder and Attention Deficit Hyperactivity Disorder Using Multimodal Time-Frequency Analysis…” was accepted by Journal of Autism and Developmental Disorders. 🎉" },
  { date: "01/2024", kind: "publication", headline: "Publication Accepted", body: "My co-first author paper, “Nonlinear signal processing methods for automatic emotion recognition using electrodermal activity” was accepted by IEEE Sensors Journal. 🎉" },
];
