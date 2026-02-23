"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Mail, Lock, User, Github, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: { email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setError('');
            setSuccess('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (isLogin) {
            const user = users.find((u: any) => u.email === email && u.password === password);
            if (user) {
                setSuccess('Welcome back! Logging in...');
                setTimeout(() => {
                    onLogin({ email });
                    onClose();
                }, 1000);
            } else {
                setError('Invalid email or password. Please sign up if you haven\'t created an account yet.');
            }
        } else {
            const existingUser = users.find((u: any) => u.email === email);
            if (existingUser) {
                setError('An account with this email already exists. Please sign in.');
            } else {
                const newUser = { name, email, password };
                localStorage.setItem('users', JSON.stringify([...users, newUser]));
                setSuccess('Account created successfully! You can now sign in.');
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccess('');
                }, 1500);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-500">
            <Card className="w-full max-w-md relative bg-white/95 border-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-3xl transition-all duration-300">
                <div className="absolute top-6 right-6 z-10">
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100/80">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                <div className="p-10">
                    <div className="text-center mb-10">
                        <div className="inline-block p-3 rounded-2xl bg-primary/10 mb-6">
                            <Shield className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
                            {isLogin ? 'Welcome Back' : 'Join InvoiceGen'}
                        </h2>
                        <p className="text-gray-500 text-sm font-medium">
                            {isLogin ? 'Sign in to access your dashboard' : 'Start creating professional invoices today'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-12 h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="pl-12 h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 text-base font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
                            {isLogin ? 'Sign In' : 'Create Free Account'}
                        </Button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-100"></span>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                            <span className="bg-white px-4 text-gray-400">Or connect with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 font-bold rounded-xl border-gray-100 hover:bg-gray-50 transition-colors">
                            <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 font-bold rounded-xl border-gray-100 hover:bg-gray-50 transition-colors">
                            <Github className="w-4 h-4 mr-3" />
                            GitHub
                        </Button>
                    </div>

                    <div className="mt-10 text-center text-sm font-medium">
                        <span className="text-gray-400">
                            {isLogin ? "New to InvoiceGen?" : "Already a member?"}
                        </span>{' '}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setSuccess('');
                            }}
                            className="text-primary font-bold hover:underline underline-offset-4"
                        >
                            {isLogin ? 'Create Account' : 'Sign In instead'}
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
