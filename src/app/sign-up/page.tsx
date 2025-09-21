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
import Link from "next/link";

export default function SignUpPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		setSuccess(false);

		const { error } = await authClient.signUp.email({
			email,
			password,
			name,
		});

		setLoading(false);
		if (error) {
			setError(error.message || "Something went wrong");
		} else {
			setSuccess(true);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
			<div className='backdrop-blur-sm bg-white/80 dark:bg-black/40 rounded-xl w-full max-w-md'>
				<Card className='border-none shadow-lg bg-transparent'>
					<CardHeader>
						<CardTitle className='text-2xl'>Create an account</CardTitle>
						<CardDescription>
							Enter your details below to create your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						{success ?
							<div className='text-center space-y-4'>
								<p className='text-green-600'>
									Account created successfully! Please check your email to
									verify your account.
								</p>
								<Button asChild>
									<Link href='/sign-in'>Go to Sign In</Link>
								</Button>
							</div>
						:	<form className='space-y-4' onSubmit={handleSignUp}>
								<div className='space-y-1'>
									<Label htmlFor='name'>Name</Label>
									<Input
										id='name'
										type='text'
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
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
										autoComplete='new-password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<Button type='submit' className='w-full' disabled={loading}>
									{loading ? "Creating account..." : "Sign Up"}
								</Button>
								{error && <p className='text-red-500 text-sm'>{error}</p>}
							</form>
						}
						<div className='mt-4 text-center text-sm'>
							Already have an account?{" "}
							<Link href='/sign-in' className='underline'>
								Sign in
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
