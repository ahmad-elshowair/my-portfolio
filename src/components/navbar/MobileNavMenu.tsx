import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { RefObject } from "react";
import {
  getItemVariants,
  getMenuVariants,
  NAV_SECTIONS,
} from "./navbar.constants";

export interface MobileNavMenuProps {
  isOpen: boolean;
  activeSection: string;
  onSelectSection: (id: string) => void;
  onClose: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
}

/**
 * Mobile glass dropdown menu panel with active section indicators and resume download CTA.
 */
export function MobileNavMenu({
  isOpen,
  activeSection,
  onSelectSection,
  onClose,
  panelRef,
  prefersReducedMotion,
}: MobileNavMenuProps) {
  const menuVariants = getMenuVariants(prefersReducedMotion);
  const itemVariants = getItemVariants(prefersReducedMotion);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav-panel"
          ref={panelRef}
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          style={{ transformOrigin: "top center" }}
          className="pointer-events-auto absolute left-4 right-4 top-full mt-2 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-beige/15 bg-bgGreen/80 p-4 shadow-2xl shadow-black/50 backdrop-blur-3xl md:hidden"
        >
          <motion.ul className="flex flex-col gap-1.5">
            {NAV_SECTIONS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <motion.li key={id} variants={itemVariants}>
                  <Link
                    href={`#${id}`}
                    onClick={() => {
                      onSelectSection(id);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-all duration-200",
                      isActive
                        ? "bg-mainGreen/20 text-mainGreen font-semibold border border-mainGreen/30"
                        : "text-beige hover:bg-beige/5 hover:text-mainGreen",
                    )}
                  >
                    <span>{label}</span>
                    {isActive && (
                      <span
                        className="h-2 w-2 rounded-full bg-mainGreen"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Quick Actions in Mobile Drawer */}
          <motion.div
            variants={itemVariants}
            className="mt-3 flex flex-col gap-2 border-t border-beige/10 pt-3"
          >
            <a
              href="/files/ahmad_elshowair_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-xl bg-mainGreen py-2.5 text-sm font-semibold text-bgGreen transition-all hover:brightness-95 active:scale-95"
            >
              Download Resume (PDF)
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
