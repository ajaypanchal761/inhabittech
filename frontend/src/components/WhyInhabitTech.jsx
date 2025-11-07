import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function WhyInhabitTech() {
  const strengths = [
    {
      title: 'Hospitality Specialists',
      description: 'Decades of experience delivering technology in guest-focused environments across hotels, resorts, and mixed-use developments.'
    },
    {
      title: 'Independent & Vendor-Neutral',
      description: 'We recommend the right solutions for your portfolio—never tied to a single brand or platform.'
    },
    {
      title: 'Proven Delivery',
      description: 'Trusted partner for boutique transformations and large-scale developments with disciplined, transparent project leadership.'
    },
    {
      title: 'Future-Focused Design',
      description: 'Scalable, sustainable systems engineered for long-term performance and guest expectations of tomorrow.'
    }
  ]

  const valuePillars = [
    {
      heading: 'Strategy to Activation',
      body: 'We align stakeholders, budgets, and guest ambitions early—converting ideas into phased roadmaps and actionable blueprints.'
    },
    {
      heading: 'Integrated Delivery',
      body: 'Program managers, engineers, and site leads operate as one team to minimise disruption and accelerate opening timelines.'
    },
    {
      heading: 'Operational Uplift',
      body: 'Training, analytics, and managed services extend the impact of every rollout long after go-live.'
    }
  ]

  const systems = [
    'Wi-Fi & Network Infrastructure',
    'Television & IPTV Systems',
    'Telephone & VoIP Solutions',
    'CCTV & Security Systems',
    'Audio-Visual (AV) Systems',
    'Property Management Systems (PMS)',
    'Point of Sale (POS) & Payment Systems',
    'Customer Relationship Management (CRM) Platforms',
    'Server Infrastructure & Data Systems',
    'PDQs & Payment Devices',
    'General IT Equipment & Infrastructure'
  ]

  const proof = [
    { stat: '65+', label: 'Technology programs delivered across UK, Europe, and the Middle East' },
    { stat: '98%', label: 'Client retention powered by measurable ROI and transparent governance' },
    { stat: '12m+', label: 'Square feet of hospitality real estate under our technology oversight' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20"
        style={{ background: 'linear-gradient(135deg, #0D4A3A 0%, #1E6F5C 55%, #10918B 100%)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-white">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm md:text-base font-medium px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm md:text-base font-medium bg-white/20">
              Why Inhabit Tech
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Your Partner for Intelligent Hospitality Technology
            </h1>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/85">
              We bring together strategic consultancy, engineering rigour, and operational empathy so every property delivers
              frictionless guest journeys and resilient back-of-house performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-12">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="bg-white/10 border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#4ECDC4' }}>
                  <svg className="w-6 h-6 text-[#0D4A3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-white/85">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <section className="py-14 md:py-18 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {proof.map((item) => (
              <div key={item.stat} className="text-center p-8 rounded-2xl border border-gray-200 shadow-sm">
                <span className="block text-4xl md:text-5xl font-extrabold" style={{ color: '#0D4A3A' }}>
                  {item.stat}
                </span>
                <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems We Manage */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide" style={{ backgroundColor: '#E0F7F5', color: '#0D4A3A' }}>
                Systems We Manage
              </span>
              <h2
                className="inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-6 px-4 py-2 rounded-2xl"
                style={{ color: '#0D4A3A', background: 'linear-gradient(120deg, rgba(78,205,196,0.25), rgba(13,74,58,0.1))' }}
              >
                Integrated Technology Ecosystems
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                Our team has extensive experience in overseeing, coordinating, and integrating a wide range of technology
                systems across projects of all sizes, ensuring every asset is aligned to operational and guest priorities.
              </p>
            </div>
            <div className="bg-[#F4FBFA] rounded-3xl border border-[#D1F3EF] p-6 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {systems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: '#4ECDC4' }} />
                    <span className="text-sm md:text-base leading-relaxed" style={{ color: '#1F2937' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm md:text-base leading-relaxed" style={{ color: '#4B5563' }}>
                By managing these systems cohesively, we ensure every element of your technology ecosystem works together—delivering a reliable,
                high-performing environment for guests, staff, and operators alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-16 md:py-24 bg-[#F4FBFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2
                className="inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 px-4 py-2 rounded-2xl"
                style={{ color: '#0D4A3A', background: 'linear-gradient(120deg, rgba(78,205,196,0.25), rgba(13,74,58,0.1))' }}
              >
                How We Deliver Value
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#4B5563' }}>
                From early-stage investment cases to post-opening optimisation, our team embeds with your stakeholders to
                deliver technology that simply works.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#4B5563' }}>
                Our consultants, engineers, and analysts operate as an extension of your organisation—translating hospitality
                ambitions into connected, future-ready systems.
              </p>
            </div>
            <div className="space-y-6">
              {valuePillars.map((pillar) => (
                <div key={pillar.heading} className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3" style={{ color: '#0D4A3A' }}>
                    {pillar.heading}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: '#4B5563' }}>
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-[#0D4A3A] text-white rounded-3xl p-8 md:p-12 lg:p-14 shadow-xl relative overflow-hidden">
            <div className="absolute -top-20 -right-16 w-52 h-52 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
            <div className="absolute bottom-0 -left-12 w-64 h-64 bg-[#4ECDC4]/20 rounded-full blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide bg-white/15">
                Our Approach
              </span>
              <h2
                className="inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold mt-4 mb-6 px-4 py-2 rounded-2xl"
                style={{ background: 'linear-gradient(120deg, rgba(78,205,196,0.3), rgba(255,255,255,0.15))', color: 'white' }}
              >
                People-First. Technology-Driven. Results-Focused.
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4 text-white/85">
                Every project is different—but our philosophy stays the same: people-first, technology-driven, and results-focused.
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-4 text-white/85">
                We work closely with architects, developers, contractors, and operations teams to deliver IT systems that not only meet
                technical requirements but also support exceptional experiences.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-white/85">
                From early design and planning through installation and handover, we manage the process end-to-end so our clients can
                stay focused on what they do best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#0D4A3A' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Ready to Design the Next Guest Experience?
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8 text-white/85">
            Let’s collaborate on what’s next—from flagship openings to portfolio-wide upgrades. We’ll bring structure, speed,
            and a hospitality-first lens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-semibold text-base md:text-lg transition-transform transform hover:-translate-y-1"
              style={{ backgroundColor: '#4ECDC4', color: '#0D4A3A' }}
            >
              Talk to Our Team
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 md:px-10 md:py-5 rounded-lg font-semibold text-base md:text-lg border-2 transition-colors"
              style={{ borderColor: '#4ECDC4', color: '#4ECDC4' }}
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default WhyInhabitTech


