import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AddContext } from '../../context/AddContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AddContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Students Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-20 border-r min-h-screen bg-white border-gray-300 py-4 flex flex-col items-center shadow-sm">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full py-4 gap-2 transition-all duration-200
              ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500' : 'text-gray-600 hover:bg-gray-100'}`
            }
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="md:block hidden text-sm font-medium">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
