"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSession, authClient } from "@/lib/auth-client";
import {
	SAMPLE_PROFILE,
	generateDeterministicRecommendations,
	type StudentProfile,
	type EngineOutput,
} from "@/lib/margdarsh";

export default function Home() {
	const { data: session } = useSession();
	const user = session?.user;
	const storageKey = user?.email ? `profile:${user.email}` : null;

	// form state (dashboard quick inputs)
	const [subjects, setSubjects] = useState("");
	const [skills, setSkills] = useState("");
	const [aspirations, setAspirations] = useState("");
	const [interests, setInterests] = useState("");
	const [messages, setMessages] = useState<
		{ role: "user" | "assistant"; content: string }[]
	>([]);
	const [results, setResults] = useState<EngineOutput | null>(null);
	const [showBlueprint, setShowBlueprint] = useState(true);

	// load saved profile
	const savedProfile = useMemo(() => {
		if (!storageKey) return null;
		try {
			const raw = localStorage.getItem(storageKey);
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	}, [storageKey]);
	useEffect(() => {
		// hydrate from saved profile to prefill interests
		if (savedProfile?.interests?.length && !interests) {
			setInterests(savedProfile.interests.join(", "));
		}
	}, [savedProfile, interests]);

	const buildProfile = (): StudentProfile => {
		const base: StudentProfile = {
			name: user?.name || SAMPLE_PROFILE.name,
			email: user?.email || SAMPLE_PROFILE.email,
		};
		const patched = savedProfile || {};
		return {
			...base,
			...patched,
			subjects: subjects
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			skills: skills
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			interests: (interests || patched.interests?.join(", ") || "")
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			aspirations: aspirations.trim() || patched.aspirations,
		};
	};

	const startGuidance = () => {
		const profile = buildProfile();
		const out = generateDeterministicRecommendations(profile);
		setResults(out);
		// append assistant summary deterministically
		setMessages((prev) => [
			...prev,
			{
				role: "assistant",
				content:
					"Analyzed your inputs. Generated 3 tailored career paths for the Indian market. Explore the blueprints below.",
			},
		]);
	};

	const handleChatSend = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const text = String(data.get("message") || "").trim();
		if (!text) return;
		setMessages((m) => [...m, { role: "user", content: text }]);
		form.reset();
		// deterministic mock reply
		setTimeout(() => {
			setMessages((m) => [
				...m,
				{
					role: "assistant",
					content:
						"Noted. I will incorporate this into your profile analysis. Click 'Generate Career Paths' to refresh recommendations.",
				},
			]);
		}, 300);
	};

	const exportPDF = () => {
		window.print();
	};

	const signOut = async () => {
		const token = localStorage.getItem("bearer_token") || "";
		await authClient.signOut({
			fetchOptions: { headers: { Authorization: `Bearer ${token}` } },
		});
		localStorage.removeItem("bearer_token");
		window.location.href = "/sign-in";
	};

	return (
		<div className='min-h-screen'>
			{/* Navbar */}
			<header className='sticky top-0 z-30 border-b bg-background/80 backdrop-blur'>
				<div className='mx-auto max-w-6xl px-4 h-16 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						<img
							src='/logo.png'
							alt='MargdarshAI logo'
							className='h-8 w-8 rounded-full'
						/>
						<div>
							<p className='font-semibold leading-tight'>MargdarshAI</p>
							<p className='text-xs text-muted-foreground leading-tight'>
								Personalized Career & Skills Advisor
							</p>
						</div>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							variant='ghost'
							onClick={() => (window.location.href = "/profile")}>
							Edit Profile
						</Button>
						<Button variant='outline' onClick={exportPDF}>
							Export as PDF
						</Button>
						<Button variant='secondary' onClick={signOut}>
							Sign out
						</Button>
					</div>
				</div>
			</header>

			{/* Hero / Welcome */}
			<section className='mx-auto max-w-6xl px-4 py-8'>
				<div className='rounded-xl bg-gradient-to-r from-secondary to-accent p-6 border'>
					<h1 className='text-2xl sm:text-3xl font-semibold'>
						Welcome{user?.name ? `, ${user.name}` : "!"}
					</h1>
					<p className='text-muted-foreground mt-1'>
						Describe your academics, interests, and aspirations. Then start your
						personalized guidance.
					</p>
					<div className='mt-3 flex flex-wrap gap-2 text-xs'>
						<Badge variant='secondary'>Core Model: Gemini 2.5 Pro</Badge>
						<Badge variant='secondary'>Deploy: Firebase + Genkit</Badge>
						<Badge variant='secondary'>Grounding: Vertex AI Search + RAG</Badge>
						<Badge variant='secondary'>Frontend: React/Tailwind</Badge>
						<Badge variant='secondary'>Hosting: Vibecode/Orchids</Badge>
					</div>
				</div>
			</section>

			{/* Inputs + Chat */}
			<section className='mx-auto max-w-6xl px-4 grid gap-6 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Update Details</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-4'>
						<div>
							<Label>Academic Subjects (comma separated)</Label>
							<Input
								value={subjects}
								onChange={(e) => setSubjects(e.target.value)}
								placeholder='Operating Systems, DSA, Networks'
							/>
						</div>
						<div>
							<Label>Extracurricular Interests (comma separated)</Label>
							<Input
								value={interests}
								onChange={(e) => setInterests(e.target.value)}
								placeholder='Cyber security, Cloud, DevOps'
							/>
						</div>
						<div>
							<Label>Skills (comma separated)</Label>
							<Input
								value={skills}
								onChange={(e) => setSkills(e.target.value)}
								placeholder='Linux, Git, Python'
							/>
						</div>
						<div>
							<Label>Vague Aspirations</Label>
							<Textarea
								value={aspirations}
								onChange={(e) => setAspirations(e.target.value)}
								placeholder='I want to work on scalable systems and security...'
							/>
						</div>
						<div className='flex flex-wrap gap-3'>
							<Button onClick={startGuidance}>Start Career Guidance</Button>
							<Button
								variant='outline'
								onClick={() => setShowBlueprint((v) => !v)}>
								{showBlueprint ?
									"Hide Skill Blueprint"
								:	"View Skill Blueprint"}
							</Button>
							<Button variant='secondary' onClick={exportPDF}>
								Generate Career Paths & Export
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Chat with MargdarshAI (demo)</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col gap-3'>
						<div className='min-h-40 max-h-64 overflow-auto rounded border p-3 space-y-2 text-sm'>
							{messages.length === 0 && (
								<p className='text-muted-foreground'>
									Say: "I like cloud and cybersecurity"
								</p>
							)}
							{messages.map((m, i) => (
								<div
									key={i}
									className={m.role === "user" ? "text-right" : "text-left"}>
									<span
										className={
											m.role === "user" ?
												"inline-block bg-primary text-primary-foreground px-2 py-1 rounded"
											:	"inline-block bg-secondary px-2 py-1 rounded"
										}>
										{m.content}
									</span>
								</div>
							))}
						</div>
						<form onSubmit={handleChatSend} className='flex gap-2'>
							<Input name='message' placeholder='Type your message...' />
							<Button type='submit'>Send</Button>
						</form>
					</CardContent>
				</Card>
			</section>

			{/* Results */}
			<section className='mx-auto max-w-6xl px-4 py-8 space-y-4'>
				<h2 className='text-xl font-semibold'>Results</h2>
				{/* Cards */}
				<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
					{(results?.careers || []).map((c, idx) => (
						<Card key={idx} className='flex flex-col'>
							<CardHeader>
								<CardTitle className='text-base'>{c.career}</CardTitle>
							</CardHeader>
							<CardContent className='space-y-2 text-sm'>
								<p className='text-muted-foreground'>{c.rationale}</p>
								{showBlueprint && (
									<div className='space-y-2'>
										<div>
											<p className='font-medium'>Skill Gap Analysis</p>
											<ul className='list-disc ml-5'>
												{c.skill_gap.map((s, i) => (
													<li key={i}>{s}</li>
												))}
											</ul>
										</div>
										<div>
											<p className='font-medium'>Skills Needed</p>
											<div className='flex flex-wrap gap-2'>
												{c.skills_needed.map((s, i) => (
													<Badge key={i} variant='secondary'>
														{s}
													</Badge>
												))}
											</div>
										</div>
										<div>
											<p className='font-medium'>Learning Resources</p>
											<ul className='list-disc ml-5'>
												{c.learning_resources.map((u, i) => (
													<li key={i}>
														<a
															className='underline'
															href={u}
															target='_blank'
															rel='noreferrer'>
															{new URL(u).host}
														</a>
													</li>
												))}
											</ul>
										</div>
										<div>
											<p className='font-medium'>Projects & Internship Ideas</p>
											<ul className='list-disc ml-5'>
												{c.projects.map((p, i) => (
													<li key={i}>{p}</li>
												))}
											</ul>
										</div>
										<div>
											<p className='font-medium'>Day-in-the-Life (Mock)</p>
											<p className='text-muted-foreground'>{c.day_in_life}</p>
										</div>
										<div>
											<p className='font-medium'>Market Intelligence (Demo)</p>
											<p className='text-muted-foreground'>
												Demand: {c.market_trends.demand} • Salary:{" "}
												{c.market_trends.salary_range} • Growth:{" "}
												{c.market_trends.growth}
											</p>
										</div>
									</div>
								)}
								<div className='pt-2 flex gap-2'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => setShowBlueprint((v) => !v)}>
										{showBlueprint ? "Hide Blueprint" : "View Skill Blueprint"}
									</Button>
									<Button size='sm' onClick={exportPDF}>
										Export
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<footer className='mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground'>
				© {new Date().getFullYear()} MargdarshAI • Demo prototype for
				hackathon. Deterministic outputs for repeatable demos.
			</footer>
		</div>
	);
}
