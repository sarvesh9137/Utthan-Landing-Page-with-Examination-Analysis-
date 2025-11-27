import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

export default function About() {
  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms
  const moveX1 = useTransform(springX, [0, 2000], [-30, 30]);
  const moveY1 = useTransform(springY, [0, 2000], [-30, 30]);
  const moveX2 = useTransform(springX, [0, 2000], [30, -30]);
  const moveY2 = useTransform(springY, [0, 2000], [30, -30]);

  function handleMouseMove({ clientX, clientY }) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  const stats = [
    {
      title: "84,000+",
      subtitle: "Students",
      desc: "Large-scale performance tracking across multiple wards and schools.",
      icon: "👥",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Ward",
      subtitle: "Analytics",
      desc: "Compare performance across different regions with detailed insights.",
      icon: "📊",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Smart",
      subtitle: "Insights",
      desc: "Visual data analytics to make better educational decisions.",
      icon: "💡",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center bg-slate-900 py-16 md:py-24 px-4 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep Purple Orb */}
        <motion.div
          style={{ x: moveX1, y: moveY1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#82298B] rounded-full mix-blend-screen filter blur-[120px]"
        />

        {/* Royal Blue Orb */}
        <motion.div
          style={{ x: moveX2, y: moveY2 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#2B3E8E] rounded-full mix-blend-screen filter blur-[120px]"
        />

        {/* Cyan Accent Orb */}
        <motion.div
          style={{ x: moveX1, y: moveY2 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-cyan-500 rounded-full mix-blend-screen filter blur-[120px]"
        />
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-white/30 rounded-full blur-sm"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + i * 8}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-12 md:mb-16"
          style={{ perspective: "1000px" }}
        >
          <motion.h1
            whileHover={{ scale: 1.02 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 drop-shadow-2xl tracking-tight mb-6"
          >
            About Utthan Project
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-32 md:w-48 mx-auto bg-gradient-to-r from-transparent via-white to-transparent rounded-full mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-100 text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto font-light px-4"
          >
            Utthan Dashboard helps visualize academic indicators across wards, schools,
            and student groups. It supports decision-making by presenting
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> data-driven insights </span>
            on Reading, Writing, and Numeracy performance.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 px-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 md:mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mx-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            A CSR Initiative
          </h2>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Utthan is a Corporate Social Responsibility initiative by
            <span className="font-semibold text-cyan-300"> Adani Electricity </span>
            and
            <span className="font-semibold text-purple-300"> Adani Foundation</span>,
            committed to empowering students through data-driven educational excellence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Stat Card Component with 3D effects
function StatCard({ stat, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.7 + index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      style={{
        perspective: "1200px",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, z: 50 }}
      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 overflow-hidden group cursor-pointer"
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="text-5xl md:text-6xl mb-4"
          animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          {stat.icon}
        </motion.div>

        {/* Title */}
        <h2 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-1`}>
          {stat.title}
        </h2>

        {/* Subtitle */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {stat.subtitle}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {stat.desc}
        </p>
      </div>

      {/* 3D depth shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-fuchsia-400/5 rounded-2xl blur-2xl transform translate-z-[-30px]" />
    </motion.div>
  );
}
