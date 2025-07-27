"use client";
import React, { useState } from "react";
import { useGetNotesQuery ,usePostNotesMutation ,useDeleteNoteMutation ,useUpDateNoteMutation ,useGetSummaryQuery} from "./service";
type FormData = {
  name: string;
  age: string;
  gender: string;
  hobby: string[];
  email: string;
  jobType: string;
};

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    hobby: [],
    email: "",
    jobType: "",
  });

  const { data, isLoading:loading1, error  ,refetch } = useGetNotesQuery(null);
  const [postNotes, { isLoading, isError, isSuccess }] = usePostNotesMutation();
  const {data:getSummary ,refetch:summaryFetch }=useGetSummaryQuery(null)
  const [deleteNoted]=useDeleteNoteMutation()
 console.log(getSummary)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedHobbies = checked
        ? [...prev.hobby, value]
        : prev.hobby.filter((h) => h !== value);
      return { ...prev, hobby: updatedHobbies };
    });
  };

  const handleSubmit = async() => {
    console.log("Form submitted:", formData);
    const payload=formData
        const result = await postNotes(payload).unwrap();
        console.log(result)
     if(result.success){
      refetch();
      summaryFetch()

     }


    // setFormData({
    //   name: "",
    //   age: "",
    //   gender: "",
    //   hobby: [],
    //   email: "",
    //   jobType: "",
    // });
  };
const handleDelete=async (id:string)=>{
  const res=await deleteNoted(id).unwrap()
  if(res.success){
    refetch()
  }


}
const handleUpdate=(id:string)=>{

}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-black text-center mb-8">
            Personal Information Form
          </h2>

          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>

            {/* Age and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 text-black  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  placeholder="Your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 text-black  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-black mb-4">
                Gender
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-black">Female</span>
                </label>
              </div>
            </div>

            {/* Hobbies Selection */}
            <div>
              <label className="block text-sm font-medium text-black mb-4">
                Hobbies
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: "reading", label: "Reading" },
                  { value: "traveling", label: "Traveling" },
                  { value: "gaming", label: "Gaming" },
                ].map((hobby) => (
                  <label
                    key={hobby.value}
                    className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <input
                      type="checkbox"
                      value={hobby.value}
                      checked={formData.hobby.includes(hobby.value)}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-black">{hobby.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type Selection */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 text-black  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-white"
              >
                <option value="">Select job type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Submit Form
              </button>
            </div>
          </div>
        </div>

       
      </div>
       <div className="overflow-x-auto mt-20">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Job Type</th>
                <th className="py-3 px-4 text-left">Hobby</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Updated At</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.length>0 && data?.data?.map((item:any)=> <tr key={item._id} className="border-t text-black">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.age}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4 capitalize">{item.gender}</td>
                <td className="py-2 px-4 capitalize">{item.jobType}</td>
                <td className="py-2 px-4">{item.hobby.join(", ")}</td>
                <td className="py-2 px-4">{item.createdAt.split("T")[0]}</td>
                <td className="py-2 px-4">{item.updatedAt.split("T")[0]}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                  onClick={()=>handleUpdate(item._id)}
                  
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                   onClick={()=>handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>)}
             
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default Form;
