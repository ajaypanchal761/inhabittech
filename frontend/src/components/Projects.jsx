import { Link } from 'react-router-dom'
import image1 from '../assets/images (1).jpeg'
import image2 from '../assets/images (2).jpeg'
import image3 from '../assets/images (3).jpeg'
import image4 from '../assets/images (4).jpeg'
import image5 from '../assets/images (5).jpeg'
import image6 from '../assets/images (6).jpeg'
import images from '../assets/images.jpeg'
import download from '../assets/download.jpeg'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'One Berkeley Street - Café',
      client: 'Crosstree Real Estate Partners LLP',
      category: 'Hospitality Technology',
      image: image1
    },
    {
      id: 2,
      title: 'Broadwick Soho',
      client: 'Broadwick Street Holdings Limited',
      category: 'Smart Hotel Solutions',
      image: image2
    },
    {
      id: 3,
      title: 'Birch Selsdon',
      client: 'Selsdon Estates Property Ltd',
      category: 'Property Management Tech',
      image: image3
    },
    {
      id: 4,
      title: 'The Sloane Club',
      client: 'Sloane Property Investment Limited',
      category: 'Club Management System',
      image: image4
    },
    {
      id: 5,
      title: 'The Cooden Beach Hotel',
      client: 'The Cooden Beach Hotel',
      category: 'Hotel Management Platform',
      image: image5
    },
    {
      id: 6,
      title: 'Hilton Garden Inn - Snowdonia',
      client: 'Snowdonia Hotel Limited',
      category: 'Hotel Tech Integration',
      image: image6
    },
    {
      id: 7,
      title: 'Hilton Garden Inn - Peterborough',
      client: 'RGB Plastering & Construction Limited',
      category: 'Construction Tech Solutions',
      image: images
    },
    {
      id: 8,
      title: 'Hoxton Shepherds Bush',
      client: 'The Hoxton Shepherds Bush',
      category: 'Boutique Hotel Tech',
      image: download
    },
    {
      id: 9,
      title: 'Hampton by Hilton Old Street',
      client: 'Westcombe Construction Limited',
      category: 'Hotel Development Tech',
      image: image1
    },
    {
      id: 10,
      title: 'The Hoxton Berlin',
      client: 'The Hoxton (Berlin) GmbH',
      category: 'International Hotel Tech',
      image: image2
    },
    {
      id: 11,
      title: 'The Hoxton Amsterdam',
      client: 'YCH Cooperatief UA',
      category: 'European Hotel Solutions',
      image: image3
    },
    {
      id: 12,
      title: 'The Hoxton Vienna',
      client: 'KNSA Hospitality Wien GmbH',
      category: 'Austrian Hotel Tech',
      image: image4
    },
    {
      id: 13,
      title: 'The Hoxton Edinburgh',
      client: 'Dragonglass UK Holding Ltd',
      category: 'Scottish Hotel Solutions',
      image: image5
    },
    {
      id: 14,
      title: 'The Hoxton Florence',
      client: 'CPM ITALY S.r.l',
      category: 'Italian Hotel Tech',
      image: image6
    },
    {
      id: 15,
      title: 'Student Accommodation - Bristol',
      client: 'The Portland Square Limited',
      category: 'Student Housing Tech',
      image: images
    },
    {
      id: 16,
      title: 'Residence Inn Manchester',
      client: 'Ciel Laystall Limited',
      category: 'Extended Stay Solutions',
      image: download
    }
  ]

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
            16 Projects Completed
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Image Container with Badge */}
              <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Completed Badge */}
                <div 
                  className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white text-xs font-medium"
                  style={{ backgroundColor: '#4ECDC4' }}
                >
                  Completed
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
                  <span className="text-sm font-medium" style={{ color: '#4ECDC4' }}>
                    Completed
                  </span>
                  <Link 
                    to={`/project/${project.id}`}
                    className="text-sm md:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1"
                  >
                    View Details <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

