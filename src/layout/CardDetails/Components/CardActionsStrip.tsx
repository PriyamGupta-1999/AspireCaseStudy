import { useAppContext } from '../../../app/providers/AppProvider';
import './CardActionsStrip.css';
import FreezeIcon from '../../../assets/Freeze card@2x.png';
import LimitIcon from '../../../assets/Set spend limit@2x.png';
import GPayIcon from '../../../assets/GPay@2x.png';
import ReplaceIcon from '../../../assets/Replace card@2x.png';
import CancelIcon from '../../../assets/Deactivate card@2x.png';
import { useEffect,useState} from 'react';

const actions = [
  { id: 'freeze', label: 'Freeze card', icon: FreezeIcon },
  { id: 'limit', label: 'Set spend\nlimit', icon: LimitIcon },
  { id: 'gpay', label: 'Add to\nGPay', icon: GPayIcon },
  { id: 'replace', label: 'Replace card', icon: ReplaceIcon },
  { id: 'cancel', label: 'Cancel card', icon: CancelIcon },
];

export default function CardActionsStrip() {
  const { state: { selectedCardId, cards }, toggleFreeze } = useAppContext();
  const card = selectedCardId ? cards[selectedCardId] : null;
  const [isFrozen, setIsFrozen] = useState(card?.isCardFreezed || false);
//   const isFrozen = card?.isCardFreezed;

  console.log('card',card,selectedCardId);
  useEffect(()=>{
    setIsFrozen(card?.isCardFreezed || false);
  },[selectedCardId])


  return (
    <div className="card-actions-strip">
      {actions.map((action, idx) => {
        let label = action.label;
        let onClick: (() => void) | undefined = undefined;
        let clickable = false;
        if (action.id === 'freeze') {
          label = isFrozen ? 'Unfreeze card' : 'Freeze card';
          onClick = () => { if (card) toggleFreeze(card.id); };
          clickable = true;
        }
        return (
          <div
            className={`card-actions-strip__action${clickable ? ' card-actions-strip__action--clickable' : ''}`}
            key={idx}
            onClick={clickable ? onClick : undefined}
            style={clickable ? { cursor: 'pointer' } : {}}
            tabIndex={clickable ? 0 : -1}
            role={clickable ? 'button' : undefined}
            aria-pressed={clickable && isFrozen ? 'true' : undefined}
          >
            <div className="card-actions-strip__icon-wrap">
              <img src={action.icon} alt="" className="card-actions-strip__icon" />
            </div>
            <div className="card-actions-strip__label">
              {label.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < label.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
