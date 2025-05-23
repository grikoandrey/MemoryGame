import config from "./config";
import React from "react";
import Card from "./components/Card";
import './App.css';
import Popup from 'reactjs-popup';

class App extends React.Component {

    constructor() {
        super();
        this.state = {cards: [], clicks: 0, isPopupOpened: false};
    }

    componentDidMount() {
        this.startGame();
    }

    startGame() {
        this.setState({cards: this.prepareCards(), clicks: 0, isPopupOpened: false})
    }

    prepareCards() {
        let id = 1;
        return [...config.cards, ...config.cards]
            .sort(() => Math.random() - 0.5)
            .map(card => ({...card, id: id++, isOpened: false, isCompleted: false}))
    };

    choiceCardHandler(openedCard) {
        if (openedCard.isCompleted || this.state.cards.filter(card => card.isOpened).length >= 2) {
            return
        }

        this.setState({
            cards: this.state.cards.map(card => {
                return card.id === openedCard.id ? {...card, isOpened: true} : card
            }),
        }, () => {
            this.processChoosingCards();
        });

        this.setState({
            clicks: this.state.clicks + 1
        })
    };

    processChoosingCards() {
        const openedCards = this.state.cards.filter(card => card.isOpened);
        if (openedCards.length === 2) {
            if (openedCards[0].name === openedCards[1].name) {
                this.setState({
                    cards: this.state.cards.map(card => {
                        if (card.id === openedCards[0].id || card.id === openedCards[1].id) {
                            card.isCompleted = true;
                        }
                        card.isOpened = false;
                        return card;
                    })
                }, () => {
                    this.checkForAllCompletedCards();
                });
            } else {
                setTimeout(() => {
                    this.setState({
                        cards: this.state.cards.map(card => {
                            card.isOpened = false;
                            return card;
                        })
                    });
                }, 1000)
            }
        }
    };

    checkForAllCompletedCards() {
        if (this.state.cards.every(card => card.isCompleted)) {
            this.setState({
                isPopupOpened: true
            })
        }
    };

    closePopup() {
        this.setState({
            isPopupOpened: false
        });
        this.startGame();
    };

    render() {
        return (
            <div className="App">
                <header className="header">Memory Game</header>
                <div className="game">
                    <div className="score">Нажатий: {this.state.clicks}</div>
                </div>
                <div className="cards">
                    {this.state.cards.map(card => (
                        <Card card={card} key={card.id} isShowed={card.isOpened || card.isCompleted}
                              onChoice={this.choiceCardHandler.bind(this)}/>
                    ))}
                </div>

                <Popup open={this.state.isPopupOpened} closeOnDocumentClick onClose={this.closePopup.bind(this)}>
                    <div className="modal">
                        <span className="close" onClick={this.closePopup.bind(this)}>
                            &times;
                        </span>
                        Игра завершена! Ваш результат: {this.state.clicks} кликов!
                    </div>
                </Popup>
            </div>
        );
    };
}

export default App;