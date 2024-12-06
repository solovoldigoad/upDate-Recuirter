import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/popUp"; // Import the Modal component
import NavBar from "../LandingPage/NavBar";

const JobProfileSection = () => {
  const [name, setName] = useState("User Name");
  const [email, setEmail] = useState("user@example.com");
  const [skills, setSkills] = useState(["JavaScript", "React"]);
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educations, setEducations] = useState([
    {
      degree: "Bachelors in Computer Science",
      school: "University of XYZ",
      year: "2018-2022",
    },
    {
      degree: "Masters in Web Development",
      school: "University of ABC",
      year: "2023-Present",
    },
  ]);
  const [experiences, setExperiences] = useState([
    {
      position: "Frontend Developer",
      company: "Company XYZ",
      year: "2022-2023",
      description: "Developed user interfaces using React.",
    },
    {
      position: "Web Developer",
      company: "Company ABC",
      year: "2023-Present",
      description: "Building responsive websites and applications.",
    },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/Profile`,
        { withCredentials: true }
      );
      const { name, email, skills, ProfileURL, BgURL, education, experiences } =
        response.data;
      setName(name);
      setEmail(email);
      setSkills(skills);
      setProfileImage(ProfileURL);
      setBackgroundImage(BgURL);
      setEducation(education);
      setExperiences(experiences);
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const updatedData = {
        name,
        skills,
        ProfileURL: profileImage,
        BgURL: backgroundImage,
      };

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/Profile/edit`,
        updatedData,
        { withCredentials: true }
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleEducationEditApi=async()=>{
const res=await axios.post()
  }

  return (
    <>
      <NavBar Logout={true} />
      <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-6">
        <div className="w-full h-[100%] mt-[10%] max-w-6xl bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Background Image */}
          <div className="relative">
            <img
              src={backgroundImage || "https://via.placeholder.com/600x200"}
              alt="Background"
              className="w-full h-40 object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col items-center -mt-16">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white z-10 shadow-lg object-cover"
            />
            <h2 className="text-2xl font-bold mt-4">{name}</h2>
            <p className="text-gray-600">{email}</p>

            {/* Skills Section */}
            <div className="mt-4">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-blue-500 hover:underline"
            >
              Edit Profile
            </button>
          </div>

          {/* 3-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-4">
            {/* First Column: Profile */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Profile</h3>
              <div className="mt-4">
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium">Skills</h4>
                  <ul className="list-disc pl-5 text-gray-700 mt-2">
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Second Column: Education */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold">Education</h3>
                <h3 onClick={handleEducationEditApi} className="text-sm cursor-pointer rounded-full p-1 hover:underline hover:scale-105 font-semibold">
                  Edit
                </h3>
              </div>

              <div className="mt-4">
                {educations &&
                  educations.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-gray-600">
                        {edu.school} - {edu.year}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Third Column: Job Experience */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Experience</h3>
              <div className="mt-4">
                {experiences &&
                  experiences.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium">{exp.position}</p>
                      <p className="text-gray-600">
                        {exp.company} - {exp.year}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Modal Component */}

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            name={name}
            setName={setName}
            skills={skills}
            setSkills={setSkills}
            setProfileImage={setProfileImage}
            setBackgroundImage={setBackgroundImage}
          />
        </div>
      </div>
    </>
  );
};

export default JobProfileSection;
