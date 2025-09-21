"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const loginWithGoogle = async () => {
		// Demo-only: no backend call, just redirect to dashboard
		setError(null);
		setLoading(true);
		router.push("/");
	};

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const { error } = await authClient.signIn.email({
			email,
			password,
			rememberMe: true,
			callbackURL: "/",
		});
		if (error) {
			setError("Invalid email or password");
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
			<div className='backdrop-blur-sm bg-white/80 dark:bg-black/40 rounded-xl w-full max-w-md'>
				<Card className='border-none shadow-lg bg-transparent'>
					<CardHeader>
						<CardTitle className='text-2xl'>MargdarshAI</CardTitle>
						<CardDescription>
							Personalized Career and Skills Advisor
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Button
							className='w-full'
							onClick={loginWithGoogle}
							disabled={loading}>
							{loading ? "Redirecting..." : "Continue with Google"}
						</Button>
						<div className='text-center text-sm text-muted-foreground'>or</div>
						<form className='space-y-3' onSubmit={handleEmailLogin}>
							<div className='space-y-1'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='password'>Password</Label>
								<Input
									id='password'
									type='password'
									autoComplete='off'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button type='submit' className='w-full' disabled={loading}>
								Sign in with Email
							</Button>
							<Button
								type='button'
								variant='outline'
								className='w-full'
								onClick={() => router.push("/sign-up")}
								disabled={loading}>
								Create new user
							</Button>
						</form>
						{error && <p className='text-red-500 text-sm'>{error}</p>}
						<p className='text-xs text-muted-foreground pt-2'>
							By continuing, you agree to our Terms.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
