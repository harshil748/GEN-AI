export type StudentProfile = {
	name: string;
	email: string;
	age?: number;
	education?: string;
	city?: string;
	interests?: string[];
	strengths?: string[];
	subjects?: string[];
	skills?: string[];
	aspirations?: string;
};

export type CareerResult = {
	career: string;
	rationale: string;
	skills_needed: string[];
	skill_gap: string[];
	learning_resources: string[];
	projects: string[];
	day_in_life: string;
	market_trends: { demand: string; salary_range: string; growth: string };
};

export type EngineOutput = { careers: CareerResult[] };

export const SAMPLE_PROFILE: StudentProfile = {
	name: "Harshil Patel",
	email: "harshil@harshilpatel.me",
	age: 20,
	education: "BTech Computer Engineering",
	city: "Bhavnagar, Gujarat",
	interests: ["Cyber security", "Cloud", "DevOps"],
	strengths: ["Good communication", "Deterministic", "Problem-solving"],
};

export function generateDeterministicRecommendations(
	profile: StudentProfile
): EngineOutput {
	const lowerInterests = (profile.interests || []).map((s) => s.toLowerCase());
	const forcePreset =
		profile.name?.toLowerCase() === "harshil patel" ||
		profile.email?.toLowerCase() === "harshil@harshilpatel.me" ||
		lowerInterests.some((i) =>
			["cyber security", "cybersecurity", "cloud", "devops"].includes(i)
		);

	const careers: CareerResult[] = forcePreset
		? [
				{
					career: "Cybersecurity Analyst",
					rationale:
						"Leverages your interest in cybersecurity and problem-solving to protect systems, run vulnerability assessments, and respond to incidents.",
					skills_needed: [
						"Network security",
						"Linux",
						"SIEM (Splunk/ELK)",
						"OWASP Top 10",
						"Scripting (Python/Bash)",
						"Risk assessment",
						"Communication",
					],
					skill_gap: [
						"Hands-on with SIEM",
						"Threat modeling",
						"Incident response playbooks",
					],
					learning_resources: [
						"https://www.coursera.org/specializations/ibm-cybersecurity-analyst",
						"https://nptel.ac.in/courses/106/105/106105217/",
						"https://www.google.com/partners/become-a-partner/skillshop/",
					],
					projects: [
						"Set up a home lab with Kali Linux and practice OWASP Top 10",
						"Build a Splunk or ELK dashboard to analyze auth logs",
						"Contribute to an open-source security rules repo",
					],
					day_in_life:
						"You review SIEM alerts, triage incidents, run vulnerability scans, and brief stakeholders on risks and mitigations.",
					market_trends: {
						demand: "High in BFSI and IT services",
						salary_range: "₹6–18 LPA (India)",
						growth: "18%",
					},
				},
				{
					career: "Cloud DevOps Engineer",
					rationale:
						"Aligns with your Cloud and DevOps interests; you automate CI/CD, manage infrastructure, and ensure reliable deployments.",
					skills_needed: [
						"AWS/GCP basics",
						"Terraform",
						"Docker & Kubernetes",
						"CI/CD (GitHub Actions) ",
						"Linux",
						"Monitoring (Prometheus/Grafana)",
						"SRE principles",
					],
					skill_gap: [
						"Terraform modules",
						"Kubernetes production ops",
						"Cost optimization",
					],
					learning_resources: [
						"https://www.coursera.org/professional-certificates/google-cloud-devops",
						"https://nptel.ac.in/courses/106/106/106106198/",
						"https://cloud.google.com/training",
					],
					projects: [
						"Containerize a Node.js app and deploy to GKE/EKS",
						"Write IaC with Terraform for a VPC + managed DB",
						"Build a GitHub Actions pipeline with blue/green deploys",
					],
					day_in_life:
						"You provision infra, improve pipelines, review deployments, and collaborate with teams to ship reliably.",
					market_trends: {
						demand: "Very high across Indian startups",
						salary_range: "₹8–24 LPA (India)",
						growth: "22%",
					},
				},
				{
					career: "Site Reliability Engineer (SRE)",
					rationale:
						"Combines systems thinking with software to ensure uptime, performance, and scalability for production systems.",
					skills_needed: [
						"Distributed systems",
						"SLIs/SLOs",
						"Observability",
						"Incident response",
						"Go/Python",
						"Kubernetes",
						"Capacity planning",
					],
					skill_gap: [
						"Runbooks",
						"Chaos testing",
						"Advanced observability (OpenTelemetry)",
					],
					learning_resources: [
						"https://sre.google/books/",
						"https://www.coursera.org/learn/site-reliability-engineering-slos",
						"https://cloud.google.com/stackdriver/docs",
					],
					projects: [
						"Define SLOs for a demo app and build alerting",
						"Chaos test a microservice and document resilience",
						"Create on-call runbooks and a postmortem template",
					],
					day_in_life:
						"You monitor SLIs, handle incidents, automate toil, and improve reliability with blameless practices.",
					market_trends: {
						demand: "Growing in product companies",
						salary_range: "₹10–30 LPA (India)",
						growth: "20%",
					},
				},
		  ]
		: [
				{
					career: "Data Analyst",
					rationale:
						"Builds insights from data using SQL, spreadsheets, and visualization tools.",
					skills_needed: [
						"SQL",
						"Excel",
						"Data Cleaning",
						"Statistics",
						"Dashboarding (Tableau/Looker)",
						"Storytelling",
					],
					skill_gap: ["Cohort analysis", "A/B testing"],
					learning_resources: [
						"https://www.coursera.org/professional-certificates/google-data-analytics",
						"https://nptel.ac.in/courses/110/101/110101089/",
					],
					projects: [
						"Create a sales dashboard",
						"Analyze open datasets (Kaggle)",
						"Build a churn analysis",
					],
					day_in_life:
						"You clean data, build dashboards, and present actionable insights.",
					market_trends: {
						demand: "Stable across sectors",
						salary_range: "₹4–12 LPA (India)",
						growth: "12%",
					},
				},
				{
					career: "Full-Stack Developer",
					rationale:
						"End-to-end application development for web and mobile platforms.",
					skills_needed: [
						"JavaScript/TypeScript",
						"React",
						"Node.js",
						"APIs",
						"Databases",
						"Testing",
					],
					skill_gap: ["System design", "Advanced testing"],
					learning_resources: [
						"https://fullstackopen.com/en/",
						"https://www.coursera.org/specializations/web-design",
					],
					projects: [
						"Build a CRUD app",
						"Create a REST/GraphQL API",
						"Deploy on cloud",
					],
					day_in_life:
						"You ship features, fix bugs, write tests, and collaborate with product/design.",
					market_trends: {
						demand: "High in startups",
						salary_range: "₹6–20 LPA (India)",
						growth: "15%",
					},
				},
				{
					career: "Product Manager (Tech)",
					rationale:
						"Bridges business, users, and engineering to ship valuable products.",
					skills_needed: [
						"User research",
						"Roadmapping",
						"Analytics",
						"Communication",
						"Agile",
					],
					skill_gap: ["Prioritization frameworks", "Experiment design"],
					learning_resources: [
						"https://www.coursera.org/specializations/product-management",
						"https://nptel.ac.in/courses/110/107/110107128/",
					],
					projects: [
						"Write a PRD",
						"Design an MVP",
						"Analyze metrics for feature impact",
					],
					day_in_life:
						"You talk to users, prioritize backlog, align stakeholders, and track outcomes.",
					market_trends: {
						demand: "Competitive but growing",
						salary_range: "₹8–26 LPA (India)",
						growth: "10%",
					},
				},
		  ];

	return { careers };
}
