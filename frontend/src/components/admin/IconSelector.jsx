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

function IconSelector({ onIconSelect, existingIconUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(existingIconUrl || null);
  const [selectedIconName, setSelectedIconName] = useState(null);

  // Convert Material Icon to PNG by rendering Material Symbol to canvas
  const iconToPNG = async (iconName) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a temporary div with Material Symbol to render
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = '-9999px';
      div.style.top = '-9999px';
      div.style.width = '200px';
      div.style.height = '200px';
      div.style.backgroundColor = 'transparent';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'center';

      const span = document.createElement('span');
      span.className = 'material-symbols-outlined';
      span.textContent = iconName;
      span.style.fontSize = '120px';
      span.style.color = '#2A7F7F'; // Use primary color for icon
      div.appendChild(span);
      document.body.appendChild(div);

      // Wait for font to load and element to render
      setTimeout(() => {
        try {
          // Render the Material Symbol character with primary color
          ctx.fillStyle = '#2A7F7F'; // Primary color for icon
          ctx.font = '120px "Material Symbols Outlined"';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Draw the icon character (Material Symbols use icon name as character)
          ctx.fillText(iconName, canvas.width / 2, canvas.height / 2);

          // Clean up
          document.body.removeChild(div);

          // Convert to PNG with transparency
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], `${iconName}.png`, { type: 'image/png' });
              resolve(file);
            } else {
              reject(new Error('Failed to convert icon to PNG'));
            }
          }, 'image/png');
        } catch {
          // Fallback: create icon with primary color, no background
          document.body.removeChild(div);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#2A7F7F'; // Primary color for icon
          ctx.font = 'bold 60px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(iconName.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);

          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], `${iconName}.png`, { type: 'image/png' });
              resolve(file);
            } else {
              reject(new Error('Failed to convert icon to PNG'));
            }
          }, 'image/png');
        }
      }, 200); // Wait 200ms for font to load
    });
  };

  // Handle icon selection
  const handleIconSelect = async (icon) => {
    try {
      // Convert icon to PNG
      const pngFile = await iconToPNG(icon.name);

      // Create preview URL
      const preview = URL.createObjectURL(pngFile);

      setPreviewUrl(preview);
      setSelectedIconName(icon.name);

      // Pass icon file and name to parent
      onIconSelect(icon.name, pngFile);
      setIsOpen(false);
    } catch (error) {
      console.error('Error converting icon:', error);
      alert('Failed to process icon: ' + error.message);
    }
  };

  // Handle icon removal
  const handleRemove = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedIconName(null);
    onIconSelect(null, null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-dark mb-2">
        Icon <span className="text-red-500">*</span>
      </label>

      {/* Selected Icon Preview */}
      {(selectedIconName || previewUrl) && (
        <div className="mb-4 p-4 border border-border-gray rounded-lg bg-bg-light">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-lg">
              {previewUrl ? (
                <img src={previewUrl} alt="Selected icon" className="w-12 h-12 object-contain" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-primary">
                  {selectedIconName}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-dark">
                Selected: {serviceIcons.find(icon => icon.name === selectedIconName)?.label || selectedIconName}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
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
          className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white hover:bg-bg-light transition-colors flex items-center justify-between"
        >
          <span className="text-text-dark">
            {(selectedIconName || previewUrl) ? `Icon: ${serviceIcons.find(icon => icon.name === selectedIconName)?.label || selectedIconName}` : 'Select an Icon'}
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
                      className={`p-3 rounded-lg border-2 transition-all hover:bg-bg-light hover:scale-105 ${selectedIconName === icon.name
                        ? 'border-primary bg-primary/10'
                        : 'border-border-gray'
                        } cursor-pointer`}
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
        Select an icon from the list. The icon will be converted to PNG and uploaded with the service.
      </p>
    </div>
  );
}

export default IconSelector;

