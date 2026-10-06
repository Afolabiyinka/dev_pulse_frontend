import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-6 text-center bg-white text-black dark:bg-[#161616] dark:text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md flex flex-col items-center"
      >
        <h1 className="text-9xl font-light text-primary">404</h1>

        <h2 className="mt-6 text-3xl md:text-4xl font-bold font-heading">
          Page not found
        </h2>

        <p className="mt-4 text-muted-foreground font-heading">
          The page you’re looking for doesn’t exist or is still being built.
        </p>

        <Button className="mt-6" onClick={() => navigate("/")}>
          <ArrowLeft />
          Go Home
        </Button>
      </motion.div>
    </div>
  );
}

export default NotFound;
