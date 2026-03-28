import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "CHART", path: "/chart" },
    { label: "CONTACT", path: "/contact" },
    { label: "LOGIN", path: "/login" },
  ];

  return (
    <nav className="bg-background border-b-2 border-primary py-2 px-2 sm:px-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto flex justify-center gap-2 sm:gap-4 flex-nowrap overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="bg-primary text-black font-black px-3 sm:px-8 py-1.5 sm:py-2 border-2 border-black rounded-full text-[10px] sm:text-sm uppercase tracking-tighter sm:tracking-wide hover:bg-yellow-400 hover:shadow-md transition-all whitespace-nowrap flex-shrink-0"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
