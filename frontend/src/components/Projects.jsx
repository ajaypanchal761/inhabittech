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
      <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-text-gray">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }


  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-teal-50 overflow-x-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 md:mb-6" style={{ color: '#0d9488' }}>
          Our Projects
        </h2>
        
        {/* Description */}
        <p className="text-center text-gray-600 text-base md:text-lg max-w-3xl mx-auto px-4">
          Delivering cutting-edge hospitality technology solutions across the UK and Europe
        </p>
        
        {/* Projects Completed Button */}
        <div className="flex justify-center mt-4 md:mt-6">
          <button 
            className="px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-white text-sm md:text-base transition-colors duration-200 hover:opacity-90"
            style={{ backgroundColor: '#0d9488' }}
          >
            {projects.length} Projects Completed
          </button>
        </div>
        
        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-600 text-base md:text-lg">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8">
            {projects.map((project) => {
              const primaryImage = project.images && project.images.length > 0 
                ? project.images.find(img => img.isPrimary) || project.images[0]
                : null;
              
              return (
                <div 
                  key={project._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  {/* Image Container with Badge */}
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    {primaryImage ? (
                      <img 
                        src={primaryImage.url} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">No Image</p>
                      </div>
                    )}
                    {/* Completed Badge */}
                    <div 
                      className="absolute top-2 right-2 md:top-4 md:right-4 px-2 md:px-3 py-1 rounded-full bg-green-500 text-white text-xs md:text-sm font-medium"
                    >
                      {project.status === 'completed' ? 'Completed' : project.status || 'Completed'}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 md:p-5 lg:p-6 grow flex flex-col">
                    {/* Project Title */}
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    {/* Client Name */}
                    <p className="text-xs md:text-sm lg:text-base font-semibold mb-2" style={{ color: '#0d9488' }}>
                      {project.client}
                    </p>
                    
                    {/* Category */}
                    <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4 grow line-clamp-2">
                      {project.category?.title || project.category || 'N/A'}
                    </p>
                    
                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-2 gap-2">
                      <span className="text-xs md:text-sm font-medium capitalize" style={{ color: '#16a34a' }}>
                        {project.status || 'Completed'}
                      </span>
                      <Link 
                        to={`/project/${project._id}`}
                        className="text-xs md:text-sm font-medium cursor-pointer transition-colors duration-200 flex items-center gap-1 text-teal-600 hover:text-teal-800 flex-shrink-0"
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

