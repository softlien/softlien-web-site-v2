import { motion } from "motion/react";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

interface VacancyCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  onApply: () => void;
}

export function VacancyCard({
  title,
  department,
  location,
  type,
  description,
  onApply,
}: VacancyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-red-50 text-[#e8272c] text-xs font-bold rounded-full uppercase tracking-wider">
              {department}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#e8272c] transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-[#e8272c]" />
              {location}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-[#e8272c]" />
              {type}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-[#e8272c]" />
              {department}
            </div>
          </div>
          <p className="text-gray-600 line-clamp-2 md:max-w-xl">
            {description}
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={onApply}
            className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#e8272c] text-white rounded-full font-bold hover:bg-[#d01f24] transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
          >
            Apply Now
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
