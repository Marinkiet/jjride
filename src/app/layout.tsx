// src/app/layout.tsx
"use client";

import './globals.css';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineHome, AiOutlineForm, AiOutlineExclamationCircle, AiOutlineWarning, AiOutlineUser } from 'react-icons/ai'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <html lang="en" className='dark'>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-pink-900 text-white p-4 shadow-lg">
          <nav className="hidden md:flex justify-center space-x-6 text-md">
         
            <Link href="/" className="hover:text-yellow-400 transition duration-200 flex items-center">
              <AiOutlineHome className="mr-2" /> Home
            </Link>
            <Link href="/apply" className="hover:text-yellow-400 transition duration-200 flex items-center">
              <AiOutlineForm className="mr-2" /> Apply for job
            </Link>
            <Link href="/reportIncident" className="hover:text-yellow-400 transition duration-200 flex items-center">
              <AiOutlineExclamationCircle className="mr-2" /> Report Incident
            </Link>
            <Link href="/reportHazard" className="hover:text-yellow-400 transition duration-200 flex items-center">
              <AiOutlineWarning className="mr-2" /> Report Hazard
            </Link>
            <Link href="/profile" className="hover:text-yellow-400 transition duration-200 flex items-center">
              <AiOutlineUser className="mr-2" /> Profile
            </Link>
          </nav>
          {/* Mobile menu */}
          <nav className="md:hidden fixed bottom-0 left-0 w-full bg-pink-900 text-white flex justify-around py-2 shadow-lg">
            <Link href="/" className="flex flex-col items-center">
              <AiOutlineHome size={24} />
              <span className="text-xs">Home</span>
            </Link>
            <Link href="/apply" className="flex flex-col items-center">
              <AiOutlineForm size={24} />
              <span className="text-xs">Apply</span>
            </Link>
            <Link href="/reportIncident" className="flex flex-col items-center">
              <AiOutlineExclamationCircle size={24} />
              <span className="text-xs">Incident</span>
            </Link>
            <Link href="/reportHazard" className="flex flex-col items-center">
              <AiOutlineWarning size={24} />
              <span className="text-xs">Hazard</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center">
              <AiOutlineUser size={24} />
              <span className="text-xs">Profile</span>
            </Link>
          </nav>
        </header>

        <main className="flex-grow container mx-auto p-4 md:p-8">
          {children}
        </main>

        <footer className="bg-gray-900 text-white p-4 text-center shadow-inner">
          © 2024 JobJoyRide. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
