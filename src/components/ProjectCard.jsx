import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(project);
    } else {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-light dark:bg-dark border border-dark/20 dark:border-light/20 rounded-xl overflow-hidden hover:border-dark dark:hover:border-light transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] min-w-[280px]"
    >
      <div className="flex flex-col h-full">
        {/* Image/Icon */}
        <div className="aspect-video bg-dark/5 dark:bg-light/5 overflow-hidden relative">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
              {project.icon || "💼"}
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dark/0 dark:bg-light/0 group-hover:bg-dark/10 dark:group-hover:bg-light/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-dark dark:text-light mb-2 group-hover:text-dark/80 dark:group-hover:text-light/80 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-dark/70 dark:text-light/70 mb-4 line-clamp-2 flex-1">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags?.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2.5 py-1 rounded-md bg-dark/10 dark:bg-light/10 text-dark dark:text-light font-medium"
              >
                {tag}
              </span>
            ))}
            {project.tags?.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-md bg-dark/10 dark:bg-light/10 text-dark/60 dark:text-light/60 font-medium">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* View Details Indicator */}
          <div className="mt-4 pt-4 border-t border-dark/10 dark:border-light/10 flex items-center justify-between text-sm text-dark/60 dark:text-light/60 group-hover:text-dark dark:group-hover:text-light transition-colors">
            <span className="font-medium">View Details</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
