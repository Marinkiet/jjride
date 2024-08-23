'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import '../../src/app/globals.css';
import { AiOutlineHome, AiOutlineForm, AiOutlineExclamationCircle, AiOutlineWarning, AiOutlineUser } from 'react-icons/ai'; 

const ReportHazard = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    description: '',
    images: [] as File[],
  });

  const [hazards, setHazards] = useState<any[]>([]);
  const [filteredHazards, setFilteredHazards] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('Benoni');

  useEffect(() => {
    // Fetch hazards from hazards.json
    fetch('/data/hazards.json')
      .then(response => response.json())
      .then(data => {
        setHazards(data);
        setFilteredHazards(data.filter((hazard: any) => hazard.location === 'Benoni'));
      })
      .catch(error => console.error('Error fetching hazards:', error));
  }, []);

  useEffect(() => {
    // Filter hazards based on selected city
    setFilteredHazards(hazards.filter((hazard: any) => hazard.location === selectedCity));
  }, [selectedCity, hazards]);

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
    setHazards([
      ...hazards,
      {
        id: Date.now(), // Unique ID for new hazards
        ...formData,
        status: 'Pending',
        location: selectedCity, // Set the location to the currently selected city
      },
    ]);
    toast.success('Hazard reported successfully!');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      description: '',
      images: [],
    });
  };

  const handleStillThere = (id: number, answer: string) => {
    setHazards(hazards.filter(hazard => hazard.id !== id));
    toast.success('Thanks for answering!');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <ToastContainer />
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
          <Link href="/reportHazard" className="text-yellow-400 transition duration-200 flex items-center">
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
        style={{ backgroundImage: "url('/assets/work.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Report a Hazard</h1>
          <p className="text-sm md:text-lg mb-4">Help us keep the workplace safe by reporting hazards you encounter.</p>
        </div>
      </section>

      <main className="mt-8">
        <section className="mt-8 p-6 mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">Reported Hazards</h2>
          <div className="mb-4">
            <label htmlFor="city" className="block font-bold mb-2">Select City</label>
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {/* Options can be dynamically generated from the cities JSON */}
              <option value="Benoni">Benoni</option>
              <option value="Germiston">Germiston</option>
              <option value="Sandton">Sandton</option>
              <option value="Roodepoort">Roodepoort</option>
              <option value="Brakpan">Brakpan</option>
              <option value="Middelburg">Middelburg</option>
              <option value="Emalahleni">Emalahleni</option>
              <option value="Pietermaritzburg">Pietermaritzburg</option>
              <option value="Nelspruit">Nelspruit</option>
              <option value="Klerksdorp">Klerksdorp</option>
              <option value="Uthungulu">Uthungulu</option>
              <option value="Richards Bay">Richards Bay</option>
              <option value="Cape Town">Cape Town</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHazards.map(hazard => (
              <div key={hazard.id} className="bg-white p-4 shadow rounded">
                <p className="text-md mb-4 font-bold">{hazard.description}</p>
                <p className="text-sm mb-2"><strong>Company:</strong> {hazard.companyName}</p>
                <p className="text-sm mb-2"><strong>Location:</strong> {hazard.location}</p>
                <p className="text-sm mb-4"><strong>Status:</strong> {hazard.status}</p>
                <div className="mt-4">
                  <p className="font-semibold mb-2 mt-10 flex">Is it still there?</p>
                  <button
                    onClick={() => handleStillThere(hazard.id, 'yes')}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 mr-2 w-20"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleStillThere(hazard.id, 'no')}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-20 "
                  >
                    No
                  </button>
                  {hazard.stillThere && (
                    <p className="text-red-600 mt-2">Marked as still present.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center mb-4">Report a New Hazard</h2>
          <form onSubmit={handleSubmit} className="mx-auto bg-white p-10 shadow rounded">
            <div className="mb-4">
              <label htmlFor="fullName" className="block font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="companyName" className="block font-bold mb-2">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">
                Hazard Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="images" className="block font-bold mb-2">Upload Images (optional)</label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
            >
              Submit Hazard Report
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ReportHazard;
