import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineForm, AiOutlineExclamationCircle, AiOutlineWarning, AiOutlineUser } from 'react-icons/ai'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../src/app/globals.css';

const ReportIncident = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    images: [] as File[],
  });
  const [currentJob, setCurrentJob] = useState<any>(null);

  // Dummy user data for demonstration purposes
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '0789989876',
  };

  useEffect(() => {
    // Fetch current job data
    fetch('/data/currentJob.json')
      .then(response => response.json())
      .then(data => {
        // For demonstration, just use the first job from the list
        setCurrentJob(data[0]);
      })
      .catch(error => console.error('Error fetching job data:', error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData({ ...formData, images: fileArray });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to the backend
    console.log(formData);
    toast.success('Incident report submitted successfully!');
    setIsModalOpen(false);
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
          <Link href="/reportIncident" className="text-yellow-400 transition duration-200 flex items-center">
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
      </header>

      <section
        className="relative h-[35vh] bg-cover bg-center rounded-tl-[120px] rounded-tr-[0px] rounded-br-[120px] rounded-bl-[0px] overflow-hidden"
        style={{ backgroundImage: "url('/assets/law.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Something Happened?</h1>
          <p className="text-sm md:text-lg mb-4">Report any incident, injury, near miss. Prevention is as effective as protection.</p>
        </div>
      </section>

      <main className="mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Job Details Section */}
          <div className="flex-1 bg-white p-6 shadow rounded mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">Current Job / Training</h2>
            {/* Display job details */}
            {currentJob ? (
              <div className="bg-gray-100 p-4 rounded">
                <p><strong>Job Title:</strong> {currentJob.title}</p>
                <p><strong>Company:</strong> {currentJob.companyName}</p>
                <p><strong>Location:</strong> {currentJob.city}</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                >
                  Report an Incident
                </button>
              </div>
            ) : (
              <p>Loading job details...</p>
            )}
          </div>

          {/* Incident Report Form Section */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 shadow-lg rounded max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user.email}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={user.phone}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Incident Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Attach Images</label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleImageChange}
                      className="mt-1 block w-full"
                      multiple
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default ReportIncident;
