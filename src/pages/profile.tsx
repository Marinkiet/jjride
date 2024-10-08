import { AiOutlineHome, AiOutlineForm, AiOutlineExclamationCircle, AiOutlineWarning, AiOutlineUser, AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../src/app/globals.css';

interface Hazard {
  title: string;
  company: string;
  location: string;
  details: string;
  status: string;
}

interface JobApplication {
  title: string;
  company: string;
  location: string;
  duration: string;
  status: string;
}

interface Incident {
  title: string;
  company: string;
  location: string;
  details: string;
  status: string;
}

const Profile = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [city, setCity] = useState('Benoni'); 
  const [phone, setPhone] = useState('0789989876'); 
  const [isEditing, setIsEditing] = useState(false);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobResponse = await fetch('/data/jobApplications.json');
      const jobData: JobApplication[] = await jobResponse.json();
      setJobApplications(jobData);

      const hazardResponse = await fetch('/data/hazards.json');
      const hazardData: Hazard[] = await hazardResponse.json();
      const filteredHazards = hazardData.filter((hazard: Hazard) => hazard.location === city);
      setHazards(filteredHazards);

      const incidentResponse = await fetch('/data/incidents.json');
      const incidentData: Incident[] = await incidentResponse.json();
      setIncidents(incidentData);
    };

    fetchData();
  }, [city]);

  const handleSave = () => {
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'worked on':
        return 'text-green-500';
      case 'resolved':
        return 'text-green-500';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
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
          <Link href="/profile" className="text-yellow-400 transition duration-200 flex items-center">
            <AiOutlineUser className="mr-2" /> Profile
          </Link>
        </nav>
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-pink-900 text-white flex justify-around py-2 shadow-lg">
          <Link href="/" className="flex flex-col items-center">
            <AiOutlineHome size={24} />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/apply" className="flex flex-col items-center">
            <AiOutlineForm size={24} />
            <span className="text-xs">Apply</span>
          </Link>
          <Link href="/report-incident" className="flex flex-col items-center">
            <AiOutlineExclamationCircle size={24} />
            <span className="text-xs">Incident</span>
          </Link>
          <Link href="/report-hazard" className="flex flex-col items-center">
            <AiOutlineWarning size={24} />
            <span className="text-xs">Hazard</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center">
            <AiOutlineUser size={24} />
            <span className="text-xs">Profile</span>
          </Link>
        </nav>
      </header>

      <section className="relative h-[35vh] bg-cover bg-center rounded-tl-[120px] rounded-tr-[0px] rounded-br-[120px] rounded-bl-[0px] overflow-hidden" 
        style={{ backgroundImage: "url('/assets/law.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-between h-full text-white text-left p-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-sm md:text-lg mb-4">Review your job applications and reports.</p>
          </div>
          <img src="/assets/jim.jpg" alt="Profile" className="w-40 h-40 mr-10 rounded-full object-cover" />
        </div>
      </section>

      <main className="mt-8">
        <div className="mx-auto px-6 mb-8">
          <h3 className="text-xl font-bold">Personal Information</h3>
          <hr className="my-4" />
          {isEditing ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleSave}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200"
              >
                Update Details
              </button>
            </div>
          ) : (
            <div>
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>City:</strong> {city}</p>
              <p><strong>Contact:</strong> {phone}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">My Job Applications</h3>
          <hr className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {jobApplications.map((job, index) => (
              <div key={index} className="bg-white p-4 shadow rounded flex flex-col justify-between">
                <div>
                  <p className="font-bold text-lg">{job.title}</p>
                  <p className="text-gray-600">Company: {job.company}</p>
                  <p className="text-gray-600">Location: {job.location}</p>
                  <p className="text-gray-600">Duration: {job.duration}</p>
                </div>
                <div className="mt-4 flex items-center">
                  {job.status === 'pending' && <AiOutlineClockCircle size={20} className="text-yellow-500 mr-2" />}
                  {job.status === 'worked on' && <AiOutlineCheckCircle size={20} className="text-green-500 mr-2" />}
                  <span className={getStatusColor(job.status)}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Reported Hazards</h3>
          <hr className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {hazards.map((hazard, index) => (
              <div key={index} className="bg-white p-4 shadow rounded flex flex-col justify-between">
                <div>
                  <p className="font-bold text-lg">{hazard.title}</p>
                  <p className="text-gray-600">Company: {hazard.company}</p>
                  <p className="text-gray-600">Location: {hazard.location}</p>
                  <p className="text-gray-600">Details: {hazard.details}</p>
                </div>
                <div className="mt-4 flex items-center">
                  {hazard.status === 'pending' && <AiOutlineClockCircle size={20} className="text-yellow-500 mr-2" />}
                  {hazard.status === 'resolved' && <AiOutlineCheckCircle size={20} className="text-green-500 mr-2" />}
                  <span className={getStatusColor(hazard.status)}>{hazard.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Reported Incidents</h3>
          <hr className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {incidents.map((incident, index) => (
              <div key={index} className="bg-white p-4 shadow rounded flex flex-col justify-between">
                <div>
                  <p className="font-bold text-lg">{incident.title}</p>
                  <p className="text-gray-600">Company: {incident.company}</p>
                  <p className="text-gray-600">Location: {incident.location}</p>
                  <p className="text-gray-600">Details: {incident.details}</p>
                </div>
                <div className="mt-4 flex items-center">
                  {incident.status === 'pending' && <AiOutlineClockCircle size={20} className="text-yellow-500 mr-2" />}
                  {incident.status === 'resolved' && <AiOutlineCheckCircle size={20} className="text-green-500 mr-2" />}
                  <span className={getStatusColor(incident.status)}>{incident.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
