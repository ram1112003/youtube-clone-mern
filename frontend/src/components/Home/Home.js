import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Sidebar from '../Sidebar/Sidebar';
import VideoGrid from '../VideoGrid/VideoGrid';
import { videoAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async (search = '', category = '') => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const response = await videoAPI.getAllVideos(params);
      if (response.data.success) {
        setVideos(response.data.data.videos);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    await loadVideos(query);
  };

  const handleVideoSelect = (video) => {
    navigate(`/video/${video._id}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
    loadVideos(); // Reload videos when logo is clicked
  };

  return (
    <div className="home">
      <Header 
        onSearch={handleSearch} 
        onMenuClick={toggleSidebar}
        onLogoClick={handleLogoClick}
        showAuthButtons={!isAuthenticated}
      />
      <NavBar />
      <div className="app-content">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <VideoGrid 
            videos={videos} 
            loading={loading}
            onVideoSelect={handleVideoSelect}
            searchQuery={searchQuery}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
