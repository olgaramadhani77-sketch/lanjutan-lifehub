import React, { useEffect, useState } from 'react';

export default function RewardToast() {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setReward(e.detail);
      clearTimeout(window.__lifehubRewardTimeout);
      window.__lifehubRewardTimeout = setTimeout(() => setReward(null), 2600);
    };

    window.addEventListener('lifehub:reward', handler);
    return () => window.removeEventListener('lifehub:reward', handler);
  }, []);

  const text = reward
    ? [
        `+${reward.xp || 0} XP`,
        `+${reward.coins || 0} Coins`,
        reward.ecoPoints ? `+${reward.ecoPoints} Eco` : null,
      ]
        .filter(Boolean)
        .join(' • ')
    : '';

  return (
    <div className={`reward-toast ${reward ? 'show' : ''}`}>
      <div className="reward-burst">✨</div>
      <div>
        <h4>Reward Earned</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}
