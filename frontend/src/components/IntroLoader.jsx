// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function IntroLoader({ onFinish }) {
//   const [exit, setExit] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setExit(true);

//       setTimeout(() => {
//         onFinish();
//       }, 900);

//     }, 4200);

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   const particles = Array.from({ length: 18 });

//   return (
//     <AnimatePresence>

//       {!exit && (
//         <motion.div
//           exit={{
//             opacity: 0,
//             scale: 1.08
//           }}
//           className="fixed inset-0 bg-black z-[99999] overflow-hidden flex items-center justify-center"
//         >

//           {/* gold ambient */}
//           <motion.div
//             animate={{
//               opacity: [0.08, 0.22, 0.08],
//               scale: [1, 1.25, 1]
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity
//             }}
//             className="absolute w-[800px] h-[800px] rounded-full blur-[140px] bg-yellow-500"
//           />

//           {/* particles */}
//           {particles.map((_, i) => (
//             <motion.div
//               key={i}
//               animate={{
//                 y: [0, -80, 0],
//                 opacity: [0.1, 0.8, 0.1]
//               }}
//               transition={{
//                 duration: 3 + i * .2,
//                 repeat: Infinity
//               }}
//               className="absolute w-[4px] h-[4px] rounded-full bg-yellow-300"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`
//               }}
//             />
//           ))}

//           {/* top light */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: -300
//             }}
//             animate={{
//               opacity: .35,
//               y: 0
//             }}
//             transition={{
//               duration: 1.2
//             }}
//             className="absolute top-0 w-[500px] h-[500px] blur-[120px]"
//             style={{
//               background: "gold"
//             }}
//           />

//           {/* text */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: .6,
//               y: 40
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               y: 0
//             }}
//             transition={{
//               duration: 1.8
//             }}
//             className="relative"
//           >

//             <h1
//               className="text-7xl md:text-9xl font-black tracking-[18px]"
//               style={{
//                 background:
//                   "linear-gradient(180deg,#fff7c7,#ffd700,#b8860b,#fff2a0)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 textShadow: `
//                   0 0 25px rgba(255,215,0,.25),
//                   0 8px 20px rgba(0,0,0,.5)
//                 `
//               }}
//             >
//               SANAT
//             </h1>

//             <h2
//               className="text-center mt-3 text-4xl tracking-[16px] font-bold"
//               style={{
//                 color: "#e6c14d"
//               }}
//             >
//               PRO
//             </h2>

//             {/* luxury sweep */}
//             <motion.div
//               animate={{
//                 x: [-400, 400]
//               }}
//               transition={{
//                 duration: 1.7,
//                 repeat: Infinity
//               }}
//               className="absolute top-0 w-[120px] h-full rotate-12 blur-xl"
//               style={{
//                 background: "rgba(255,255,255,.28)"
//               }}
//             />

//           </motion.div>

//           {/* reflection */}
//           <div
//             className="absolute bottom-[35%] w-[500px] h-[80px] blur-3xl opacity-20"
//             style={{
//               background: "gold"
//             }}
//           />

//         </motion.div>
//       )}

//     </AnimatePresence>
//   );
// }



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);

      setTimeout(() => {
        onFinish();
      }, 800);

    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>

      {!exit && (
        <motion.div
          exit={{
            opacity: 0
          }}
          className="fixed inset-0 bg-black z-[99999] flex items-center justify-center overflow-hidden"
        >

          {/* ambient gold background */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.06, 0.18, 0.06]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
            className="absolute w-[900px] h-[900px] rounded-full blur-[180px] bg-yellow-500"
          />

          {/* main text */}
          <motion.div
            initial={{
              opacity: 0,
              scale: .75
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 1.8
            }}
            className="relative"
          >

            <h1
              className="text-[130px] md:text-[180px] font-black leading-none tracking-[10px]"
              style={{
                background: `
                  linear-gradient(
                    180deg,
                    #fff8d6 0%,
                    #ffe27a 20%,
                    #ffd700 35%,
                    #d4af37 60%,
                    #8a6a00 100%
                  )
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: `
                  0 0 10px rgba(255,215,0,.25),
                  0 0 30px rgba(255,215,0,.18),
                  0 10px 30px rgba(0,0,0,.5)
                `
              }}
            >
              SANAT
            </h1>

            <h2
              className="text-center text-[55px] tracking-[22px] mt-2 font-semibold"
              style={{
                color: "#f3d46d",
                textShadow: "0 0 20px rgba(255,215,0,.25)"
              }}
            >
              PRO
            </h2>

            {/* luxury sweep light */}
            <motion.div
              animate={{
                x: [-700, 700]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute top-0 left-0 w-[180px] h-full rotate-12 blur-xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)"
              }}
            />

          </motion.div>

          {/* bottom reflection */}
          <div
            className="absolute bottom-[28%] w-[600px] h-[70px] blur-3xl opacity-20"
            style={{
              background: "#FFD700"
            }}
          />

        </motion.div>
      )}

    </AnimatePresence>
  );
}