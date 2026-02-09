import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Valentine.css';

const Valentine = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') || "Shivu";
    const sender = searchParams.get('sender') || "Ronak";
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ top: '0px', left: '0px' });
    const [noButtonMoving, setNoButtonMoving] = useState(false);
    const cardRef = React.useRef(null);

    const handleNoMove = (e) => {
        // Prevent default only for touch to avoid accidental clicks/scrolls
        if (e.type === 'touchstart') e.preventDefault();
        e.stopPropagation();
        
        setNoButtonMoving(true);
        // Clear the moving state after a short delay
        setTimeout(() => setNoButtonMoving(false), 300);

        if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            // Constrain movement within the card padding/boundaries
            // Subtracting button estimated size (100x40) to keep it fully visible
            const padding = 20;
            const x = Math.random() * (cardRect.width - 120) + padding;
            const y = Math.random() * (cardRect.height - 60) + padding;
            
            setNoButtonPosition({ 
                top: `${y}px`, 
                left: `${x}px`, 
                position: 'absolute',
                zIndex: 1000 
            });
        }
        setNoCount(noCount + 1);
    };

    const getNoButtonText = () => {
        const phrases = [
            "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely sure?",
            "This could be a mistake!",
            "Have a heart!",
            "Don't be so cold!",
            "Change of heart?",
            "Wouldn't you reconsider?",
            "Is that your final answer?",
            "You're breaking my heart ;(",
        ];
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    return (
        <div className={`valentine-container ${yesPressed ? 'valentine-container-2' : ''}`}>
            {yesPressed ? (
                <div className="success-content card">
                    <img 
                        // src="https://media.tenor.com/gUiu1zywCcMAAAAi/bear-kiss-bear-kisses.gif" 
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNndhMTNneXM2MDg1MmZ1amR4eWt2YTE2czlibTVrOXVmazhsOW1wZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l4pTdcifPZLpDjL1e/giphy.gif" 
                        alt="Bears kissing" 
                        className="cat-animation"
                    />
                    <h1 className="success-message">I love you {name?.toUpperCase()}! ❤️</h1>
                    <h1 className="success-message">({sender?.toUpperCase()}) ❤️</h1>
                </div>
            ) : (
                <div className="card" ref={cardRef}>
                    <img 
                        // src="https://media1.tenor.com/m/al4a1pG1fS4AAAAC/vday-valentine.gif"
                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExam9ud3BlaTEwN2FnMGRtaWZidDZidXdka2theXM0anJ4a2hoYWwzYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vDhDcIEmShbUI/giphy.gif" 
                        alt="Cute cat" 
                        className="cat-animation"
                    />
                    <h1 className="question">{name?.toUpperCase()} Will You Be My Valentine?</h1>
                    <p className="no-phrase">{noCount > 0 ? getNoButtonText() : ""}</p>
                    <div className="button-group">
                        <button 
                            className="yes-button"
                            onClick={() => !noButtonMoving && setYesPressed(true)}
                            style={{ 
                                fontSize: `${Math.min(noCount * 8 + 16, 80)}px`,
                                padding: `${Math.min(noCount * 4 + 10, 30)}px ${Math.min(noCount * 8 + 24, 60)}px`
                            }}
                        >
                            Yes
                        </button>
                        {noCount < 16 && (
                            <button 
                                className="no-button"
                                onMouseEnter={handleNoMove}
                                onTouchStart={handleNoMove}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNoMove(e);
                                }}
                                style={noButtonPosition.position ? noButtonPosition : {}}
                            >
                                No
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Valentine;
