import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"; // Import react-icons

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 Notebook. All rights reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <p className="flex items-center justify-center md:justify-end space-x-4">
            <span>Follow us:</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-200 transition-colors duration-200"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;