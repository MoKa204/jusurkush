import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-at-least-32-characters-long!";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "jusur_session";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  sellerId?: string;
  sellerStatus?: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "BUYER" | "SELLER" | "ADMIN" | string;
  phone?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  sellerProfile?: {
    id: string;
    businessName: string;
    registrationNumber: string;
    status: string;
    bankName?: string;
    bankAccountName?: string;
    bankAccountNumber?: string;
    bankIBAN?: string | null;
  } | null;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as JWTPayload;
  } catch (err) {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload?.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        sellerProfile: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      street: user.street,
      city: user.city,
      state: user.state,
      country: user.country,
      sellerProfile: user.sellerProfile
        ? {
            id: user.sellerProfile.id,
            businessName: user.sellerProfile.businessName,
            registrationNumber: user.sellerProfile.registrationNumber,
            status: user.sellerProfile.status,
            bankName: user.sellerProfile.bankName,
            bankAccountName: user.sellerProfile.bankAccountName,
            bankAccountNumber: user.sellerProfile.bankAccountNumber,
            bankIBAN: user.sellerProfile.bankIBAN,
          }
        : null,
    };
  } catch (error) {
    return null;
  }
}
