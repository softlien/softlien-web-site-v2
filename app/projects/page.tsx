"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Tilt } from "@/components/Tilt";
//import { ProjectFeedbackModal } from "@/components/ProjectFeedbackModal";
import { CTASection } from "@/components/CTASection";


export default function Projects() {
  const [filter, setFilter] = useState("All");
  // const [selectedProjectForFeedback, setSelectedProjectForFeedback] = useState<string | null>(null);

  const categories = [
    "All",
    "Web Development",
    "E-commerce",
    "Cloud Solutions",
    "UI/UX Design",
  ];

  const projects = [
    {
      title: "Restaurant E-menu platform",
      category: "E-commerce",
      subtitle: "QR-Powered Digital Dining Experience",
      description:
        "ScanBite revolutionizes the way customers interact with restaurants. By simply scanning a QR code at their table, guests can instantly view a high-quality, real-time digital menu on their own devices. This eliminates the need for physical menus, reduces contact, and allows for instant price or item updates. Designed for speed and responsiveness, it ensures a seamless browsing experience that helps restaurants showcase their offerings elegantly.",
      image:
        "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3MTMwMDA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      //tags: ["React", "Node.js", "MongoDB", "Stripe"],
      //date: "April 2026",
      //link: "#",
    },
    {
      title: "AutoCare: Vehicle Service Center Management System",
      category: "E-commerce",
      subtitle: "Streamlined Workshop & Maintenance Operations",
      description:
        "AutoCare is a specialized management solution built to handle the complexities of automotive service centers. The system tracks the entire lifecycle of a vehicle’s visit—from initial booking and job card creation to parts allocation and final invoicing. It features service history tracking, automated maintenance reminders for customers, and technician assignment tools, ensuring that workshops operate at peak efficiency while maintaining high standards of customer service.",
      image:
        "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NzEzMDk2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Node.js", "MongoDB", "Stripe"],
      // date: "April 2026",
      // link: "#",
    },
    {
      title: "PeopleSync: HR Management System",
      category: "Cloud Solutions",
      subtitle: "Centralized Human Capital & Workforce Coordination",
      description:
        "PeopleSync provides a robust framework for managing a modern workforce. This system simplifies core HR functions by centralizing employee records, attendance tracking, and leave management in one secure location. It includes modules for payroll processing, performance evaluations, and employee onboarding. With role-based access control, HR professionals can manage sensitive data securely while providing employees with self-service portals to view their own documents and request time off.",
      image:
        "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NzEzMDk2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Node.js", "MongoDB", "Stripe"],
      // date: "April 2026",
      // link: "#",
    },
    {
      title: "Restaurant Management",
      category: "E-commerce",
      subtitle: "Smart Order & Table Management",
      description:
        "DineTrack is a comprehensive restaurant management system designed to streamline operations. Key features include Order Management, Cashflow Management, and Table Management to optimize seating and reduce wait times. Order Processing & Kitchen Coordination ensures smooth communication between kitchen staff and service teams. Role-specific Dashboards for Cashiers, Admins, Kitchen, and Bar improve efficiency. Additional functionalities like Inventory Management, Staff Scheduling, and Customer Feedback further enhance workflow, allowing you to provide exceptional service while staying organized and efficient.",
      image:
        "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NzEzMDk2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Node.js", "MongoDB", "Stripe"],
      // date: "April 2026",
      // link: "#",
    },
    {
      title: "CloudPOS: Online Point of Sale System",
      category: "E-commerce",
      subtitle: "Cloud-Native Retail & Transaction Management",
      description:
        "CloudPOS is a high-performance, web-based point of sale solution designed for modern retail and service businesses. It provides a seamless checkout experience with real-time synchronization between sales, inventory, and accounting. Built to operate entirely in the cloud, it allows business owners to monitor transactions and manage multiple branch locations from anywhere in the world. With features like offline mode support, integrated payment processing, and detailed sales analytics, CloudPOS empowers businesses to scale rapidly while maintaining total control over their daily operations.",
      image:
        "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGFwcHxlbnwxfHx8fDE3NzEzMDk2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Node.js", "MongoDB", "Stripe"],
      // date: "April 2026",
      // link: "#",
    },
    {
      title: "TutorPulse Student Management System",
      category: "Cloud Solutions",
      subtitle: "Effortless Educational Administration & Learning Coordination",
      description: "TutorPulse helps you manage tuition classes effortlessly. It allows you to organize students by class, track attendance, and handle class fees with ease. You can upload and share study materials, such as tutorials and homework, and manage exams smoothly. With role-based Dashboards for Admins, Teachers, Students, and Parents, everyone has access to the information they need. TutorPulse makes running a tuition class simple and efficient, improving communication and student management.",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzcxMzIxOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Next.js", "Firebase"],
      // date: "August 2025",
      // link: "#",
    },
    {
      title: "Stockly inventory management system",
      category: "Cloud Solutions",
      subtitle: "Intuitive Stock Control & Real-Time Tracking",
      description: "Stockly is an intuitive inventory management system that helps businesses effortlessly track, organize, and manage their stock. With real-time updates, low stock alerts, and easy order management, Stockly ensures your inventory stays accurate and well-organized. Whether you’re handling a single warehouse or multiple locations, this system simplifies your operations, saving time and reducing errors for smoother business management.",
      image:
        "https://images.unsplash.com/photo-1667984390553-7f439e6ae401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcxMzA0NjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Express", "PostgreSQL"],
      // date: "July 2025",
      // link: "#",
    },
    {
      title: "Helpdesk & Live Chat Support System",
      category: "Web Apps",
      subtitle: "Centralized Customer Support & Inquiry Management",
      description: "SupportDesk is a customer support solution designed for businesses to manage tickets, live chats, and inquiries efficiently. It includes automated ticket assignment, multi-channel support (email, chat, and social media), and real-time analytics. With seamless CRM integration, SupportDesk helps businesses improve response times and enhance customer service.",
      image:
        "https://images.unsplash.com/photo-1765561667528-28e39c6174dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NzEyNTIwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      // tags: ["React", "Socket.io", "Redis"],
      // date: "June 2025",
      // link: "#",
    },
    // {
    //   title: "Library management system",
    //   category: "Web Apps",
    //   subtitle: "Efficient Cataloging & Circulation Management",
    //   description: "LibMaster is a simple and efficient library management system designed to streamline library operations. It allows you to easily catalog books, manage member details, and track book borrowings and returns. With features like search and filter options, overdue fee management, and a reservation system, LibMaster helps keep your library organized and ensures smooth, hassle-free operations for both staff and members.",
    //   image:
    //     "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxMjg5NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //   // tags: ["React", "Node.js", "MongoDB"],
    //   // date: "May 2025",
    //   // link: "#",
    // },
    {
      title: "SwiftFleet - car rent management system",
      category: "E-commerce",
      subtitle: "Complete Fleet Monitoring & Booking Solution",
      description: "Effortlessly manage your car rental business with SwiftFleet, a complete solution designed to handle bookings, vehicle tracking, client management, and payments. With real-time fleet monitoring, detailed reports, and automated workflows, SwiftFleet ensures your business runs smoothly while enhancing customer satisfaction.",
      image:
        "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcxMjg5NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: [],
      date: "",
      link: "",
    },
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="bg-white">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#8b0000] via-[#c00] to-[#e8272c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-200">
              Explore our portfolio of successful projects that have transformed
              businesses across industries
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 sticky top-20 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${filter === category
                  ? "bg-[#e8272c] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <Tilt>
                  <div className="relative overflow-hidden aspect-video">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 right-4">
                        <a
                          href={project.link}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-red-50 text-[#e8272c] text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {project.date}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#e8272c] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags?.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="flex items-center text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* <div className="mt-auto border-t border-gray-100 pt-4">
                      <button
                        onClick={() => setSelectedProjectForFeedback(project.title)}
                        className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-red-50 text-[#e8272c] hover:bg-[#e8272c] hover:text-white transition-colors font-medium text-sm"
                      >
                        <MessageSquareHeart size={16} className="mr-2" />
                        Leave Feedback
                      </button>
                    </div>  */}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Project Success Metrics
            </h2>
            <p className="text-xl text-gray-600">
              Our track record speaks for itself
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "30+", label: "Projects Completed" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "10k+", label: "Users Reached" },
              { number: "5+", label: "Industries Served" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#e8272c] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Start Your Project?"
        description="Let's create something amazing together"
        ctaText="Get In Touch"
      />

      {/* <ProjectFeedbackModal
        isOpen={!!selectedProjectForFeedback}
        onClose={() => setSelectedProjectForFeedback(null)}
        projectTitle={selectedProjectForFeedback || ""}
      /> */}
    </div>
  );
}
