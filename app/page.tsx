import HomePage from "./components/organsms/HomePage/HomePage"; 
import { motion } from "framer-motion"; 

export default function Home() {
  return (
    <div
      className="max-w-[1440px] w-full overflow-x-hidden overflow-scroll h-screen"
      // initial={{ opacity: 0, y: 100 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // transition={{ duration: 1 }}
      // viewport={{ once: true }}
    >
      <HomePage />
    </div>
  );
}
