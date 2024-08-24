import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 md:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-xl px-6 py-4 md:px-8 md:pt-6 md:pb-8 mb-4">
          <h1 className="text-center text-xl md:text-2xl font-bold mb-4 text-blue-500">About Todo App</h1>
          <p className="text-gray-700 mb-4 text-sm md:text-base">
            This Todo application allows you to manage your daily tasks efficiently. You can add new tasks, mark them as completed, and remove tasks once they are done. This app helps you keep track of your to-do list and ensures you stay organized throughout the day.
          </p>
          <p className="text-gray-700 text-sm md:text-base">
            Built with ReactJS and styled using Tailwind CSS, this application showcases a simple yet powerful way to manage your tasks. We hope you find this app useful and it helps boost your productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;