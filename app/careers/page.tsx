"use client";

import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Briefcase, Users, Target, Rocket, ArrowDown } from "lucide-react";
import { HeroMeshBackground } from "@/components/HeroMeshBackground";
// import { VacancyCard } from "@/components/VacancyCard";
// import { CareerApplicationForm } from "@/components/CareerApplicationForm";
import { CTASection } from "@/components/CTASection";

// const VACANCIES = [];
// const VACANCIES = [
//   {
//     title: "Senior Full Stack Developer",
//     department: "Engineering",
//     location: "Remote / Colombo",
//     type: "Full-time",
//     description: "We're looking for an experienced Full Stack Developer to lead the development of our core SaaS products using Next.js, Node.js, and Firebase.",
//   },
//   {
//     title: "UI/UX Designer",
//     department: "Design",
//     location: "Matara / Hybrid",
//     type: "Full-time",
//     description: "Join our design team to create beautiful, intuitive user experiences for our international clients. Experience with Figma and design systems is required.",
//   },
//   {
//     title: "Project Manager",
//     department: "Management",
//     location: "Colombo / Hybrid",
//     type: "Full-time",
//     description: "Lead complex software projects from discovery to launch. You'll work closely with developers and clients to ensure timely and high-quality delivery.",
//   },
//   {
//     title: "QA Engineer",
//     department: "Quality Assurance",
//     location: "Remote",
//     type: "Contract",
//     description: "Help us maintain our high standard of quality by implementing automated and manual testing processes for our web and mobile applications.",
//   },
// ];

export default function Careers() {
  // const [selectedPosition, setSelectedPosition] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  /*
  const scrollToApply = (position: string) => {
    setSelectedPosition(position);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  */

  const benefits = [
    {
      icon: <Users size={32} />,
      title: "Great Culture",
      description: "Work in a collaborative, supportive environment that values innovation and individual growth.",
    },
    {
      icon: <Target size={32} />,
      title: "Impactful Work",
      description: "Build solutions that solve real-world problems for users across the globe.",
    },
    {
      icon: <Rocket size={32} />,
      title: "Growth Opportunities",
      description: "We provide resources and mentorship to help you advance your career and master new skills.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c]">
          <div className="absolute inset-0 opacity-20" />
        </div>
        <HeroMeshBackground className="absolute inset-0 pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Join Our <br />
              <span className="bg-gradient-to-r from-red-200 to-pink-200 bg-clip-text text-transparent">
                Creative Team
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Help us build the next generation of digital products. We&apos;re always looking for talented individuals who are passionate about technology and innovation.
            </p>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center px-8 py-4 bg-white text-[#e8272c] rounded-full font-bold hover:shadow-2xl transition-all transform hover:scale-105"
            >
              View Open Positions
              <ArrowDown className="ml-2" size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-[#e8272c] mx-auto mb-6 group-hover:scale-110 group-hover:bg-[#e8272c] group-hover:text-white transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Open Vacancies</h2>
            <p className="text-xl text-gray-600">We&apos;re always looking for great talent. Send us your CV manually and we&apos;ll keep you in mind for future openings.</p>
          </div>

          {/* <div className="space-y-8">
            {VACANCIES.map((vacancy, index) => (
              <VacancyCard
                key={index}
                {...vacancy}
                onApply={() => scrollToApply(vacancy.title)}
              />
            ))}
          </div> */}
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formRef} className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/50 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-[#e8272c] rounded-full text-sm font-bold mb-6">
              <Briefcase size={16} />
              Quick Apply
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Apply Now</h2>
            <p className="text-xl text-gray-600">Send us your CV and start your journey with Softlien</p>
          </div>

          {/* <CareerApplicationForm
            initialPosition={selectedPosition}
            positions={VACANCIES.map(v => v.title)}
          /> */}
        </div>
      </section>

      <CTASection
        headline="Don't see a matching role?"
        description="We're always looking for great talent. Send us your CV manually and we'll keep you in mind for future openings."
        ctaText="Drop Your CV"
      />
    </div>
  );
}
