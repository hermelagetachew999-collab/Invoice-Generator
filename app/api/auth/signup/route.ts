import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import sql from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        console.log('Signup attempt:', { name, email });

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Check if user already exists
        const existingUsers = await sql`
            SELECT id FROM users WHERE email = ${email}
        `;

        if (existingUsers.length > 0) {
            return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        console.log('Inserting user into DB...');
        await sql`
            INSERT INTO users (name, email, password)
            VALUES (${name || null}, ${email}, ${hashedPassword})
        `;

        console.log('User created successfully');
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error: any) {
        console.error('Signup error caught:', error);
        return NextResponse.json({
            error: 'Internal server error',
            message: error.message,
            code: error.code,
            detail: error.detail,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
