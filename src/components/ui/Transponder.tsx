"use client";
import DialSwitch from "@/components/ui/DialSwitch";
import styles from "./Button.module.css";
import { useEffect, useRef, useState } from "react";

function textToHex(text: any) {
  return text
    .split("")
    .map((c: any) => c.charCodeAt(0).toString(2).padStart(24, "0"))
    .join("")
    .match(/.{4}/g)
    .map((bin: any) => parseInt(bin, 2).toString(16).toUpperCase())
    .join("");
}

function generateCode() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  const numbers = "01234567";
  const number1 = numbers.charAt(Math.floor(Math.random() * numbers.length));
  const number2 = numbers.charAt(Math.floor(Math.random() * numbers.length));
  const number3 = numbers.charAt(Math.floor(Math.random() * numbers.length));
  const number4 = numbers.charAt(Math.floor(Math.random() * numbers.length));
  return `${letter1}${letter2}-${number1}${number2}${number3}${number4}`;
}
const Transponder = () => {
  const [id, setId] = useState<string>(`${generateCode()}`);
  const [currentMode, setCurrentMode] = useState<"OFF" | "SBY" | "ON" | "ALT" | "TST">("OFF");
  const [active, setActive] = useState<Boolean>(false);
  const [squawk, setSquawk] = useState(["0", "0", "0", "0"]);
  const [brightness, setBrightness] = useState<number>(1);

  const [key, setKey] = useState("");
  const x = "test";

  const brightnessContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setBrightness((prevBrightness) => {
      const newBrightness = Math.min(Math.max(prevBrightness - e.deltaY * 0.001, 0), 1);
      return newBrightness;
    });
  };

  const handleChangeKey = (e: any) => {
    setKey(e.target.value);
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
    setSquawk((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = (parseInt(newNumbers[index], 10) + 1).toString();
      return newNumbers;
    });
  };

  const decrement = (index: number) => {
    setSquawk((prevNumbers) => {
      const newNumbers = [...prevNumbers];
      newNumbers[index] = (parseInt(newNumbers[index], 10) - 1).toString();
      return newNumbers;
    });
  };

  const handleChangeID = (event: any) => {
    setId(event.target.value);
  };

  const handleShowInfo = () => {
    const message =
      `ID               |   ${id}\n` +
      `Squawk      |   ${squawk.join("")}\n` +
      `Mode         |   ${currentMode}\n` +
      `Brightness  |   ${brightness}`;
    alert(message);
  };

  return (
    <>
      <div className="flex bg-[#0e0e0e] text-white h-auto border-white/20 border w-[800px] rounded-xl p-6 gap-4">
        <div className="flex flex-col space-y-2">
          <p className="text-white/70 font-mono">Transponder ID</p>
          <input
            disabled
            value={id}
            className="bg-[#0e0e0e] h-auto text-white border-white/20 border rounded-lg py-2 px-3 font-mono"
            placeholder="ID"
          ></input>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-white/70 font-mono">Key</p>
          <input
            type="password"
            className="bg-[#0e0e0e] h-auto text-white border-white/20 border rounded-lg py-2 px-3 font-mono"
            placeholder="Key"
            onChange={handleChangeKey}
            disabled={key === x}
          ></input>
        </div>
        <div className="flex flex-col items-end justify-end w-full">
          <div className="switch">
            <input id="toggle" type="checkbox" disabled={key !== x} />
            <label className="toggle" htmlFor="toggle">
              <i></i>
            </label>
          </div>
        </div>
      </div>
      <div className="relative flex bg-[#0e0e0e] text-white h-[200px] border-white/20 border w-[800px] rounded-xl py-2 px-3">
        <div className="flex space-x-[60px]">
          <DialSwitch onChange={handleModeChange} />
          <div className="flex flex-col space-y-10 mt-[40px] w-auto">
            <div
              className={`px-1 w-full ${active ? "bg-yellow-400/35" : "bg-black"} ${
                currentMode.startsWith("TST") ? "bg-green-400/35" : "bg-black"
              } h-8 w-8 rounded-xl border border-white/20 flex items-center justify-center transition-all ease-in-out duration-200`}
            >
              <span
                className={`w-full ${
                  currentMode.startsWith("TST") ? "bg-green-400/55" : "bg-black"
                } ${active ? "bg-yellow-400/55" : "bg-black"}  h-5 w-5 rounded-lg`}
              ></span>
            </div>
            <button
              title={`
            Identify as ${id}
            `}
              onClick={() => {
                handleActive();
                setTimeout(() => {
                  handleShowInfo();
                }, 500);
              }}
              className={styles.identbutton}
            >
              IDENT
            </button>
          </div>
          <div className="bg-black w-auto mt-6 h-[80px] text-white border border-white/20 rounded-xl">
            <div className="flex space-x-4 p-4">
              {squawk.map((squawk, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 mt-2 text-white">
                  <span className="text-xl font-semibold" style={{ opacity: brightness }}>
                    {squawk}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => decrement(index)}
                      disabled={parseInt(squawk, 10) <= 0}
                      className="h-8 w-8 bg-black text-white border border-white/20 rounded-md"
                    >
                      -
                    </button>
                    <button
                      onClick={() => increment(index)}
                      disabled={parseInt(squawk, 10) >= 7}
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
            title={`
          Screen brightness.
Scroll up and down to ajust
          `}
            ref={brightnessContainerRef}
            className="absolute top-[6px] left-[713px] flex flex-col items-center hover:bg-black/20 p-2 bg-black rounded-lg border border-white/20 cursor-pointer"
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 w-auto py-1 px-2 bg-transparent border-t border-r border-t-white/20 border-r-white/20 overflow-hidden rounded-tr-xl">
          <h2 className="text-white/70 text-[14px] font-mono font-medium select-none" id="label">
            by danilppzz
          </h2>
        </div>
      </div>
    </>
  );
};

export default Transponder;
