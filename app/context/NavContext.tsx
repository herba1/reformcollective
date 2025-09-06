import React, { useContext, createContext, useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

type NavContextType = {
  menuHeight: string;
  setMenuHeight: (height: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  // need menu to trigger a new height
  const [menuHeight, setMenuHeight] = useState<string>("600");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lenis = useLenis(() => {});
  const tl = useRef<gsap.core.Timeline | null>(null);


  const navItem = {
    menuHeight,
    setMenuHeight,
    isOpen,
    setIsOpen,
  };
  useGSAP(
    () => {
      console.log(lenis?.actualScroll);
      if (!tl.current && isOpen && lenis) {
        tl.current = gsap.timeline({ paused: true, repeatRefresh: true });
        tl.current
          .set("#main__container", {
            y: lenis?.actualScroll,
          })
          .set("#main__content", {
            y: lenis?.actualScroll * -1,
          })
          .fromTo("#main__container",{}, {
            borderRadius: "24px",
            scale: 0.95,
            duration: 1.3,
            pointerEvents: "none",
            ease: "power3.inOut",
            y: parseFloat(menuHeight) + lenis?.actualScroll,
            onReverseComplete: () => {
              tl.current?.revert();
              tl.current?.kill();
              tl.current = null;
              lenis.start();
            },
          });
      }

      if (navItem.isOpen && tl.current) {
        lenis?.stop();
        console.log('stopped');
        tl.current.play();
      }

      if (!navItem.isOpen && tl.current) {
        tl.current.reverse();
      }
    },
    { dependencies: [navItem.menuHeight, navItem.isOpen] }
  );

  return <NavContext value={navItem}>{children}</NavContext>;
}

export const useNav = (): NavContextType => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
