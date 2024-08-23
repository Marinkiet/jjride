"use client";

import { Bot } from 'lucide-react';
import { useState } from "react";
import AIChatBox from '../AIChatBox';

interface AIChatButtonProps {
    className?: string; // Add className prop
}

export default function AIChatButton({ className = '' }: AIChatButtonProps) {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setChatBoxOpen(true)}
                className={`flex gap-2 justify-center items-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-700 transition-colors duration-300 ${className}`}
            >
                <Bot size={23} />
                Chat for Advice
            </button>
            <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    );
}
