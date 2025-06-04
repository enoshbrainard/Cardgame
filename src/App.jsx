import { useState, useEffect } from "react";
import Card from "./Card";
const emojiList = ["😀", "🚀", "🎉", "🍕", "🐱", "🌈", "🎮", "⚽"];
const shuffledEmojis = [...emojiList, ...emojiList] // duplicate for pairs
  .sort(() => Math.random() - 0.5)
  .map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }));

function App() {
  const [cards, setCards] = useState(shuffledEmojis);
  const [flippedCards, setFlippedCards] = useState([]);
  const handleFlip = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.flipped || flippedCards.length == 2) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(newCards);
    setFlippedCards((prev) => [...prev, clickedCard]);
  };
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.emoji === second.emoji) {
        // Match found
        setCards((prev) =>
          prev.map((card) =>
            card.emoji === first.emoji ? { ...card, matched: true } : card
          )
        );
        setFlippedCards([]);
      } else {
        // Not a match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  return (
    <>
      <div className="app">
        <h1 className="text-2xl text-blue-300">Emogi Memory game</h1>
        <div className="grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              emoji={card.emoji}
              flipped={card.flipped}
              onClick={() => handleFlip(card.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
