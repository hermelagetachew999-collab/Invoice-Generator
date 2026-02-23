"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Mail, Lock, User, Github, Shield, AlertCircle, CheckCircle2, ChevronLeft, KeyRound } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: { email: string; name?: string }) => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password' | 'reset-password';

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
    const [view, setView] = useState<AuthView>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setError('');
            setSuccess('');
            setLoading(false);
            setView('login');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (view === 'login') {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess('Welcome back! Logging in...');
                    setTimeout(() => {
                        onLogin(data.user);
                        onClose();
                    }, 1000);
                } else {
                    setError(data.error || 'Invalid credentials');
                }
            } else if (view === 'signup') {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess('Account created successfully! You can now sign in.');
                    setTimeout(() => {
                        setView('login');
                        setSuccess('');
                    }, 1500);
                } else {
                    setError(data.error || 'Failed to create account');
                }
            } else if (view === 'forgot-password') {
                const res = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess('Verification code sent to your email.');
                    setTimeout(() => setView('reset-password'), 1500);
                } else {
                    setError(data.error || 'Could not send verification code');
                }
            } else if (view === 'reset-password') {
                const res = await fetch('/api/auth/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, code, newPassword }),
                });
                const data = await res.json();
                if (res.ok) {
                    setSuccess('Password updated successfully! Redirecting to login...');
                    setTimeout(() => setView('login'), 2000);
                } else {
                    setError(data.error || 'Failed to reset password');
                }
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderHeader = () => {
        const titles: Record<AuthView, { title: string; sub: string }> = {
            login: { title: 'Welcome Back', sub: 'Sign in to access your dashboard' },
            signup: { title: 'Join InvoiceGen', sub: 'Start creating professional invoices today' },
            'forgot-password': { title: 'Reset Password', sub: 'Enter your email to receive a recovery code' },
            'reset-password': { title: 'Security Code', sub: 'Check your email for the 6-digit code' },
        };

        return (
            <div className="text-center mb-8">
                <div className="inline-block p-2.5 rounded-2xl bg-primary/10 mb-4">
                    <Shield className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                    {titles[view].title}
                </h2>
                <p className="text-gray-500 text-xs font-medium">
                    {titles[view].sub}
                </p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-500 overflow-y-auto">
            <Card className="w-full max-w-md relative bg-white/95 border-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-3xl transition-all duration-300">
                <div className="absolute top-4 right-4 z-10">
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100/80">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {view !== 'login' && view !== 'signup' && (
                    <div className="absolute top-4 left-4 z-10">
                        <Button variant="ghost" size="sm" onClick={() => setView('login')} className="rounded-full flex items-center gap-1 text-gray-500">
                            <ChevronLeft className="w-4 h-4" /> Back
                        </Button>
                    </div>
                )}

                <div className="p-8">
                    {renderHeader()}

                    {error && (
                        <div className="mb-5 p-3.5 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 p-3.5 bg-green-50 border border-green-100 text-green-600 text-xs rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {view === 'signup' && (
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {(view === 'login' || view === 'signup' || view === 'forgot-password' || view === 'reset-password') && (
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={view === 'reset-password'}
                                    />
                                </div>
                            </div>
                        )}

                        {view === 'reset-password' && (
                            <div className="space-y-1.5">
                                <Label htmlFor="code" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1">Verification Code</Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="code"
                                        placeholder="123456"
                                        maxLength={6}
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-center tracking-widest text-lg font-bold"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {(view === 'login' || view === 'signup' || view === 'reset-password') && (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center ml-1">
                                    <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                        {view === 'reset-password' ? 'New Password' : 'Password'}
                                    </Label>
                                    {view === 'login' && (
                                        <button
                                            type="button"
                                            onClick={() => setView('forgot-password')}
                                            className="text-[10px] font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-11 h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-sm"
                                        value={view === 'reset-password' ? newPassword : password}
                                        onChange={(e) => view === 'reset-password' ? setNewPassword(e.target.value) : setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 text-sm font-bold rounded-xl shadow-lg shadow-primary/15 hover:scale-[1.01] active:scale-[0.99] transition-all mt-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                view === 'login' ? 'Sign In' :
                                    view === 'signup' ? 'Create Free Account' :
                                        view === 'forgot-password' ? 'Send Reset Code' : 'Reset Password'
                            )}
                        </Button>
                    </form>

                    {(view === 'login' || view === 'signup') && (
                        <>
                            <div className="relative my-7">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-100"></span>
                                </div>
                                <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-bold">
                                    <span className="bg-white px-3 text-gray-400">Or connect with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-11 text-xs font-bold rounded-xl border-gray-100 hover:bg-gray-50 transition-colors">
                                    <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27.81-.57z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-11 text-xs font-bold rounded-xl border-gray-100 hover:bg-gray-50 transition-colors">
                                    <Github className="w-3.5 h-3.5 mr-2" />
                                    GitHub
                                </Button>
                            </div>
                        </>
                    )}

                    {(view === 'login' || view === 'signup') && (
                        <div className="mt-8 text-center text-xs font-medium">
                            <span className="text-gray-400">
                                {view === 'login' ? "New to InvoiceGen?" : "Already a member?"}
                            </span>{' '}
                            <button
                                onClick={() => {
                                    setView(view === 'login' ? 'signup' : 'login');
                                    setError('');
                                    setSuccess('');
                                }}
                                className="text-primary font-bold hover:underline underline-offset-4"
                            >
                                {view === 'login' ? 'Create Account' : 'Sign In instead'}
                            </button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
