"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

type LoginButtonProp = {
    children: React.ReactNode
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

const LoginButton = ({children, mode = "redirect", asChild}: LoginButtonProp) => {
    const router = useRouter()
    const onClick = () => {
        router.push("/auth/login")
    }

    if (mode === "modal") {
        return (
            <span>
                TODO: Implement Modal
            </span>
        )
    }
    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    );
};

export default LoginButton;