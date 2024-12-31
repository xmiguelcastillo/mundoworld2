import React from "react";
import earth from "../assets/earth.svg";

function Earth() {
  const restartAnimation = () => {
    const earthImage = document.querySelector(".earth");
    earthImage?.classList.remove("animate-bounce"); // Remove the animation class
    void earthImage?.offsetWidth; // Trigger a reflow
    earthImage?.classList.add("animate-bounce"); // Reapply the animation class
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        className="earth w-[300px] h-[300px] object-contain animate-bounce"
        src={earth}
        alt="Earth"
      />
      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(-25px);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }

        .animate-bounce {
          animation: bounce 5s infinite;
        }
      `}</style>
    </div >
  );
}

export default Earth;
