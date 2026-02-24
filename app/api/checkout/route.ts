import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import * as jose from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-development'
);

export async function POST(request: Request) {
    try {
        const { tier } = await request.json();

        // Get user from cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        const userEmail = payload.email as string;

        if (!userEmail) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Update user tier
        await sql`
            UPDATE users 
            SET tier = ${tier} 
            WHERE email = ${userEmail}
        `;

        return NextResponse.json({ message: 'Subscription updated successfully', tier });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
}
