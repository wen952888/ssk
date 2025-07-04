import React, { useState } from 'react';
import Hand from './components/Hand';
import usePollingGameState from './hooks/usePollingGameState';

const FRONTEND_DOMAIN = "https://kk.wenge.ip-ddns.com";
const BACKEND_DOMAIN = "https://9525.ip-ddns.com";

export default function App() {
  const [roomId, setRoomId] = useState('');
  const [playerIdx, setPlayerIdx] = useState('');
  const [joined, setJoined] = useState(false);
  const [playersCount, setPlayersCount] = useState(4);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const gameState = usePollingGameState(roomId);

  // 创建房间
  const createRoom = async () => {
    const res = await fetch(`${BACKEND_DOMAIN}/api/create-room.php`, { method: "POST" });
    const data = await res.json();
    setRoomId(data.room_id);
    setPlayerIdx('0');
    setJoined(true);
    setMsg("房间已创建，等待其他玩家加入。房间号: " + data.room_id);
  };

  // 加入房间
  const joinRoom = async () => {
    if (!roomId) return setMsg("请输入房间号");
    const res = await fetch(`${BACKEND_DOMAIN}/api/join-room.php?room_id=${roomId}`, { method: "POST" });
    const data = await res.json();
    if (data.error) return setMsg(data.error);
    setPlayerIdx(data.player_idx);
    setJoined(true);
    setMsg("加入房间成功，等待发牌。 你是座位：" + data.player_idx);
  };

  // 发牌
  const startGame = async () => {
    await fetch(`${BACKEND_DOMAIN}/api/start-game.php`, {
      method: "POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `room_id=${roomId}&player_count=${playersCount}`
    });
    setMsg("已发牌！");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>十三水多人房间游戏</h2>
      {!joined ? (
        <div>
          <button onClick={createRoom}>创建房间</button>
          <div style={{ margin: "10px 0" }}>
            <input placeholder="房间号" value={roomId} onChange={e=>setRoomId(e.target.value)} />
            <button onClick={joinRoom}>加入房间</button>
          </div>
        </div>
      ) : (
        <div>
          <div>房间号: {roomId}</div>
          <div>你的座位号: {playerIdx}</div>
          <button onClick={startGame}>发牌</button>
        </div>
      )}
      <div style={{color:"red"}}>{msg}</div>
      <hr />
      <h3>玩家手牌</h3>
      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {gameState && gameState.players && gameState.players.map((hand, idx) => (
          <div key={idx}>
            玩家{idx+1}: <Hand hand={hand} />
          </div>
        ))}
      </div>
    </div>
  );
}
