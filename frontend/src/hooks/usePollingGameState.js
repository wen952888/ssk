import { useEffect, useState } from 'react';

export default function usePollingGameState(roomId, interval = 1500) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!roomId) return;
    let timer = null;
    const fetchState = async () => {
      try {
        const res = await fetch(`https://9525.ip-ddns.com/api/get-status.php?room_id=${roomId}`);
        const data = await res.json();
        setGameState(data);
      } catch (e) {
        // error handle
      }
    };
    fetchState();
    timer = setInterval(fetchState, interval);
    return () => clearInterval(timer);
  }, [roomId, interval]);
  return gameState;
}
