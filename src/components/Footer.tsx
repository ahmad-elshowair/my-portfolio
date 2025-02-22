import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer
      className={`py-8 px-4 bg-bgGreen backdrop-blur ${inika.className}`}
      id="contact"
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <Link
            href="https://www.linkedin.com/in/ahmad-elshowair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-mainGreen hover:text-beige hover:scale-110 transition-colors duration-300"
          >
            <FiLinkedin />
          </Link>
          <Link
            href="mailto:ahmad-elshowair.dev@outlook.com"
            className="text-2xl text-mainGreen hover:text-beige hover:scale-110 transition-colors duration-300"
          >
            <FiMail />
          </Link>
        </div>
        <p className="text-sm text-mainGreen">ahmad-elshowair © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
