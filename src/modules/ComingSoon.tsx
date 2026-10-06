import { Construction } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, type Variants } from "framer-motion";
import CustomBtn from "@/components/custom/CustomBtn";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const FeatureInDevelopment = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full md:h-full flex items-center justify-center p-6 rounded-xl">
      <motion.div
        className="text-center max-w-md flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={itemVariants}
          className="h-16 w-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-6"
        >
          <Construction size={32} className="text-yellow-600 stroke-[1px]" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold mb-2 font-heading"
        >
          We're still building this
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mb-6 text-muted-foreground"
        >
          This feature isn't quite ready yet, but it's in the works. Check back
          soon.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-3"
        >
          <CustomBtn onClick={() => navigate(-1)} children="Go Back" />
          <CustomBtn onClick={() => navigate("/dashboard")}>
            Dashboard
          </CustomBtn>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeatureInDevelopment;
