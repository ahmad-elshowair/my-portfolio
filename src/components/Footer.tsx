import { inika } from "@/lib/fonts";
import Link from "next/link";
import { FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className={`py-8 bg-bgGreen ${inika.className}`} id="contact">
      <div className="max-w-5xl mx-auto flex justify-center items-center gap-6">
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
    </footer>
  );
};

export default Footer;
