import React from "react";
import { CurrencyContext } from "./App";

import "./Item.css";
const Item = props => {
  const {
    image,
    title,
    seller,
    measurements,
    price,
    description,
    ...item
  } = props.item;
  return (
    <CurrencyContext.Consumer>
      {cur => (
        <div className="item-container">
          <div className="item-image item-el">
            <img src={image} />
          </div>
          <div className="item-detail item-el">
            <h5>{title}</h5>
            <h6>{price ? price.amounts[cur] : "Price Upon Request"}</h6>
            <p style={{fontSize:"1em"}}>
              Measurements:<br />
              {measurements.display}
            </p>
            <div className="item-actions">
              <button className="flat-button">Purchase</button>
              <button className="flat-button">Make Offer</button>
            </div>
          </div>
          <div className="item-description item-el">{description}</div>
        </div>
      )}
    </CurrencyContext.Consumer>
  );
};
export default Item;
