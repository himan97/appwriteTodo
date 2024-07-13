import React, { useState } from 'react';

const GitHubInfo = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchUserData(username);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-700">GitHub User Info</h1>
        <div className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                GitHub Username
              </label>
              <input
                className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter GitHub Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-amber-950 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Get Info
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {userData && (
            <div className="mt-4">
              <div className="flex justify-center">
                <img className="w-24 h-24 rounded-full" src={userData.avatar_url} alt={userData.login} />
              </div>
              <h2 className="text-center text-xl font-bold mt-2">{userData.name}</h2>
              <p className="text-center text-gray-700">{userData.bio}</p>
              <div className="mt-4">
                <p>
                  <strong>Username:</strong> {userData.login}
                </p>
                <p>
                  <strong>Public Repos:</strong> {userData.public_repos}
                </p>
                <p>
                  <strong>Followers:</strong> {userData.followers}
                </p>
                <p>
                  <strong>Following:</strong> {userData.following}
                </p>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubInfo;
