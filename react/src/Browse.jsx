import React from "react";
import { CurrencyContext } from "./App";
import "./Browse.css";

const Item = props => (
  <CurrencyContext.Consumer>
    {cur => (
      <div className="browse-item" onClick={props.handleClick}>
        <div className="browse-item-image">
          <img src={props.item.image} />
        </div>
        <span className="price">
          {props.item.price
            ? props.item.price.amounts[cur]
            : "Price Upon Request"}
        </span>
        <span className="fav">{"<3"}</span>
      </div>
    )}
  </CurrencyContext.Consumer>
);

const Browse = props => (
  <div className="browse">
    <div className="browse-container">
      {props.items.map((item, i) => (
        <Item item={item} handleClick={props.handleItemClick(i)} />
      ))}
    </div>
    <button onClick={props.handleLoadClick}>Load More</button>
  </div>
);
export default Browse;
