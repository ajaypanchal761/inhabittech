import { useEffect, useRef, useState } from 'react'

function OurImpact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const CountUp = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0)
    const countRef = useRef(0)

    useEffect(() => {
      if (!isVisible) return

      const startTime = Date.now()
      const startValue = 0

      const updateCount = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const current = Math.floor(startValue + (end - startValue) * easeOutQuart)

        setCount(current)

        if (progress < 1) {
          countRef.current = requestAnimationFrame(updateCount)
        } else {
          setCount(end)
        }
      }

      countRef.current = requestAnimationFrame(updateCount)

      return () => {
        if (countRef.current) {
          cancelAnimationFrame(countRef.current)
        }
      }
    }, [isVisible, end, duration])

    return <span>{count}{suffix}</span>
  }

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-24 bg-white overflow-x-hidden w-full"
      style={{
        background: 'linear-gradient(to right, #1A2B2B 0%, #2A4A4A 100%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-center mb-4 md:mb-6">
          <span style={{ color: '#4ECDC4' }}>Our</span>{' '}
          <span style={{ color: '#FF8C00' }}>Impact</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white text-center text-sm md:text-base lg:text-lg mb-8 md:mb-12 lg:mb-16 max-w-3xl mx-auto px-4">
          Delivering measurable results across the hospitality industry
        </p>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
          {/* Card 1 */}
          <div 
            className="rounded-2xl p-4 md:p-6 lg:p-8 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <div 
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 md:mb-3 lg:mb-4"
              style={{ color: '#4ECDC4' }}
            >
              <CountUp end={50} suffix="+" duration={2000} />
            </div>
            <p className="text-white text-sm md:text-base lg:text-lg font-normal">
              Global Hotels Connected
            </p>
          </div>

          {/* Card 2 */}
          <div 
            className="rounded-2xl p-4 md:p-6 lg:p-8 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <div 
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 md:mb-3 lg:mb-4"
              style={{ color: '#4ECDC4' }}
            >
              <CountUp end={15} suffix="+" duration={2000} />
            </div>
            <p className="text-white text-sm md:text-base lg:text-lg font-normal">
              Cities Served
            </p>
          </div>

          {/* Card 3 */}
          <div 
            className="rounded-2xl p-4 md:p-6 lg:p-8 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <div 
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-2 md:mb-3 lg:mb-4"
              style={{ color: '#4ECDC4' }}
            >
              <CountUp end={100} suffix="%" duration={2000} />
            </div>
            <p className="text-white text-sm md:text-base lg:text-lg font-normal">
              Client Satisfaction
            </p>
          </div>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div 
            className="rounded-xl p-4 md:p-6 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <p className="text-white text-sm md:text-base font-normal">
              Award-Winning Solutions
            </p>
          </div>

          <div 
            className="rounded-xl p-4 md:p-6 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <p className="text-white text-sm md:text-base font-normal">
              24/7 Technical Support
            </p>
          </div>

          <div 
            className="rounded-xl p-4 md:p-6 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <p className="text-white text-sm md:text-base font-normal">
              Zero Downtime Guarantee
            </p>
          </div>

          <div 
            className="rounded-xl p-4 md:p-6 text-center backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(60, 100, 100, 0.8)',
              border: '2px solid rgba(78, 205, 196, 0.5)',
            }}
          >
            <p className="text-white text-sm md:text-base font-normal">
              Future-Ready Technology
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurImpact

