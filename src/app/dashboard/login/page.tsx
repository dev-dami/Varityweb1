"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SquareDashedMousePointer, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Sign In fields
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up fields
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    await authClient.signIn.email(
      {
        email: signInEmail,
        password: signInPassword,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          toast.success("Welcome back!");
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Invalid credentials");
        },
      }
    );
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword || !signUpName) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    await authClient.signUp.email(
      {
        email: signUpEmail,
        password: signUpPassword,
        name: signUpName,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false);
          toast.success("Account created successfully!");
          router.push("/");
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "Failed to create account");
        },
      }
    );
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#09090b] overflow-hidden px-4">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-red-500/10 to-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10 space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-gradient-to-tr from-red-500 to-orange-500 text-white flex aspect-square size-12 items-center justify-center rounded-xl shadow-lg shadow-orange-500/20">
            <SquareDashedMousePointer className="size-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-4">Varityweb</h1>
          <p className="text-sm text-zinc-400">Nigeria&apos;s premier worry-free website builder</p>
        </div>

        <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-2xl">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 bg-zinc-900 border-b border-zinc-800 rounded-t-lg rounded-b-none h-12">
              <TabsTrigger
                value="signin"
                className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-950/40 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-zinc-950/40 rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="m-0">
              <form onSubmit={handleSignIn}>
                <CardHeader>
                  <CardTitle className="text-lg text-white">Welcome back</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Sign in to your account to manage your sites
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      className="bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-zinc-300">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      className="bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      disabled={loading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium shadow-lg transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="m-0">
              <form onSubmit={handleSignUp}>
                <CardHeader>
                  <CardTitle className="text-lg text-white">Create an account</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Start designing your web pages in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="signup-name" className="text-zinc-300">Your Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      className="bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-email" className="text-zinc-300">Email Address</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      className="bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="signup-password" className="text-zinc-300">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      className="bg-zinc-900/50 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      disabled={loading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium shadow-lg transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
