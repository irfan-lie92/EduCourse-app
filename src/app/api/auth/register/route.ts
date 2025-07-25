import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "../[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 12);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    return NextResponse.json(
      { message: "User berhasil didaftarkan" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
