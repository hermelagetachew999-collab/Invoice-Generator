import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sql from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { email, code, newPassword } = await request.json();

        if (!email || !code || !newPassword) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Verify code
        const codes = await sql`
            SELECT * FROM verification_codes 
            WHERE email = ${email} 
            AND code = ${code} 
            AND used = FALSE 
            AND expires_at > NOW()
            ORDER BY created_at DESC
            LIMIT 1
        `;

        if (codes.length === 0) {
            return NextResponse.json({ error: 'Invalid or expired verification code' }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await sql.begin(async (t) => {
            await (t as any)`
                UPDATE users SET password = ${hashedPassword} WHERE email = ${email}
            `;
            await (t as any)`
                UPDATE verification_codes SET used = TRUE WHERE id = ${codes[0].id}
            `;
        });

        return NextResponse.json({ message: 'Password reset successfully' });
    } catch (error: any) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
