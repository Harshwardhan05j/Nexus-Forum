"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    await signIn("google", { callbackUrl: "/" });
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const result = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password. Please try again.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050505] mt-nav">
      {/* Background glows */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-blue-600/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="z-10 w-full max-w-md px-4">
        <div className="bg-[#0e0e0e]/80 border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-3xl font-black tracking-tight bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              Nexus
            </span>
            <h1 className="text-2xl font-bold text-white mt-3 mb-1">Welcome back</h1>
            <p className="text-zinc-500 text-sm">Sign in to your Nexus account</p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 h-12 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all shadow-sm disabled:opacity-60 cursor-pointer mb-6"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-zinc-600 font-medium uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 transition-all placeholder:text-zinc-600"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={loading || googleLoading}
              className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Log in →"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-zinc-600 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-zinc-500 underline underline-offset-4 hover:text-zinc-300 transition-colors">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}
