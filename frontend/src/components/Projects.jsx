import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectAPI } from '../services/api'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAllProjects(true)
      if (response.data && response.data.projects) {
        setProjects(response.data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="projects" className="pt-16 md:pt-24 pb-8 md:pb-10 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-text-gray">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section id="projects" className="pt-16 md:pt-24 pb-8 md:pb-10 bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4" style={{ color: '#2A7F7F' }}>
          Our Projects
        </h2>
        
        {/* Description */}
        <p className="text-center text-gray-600 mb-8 md:mb-10 text-base md:text-lg max-w-3xl mx-auto">
          Delivering cutting-edge hospitality technology solutions across the UK and Europe
        </p>
        
        {/* Projects Completed Button */}
        <div className="flex justify-center mb-12 md:mb-16">
          <button 
            className="px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium text-white text-sm md:text-base transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#2A7F7F' }}
          >
            {projects.length} Projects Completed
          </button>
        </div>
        
        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-gray text-lg">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {projects.map((project) => {
              const primaryImage = project.images && project.images.length > 0 
                ? project.images.find(img => img.isPrimary) || project.images[0]
                : null;
              
              return (
                <div 
                  key={project._id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                >
                  {/* Image Container with Badge */}
                  <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-lg">
                    {primaryImage ? (
                      <img 
                        src={primaryImage.url} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-400">No Image</p>
                      </div>
                    )}
                    {/* Completed Badge */}
                    <div 
                      className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white text-xs font-medium"
                      style={{ backgroundColor: '#4ECDC4' }}
                    >
                      {project.status === 'completed' ? 'Completed' : project.status}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 md:p-5 flex-grow flex flex-col">
                    {/* Project Title */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    
                    {/* Client Name */}
                    <p className="text-sm md:text-base mb-2" style={{ color: '#2A7F7F' }}>
                      {project.client}
                    </p>
                    
                    {/* Category */}
                    <p className="text-sm md:text-base text-gray-600 mb-4 flex-grow">
                      {project.category}
                    </p>
                    
                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium capitalize" style={{ color: '#4ECDC4' }}>
                        {project.status || 'Completed'}
                      </span>
                      <Link 
                        to={`/project/${project._id}`}
                        className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                      >
                        View Details <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects

