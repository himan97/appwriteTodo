import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"; // Import react-icons

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; 2024 Notebook. All rights reserved.</p>
        </div>
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="flex items-center justify-center md:justify-end space-x-4">
            <span>Follow us:</span>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
