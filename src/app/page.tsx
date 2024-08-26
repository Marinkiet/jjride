"use client"; // Ensure this is a client component

import Link from 'next/link';
import AIChatButton from './components/UI/AIChatButton';
import { AiOutlineMessage } from 'react-icons/ai'; // Bot icon

export default function Home() {
  return (
    <div>
       
      {/* Section 1: Banner */}
      <section
        className="relative h-[40vh] bg-cover bg-center rounded-tl-[120px] rounded-tr-[0px] rounded-br-[120px] rounded-bl-[0px] overflow-hidden"
        // style={{ backgroundImage: "url('/assets/law.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-50"></div>

        <div className="absolute top-1/2 right-10 transform -translate-y-1/2">
          <img
            src="/assets/logo.png"
            alt="Circle"
            className="w-auto h-25  border-4 border-white object-contain"
          />
        </div>

        <div className="relative z-0 flex flex-col items-center justify-center h-full text-black text-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Find Work. Know Your Rights. Stay Safe.</h1>
          <p className="text-sm md:text-lg mb-4">Your all-in-one hub for job search, legal advice, and workplace safety.</p>
          <div className="flex items-center justify-center mt-4">
            <AIChatButton />
          </div>
        </div>
      </section>


      {/* Section 2: How It Works */}
      <section className="bg-inherit py-8 px-4 md:px-8 mt-20 bg-center rounded-tl-[120px]" style={{ backgroundImage: "url('/assets/joobfind.jpg')" }}>
        <div className="bg-inherit z-0 mx-auto flex flex-col-reverse md:flex-row items-stretch md:space-x-8">
          {/* Card with Text and Button */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full rounded-lg shadow-lg p-5 flex flex-col items-center text-center md:text-left">
              <h2 className="text-3xl font-bold mb-8 text-center md:text-center">
                Your Next Opportunity Awaits
                <img
                  src="/assets/goal.png" 
                  alt="Featured Job"
                  className="max-w-md h-auto rounded-lg p-10"
                />
              </h2>

              <p className="text-sm mb-4">
                Explore a curated list of job opportunities in your area that align with your unique skills and experience. Whether you&apos;re looking for short-term gigs or long-term roles, find the perfect match close to home, and start your next career move today.
              </p>
              <Link href="/apply" className="inline-block bg-pink-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-400">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Image on the Right */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="/assets/joobfind.jpg"
              alt="Featured Job"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>


      {/* Section 3: Report Hazard */}
      <section className="bg-inherit py-8 px-4 md:px-8 mt-20 bg-center rounded-tl-[120px]" style={{ backgroundImage: "url('/assets/safe.jpg')" }}>
        <div className="bg-inherit z-10 mx-auto flex flex-col-reverse md:flex-row items-stretch md:space-x-8">
          {/* Card with Text and Button */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full rounded-lg shadow-lg p-5 flex flex-col items-center text-center md:text-left">
              <h2 className="text-3xl font-bold mb-8 text-center md:text-center">
                Safety First
                <img
                  src="/assets/stop.png" 
                  alt="Featured Job"
                  className="max-w-md h-auto rounded-lg p-10"
                />
              </h2>

              <p className="text-sm mb-4">
                Your safety is our priority. If you spot any hazards or unsafe conditions at a worksite, report them instantly through the app. Each report is sent directly to the company, helping to hold them accountable for safety standards. The more reports a company receives, the more their safety rating reflects their attention to workplace safety, encouraging safer environments for everyone.
              </p>
              <Link href="/reportHazard" className="inline-block bg-pink-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-400">
                Report Hazard
              </Link>
            </div>
          </div>

          {/* Image on the Right */}
          <div className="w-full md:w-1/2 flex items-right justify-end">
            <img
              src="/assets/safe.jpg"
              alt="Featured Job"
              className="max-w-md h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Report Workplace Incident */}
      <section className="bg-inherit py-8 px-4 md:px-8 mt-20 bg-center rounded-tl-[120px]" style={{ backgroundImage: "url('/assets/incident.jpg')" }}>
        <div className="bg-inherit z-10 mx-auto flex flex-col-reverse md:flex-row items-stretch md:space-x-8">
          {/* Card with Text and Button */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full rounded-lg shadow-lg p-6 flex flex-col items-center text-center md:text-left">
              <h2 className="text-3xl text-white font-bold mb-8 text-center md:text-center">
                Speak Up: Report Workplace Incidents
                <img
                  src="/assets/all.png" 
                  alt="Featured Job"
                  className="max-w-md h-auto rounded-lg p-10"
                />
              </h2>

              <p className="text-sm mb-4 text-white">
                Encountered an incident on the job? Don&apos;t stay silent. Report any workplace incidents directly to your employer through our app. Whether it&apos;s an injury, equipment failure, or unsafe practices, your report ensures that necessary actions are taken to prevent future occurrences. Your voice helps create a safer, more accountable workplace for everyone.
              </p>
              <Link href="/reportIncident" className="inline-block bg-pink-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-400">
                Report Incident
              </Link>
            </div>
          </div>

          {/* Image on the Right */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img
              src="/assets/incident.jpg"
              alt="Featured Job"
              className="max-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
