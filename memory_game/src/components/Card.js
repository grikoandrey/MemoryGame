import React from "react";
import './Card.css';

class Card extends React.Component {

    cardClickHandler(card) {
        // this.setState({isOpened: !this.props.isOpened});
        this.props.onChoice(card);
    }


    render() {
        return (
            <div className={"card " + (this.props.isShowed ? 'opened' : 'closed')}
                 onClick={this.cardClickHandler.bind(this, this.props.card)}>
                <div className="card-inner card-front">
                    <img src={`/images/${this.props.card.image}`} alt={this.props.card.name}/>
                </div>
                <div className="card-inner card-back">
                    <img src={`/images/question.svg`} alt='question mark'/>
                </div>

            </div>
        )
    }
}

export default Card;