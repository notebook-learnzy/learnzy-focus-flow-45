
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BookOpen, Calendar, LayoutDashboard, Heart, Notebook, Users } from 'lucide-react';

const FooterNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Academics',
      icon: <BookOpen className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/academics'
    },
    {
      name: 'Calendar',
      icon: <Calendar className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/calendar'
    },
    {
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/dashboard'
    },
    {
      name: 'Wellness',
      icon: <Heart className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/wellness'
    },
    {
      name: 'Notebook',
      icon: <Notebook className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/mistake-notebook'
    },
    {
      name: 'Social',
      icon: <Users className="h-6 w-6 sm:h-5 sm:w-5" />,
      path: '/social'
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
      <div className="flex justify-around px-4 py-2 sm:px-2 sm:py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-3 py-1 rounded-md transition-colors text-xs gap-0.5",
              location.pathname === item.path 
                ? "text-learnzy-purple font-semibold" 
                : "text-gray-500 hover:text-learnzy-purple"
            )}
          >
            {item.icon}
            <span className="text-xs mt-0.5">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FooterNavigation;
