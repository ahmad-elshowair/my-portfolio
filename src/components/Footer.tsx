import { inika } from "@/lib/fonts";

const Footer = () => {
  return (
    <footer className={`py-8 px-4 bg-bgGreen backdrop-blur ${inika.className}`}>
      <div className="max-w-5xl mx-auto flex justify-center items-center">
        <p className="text-sm text-mainGreen">
          ahmad-elshowair © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
