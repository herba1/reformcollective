import { Globe, Menu } from "lucide-react";
import { useNav } from "../context/NavContext";

export default function NavHeader({
  className,
  ...props
}: {
  className: string;
}) {
  const navItem = useNav();
  return (
    <header
      className={`flex h-16 items-center justify-between bg-black px-4 py-4 ${className}`}
      {...props}
    >
      <Globe size={32} className="text-amber-50" />
      <button
        onClick={() => {
          navItem.setIsOpen(!navItem.isOpen);
        }}
        className="relative flex items-center touch-manipulation justify-between text-amber-50"
      >
        <div className="flex items-center justify-center">
          <Menu />
          <span>MENU</span>
        </div>
      </button>
    </header>
  );
}
