import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { consultationAPI } from '../../services/api';
import AdminSidebar from './AdminSidebar';
import { useAdmin } from '../../context/AdminContext';

function AdminConsultations() {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    fetchConsultations();
  }, [statusFilter]);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await consultationAPI.getAllConsultations(statusFilter);
      if (response.data && response.data.consultations) {
        setConsultations(response.data.consultations);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
      alert('Error loading consultations: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation request? This action cannot be undone.')) {
      try {
        await consultationAPI.deleteConsultation(id);
        alert('Consultation deleted successfully!');
        fetchConsultations(); // Refresh list
      } catch (error) {
        alert('Error deleting consultation: ' + error.message);
      }
    }
  };

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setNotes(consultation.notes || '');
    setStatus(consultation.status);
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedConsultation) return;

    try {
      await consultationAPI.updateConsultation(selectedConsultation._id, {
        status,
        notes,
      });
      alert('Consultation updated successfully!');
      setShowModal(false);
      fetchConsultations(); // Refresh list
    } catch (error) {
      alert('Error updating consultation: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-bg-light flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-border-light sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-bg-light rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-primary">Consultations</h1>
                  <p className="text-sm text-text-gray">Manage consultation requests</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Status Filter */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter(null)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                statusFilter === null
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-gray hover:bg-bg-light'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                statusFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-text-gray hover:bg-bg-light'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('contacted')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                statusFilter === 'contacted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-text-gray hover:bg-bg-light'
              }`}
            >
              Contacted
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                statusFilter === 'in_progress'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-text-gray hover:bg-bg-light'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                statusFilter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-text-gray hover:bg-bg-light'
              }`}
            >
              Completed
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-text-gray">Loading consultations...</p>
            </div>
          ) : consultations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md p-8">
              <p className="text-text-gray text-lg mb-4">No consultation requests found</p>
              <p className="text-text-gray text-sm">Consultation requests will appear here when users submit the contact form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {consultations.map((consultation) => (
                <div
                  key={consultation._id}
                  className="bg-white rounded-xl shadow-md p-6 border border-border-light hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-text-dark">{consultation.fullName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
                          {consultation.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-text-gray mb-1">
                        <span className="font-medium">Email:</span> {consultation.email}
                      </p>
                      {consultation.company && (
                        <p className="text-sm text-text-gray mb-1">
                          <span className="font-medium">Company:</span> {consultation.company}
                        </p>
                      )}
                      {consultation.phone && (
                        <p className="text-sm text-text-gray mb-1">
                          <span className="font-medium">Phone:</span> {consultation.phone}
                        </p>
                      )}
                      {consultation.consultationInterest && (
                        <p className="text-sm text-text-gray mb-1">
                          <span className="font-medium">Interest:</span> {consultation.consultationInterest.title || 'N/A'}
                        </p>
                      )}
                      <p className="text-sm text-text-gray mb-1">
                        <span className="font-medium">Submitted:</span> {formatDate(consultation.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(consultation)}
                        className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(consultation._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-border-light pt-4">
                    <p className="text-sm text-text-dark">
                      <span className="font-medium">Message:</span> {consultation.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal for viewing/editing consultation */}
      {showModal && selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Consultation Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-bg-light rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-text-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
                  <p className="text-text-gray">{selectedConsultation.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Email</label>
                  <p className="text-text-gray">{selectedConsultation.email}</p>
                </div>
                {selectedConsultation.company && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Company</label>
                    <p className="text-text-gray">{selectedConsultation.company}</p>
                  </div>
                )}
                {selectedConsultation.phone && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Phone</label>
                    <p className="text-text-gray">{selectedConsultation.phone}</p>
                  </div>
                )}
                {selectedConsultation.consultationInterest && (
                  <div>
                    <label className="block text-sm font-medium text-text-dark mb-1">Consultation Interest</label>
                    <p className="text-text-gray">{selectedConsultation.consultationInterest.title || 'N/A'}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Message</label>
                  <p className="text-text-gray whitespace-pre-wrap">{selectedConsultation.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Submitted</label>
                  <p className="text-text-gray">{formatDate(selectedConsultation.createdAt)}</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-border-light pt-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Add notes about this consultation..."
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleUpdateStatus}
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors font-medium"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-text-dark rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminConsultations;

