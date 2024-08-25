import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineForm, AiOutlineExclamationCircle, AiOutlineWarning, AiOutlineUser } from 'react-icons/ai'; 
import '../../src/app/globals.css';
import { AiOutlineEye } from 'react-icons/ai';
import { FaHardHat } from 'react-icons/fa';
import Select from 'react-select'; // For dropdown picker
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

interface CityOption {
  value: string;
  label: string;
}

interface JobCard {
  jobId: string;
  title: string;
  companyName: string;
  safetyRating: number;
  payRate: number;
  duration: string;
  city: string;
  description: string;
  equipmentProvided: string[];
  laborRights: string;
  street: string;
}

interface User {
  email: string;
  name: string;
  location: string;
  skills: string[];
  createdAt: Date;
  applicationStatus: 'applied' | 'in_progress' | 'completed' | 'rejected' | 'not_submitted';
}

const userData: User = {
  email: 'user@example.com',
  name: 'John Doe',
  location: 'cape_town',
  skills: ['Welding', 'Painting'],
  createdAt: new Date(),
  applicationStatus: 'not_submitted',
};

const Apply = () => {
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [jobData, setJobData] = useState<JobCard[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobCard[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    // Fetch city options
    fetch('/data/cities.json')
      .then(response => response.json())
      .then(data => setCityOptions(data))
      .catch(error => console.error('Error fetching city data:', error));

    // Fetch job data
    fetch('/data/jobs.json')
      .then(response => response.json())
      .then(data => {
        setJobData(data);
        setFilteredJobs(data); // Initialize with all jobs
      })
      .catch(error => console.error('Error fetching job data:', error));
  }, []);

  const handleCityChange = (newValue: CityOption | null) => {
    setSelectedCity(newValue);
    if (newValue) {
      setFilteredJobs(jobData.filter(job => job.city === newValue.value));
    } else {
      setFilteredJobs(jobData);
    }
  };

  const handleApplyClick = (job: JobCard) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleSubmitApplication = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success("Application submitted successfully!"); // Show success message
    setShowForm(false); // Hide the form
  };


  
  return (
    <div>
      {/* Section 0: Navigation Links */}
      <header className="bg-pink-900 text-white p-4 shadow-lg">
        <nav className="hidden md:flex justify-center space-x-6 text-md">
          <Link href="/" className="hover:text-yellow-400 transition duration-200 flex items-center">
            <AiOutlineHome className="mr-2" /> Home
          </Link>
          <Link href="/apply" className="text-yellow-400 transition duration-200 flex items-center">
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
        {/* <button onClick={() => signOut()}>Logout</button> */}
      </header>
      <section
        className="relative h-[35vh] bg-cover bg-center rounded-tl-[120px] rounded-tr-[0px] rounded-br-[120px] rounded-bl-[0px] overflow-hidden"
        style={{ backgroundImage: "url('/assets/rite.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Apply for a job/training opportunity.</h1>
          <p className="text-sm md:text-lg mb-4">Find the right job or trainer to boost your career.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Apply for Jobs or Training Programs</h1>

        {/* City Filter */}
        <div className="mb-4">
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Select a city"
            className="w-full"
          />
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div key={job.jobId} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">Company: {job.companyName}</p>
              <p className="text-gray-600">City: {job.city}</p>
              <p className="text-gray-600">Pay Rate: ${job.payRate} / day</p>
              <p className="text-gray-600">Duration: {job.duration}</p>
              <p className="text-gray-600">Description: {job.description}</p>
              <p className="text-gray-600">Equipment Provided: {job.equipmentProvided.join(', ')}</p>
              <div className="flex items-center">
                <p className="text-gray-600 mr-2">Safety Rating:</p>
                {[...Array(5)].map((_, index) => (
                  <FaHardHat
                    key={index}
                    className={`text-yellow-500 ${index < job.safetyRating ? 'fill-current' : 'text-gray-300'}`}
                    size={20}
                  />
                ))}
                <span className="ml-2 text-gray-600">{job.safetyRating}/5</span>
              </div>
              <button
                onClick={() => handleApplyClick(job)}
                className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {showForm && selectedJob && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Apply for {selectedJob.title}</h2>
              <form onSubmit={handleSubmitApplication}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                {/* Add other form fields as necessary */}
                <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-700">
                  Submit Application
                </button>
              </form>
              <button
                onClick={() => setShowForm(false)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </main>
    </div>
  );
};

export default Apply;
