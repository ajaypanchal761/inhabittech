import { useState } from 'react';

// Service-related Material Icons (10-20 icons)
const serviceIcons = [
  { name: 'settings', label: 'Settings' },
  { name: 'cloud', label: 'Cloud' },
  { name: 'wifi', label: 'Wi-Fi' },
  { name: 'security', label: 'Security' },
  { name: 'storage', label: 'Storage' },
  { name: 'devices', label: 'Devices' },
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'analytics', label: 'Analytics' },
  { name: 'integration_instructions', label: 'Integration' },
  { name: 'support', label: 'Support' },
  { name: 'sync', label: 'Sync' },
  { name: 'backup', label: 'Backup' },
  { name: 'network_check', label: 'Network' },
  { name: 'speed', label: 'Speed' },
  { name: 'verified', label: 'Verified' },
  { name: 'shield', label: 'Shield' },
  { name: 'lock', label: 'Lock' },
  { name: 'vpn_key', label: 'VPN Key' },
  { name: 'router', label: 'Router' },
  { name: 'server', label: 'Server' },
];

function IconSelector({ selectedIcon, onIconSelect, existingIconUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existingIconUrl || null);

  // Convert Material Icon to SVG
  const iconToSVG = (icon) => {
    // Create SVG for Material Icon using the SVG path
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">${icon.svg}</svg>`;
    return svg;
  };

  // Convert SVG string to Blob
  const svgToBlob = (svgString) => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return blob;
  };

  // Handle icon selection
  const handleIconSelect = async (icon) => {
    try {
      setUploading(true);
      
      // Convert icon to SVG
      const svgString = iconToSVG(icon);
      
      // Convert SVG to File for upload
      const blob = svgToBlob(svgString);
      const file = new File([blob], `${icon.name}.svg`, { type: 'image/svg+xml' });
      
      // Upload to Cloudinary via backend
      const formData = new FormData();
      formData.append('icon', file);
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/services/upload-icon', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload icon');
      }
      
      const data = await response.json();
      
      if (data.success && data.data && data.data.icon) {
        const iconUrl = data.data.icon.url;
        const iconPublicId = data.data.icon.publicId;
        setPreviewUrl(iconUrl);
        onIconSelect(icon.name, iconUrl, iconPublicId);
        setIsOpen(false);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error uploading icon:', error);
      alert('Failed to upload icon: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-dark mb-2">
        Icon <span className="text-red-500">*</span>
      </label>
      
      {/* Selected Icon Preview */}
      {(selectedIcon || previewUrl) && (
        <div className="mb-4 p-4 border border-border-gray rounded-lg bg-bg-light">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-lg">
              {previewUrl ? (
                <img src={previewUrl} alt="Selected icon" className="w-12 h-12 object-contain" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary">
                  {selectedIcon.name || selectedIcon}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-dark">
                Selected: {typeof selectedIcon === 'string' ? serviceIcons.find(icon => icon.name === selectedIcon)?.label : selectedIcon.label || selectedIcon.name}
              </p>
              {previewUrl && (
                <p className="text-xs text-text-gray mt-1 break-all">
                  {previewUrl}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                onIconSelect(null, null, null);
                setPreviewUrl(null);
              }}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Icon Selector Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={uploading}
          className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white hover:bg-bg-light transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="text-text-dark">
            {uploading ? 'Uploading...' : (selectedIcon || previewUrl) ? `Icon: ${typeof selectedIcon === 'string' ? serviceIcons.find(icon => icon.name === selectedIcon)?.label || selectedIcon : 'Selected'}` : 'Select an Icon'}
          </span>
          <svg
            className={`w-5 h-5 text-text-gray transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Icon Grid Dropdown */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 mt-2 w-full bg-white border border-border-gray rounded-lg shadow-lg max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                  {serviceIcons.map((icon) => (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => handleIconSelect(icon)}
                      disabled={uploading}
                      className={`p-3 rounded-lg border-2 transition-all hover:bg-bg-light hover:scale-105 ${
                        (typeof selectedIcon === 'string' ? selectedIcon === icon.name : selectedIcon?.name === icon.name)
                          ? 'border-primary bg-primary/10'
                          : 'border-border-gray'
                      } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      title={icon.label}
                    >
                      <span className="material-symbols-outlined text-3xl text-primary block text-center">
                        {icon.name}
                      </span>
                      <p className="text-xs text-text-gray mt-1 text-center truncate">
                        {icon.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <p className="text-xs text-text-gray mt-2">
        Select an icon from the list. The icon will be uploaded to Cloudinary automatically.
      </p>
    </div>
  );
}

export default IconSelector;

