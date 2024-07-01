import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center text-2xl font-bold mb-4">About Todo App</h1>
          <p className="text-gray-700 mb-4">
            This Todo application allows you to manage your daily tasks efficiently. You can add new tasks, mark them as completed, and remove tasks once they are done. This app helps you keep track of your to-do list and ensures you stay organized throughout the day.
          </p>
          <p className="text-gray-700">
            Built with ReactJS and styled using Tailwind CSS, this application showcases a simple yet powerful way to manage your tasks. We hope you find this app useful and it helps boost your productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
