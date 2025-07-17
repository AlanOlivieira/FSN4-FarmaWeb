import { useState } from 'react';

function BotaoRemover({ onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? '#fff' : '#e0181f',
        color: hover ? '#e0181f' : '#fff',
        border: `2px solid #e0181f`,
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginLeft: '8px',
        transition: 'all 0.3s ease'
      }}
    >
      Remover
    </button>
  );
}
