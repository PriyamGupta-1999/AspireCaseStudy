import { useState } from 'react';
import { useAppContext } from '../../../app/providers/AppProvider';
import './CardDetails.css';
import DownIcon from '../../../assets/down-arrow.png';
import UpIcon from '../../../assets/down-arrow-1.png';
import CardDetailsIcon from '../../../assets/Group 11889.png';
function maskCardNumber(cardNumber: string) {
  const last4 = cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
}

export default function CardDetails() {
  const {
    state: { selectedCardId, cards },
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const card = selectedCardId ? cards[selectedCardId] : null;

  if (!card) {
    return <div className="card-details">No card selected</div>;
  }

    return (
      <section className="card-details-accordion__container">
        <button
          className="card-details-accordion__summary"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <span className="card-details-accordion__summary-content">
            <img src={CardDetailsIcon} alt="" className="card-details-accordion__icon" />
            <span className="card-details-accordion__summary-title">Card details</span>
          </span>
          <img src={open ? UpIcon : DownIcon} alt="toggle" className="card-details-accordion__arrow" />
        </button>
        {open && (
          <div className="card-details-accordion__content">
          <div className="card-details__row">
            <span className="card-details__label">Card name</span>
            <span className="card-details__value">{card.c_name}</span>
          </div>
          <div className="card-details__row">
            <span className="card-details__label">Card number</span>
            <span className="card-details__value">{maskCardNumber(card.cardNumber)}</span>
          </div>
          <div className="card-details__row">
            <span className="card-details__label">Expiry</span>
            <span className="card-details__value">{card.expiryDate}</span>
          </div>
        </div>
      )}
    </section>
  );
}
