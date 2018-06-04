import React from "react";

export default props => (
  <div className="cur-sel">
    {props.currencies.map(item => (
      <React.Fragment>
        <label htmlFor={`currency-${item}`}>
          {item}
          <input
            type="radio"
            onChange={props.handleCurrency}
            id={`currency-${item}`}
            name="currency"
            value={item}
          />
        </label>
      </React.Fragment>
    ))}
  </div>
);
