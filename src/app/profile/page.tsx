"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const { data: session } = useSession();
	const user = session?.user;
	const storageKey = user?.email ? `profile:${user.email}` : null;
	const [age, setAge] = useState<string>("");
	const [education, setEducation] = useState("");
	const [city, setCity] = useState("");
	const [interests, setInterests] = useState("");
	const [strengths, setStrengths] = useState("");
	const [saved, setSaved] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!storageKey) return;
		const raw = localStorage.getItem(storageKey);
		if (raw) {
			try {
				const p = JSON.parse(raw);
				setAge(p.age || "");
				setEducation(p.education || "");
				setCity(p.city || "");
				setInterests((p.interests || []).join(", "));
				setStrengths((p.strengths || []).join(", "));
			} catch {}
		}
	}, [storageKey]);

	const saveProfile = () => {
		if (!storageKey) return;
		const payload = {
			age: age ? Number(age) : undefined,
			education,
			city,
			interests: interests
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
			strengths: strengths
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
		};
		localStorage.setItem(storageKey, JSON.stringify(payload));
		setSaved(true);
		setTimeout(() => setSaved(false), 1500);
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
		<div className='min-h-screen p-6 max-w-3xl mx-auto'>
			<div className='flex items-center justify-between mb-6'>
				<Button variant='outline' onClick={() => router.push("/")}>
					&larr; Back to Dashboard
				</Button>
				<Button variant='secondary' onClick={signOut}>
					Sign out
				</Button>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Student Details</CardTitle>
				</CardHeader>
				<CardContent className='grid gap-4 sm:grid-cols-2'>
					<div className='sm:col-span-2'>
						<Label>Name</Label>
						<Input value={user?.name || ""} readOnly />
					</div>
					<div className='sm:col-span-2'>
						<Label>Email</Label>
						<Input value={user?.email || ""} readOnly />
					</div>
					<div>
						<Label>Age</Label>
						<Input
							value={age}
							onChange={(e) => setAge(e.target.value)}
							placeholder='20'
						/>
					</div>
					<div>
						<Label>Education</Label>
						<Input
							value={education}
							onChange={(e) => setEducation(e.target.value)}
							placeholder='BTech Computer Engineering'
						/>
					</div>
					<div className='sm:col-span-2'>
						<Label>City</Label>
						<Input
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder='Bangalore, India'
						/>
					</div>
					<div className='sm:col-span-2'>
						<Label>Interests (comma separated)</Label>
						<Input
							value={interests}
							onChange={(e) => setInterests(e.target.value)}
							placeholder='Cyber security, Cloud, DevOps'
						/>
					</div>
					<div className='sm:col-span-2'>
						<Label>Strengths (comma separated)</Label>
						<Input
							value={strengths}
							onChange={(e) => setStrengths(e.target.value)}
							placeholder='Good communication, Deterministic, Problem-solving'
						/>
					</div>
					<div className='sm:col-span-2 flex gap-3'>
						<Button onClick={saveProfile}>Save</Button>
						{saved && (
							<span className='text-green-600 text-sm self-center'>Saved!</span>
						)}
					</div>
				</CardContent>
			</Card>
			<p className='text-sm text-muted-foreground mt-4'>
				Tech stack (demo): Gemini 2.5 Pro • Firebase + Genkit • Vertex AI Search
				(RAG) • React/Tailwind • Hosting: Github/Vercel
			</p>
		</div>
	);
}
