import { useState, useEffect } from 'react';
import './memory-game.css';

const CARD_ICONS = [
  'fa-ghost', 'fa-robot', 'fa-rocket', 'fa-otter', 
  'fa-dragon', 'fa-hippo', 'fa-bolt', 'fa-cloud-moon'
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); 
  const [solved, setSolved] = useState([]);  
  const [_disabled, setDisabled] = useState(false); 

  const initializeGame = () => {
    const duplicatedIcons = [...CARD_ICONS, ...CARD_ICONS];
    const shuffled = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon }));
    
    setCards(shuffled);
    setSolved([]);
    setFlipped([]);
    setDisabled(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeGame();
  }, []);

  const checkMatch = (first, second) => {
    if (cards[first].icon === cards[second].icon) {
      setSolved([...solved, first, second]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className="memory-game-wrapper">
      <div className="game-header">
        <h2><i className="fas fa-brain"></i> Memória Játék</h2>
      </div>
      <button className="btn new-game-btn" onClick={initializeGame}>Új játék</button>
      <div className="card-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          const isSolved = solved.includes(index);

          return (
            <div 
              key={card.id} 
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${isSolved ? 'solved' : ''}`}
              onClick={() => handleClick(index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <i className="fas fa-question"></i>
                </div>
                <div className="card-back">
                  <i className={`fas ${card.icon}`}></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {solved.length === cards.length && cards.length > 0 && (
        <div className="win-message">
          <h4>Gratulálok! Minden párt megtaláltál! 🎉</h4>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;