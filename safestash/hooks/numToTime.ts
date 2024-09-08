export default function NumToTime(seconds: number): string {
    if (seconds < 0 || !Number.isFinite(seconds)) {
      throw new Error('Input must be a non-negative finite number');
    }
  
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    
    const minutesStr: string = minutes.toString().padStart(2, '0');
    const secondsStr: string = remainingSeconds.toString().padStart(2, '0');
    
    return `${minutesStr}:${secondsStr}`;
  }
  