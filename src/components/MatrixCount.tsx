export default function MatrixCount({ matrixCount }: { matrixCount: number }) {
  return (
    <div className="fixed top-0 left-0 inset-0 w-full h-full pointer-events-none overflow-hidden z-10 opacity-40">
      <style
        dangerouslySetInnerHTML={{
          __html: `
     @keyframes matrixFall {
       0% {
         transform: translateY(-100px);
         opacity: 0;
       }
       10% {
         opacity: 0.8;
       }
       90% {
         opacity: 0.8;
       }
       100% {
         transform: translateY(calc(100vh + 100px));
         opacity: 0;
       }
     }
     .matrix-drop {
       animation: matrixFall linear infinite;
       color: #00ff41;
       font-family: 'Courier New', monospace;
       text-shadow: 0 0 5px #00ff41;
     }
   `,
        }}
      />
      {Array.from({ length: matrixCount }).map((_, i) => (
        <div
          key={i}
          className="absolute text-xs matrix-drop"
          style={{
            left: `${
              i * (100 / matrixCount) + Math.random() * (100 / matrixCount)
            }%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
            fontSize: `${10 + Math.random() * 4}px`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
        >
          {
            [
              "0",
              "1",
              "01",
              "10",
              "101",
              "010",
              "110",
              "001",
              "100",
              "011",
              "111",
              "000",
              "0000",
              "0001",
              "0010",
              "0011",
              "0100",
              "0101",
              "0110",
              "0111",
              "1000",
              "1001",
              "1010",
              "1011",
              "1100",
              "1101",
              "1110",
              "1111",
            ][Math.floor(Math.random() * 8)]
          }
        </div>
      ))}
    </div>
  );
}
