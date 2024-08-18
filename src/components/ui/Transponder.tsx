"use client";
import DialSwitch from "@/components/ui/DialSwitch";
import styles from './Button.module.css';
import { useEffect, useRef, useState } from "react";

const Transponder = () => {
  const [currentMode, setCurrentMode] = useState<"OFF" | "SBY" | "ON" | "ALT" | "TST">("OFF");
  const [active, setActive] = useState<Boolean>(false);
  const [numbers, setNumbers] = useState(["0", "0", "0", "0"]);
  const [brightness, setBrightness] = useState<number>(1);

  const brightnessContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setBrightness((prevBrightness) => {
      const newBrightness = Math.min(Math.max(prevBrightness - e.deltaY * 0.001, 0), 1);
      return newBrightness;
    });
  };

  useEffect(() => {
    const container = brightnessContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleModeChange = (mode: "OFF" | "SBY" | "ON" | "ALT" | "TST") => {
    setCurrentMode(mode);
  };

  const handleActive = () => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 1200);
  };

  const increment = (index: number) => {
    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = (parseInt(newNumbers[index], 10) + 1).toString();
      return newNumbers;
    });
  };

  const decrement = (index: number) => {
    setNumbers((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = (parseInt(newNumbers[index], 10) - 1).toString();
      return newNumbers;
    });
  };

  const handleShowInfo = () => {
    const message = `Current Mode: ${currentMode}\n` +
                    `Code: ${numbers.join("")}\n` +
                    `Brightness: ${brightness}`;
    alert(message);
  };

  return (
    <div className="relative flex bg-[#0e0e0e] text-white h-[200px] border-white/20 border w-[800px] rounded-xl py-2 px-3">
      <div className="flex space-x-[60px]">
        <DialSwitch onChange={handleModeChange} />
        <div className="flex flex-col space-y-10 mt-[40px] w-auto">
          <div
            className={`px-1 w-full ${
              active ? "bg-yellow-400/35" : "bg-black"
            } ${currentMode.startsWith("TST") ? "bg-green-400/35" : "bg-black"} ${currentMode.startsWith("ON")||currentMode.startsWith("ALT")? "bg-yellow-400/35" : "bg-black"} h-8 w-8 rounded-xl border border-white/20 flex items-center justify-center transition-all ease-in-out duration-200`}
          >
            <span
              className={`w-full ${currentMode.startsWith("TST") ? "bg-green-400/55" : "bg-black"} ${active ? "bg-yellow-400/55" : "bg-black"} ${currentMode.startsWith("ON")||currentMode.startsWith("ALT")? "bg-yellow-400/55" : "bg-black"} h-5 w-5 rounded-lg`}
            ></span>
          </div>
          <button
            onClick={() => {
              handleShowInfo();
            }}
            className={styles.identbutton}
          >
            IDENT
          </button>
        </div>
        <div className="bg-black w-auto mt-6 h-[80px] text-white border border-white/20 rounded-xl">
          <div className="flex space-x-4 p-4">
            {numbers.map((number, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 mt-2 text-white">
                <span className="text-xl font-semibold" style={{ opacity: brightness }}>
                  {number}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => decrement(index)}
                    disabled={parseInt(number, 10) <= 0}
                    className="h-8 w-8 bg-black text-white border border-white/20 rounded-md"
                  >
                    -
                  </button>
                  <button
                    onClick={() => increment(index)}
                    disabled={parseInt(number, 10) >= 7}
                    className="h-8 w-8 bg-black text-white border border-white/20 rounded-md disabled:bg-red-400"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={brightnessContainerRef}
          className="absolute top-[6px] left-[713px] flex flex-col items-center hover:bg-black/20 p-2 bg-black rounded-lg border border-white/20 cursor-pointer"
        ></div>
      </div>
      <div className="absolute bottom-0 left-0 w-auto py-1 px-2 bg-transparent border-t border-r border-t-white/20 border-r-white/20 overflow-hidden rounded-tr-xl">
        <h2
          className="text-white/70 text-[14px] font-mono font-medium select-none"
          id="label"
        >
          NavLink T-300
        </h2>
      </div>
    </div>
  );
};

export default Transponder;
