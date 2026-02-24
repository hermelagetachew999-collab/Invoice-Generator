import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import * as jose from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-for-development'
);

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json({ user: null });
        }

        const { payload } = await jose.jwtVerify(token, JWT_SECRET);
        const userId = payload.id as number;

        const users = await sql`
            SELECT name, email, tier FROM users WHERE id = ${userId}
        `;

        if (users.length === 0) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: {
                name: users[0].name,
                email: users[0].email,
                tier: users[0].tier
            }
        });
    } catch (error) {
        return NextResponse.json({ user: null });
    }
}
