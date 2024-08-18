const Radar = () => {
  return (
    <div className=" space-y-2">
      <h1 className="font-mono font-bold text-[24px]">Radar SSR</h1>
      <div className="flex space-x-4">
        <div className="bgimg flex bg-black text-white h-[650px] border-white/30 border w-[600px] rounded-xl">
          <div className="relative top-[92%] h-[50px] border-t-white/30 border-t w-full bg-[#0E0E0E] rounded-b-xl"></div>
        </div>
        <div className="flex flex-col space-y-4 bg-black text-white h-[650px] border-white/30 border w-[300px] rounded-xl py-2 px-3">
          <div className="space-y-2">
            <p className="font-mono font-normal text-white/70 text-[14px]">ID</p>
            <input
              placeholder="none"
              className="bg-[#0e0e0e] h-auto text-white border-white/20 border rounded-lg py-2 px-3 font-mono w-full"
            ></input>
          </div>
          <div className="space-y-2">
            <p className="font-mono font-normal text-white/70 text-[14px]">Squawk</p>
            <input
              placeholder="none"
              className="bg-[#0e0e0e] h-auto text-white border-white/20 border rounded-lg py-2 px-3 font-mono w-full"
            ></input>
          </div>
          <div className="space-y-2">
            <p className="font-mono font-normal text-white/70 text-[14px]">Mode</p>
            <input
              placeholder="none"
              className="bg-[#0e0e0e] h-auto text-white border-white/20 border rounded-lg py-2 px-3 font-mono w-full"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radar;
