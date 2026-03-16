import { useEffect, useMemo, useState, useRef } from 'react'
import { useAppContext } from '../../../../app/providers/AppProvider'

import './CardSlider.css'
import VisibilityIcon from '@mui/icons-material/Visibility';

import AspireLogo1x from '../../../../assets/Aspire Logo-1@2x.png'
import VisaLogo from '../../../../assets/visa Logo.png'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
function maskCardNumber(cardNumber: string) {
    const last4 = cardNumber.slice(-4)
    return ['●●●●', '●●●●', '●●●●', last4]
}

function formatCardNumber(cardNumber: string) {
    // Group into 4s: 1234 5678 9012 3456(
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ').trim().split(' ')
}

export default function CardSlider({ CARDS_PER_SLIDE = 1 }: { CARDS_PER_SLIDE: number }) {
    const {
        state: { cards, cardIds, loading },
        dispatch,
    } = useAppContext()

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
    const [showNumber, setShowNumber] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setShowNumber(false)
    }, [currentSlide])

    const cardList = useMemo(
        () => cardIds.map((id) => cards[id]).filter((card) => Boolean(card)),
        [cardIds, cards],
    )

    // Calculate how many full slides (for dots) based on fractional slides in viewport
    const totalSlides = Math.max(1, cardList.length - Math.floor(CARDS_PER_SLIDE) + 1)

    const handleDotClick = (idx: number) => {
        setCurrentSlide(idx);
        if (sliderRef.current) {
            const scrollTo = idx * sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
        // Dispatch select card for the card at this index
        if (cardList[idx]) {
            dispatch({ type: 'SELECT_CARD', payload: cardList[idx].id });
        }
    }

    // Move to next/prev slide on scroll
    const handleScroll = () => {

        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth
            const idx = Math.round(sliderRef.current.scrollLeft / slideWidth)
         //   console.log('idx', idx)
            setCurrentSlide(idx)
            if (cardList[idx]) {
                dispatch({ type: 'SELECT_CARD', payload: cardList[idx].id });
            }
        }
    }

    if (loading) {
        return <div className="card-slider__loading">Loading cards…</div>
    }

    if (!cardList.length) {
        return <div className="card-slider__empty">No cards available.</div>
    }

    return (
        <section className="card-slider" aria-label="Card carousel">
            <div
                className="card-slider__list card-slider__list--slider"
                ref={sliderRef}
                onScroll={handleScroll}
                style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', display: 'flex' }}
                role="list"
            >
                {cardList.map((card, idx) => {
                    const isCurrent = idx === currentSlide
                    return (
                        <div
                            key={card.id}
                            className={`card-slider__item${isCurrent ? ' card-slider__item--active' : ''}${card.isCardFreezed ? ' card-slider__item--frozen' : ''
                                }`}
                            role="listitem"
                            style={{
                                flex: `0 0 calc(${100 / CARDS_PER_SLIDE}% - 16px / ${CARDS_PER_SLIDE})`,
                                width: `calc(${100 / CARDS_PER_SLIDE}% - 16px / ${CARDS_PER_SLIDE})`,
                                // marginRight: idx === cardList.length - 1 ? 0 : 16,
                                scrollSnapAlign: 'start',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isMobile ? 'flex-end' : 'space-between',
                                overflow: 'hidden',
                                background: 'transparent',
                                // border:'2px solid red'
                                // padding: '40px',
                                // height:'15rem'
                            }}
                        >

                            <button
                                type="button"
                                className="card-slider__toggle"
                                onClick={e => {
                                    e.stopPropagation();
                                    setShowNumber((prev) => !prev)
                                }}
                            //   style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
                            >
                                <VisibilityIcon />{showNumber ? 'Hide card number' : 'Show card number'}
                            </button>
                            <div className="card-slider__inner" style={{ position: 'relative' }}>

                                <div className="card-card__logo_name">
                                    <img src={AspireLogo1x} alt="" className='card-slider__logo' />

                                </div>

                                <div className="card-slider__name">{card?.c_name}</div>
                                <div className="card-slider__number">
                                    {isCurrent && showNumber
                                        ? formatCardNumber(card.cardNumber).map((part, idx) => (
                                            <span key={idx} className="card-slider__number-part">
                                                {part}
                                            </span>
                                        ))
                                        : maskCardNumber(card.cardNumber).map((part, idx) => (
                                            <span key={idx} className="card-slider__number-part">
                                                {part}
                                            </span>
                                        )
                                        )}
                                </div>

                                <div className="card-slider__meta">
                                    <span>Thru: {card.expiryDate}</span>
                                    <span >CVV: <span style={{ fontWeight: '1000', fontSize: '1em', letterSpacing: '3px' }}>{isCurrent && showNumber ? card.cvv : '***'}</span></span>
                                </div>

                                <div className="card-slider__bottom-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                                    {card.isCardFreezed && (<span className="card-slider__freeze-status" style={{ fontWeight: 600, fontSize: '1em', color: card.isCardFreezed ? '#0C365A' : '#01D167', background: card.isCardFreezed ? '#e3eaf6' : '#e6f9f0', borderRadius: 8, padding: '4px 12px' }}>
                                        Frozen
                                    </span>)}
                                    <div className="card-slider__visa_logo">
                                        <img src={VisaLogo} className='card-slider__visa_logo-img' alt="Visa Logo" />
                                    </div>
                                </div>

                            </div>


                        </div>
                    )
                })}

            </div>
            <div className="card-slider__dots">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`card-slider__dot${idx === currentSlide ? ' card-slider__dot--active' : ''}`}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {!isMobile && (
                <button
                    type="button"
                    className="card-slider__toggle"
                    onClick={e => {
                        e.stopPropagation();
                        setShowNumber((prev) => !prev)
                    }}
                //   style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
                >
                    <VisibilityIcon />{showNumber ? 'Hide card number' : 'Show card number'}
                </button>
            )}

        </section>
    )
}
