document.addEventListener("DOMContentLoaded", () => {
	const loginSection = document.getElementById("login-section");
	const profileSection = document.getElementById("profile-section");
	const guidanceSection = document.getElementById("guidance-section");
	const resultsSection = document.getElementById("results-section");
	const resultsCards = document.getElementById("results-cards");

	const loginBtn = document.getElementById("login-btn");
	const logoutBtn = document.getElementById("logout-btn");
	const profileBtn = document.getElementById("profile-btn");
	const startGuidanceBtn = document.getElementById("start-guidance-btn");
	const generatePathsBtn = document.getElementById("generate-paths-btn");
	const exportPdfBtn = document.getElementById("export-pdf-btn");

	const profileForm = document.getElementById("profile-form");

	// Mock user data
	const mockUser = {
		name: "Harshil Patel",
		email: "harshil@harshilpatel.me",
		age: 20,
		education: "BTech Computer Engineering",
		city: "Bhavnagar, Gujarat",
		interests: ["Cyber security", "Cloud", "DevOps"],
		strengths: ["Good communication", "Deterministic", "Problem-solving"],
	};

	let careerData = {};

	// --- Event Listeners ---
	loginBtn.addEventListener("click", handleLogin);
	logoutBtn.addEventListener("click", handleLogout);
	profileBtn.addEventListener("click", showProfile);
	profileForm.addEventListener("submit", handleProfileUpdate);
	startGuidanceBtn.addEventListener("click", showGuidance);
	generatePathsBtn.addEventListener("click", generateCareerPaths);
	exportPdfBtn.addEventListener("click", exportToPDF);

	// --- Functions ---
	function handleLogin() {
		loginSection.style.display = "none";
		profileSection.style.display = "block";
		logoutBtn.style.display = "block";
		populateProfile(mockUser);
	}

	function handleLogout() {
		loginSection.style.display = "block";
		profileSection.style.display = "none";
		guidanceSection.style.display = "none";
		logoutBtn.style.display = "none";
	}

	function populateProfile(user) {
		document.getElementById("name").value = user.name;
		document.getElementById("email").value = user.email;
		document.getElementById("age").value = user.age || "";
		document.getElementById("education").value = user.education || "";
		document.getElementById("city").value = user.city || "";
		document.getElementById("interests").value = user.interests.join(", ");
		document.getElementById("strengths").value = user.strengths.join(", ");
	}

	function showProfile() {
		profileSection.style.display = "block";
		guidanceSection.style.display = "none";
	}

	function handleProfileUpdate(e) {
		e.preventDefault();
		alert("Profile updated successfully!");
		// In a real app, you'd save this data.
	}

	function showGuidance() {
		profileSection.style.display = "none";
		guidanceSection.style.display = "block";
	}

	function generateCareerPaths() {
		// For the demo, we use deterministic mocked responses.
		careerData = {
			careers: [
				{
					career: "Cybersecurity Analyst",
					rationale:
						"Based on your interest in Cyber security and strengths in problem-solving, this role is a great fit for protecting digital assets.",
					skills_needed: [
						"Network Security",
						"Ethical Hacking",
						"SIEM Tools",
						"Cryptography",
					],
					skill_gap: ["SIEM Tools", "Advanced Cryptography"],
					learning_resources: [
						{
							name: "Google Cybersecurity Certificate",
							url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
						},
						{
							name: "NPTEL - Introduction to Cyber Security",
							url: "https://nptel.ac.in/courses/106105162/",
						},
					],
					projects: [
						"Set up a home lab with a firewall and IDS.",
						"Participate in a Capture The Flag (CTF) competition.",
					],
					day_in_life:
						"As a Cybersecurity Analyst, you'll monitor networks for threats, investigate security breaches, and implement security measures. It's a constant cat-and-mouse game with attackers.",
					market_trends: {
						demand: "High",
						salary_range: "₹6-15 LPA",
						growth: "28%",
					},
				},
				{
					career: "Cloud DevOps Engineer",
					rationale:
						"Your interests in Cloud and DevOps, combined with your deterministic nature, align well with automating and managing cloud infrastructure.",
					skills_needed: [
						"AWS/Azure/GCP",
						"Docker",
						"Kubernetes",
						"CI/CD Pipelines",
						"Terraform",
					],
					skill_gap: ["Kubernetes", "Terraform"],
					learning_resources: [
						{
							name: "AWS Certified DevOps Engineer - Professional",
							url: "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
						},
						{
							name: "Google Skillshop - Cloud DevOps",
							url: "https://skillshop.exceedlms.com/student/path/62153-cloud-devops-engineer",
						},
					],
					projects: [
						"Build a CI/CD pipeline for a simple web app.",
						"Deploy a containerized application on Kubernetes.",
					],
					day_in_life:
						"You'll be building and maintaining the infrastructure that runs applications, focusing on automation, scalability, and reliability. You write more scripts than code.",
					market_trends: {
						demand: "Very High",
						salary_range: "₹8-25 LPA",
						growth: "22%",
					},
				},

				{
					career: "Site Reliability Engineer (SRE)",
					rationale:
						"Combining your strengths in problem-solving and determinism with an interest in how large systems work, SRE is a challenging but rewarding field.",
					skills_needed: [
						"System Design",
						"Monitoring & Observability",
						"Go/Python",
						"Automation",
						"On-call response",
					],
					skill_gap: [
						"Advanced System Design",
						"Observability tools like Prometheus/Grafana",
					],
					learning_resources: [
						{
							name: "Google SRE Classroom",
							url: "https://sre.google/classroom/",
						},
						{
							name: "Coursera - Site Reliability Engineering (SRE)",
							url: "https://www.coursera.org/learn/site-reliability-engineering-slos",
						},
					],
					projects: [
						"Set up a monitoring dashboard for a personal project.",
						"Write an automation script to handle a common failure scenario.",
					],
					day_in_life:
						"Your goal is to make services ultra-reliable. You'll spend half your time on operations and half on development to automate away the operational work.",
					market_trends: {
						demand: "High",
						salary_range: "₹10-30+ LPA",
						growth: "25%",
					},
				},
			],
		};

		renderCareerCards(careerData);
		exportPdfBtn.style.display = "block";
	}

	function renderCareerCards(data) {
		resultsCards.innerHTML = ""; // Clear previous results

		// First, display the raw JSON
		const jsonOutput = document.createElement("pre");
		jsonOutput.style.background = "#eee";
		jsonOutput.style.padding = "15px";
		jsonOutput.style.borderRadius = "5px";
		jsonOutput.style.whiteSpace = "pre-wrap";
		jsonOutput.textContent = JSON.stringify(data, null, 2);
		resultsCards.appendChild(jsonOutput);

		// Then, render the cards
		data.careers.forEach((career) => {
			const card = document.createElement("div");
			card.className = "card";
			card.innerHTML = `
                <h4>${career.career}</h4>
                <p><strong>Why this fits you:</strong> ${career.rationale}</p>
                <p><strong>Skills to build:</strong> ${career.skills_needed.join(
									", "
								)}</p>
                <p><strong>Your current skill gap:</strong> ${career.skill_gap.join(
									", "
								)}</p>
                <p><strong>Learning Resources:</strong></p>
                <ul>
                    ${career.learning_resources
											.map(
												(res) =>
													`<li><a href="${res.url}" target="_blank">${res.name}</a></li>`
											)
											.join("")}
                </ul>
                <p><strong>Project Ideas:</strong></p>
                <ul>
                    ${career.projects
											.map((proj) => `<li>${proj}</li>`)
											.join("")}
                </ul>
                <p><strong>A Day in the Life:</strong> ${career.day_in_life}</p>
                <p><strong>Market Trends:</strong> Demand: ${
									career.market_trends.demand
								}, Salary: ${career.market_trends.salary_range}, Growth: ${
				career.market_trends.growth
			}</p>
            `;
			resultsCards.appendChild(card);
		});
	}

	function exportToPDF() {
		const { jsPDF } = window.jspdf;
		const doc = new jsPDF();

		let y = 15;
		doc.setFontSize(18);
		doc.text("Your Personalized Career Guidance from MargdarshAI", 10, y);
		y += 10;

		careerData.careers.forEach((career, index) => {
			if (y > 250) {
				// Add new page if content overflows
				doc.addPage();
				y = 15;
			}
			doc.setFontSize(14);
			doc.setTextColor(7, 121, 228);
			doc.text(`${index + 1}. ${career.career}`, 10, y);
			y += 8;

			doc.setFontSize(10);
			doc.setTextColor(51, 51, 51);

			const addWrappedText = (text, x, startY, maxWidth) => {
				const lines = doc.splitTextToSize(text, maxWidth);
				doc.text(lines, x, startY);
				return startY + lines.length * 4;
			};

			y = addWrappedText(`Why this fits you: ${career.rationale}`, 15, y, 180);
			y += 4;
			y = addWrappedText(
				`Skills to build: ${career.skills_needed.join(", ")}`,
				15,
				y,
				180
			);
			y += 4;
			y = addWrappedText(
				`Learning Resources: ${career.learning_resources
					.map((r) => r.name)
					.join(", ")}`,
				15,
				y,
				180
			);
			y += 10;
		});

		doc.save("MargdarshAI_Career_Plan.pdf");
	}
});
