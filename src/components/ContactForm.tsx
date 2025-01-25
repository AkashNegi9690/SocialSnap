import React, { useState } from 'react';
import { X, Send, Mail } from 'lucide-react';

interface ContactFormProps {
  onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open default mail client with pre-filled email
    const mailtoLink = `mailto:akashnegi9690@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-fuchsia-500" />
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                focus:ring-fuchsia-500 focus:border-transparent transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                focus:ring-fuchsia-500 focus:border-transparent transition-all duration-300"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 
                focus:ring-fuchsia-500 focus:border-transparent transition-all duration-300"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 
              transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}