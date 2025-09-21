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
import Image from "next/image";

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
		<div className='min-h-screen flex items-center justify-center p-6 bg-black'>
			<div className='w-full max-w-md'>
				<Card className='border-none shadow-lg bg-transparent'>
					<CardHeader>
						<div className='flex items-center gap-2'>
							<Image
								src='/logo.png'
								alt='MargdarshAI Logo'
								width={50}
								height={50}
								className='rounded-full'
							/>
							<CardTitle className='text-2xl text-white'>MargdarshAI</CardTitle>
						</div>
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
								<Label htmlFor='email' className='text-white'>
									Email
								</Label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className='text-white'
								/>
							</div>
							<div className='space-y-1'>
								<Label htmlFor='password' className='text-white'>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									autoComplete='off'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className='text-white'
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
