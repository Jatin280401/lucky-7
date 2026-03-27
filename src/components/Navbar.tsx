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
    <nav className="bg-background border-b-2 border-primary py-2 px-4">
      <div className="max-w-6xl mx-auto flex justify-center gap-4 flex-wrap">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className="bg-primary text-black font-black px-8 py-2 border-2 border-black rounded-full text-sm uppercase tracking-wide hover:bg-yellow-400 hover:shadow-md transition-all"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
