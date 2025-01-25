import React, { useState } from 'react';
import { Download, Instagram, Loader2, AlertCircle, Mail } from 'lucide-react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

type DownloadType = 'instagram-reel' | 'instagram-profile' | 'instagram-story';

interface InstagramResponse {
  data: {
    items: Array<{
      video_url?: string;
      thumbnail_url?: string;
      user: {
        profile_pic_url?: string;
        username?: string;
        full_name?: string;
      };
      media_type: number;
    }>;
  };
}

interface DownloadResponse {
  url: string;
  title?: string;
  thumbnail?: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [type, setType] = useState<DownloadType>('instagram-reel');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadData, setDownloadData] = useState<DownloadResponse | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDownloadData(null);

    try {
      // Extract username or media ID from URL
      const urlParts = url.split('/');
      const mediaId = urlParts[urlParts.length - 2]; // Get the ID from URL
      const username = urlParts[3]; // Get username from URL

      const options = {
        method: 'GET',
        url: 'https://instagram-scraper-api2.p.rapidapi.com/v1.2/search',
        params: {
          search_query: username
        },
        headers: {
          'x-rapidapi-key': '6dc7cd2ecbmsh0a6c68663666610p182e77jsn249a7181b0d2',
          'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
        }
      };

      const response = await axios.request<InstagramResponse>(options);
      console.log(response);
      if (!response.data || !response.data.data?.items?.length) {
        throw new Error('No content found');
      }

      const item = response.data.data.items[0];
      let downloadUrl = '';
      let thumbnailUrl = '';

      switch (type) {
        case 'instagram-profile':
          downloadUrl = item.user.profile_pic_url || '';
          thumbnailUrl = item.user.profile_pic_url || '';
          break;
        case 'instagram-reel':
          downloadUrl = item.video_url || '';
          thumbnailUrl = item.thumbnail_url || '';
          break;
        case 'instagram-story':
          // For stories, we might need a different endpoint
          downloadUrl = item.video_url || item.thumbnail_url || '';
          thumbnailUrl = item.thumbnail_url || '';
          break;
      }

      if (!downloadUrl) {
        throw new Error('Content not available for download');
      }

      setDownloadData({
        url: downloadUrl,
        title: item.user.username || username,
        thumbnail: thumbnailUrl
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process Instagram URL');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadData?.url) {
      window.open(downloadData.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar onContactClick={() => setShowContactForm(true)} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Download Instagram Content
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { 
                  id: 'instagram-reel', 
                  label: 'Instagram Reels', 
                  icon: Instagram,
                  colors: 'bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 hover:scale-105'
                },
                { 
                  id: 'instagram-profile', 
                  label: 'Profile Picture', 
                  icon: Instagram,
                  colors: 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 hover:scale-105'
                },
                { 
                  id: 'instagram-story', 
                  label: 'Instagram Story', 
                  icon: Instagram,
                  colors: 'bg-gradient-to-br from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105'
                }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setType(option.id as DownloadType)}
                  className={`p-4 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 shadow-md
                    ${type === option.id 
                      ? 'scale-105 ring-2 ring-white ring-opacity-50 ' + option.colors
                      : option.colors
                    }`}
                >
                  <option.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Instagram URL here..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                    text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-fuchsia-500 transition-all duration-300"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}

              {downloadData && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                  {downloadData.thumbnail && (
                    <img 
                      src={downloadData.thumbnail} 
                      alt={downloadData.title || 'Content thumbnail'} 
                      className="w-24 h-24 object-cover rounded-full mx-auto"
                    />
                  )}
                  {downloadData.title && (
                    <h3 className="text-gray-800 font-medium text-center">@{downloadData.title}</h3>
                  )}
                </div>
              )}

              <div className="flex justify-center">
                {!downloadData ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-xl 
                      font-medium text-white hover:from-fuchsia-700 hover:to-pink-700 
                      transition-all duration-300 disabled:opacity-50 flex items-center gap-2 
                      group shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 group-hover:animate-bounce" />
                        Analyze URL
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 
                      rounded-xl font-medium text-white hover:from-green-700 hover:to-emerald-700 
                      transition-all duration-300 flex items-center gap-2 shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download Now
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>

      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}

      <Footer />
    </div>
  );
}

export default App;