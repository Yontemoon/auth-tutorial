"use server"

import * as z from 'zod';
import { RegisterSchema } from "../schemas/index"
import { Prisma } from '@prisma/client';
import bcrypt from "bcrypt"
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid Fields! "}
    }  
    console.log("validatedFields,", validatedFields)

    const { email, password, name } = validatedFields.data
    const hashedPassword = await bcrypt.hash(password, 10);

    const exisitingUser = await getUserByEmail(email)

    if(exisitingUser) {
        return {error: "Email is already in use."}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    //TODO: SEND VERIFICATION TOKEN EMAIL

    return {success: "User Created!"}
}