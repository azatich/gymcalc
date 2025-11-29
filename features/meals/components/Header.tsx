import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="mb-6">
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-3xl md:text-4xl mb-2"
      >
        Добавить прием пищи
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="text-muted-foreground"
      >
        Выберите из библиотеки или введите данные вручную
      </motion.p>
    </div>
  );
};

export default Header;
