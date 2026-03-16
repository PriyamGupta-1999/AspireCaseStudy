


import { useState } from 'react';
import { useAppContext } from '../../../app/providers/AppProvider';
import './RecentTransaction.css';
import DownIcon from '../../../assets/down-arrow.png';
import UpIcon from '../../../assets/down-arrow-1.png';
import RecentIcon from '../../../assets/Group 11889@2x.png';
import businessIcon from '../../../assets/business-and-finance-1@2x.png';
import nextIcon from '../../../assets/next-1@2x.png';




export default function RecentTransaction() {
  const {
    state: { selectedCardId, cards, transactions },
  } = useAppContext();
  const [open, setOpen] = useState(false);

  const card = selectedCardId ? cards[selectedCardId] : null;
  const list = card?.transactions
    .map((txId) => transactions[txId])
    .filter(Boolean)
    .slice(0, 5);

  if (!card) {
    return <div className="recent-transactions">No transactions available</div>;
  }

  return (
    <section className="recent-transactions-accordion__container">
      <button
        className="recent-transactions-accordion__summary"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="recent-transactions-accordion__summary-content">
          <img src={RecentIcon} alt="" className="recent-transactions-accordion__icon" />
          <span className="recent-transactions-accordion__summary-title">Recent transactions</span>
        </span>
        <img src={open ? UpIcon : DownIcon} alt="toggle" className="recent-transactions-accordion__arrow" />
      </button>
      {open && (
        <div className="recent-transactions-accordion__content">
          <ul className="recent-transactions__list">
            {list && list.length > 0 ? (
              list.map((tx) => (
                <li key={tx.id} className="recent-transactions__item">
                  <div className="recent-transactions__item-avatar" style={{ background: '#e6f9f0' }}>
                    <img src={tx?.icon} alt="" className="recent-transactions__item-icon" />
                  </div>
                  <div className="recent-transactions__item-main">
                    <div className="recent-transactions__item-row">
                      <span className="recent-transactions__item-title">{tx.name}</span>
                     
                    </div>
                    <div className="recent-transactions__item-row recent-transactions__item-row--meta">
                      <span className="recent-transactions__item-date">{tx.date}</span>
                      {/* <span className="recent-transactions__item-status">{tx.transactionDetails}</span> */}
                    </div>
                    <div className="recent-transactions__item-row recent-transactions__item-row--desc">
                        <img  className="recent-transactions__item-desc-img" src={businessIcon} alt="" />
                      <span className="recent-transactions__item-desc">{tx.transactionDetails}</span>
                    </div>
                  </div>

                  <div className='recent-transactions__item-amount_item-row_amount'>
                     <span className={`recent-transactions__item-amount ${tx.isDebited ? 'recent-transactions__item-amount--debit' : 'recent-transactions__item-amount--credit'}`}>{tx.isDebited ? '- ' : '+ '}S$ {tx.amount}</span>
                     <img className="recent-transactions__item-next-icon" src={nextIcon} alt="" role='button' aria-label='View details'/>
                  </div>
                </li>
              ))
            ) : (
              <li className="recent-transactions__empty">No transactions yet.</li>
            )}
          </ul>
          <div className="recent-transactions__cta-row">
            <button className="recent-transactions__cta">View all card transactions</button>
          </div>
        </div>
      )}
    </section>
  );
}
