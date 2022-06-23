// main Component.

import React from "react";
import axios from "axios";

const baseUrl = "https://deckofcardsapi.com/api/deck";

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, Cartas: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const url = `${baseUrl}/new/shuffle`;
    console.log(url);
    const response = await axios.get(url);
    const data = response.data;
    this.setState({ deck: data });
    console.log(this.state.deck);
  }

  async getCard() {
    // make the request using the id from the fetch data from component Did Mount
    // set state using a new card info
    let id = this.state.deck.deck_id;

    try {
      let cardUrl = `${baseUrl}/${id}/draw`;
      let cardResponse = await axios.get(cardUrl);
      console.log(cardResponse);

      // =============space for validation of 52 cards after we call all of them. ====
      if (!cardResponse.data.success) {
        throw new Error(" No cards ");
      }

      // =============
      let card = cardResponse.data.cards[0];
      console.log(card);
      // to achive the setstate =>   I must  use a callback function" ! that use the  prev state and copy it
      // this.setState({ Cartas: Card });   //! this wont work !
      this.setState((st) => ({
        Cartas: [
          ...st.Cartas,
          {
            id: card.code,
            image: card.image,
            name: `${card.suit} of  ${card.value}`,
          },
        ],
      }));
      console.log(this.state.Cartas);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Deck of cards </h1>
        <button onClick={() => this.getCard()} className="boton">
          get Random
        </button>
      </div>
    );
  }
}

export default Deck;
