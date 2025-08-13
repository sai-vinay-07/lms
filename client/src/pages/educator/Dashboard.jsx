import React, { useContext, useEffect, useState } from 'react';
import { AddContext } from '../../context/AddContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading'; // ✅ Fixed import

const Dashboard = () => {
  const { currency } = useContext(AddContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    // In real use: fetch from API
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []); // ✅ Added dependency array so it runs only once

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start gap-8 md:p-8 p-4">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">

          {/* Total Enrollments */}
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="students" className="w-10 h-10 object-contain" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-medium text-gray-600 leading-tight">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm text-gray-500 leading-snug">Total Enrollments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="courses" className="w-10 h-10 object-contain" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-medium text-gray-600 leading-tight">
                {dashboardData.totalCourses}
              </p>
              <p className="text-sm text-gray-500 leading-snug">Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="earnings" className="w-10 h-10 object-contain" />
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-medium text-gray-600 leading-tight">
                {currency} {dashboardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500 leading-snug">Total Earnings</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className='pd-4 text-lg font-medium'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='table-fixed md:table-auto w-full overflow-hidden'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
              <th className='px4 py-3 font-semibold text-center hidden sm:table-cell'>S.no</th>
              <th className='px4 py3 font-semibold'>Student Name</th>
              <th className='px4 py3 font-semibold'>Course Title</th>
          </tr>
          </thead>
          <tbody className='text-sm text-gray-500'>
            {dashboardData.enrolledStudentsData.map((item,index) => (
               <tr key={index} className='border-b border-gray-500/20' >
                <td className='px-4 py-3 text-center hidden sm:table-cell' >
                  {index+1}</td>
                  <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                    <img src={item.student.imageUrl} alt="Profile" className='w-9 h-9 rounded-full' />
                    <span className='truncate'>{item.student.name}</span>
                  </td>
                  <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
               </tr>
            ))}

          </tbody>
          </table>

          </div>
        </div>
      </div>
    </div>
    
  ) : (
    <Loading /> // ✅ Now this works
  );
};

export default Dashboard;
