import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if user exists
        const users = await sql`
            SELECT id FROM users WHERE email = ${email}
        `;

        if (users.length === 0) {
            // Don't reveal if user exists or not for security, but for this app let's be helpful
            return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Save code to DB
        await sql`
            INSERT INTO verification_codes (email, code, expires_at)
            VALUES (${email}, ${code}, ${expiresAt})
        `;

        // LOG CODE TO CONSOLE (Simulation of email)
        console.log(`[AUTH] Verification code for ${email}: ${code}`);

        // In production, you would send this via Resend/Postmark/etc.

        return NextResponse.json({ message: 'Verification code sent to your email' });
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
