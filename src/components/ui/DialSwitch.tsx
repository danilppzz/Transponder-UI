'use client'
import { useState } from 'react';
import styles from './DialSwitch.module.css';

type Mode = 'OFF' | 'SBY' | 'ON' | 'ALT' | 'TST';

interface DialSwitchProps {
  onChange: (mode: Mode) => void;
}

const modes: Mode[] = ['OFF', 'SBY', 'ON', 'ALT', 'TST'];

const DialSwitch: React.FC<DialSwitchProps> = ({ onChange }) => {
  const [selectedMode, setSelectedMode] = useState<Mode>('OFF');

  const handleModeChange = (mode: Mode) => {
    setSelectedMode(mode);
    onChange(mode);
  };

  const step = 180 / (modes.length - 1); // Paso para distribuir los modos
  const distanceFromCenter = 70; // Ajusta este valor según sea necesario

  // Ajuste adicional de 90 grados hacia la izquierda
  const initialAngle = 270;

  return (
    <div className={styles.container}>
      <div className={styles.dial}>
        <div
          className={styles.indicator}
          style={{ transform: `rotate(${initialAngle + (step * modes.indexOf(selectedMode))}deg)` }} // Ajuste del ángulo
        ></div>
      </div>
      <div className={styles.labels}>
        {modes.map((mode, index) => {
          const rotate = initialAngle + (step * index); // Ajuste del ángulo para los botones
          return (
            <button
            title={`Switch to ${mode}`}
              key={mode}
              className={styles.button}
              style={{
                transform: `rotate(${rotate}deg) translateY(-${distanceFromCenter}px) rotate(-${rotate}deg)`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: '-20px', // Ajusta el margen según el tamaño del botón
                marginTop: '-20px'  // Ajusta el margen según el tamaño del botón
              }}
              onClick={() => handleModeChange(mode)}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DialSwitch;
