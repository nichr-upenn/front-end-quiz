import React, { Component } from "react";
import Browse from "./Browse";
import CurrencySelector from "./CurrencySelector";
import Item from "./Item";
import "./App.css";
const CURRENCIES = ["USD", "GBP", "EUR"];
export const CurrencyContext = React.createContext({
  currency: "USD"
});
const API = "http://localhost:3001";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemIndex: -1,
      start: 0,
      loadSize: 12,
      itemsLoaded: 0,
      loadMore: true,
      currency: "USD"
    };
    this.fetchBrowseData();
  }
  fetchBrowseData = () => {
    fetch(
      `${API}/browse?start=${this.state.start}&limit=${this.state.loadSize}`,
      { mode: "cors" }
    )
      .then(res => res.json())
      .then(json => {
        const items = this.state.items.concat(json.items);
        this.setState({
          items: items,
          itemsLoaded: items.length,
          start: items.length - 1,
          loadMore: json.totalItems > this.state.itemsLoaded
        });
      });
  };
  handleCurrency = e => {
    console.log(e.target.value);
    this.setState({ currency: e.target.value });
  };
  handleItemClick = i => () => {
    console.log(i);
    this.setState({ itemIndex: i });
  };
  render() {
    return (
      <React.Fragment>
        <nav style={{width:"100%"}}>
          <div style={{position:"relative",width:"100%"}}>
            {this.state.itemIndex !== -1 && (
              <div className="back-nav">
                <button onClick={this.handleItemClick(-1)}>Back</button>
              </div>
            )}
            <CurrencySelector
              handleCurrency={this.handleCurrency}
              currencies={CURRENCIES}
            />
          </div>
        </nav>
        <main>
          <h1 className="App-welcome">Welcome!</h1>
          <CurrencyContext.Provider value={this.state.currency}>
            {this.state.itemIndex === -1 ? (
              <Browse
                items={this.state.items}
                handleItemClick={this.handleItemClick}
                handleLoadClick={this.fetchBrowseData}
              />
            ) : (
              <Item item={this.state.items[this.state.itemIndex]} />
            )}
          </CurrencyContext.Provider>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
