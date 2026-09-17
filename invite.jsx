import { useState, useRef, useCallback, useEffect } from "react";
const NAMES = { a: "Abdul Rehman", b: "Nameera", initials: "A & N" };
/* ========================================================= CUSTOMIZE THESE VALUES ========================================================= */
const MAP_LINK = "https://maps.app.goo.gl/g8B9LLnDbaDKLire8";
const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2023/04/17/audio_3e8a741ad4.mp3?filename=gentle-ambient-piano-105839.mp3";
const DETAILS = {
  eyebrow: "Together with their families",
  lede: "request the pleasure of your presence as they celebrate the beginning of a beautiful new journey together",
  day: "Sunday, the 27th of September 2027",
  dateTime: "2027 · 4:30 in the afternoon",
  venue: "Bagh Restaurant",
  location: "DHA Lahore, Punjab",
  familyGatheringTitle: "Family Gathering",
  familyGatheringText:
    "Join both families for an intimate gathering, warm conversations and beautiful memories before the celebration.",
  familyGatheringLocation:
    "Bagh Restaurant Gold Crest Mall DHA Phase 4 · Lahore, Punjab",
  /* Pakistan Standard Time = UTC +05:00 */ countdownTarget:
    "2026-09-27T18:30:00+05:00",
};
/* ========================================================= COUNTDOWN ========================================================= */ function getTimeLeft(
  target,
) {
  const difference = new Date(target).getTime() - Date.now();
  if (!Number.isFinite(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    expired: false,
  };
}
function pad(value) {
  return String(value).padStart(2, "0");
}
/* ========================================================= MAIN COMPONENT ========================================================= */ export default function EnvelopeInvitation() {
  const [opened, setOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(DETAILS.countdownTarget),
  );
  const audioRef = useRef(null);
  const openTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  /* ======================================================= LIVE COUNTDOWN ======================================================= */ useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(getTimeLeft(DETAILS.countdownTarget));
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  /* ======================================================= OPEN INVITATION ======================================================= */ const openInvitation =
    useCallback(() => {
      if (opened) return;

      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.35;
        audio.loop = true;
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }

      setOpened(true);
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = setTimeout(() => {
        setShowCard(true);
      }, 700);
    }, [opened]);
  /* ======================================================= RESET / REPLAY ======================================================= */ const reset =
    useCallback(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      setShowCard(false);
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => {
        setOpened(false);
      }, 300);
    }, []);
  /* ======================================================= CLEANUP ======================================================= */ useEffect(() => {
    return () => {
      clearTimeout(openTimeoutRef.current);
      clearTimeout(closeTimeoutRef.current);
    };
  }, []);
  /* ======================================================= KEYBOARD ======================================================= */ const handleKeyDown =
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation();
      }
    };
  /* ======================================================= RENDER ======================================================= */ return (
    <div className="wedding-root">
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" loop />
      <style>{CSS}</style>
      {/* ================================================= BACKGROUND ================================================= */}{" "}
      <div className="background-pattern" />{" "}
      <div className="floating-petals">
        {" "}
        <span>✦</span> <span>❀</span> <span>✦</span> <span>❀</span>{" "}
        <span>✦</span> <span>❀</span>{" "}
      </div>{" "}
      {/* ================================================= REPLAY BUTTON ================================================= */}{" "}
      <button
        className={`replay-button ${showCard ? "show" : ""}`}
        onClick={reset}
        type="button"
        aria-label="Open invitation again"
      >
        {" "}
        ↻ Open Again{" "}
      </button>{" "}
      {/* ================================================= MAIN STAGE ================================================= */}{" "}
      <main className="stage">
        {" "}
        {/* ================================================= ENVELOPE ================================================= */}{" "}
        <div
          className={`envelope-wrap ${opened ? "opened" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Open wedding invitation"
          onClick={openInvitation}
          onKeyDown={handleKeyDown}
        >
          {" "}
          <div className="envelope">
            {" "}
            <div className="envelope-back" /> <div className="envelope-left" />{" "}
            <div className="envelope-right" />{" "}
            <div className="envelope-bottom" />{" "}
            {/* Invitation card inside envelope */}{" "}
            <div className="card-peek">
              {" "}
              <div className="mini-card-decoration">
                {" "}
                <span>✦</span> <span> {NAMES.initials} </span>{" "}
                <span>✦</span>{" "}
              </div>{" "}
            </div>{" "}
            {/* Envelope flap */} <div className="envelope-flap" />{" "}
            {/* Wax seal */}{" "}
            <div className="wax-seal">
              {" "}
              <span> {NAMES.initials} </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ================================================= OPEN PROMPT ================================================= */}{" "}
        <div className={`open-prompt ${opened ? "hide" : ""}`}>
          {" "}
          <strong> Tap to open </strong>{" "}
          <span> A little envelope for a beautiful beginning </span>{" "}
        </div>{" "}
        {/* ================================================= INVITATION CARD ================================================= */}{" "}
        <div className={`card-scene ${showCard ? "show" : ""}`}>
          {" "}
          <div className="invitation-card">
            {" "}
            {/* ============================================= DECORATIVE TOP ============================================= */}{" "}
            <div className="arch-decoration">
              {" "}
              <div className="arch-pattern">
                {" "}
                <span>✦</span> <span>❀</span> <span>✦</span>{" "}
              </div>{" "}
              <div className="bismillah">
                {" "}
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ{" "}
              </div>{" "}
            </div>{" "}
            <div className="gold-line" />{" "}
            {/* ============================================= EYEBROW ============================================= */}{" "}
            <div className="eyebrow"> {DETAILS.eyebrow} </div>{" "}
            {/* ============================================= TITLE ============================================= */}{" "}
            <h1 className="celebration-title"> In the Name of Love </h1>{" "}
            {/* ============================================= COUPLE ============================================= */}{" "}
            <div className="couple-container">
              {" "}
              <div className="couple-halo">
                {" "}
                <span>❀</span> <span>✦</span> <span>❀</span> <span>✦</span>{" "}
              </div>{" "}
              {/* Bride */}{" "}
              <div className="person bride">
                {" "}
                <div className="bride-head">
                  {" "}
                  <div className="veil" /> <div className="face" />{" "}
                  <div className="hair" />{" "}
                </div>{" "}
                <div className="bride-body">
                  {" "}
                  <div className="dupatta" /> <div className="lehenga" />{" "}
                  <div className="dress-detail" />{" "}
                </div>{" "}
              </div>{" "}
              {/* Groom */}{" "}
              <div className="person groom">
                {" "}
                <div className="groom-head">
                  {" "}
                  <div className="turban">
                    {" "}
                    <span className="turban-feather"> ✦ </span>{" "}
                  </div>{" "}
                  <div className="groom-face" />{" "}
                </div>{" "}
                <div className="groom-body">
                  {" "}
                  <div className="sherwani">
                    {" "}
                    <div className="sherwani-buttons">
                      {" "}
                      <i /> <i /> <i />{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="shawl" />{" "}
                </div>{" "}
              </div>{" "}
              {/* Hands */}{" "}
              <div className="couple-hands">
                {" "}
                <span /> <span /> <b>♥</b>{" "}
              </div>{" "}
            </div>{" "}
            {/* ============================================= INTRODUCTION ============================================= */}{" "}
            <p className="lede"> {DETAILS.lede} </p>{" "}
            {/* ============================================= DIVIDER ============================================= */}{" "}
            <div className="ornamental-divider">
              {" "}
              <span>❖</span> <i /> <span>✦</span> <i /> <span>❖</span>{" "}
            </div>{" "}
            {/* ============================================= NAMES ============================================= */}{" "}
            <div className="names">
              {" "}
              <span> {NAMES.a} </span> <em> &amp; </em>{" "}
              <span> {NAMES.b} </span>{" "}
            </div>{" "}
            <div className="urdu-subtitle">
              {" "}
              عبدالرحمن &nbsp; ♥ &nbsp; نائمیرہ{" "}
            </div>{" "}
            <div className="gold-line small" />{" "}
            {/* ============================================= EVENT DETAILS ============================================= */}{" "}
            <div className="details">
              {" "}
              <div className="day"> {DETAILS.day} </div>{" "}
              <div className="time"> {DETAILS.dateTime} </div>{" "}
              <div className="venue">
                {" "}
                <strong> {DETAILS.venue} </strong>{" "}
                <small> {DETAILS.location} </small>{" "}
              </div>{" "}
            </div>{" "}
            {/* ============================================= QUOTE ============================================= */}{" "}
            <div className="quote">
              {" "}
              "Two souls, one beautiful journey, <br /> written with love."{" "}
            </div>{" "}
            <div className="bottom-ornament"> ❀ &nbsp; ✦ &nbsp; ❀ </div>{" "}
            {/* ============================================= RSVP ============================================= */}{" "}
            <div className="rsvp">
              {" "}
              {DETAILS.rsvpBy} <strong> {DETAILS.rsvpContact} </strong>{" "}
            </div>{" "}
            {/* ============================================= FAMILY GATHERING ============================================= */}{" "}
            <section
              className="family-section"
              aria-labelledby="family-gathering-title"
            >
              {" "}
              <div className="section-kicker">
                {" "}
                A little more togetherness{" "}
              </div>{" "}
              <h2 id="family-gathering-title">
                {" "}
                {DETAILS.familyGatheringTitle}{" "}
              </h2>{" "}
              <p> {DETAILS.familyGatheringText} </p>{" "}
              <div className="family-location">
                {" "}
                <span aria-hidden="true"> 📍 </span>{" "}
                <div>
                  {" "}
                  <strong> {DETAILS.familyGatheringLocation} </strong>{" "}
                  <small> Tap below to open the location </small>{" "}
                </div>{" "}
              </div>{" "}
              {/* ========================================= GOOGLE MAPS ========================================= */}{" "}
              <a
                className="map-button"
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open family gathering location in Google Maps"
              >
                {" "}
                📍 Open in Google Maps{" "}
              </a>{" "}
            </section>{" "}
          </div>{" "}
        </div>{" "}
        {/* ================================================= COUNTDOWN ================================================= */}{" "}
        <div className="countdown-bar" aria-live="polite">
          {" "}
          <div className="countdown-label">
            {" "}
            <span className="countdown-heart"> ♥ </span>{" "}
            <span>
              {" "}
              {timeLeft.expired
                ? "The celebration has begun"
                : "Counting down to the celebration"}{" "}
            </span>{" "}
          </div>{" "}
          {!timeLeft.expired && (
            <div className="countdown-units">
              {" "}
              <div>
                {" "}
                <strong> {pad(timeLeft.days)} </strong> <span> Days </span>{" "}
              </div>{" "}
              <i>:</i>{" "}
              <div>
                {" "}
                <strong> {pad(timeLeft.hours)} </strong>{" "}
                <span> Hours </span>{" "}
              </div>{" "}
              <i>:</i>{" "}
              <div>
                {" "}
                <strong> {pad(timeLeft.minutes)} </strong>{" "}
                <span> Min </span>{" "}
              </div>{" "}
              <i>:</i>{" "}
              <div>
                {" "}
                <strong> {pad(timeLeft.seconds)} </strong>{" "}
                <span> Sec </span>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
/* ========================================================= CSS ========================================================= */ const CSS = ` /* ========================================================= GLOBAL ========================================================= */ * { box-sizing: border-box; } html, body, #root { margin: 0; width: 100%; min-height: 100%; } body { overflow: hidden; } /* ========================================================= ROOT ========================================================= */ .wedding-root { --burgundy: #641f32; --burgundy-dark: #3e1321; --emerald: #17483f; --emerald-dark: #0c302a; --gold: #c8a35b; --gold-light: #e4ca8a; --cream: #fff9ed; --cream-dark: #f4ead4; --ink: #34251f; width: 100%; height: 100vh; position: relative; overflow: hidden; background: radial-gradient( circle at 50% 35%, #315b4e 0%, var(--emerald-dark) 42%, #071b18 100% ); color: var(--cream); font-family: "Jost", sans-serif; } /* ========================================================= GOOGLE FONTS ========================================================= */ @import url( "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap" ); /* ========================================================= BACKGROUND ========================================================= */ .background-pattern { position: absolute; inset: 0; opacity: .1; background-image: radial-gradient( circle at center, transparent 0, transparent 70px, rgba(228,202,138,.7) 71px, transparent 72px ); background-size: 150px 150px; pointer-events: none; } .background-pattern::after { content: ""; position: absolute; inset: 0; background: linear-gradient( 45deg, transparent 48%, rgba(228,202,138,.15) 49%, transparent 50% ); background-size: 40px 40px; } /* ========================================================= FLOATING DECORATIONS ========================================================= */ .floating-petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; } .floating-petals span { position: absolute; color: var(--gold-light); opacity: 0; animation: floatPetal 8s linear infinite; } .floating-petals span:nth-child(1) { left: 12%; animation-delay: 0s; } .floating-petals span:nth-child(2) { left: 27%; animation-delay: 2s; } .floating-petals span:nth-child(3) { left: 46%; animation-delay: 4s; } .floating-petals span:nth-child(4) { left: 64%; animation-delay: 1s; } .floating-petals span:nth-child(5) { left: 80%; animation-delay: 5s; } .floating-petals span:nth-child(6) { left: 92%; animation-delay: 3s; } @keyframes floatPetal { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 15% { opacity: .55; } 80% { opacity: .35; } 100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; } } /* ========================================================= STAGE ========================================================= */ .stage { position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; } /* ========================================================= ENVELOPE ========================================================= */ .envelope-wrap { width: min(78vw, 430px); aspect-ratio: 420 / 280; perspective: 1600px; cursor: pointer; user-select: none; transition: transform 1s cubic-bezier(.6,-.1,.2,1), opacity 1s ease; } .envelope-wrap.opened { transform: translateY(-7vh) scale(.65); opacity: 0; pointer-events: none; } .envelope { position: absolute; inset: 0; transform-style: preserve-3d; } /* ========================================================= ENVELOPE BACK ========================================================= */ .envelope-back { position: absolute; inset: 0; border-radius: 6px; background: linear-gradient( 145deg, var(--burgundy) 0%, var(--burgundy-dark) 100% ); box-shadow: 0 35px 70px rgba(0,0,0,.55), inset 0 0 0 1px rgba(228,202,138,.25); } /* ========================================================= ENVELOPE SIDES ========================================================= */ .envelope-left, .envelope-right, .envelope-bottom { position: absolute; inset: 0; pointer-events: none; } .envelope-left { clip-path: polygon( 0 0, 50% 50%, 0 100% ); background: #53192a; } .envelope-right { clip-path: polygon( 100% 0, 50% 50%, 100% 100% ); background: #491523; } .envelope-bottom { clip-path: polygon( 0 100%, 50% 48%, 100% 100% ); background: #3c111f; } /* ========================================================= CARD PEEK ========================================================= */ .card-peek { position: absolute; left: 9%; right: 9%; top: -7%; bottom: 17%; background: var(--cream); z-index: 3; transition: transform 1.2s cubic-bezier(.2,.8,.2,1); } .envelope-wrap.opened .card-peek { transform: translateY(-240%) scale(1.05); } .mini-card-decoration { color: var(--gold); display: flex; justify-content: center; gap: 18px; padding-top: 25px; font-family: "Cormorant Garamond", serif; font-size: 15px; } /* ========================================================= FLAP ========================================================= */ .envelope-flap { position: absolute; top: 0; left: 0; right: 0; height: 53%; background: linear-gradient( 200deg, #74233a, #4d1727 ); clip-path: polygon( 0 0, 100% 0, 50% 100% ); transform-origin: top center; transition: transform 1s cubic-bezier(.5,0,.2,1); z-index: 5; } .envelope-wrap.opened .envelope-flap { transform: rotateX(178deg); } /* ========================================================= WAX SEAL ========================================================= */ .wax-seal { position: absolute; top: 41%; left: 50%; width: 65px; height: 65px; transform: translate(-50%, -50%); border-radius: 50%; z-index: 8; display: flex; align-items: center; justify-content: center; background: radial-gradient( circle at 35% 30%, #e6c678, #c29a4f 45%, #806128 100% ); color: #4c3416; border: 2px solid rgba(255,255,255,.2); box-shadow: 0 5px 12px rgba(0,0,0,.5), inset 0 2px 5px rgba(255,255,255,.35); transition: transform .6s ease, opacity .5s ease; } .wax-seal span { font-family: "Cormorant Garamond", serif; font-size: 17px; font-weight: 700; } .envelope-wrap.opened .wax-seal { transform: translate(-50%, -50%) scale(.3); opacity: 0; } /* ========================================================= OPEN PROMPT ========================================================= */ .open-prompt { position: absolute; bottom: 95px; left: 50%; transform: translateX(-50%); width: calc(100% - 30px); text-align: center; color: var(--gold-light); animation: promptPulse 2.5s ease-in-out infinite; transition: opacity .4s ease; } .open-prompt strong { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .22em; } .open-prompt span { display: block; margin-top: 8px; font-family: "Cormorant Garamond", serif; font-size: 16px; color: var(--cream); opacity: .65; } .open-prompt.hide { opacity: 0; pointer-events: none; } @keyframes promptPulse { 0%,100% { opacity: .85; } 50% { opacity: .4; } } /* ========================================================= CARD SCENE ========================================================= */ .card-scene { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 45px 12px 105px; overflow: hidden; opacity: 0; pointer-events: none; transition: opacity .9s ease .55s; } .card-scene.show { opacity: 1; pointer-events: auto; } /* ========================================================= INVITATION CARD ========================================================= */ .invitation-card { width: min(90vw, 460px); max-height: calc(100vh - 130px); overflow-y: auto; position: relative; padding: 34px 30px 30px; text-align: center; color: var(--ink); background: radial-gradient( circle at top, #fffdf6, var(--cream) 60%, var(--cream-dark) ); border-radius: 6px; box-shadow: 0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(200,163,91,.4); transform: translateY(30px) scale(.94); opacity: 0; transition: transform 1s cubic-bezier(.2,.8,.2,1) .55s, opacity 1s ease .55s; scrollbar-width: thin; } .card-scene.show .invitation-card { transform: translateY(0) scale(1); opacity: 1; } /* ========================================================= CARD BORDER ========================================================= */ .invitation-card::before { content: ""; position: absolute; inset: 12px; border: 1px solid var(--gold); opacity: .7; pointer-events: none; } .invitation-card::after { content: ""; position: absolute; inset: 17px; border: 1px solid rgba(100,31,50,.18); pointer-events: none; } /* ========================================================= ARCH ========================================================= */ .arch-decoration { position: relative; margin-bottom: 15px; z-index: 2; } .arch-pattern { color: var(--gold); display: flex; justify-content: center; gap: 20px; font-size: 15px; margin-bottom: 8px; animation: gentleFloat 3s ease-in-out infinite; } @keyframes gentleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } } .bismillah { font-family: "Noto Naskh Arabic", serif; font-size: 21px; color: var(--emerald); direction: rtl; } /* ========================================================= GOLD LINES ========================================================= */ .gold-line { width: 90px; height: 1px; margin: 12px auto 18px; background: linear-gradient( 90deg, transparent, var(--gold), transparent ); } .gold-line.small { width: 55px; margin: 13px auto; } /* ========================================================= TEXT ========================================================= */ .eyebrow { font-size: 10px; letter-spacing: .23em; text-transform: uppercase; color: var(--burgundy); margin-bottom: 4px; } .celebration-title { margin: 0; font-family: "Cormorant Garamond", serif; font-size: 27px; font-weight: 500; color: var(--emerald); font-style: italic; }
/* ========================================================= COUPLE ========================================================= */ .couple-container { position: relative; width: 260px; height: 205px; margin: 4px auto 2px; display: flex; justify-content: center; align-items: flex-end; } .couple-halo { position: absolute; width: 165px; height: 165px; border-radius: 50%; border: 1px solid rgba(200,163,91,.4); top: 8px; left: 50%; transform: translateX(-50%); display: flex; align-items: flex-start; justify-content: space-around; padding-top: 4px; color: var(--gold); font-size: 12px; animation: haloRotate 15s linear infinite; } @keyframes haloRotate { to { transform: translateX(-50%) rotate(360deg); } } /* ========================================================= PEOPLE ========================================================= */ .person { position: relative; width: 100px; height: 190px; animation: coupleFloat 3.5s ease-in-out infinite; } .groom { animation-delay: .2s; } @keyframes coupleFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } } /* ========================================================= BRIDE HEAD ========================================================= */ .bride-head { position: absolute; width: 58px; height: 70px; left: 23px; top: 10px; z-index: 3; } .face { position: absolute; width: 43px; height: 52px; left: 8px; top: 10px; border-radius: 48% 48% 45% 45%; background: #d9a77e; } .hair { position: absolute; width: 55px; height: 62px; left: 2px; top: 2px; border-radius: 50% 50% 40% 40%; background: #241817; z-index: -1; } .veil { position: absolute; width: 72px; height: 94px; left: -7px; top: -3px; border-radius: 50% 50% 20% 20%; background: linear-gradient( 135deg, rgba(100,31,50,.96), rgba(76,20,35,.88) ); border: 1px solid var(--gold); z-index: 5; clip-path: polygon( 20% 0, 80% 0, 100% 100%, 0 100% ); opacity: .95; } /* ========================================================= BRIDE BODY ========================================================= */ .bride-body { position: absolute; left: 4px; top: 72px; width: 92px; height: 118px; } .dupatta { position: absolute; left: 3px; top: -5px; width: 86px; height: 115px; background: linear-gradient( 90deg, transparent, rgba(200,163,91,.35), transparent ); border-left: 2px solid var(--gold); border-right: 2px solid var(--gold); border-radius: 50%; } .lehenga { position: absolute; left: 3px; bottom: 0; width: 88px; height: 90px; clip-path: polygon( 25% 0, 75% 0, 100% 100%, 0 100% ); background: linear-gradient( 120deg, #a34963, #bb3f60, #881c3c ); border-bottom: 3px solid var(--gold); } .dress-detail { position: absolute; left: 31px; top: 25px; width: 30px; height: 30px; border: 1px solid var(--gold); transform: rotate(45deg); opacity: .8; } /* ========================================================= GROOM ========================================================= */ .groom-head { position: absolute; width: 62px; height: 75px; left: 19px; top: 7px; z-index: 3; } .groom-face { position: absolute; width: 43px; height: 53px; left: 10px; top: 17px; border-radius: 48% 48% 45% 45%; background: #bd895f; } .turban { position: absolute; width: 65px; height: 39px; left: -1px; top: 0; border-radius: 55% 55% 20% 20%; background: linear-gradient( 145deg, #163e36, #1e594d ); border: 1px solid var(--gold); z-index: 4; } .turban::after { content: ""; position: absolute; left: 10px; right: 10px; top: 11px; height: 2px; background: var(--gold); box-shadow: 0 7px rgba(200,163,91,.55); } .turban-feather { position: absolute; right: -6px; top: -9px; color: var(--gold); font-size: 19px; } /* ========================================================= GROOM BODY ========================================================= */ .groom-body { position: absolute; left: 7px; top: 74px; width: 86px; height: 116px; } .sherwani { position: absolute; width: 72px; height: 112px; left: 7px; background: linear-gradient( 145deg, #deee85, #91ad11 ); clip-path: polygon( 20% 0, 80% 0, 100% 100%, 0 100% ); border-bottom: 3px solid var(--gold); } .sherwani-buttons { position: absolute; left: 50%; top: 22px; transform: translateX(-50%); display: flex; flex-direction: column; gap: 10px; } .sherwani-buttons i { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); } .shawl { position: absolute; right: 2px; top: 4px; width: 38px; height: 100px; border-left: 2px solid var(--gold); transform: rotate(-4deg); opacity: .7; } /* ========================================================= HANDS ========================================================= */ .couple-hands { position: absolute; bottom: 45px; left: 50%; transform: translateX(-50%); width: 90px; display: flex; justify-content: center; align-items: center; } .couple-hands span { width: 31px; height: 11px; background: #c9926c; border-radius: 20px; } .couple-hands span:first-child { transform: rotate(18deg); } .couple-hands span:nth-child(2) { transform: rotate(-18deg); } .couple-hands b { position: absolute; color: var(--burgundy); font-size: 22px; animation: heartBeat 1.7s ease-in-out infinite; } @keyframes heartBeat { 0%,100% { transform: scale(1); } 50% { transform: scale(1.25); } } /* ========================================================= LEDE ========================================================= */ .lede { max-width: 310px; margin: 5px auto 10px; font-family: "Cormorant Garamond", serif; font-size: 16px; line-height: 1.4; color: #65554a; } /* ========================================================= ORNAMENTAL DIVIDER ========================================================= */ .ornamental-divider { display: flex; align-items: center; justify-content: center; gap: 7px; color: var(--gold); margin: 8px 0; } .ornamental-divider i { width: 35px; height: 1px; background: var(--gold); opacity: .65; } /* ========================================================= NAMES ========================================================= */ .names { display: flex; align-items: center; justify-content: center; gap: 13px; font-family: "Cormorant Garamond", serif; font-size: 32px; font-weight: 600; color: var(--burgundy); line-height: 1; flex-wrap: wrap; } .names em { font-size: 23px; color: var(--gold); font-weight: 400; } .urdu-subtitle { font-family: "Noto Naskh Arabic", serif; direction: rtl; color: var(--emerald); font-size: 17px; margin-top: 7px; } /* ========================================================= DETAILS ========================================================= */ .details { font-family: "Cormorant Garamond", serif; font-size: 20px; line-height: 1.3; } .day { color: var(--burgundy); font-family: "Jost", sans-serif; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; } .time { margin-top: 2px; } .venue { margin-top: 8px; font-size: 18px; color: var(--emerald); } .venue strong { display: block; } .venue small { display: block; font-family: "Jost", sans-serif; font-size: 11px; color: #7d6c60; margin-top: 2px; } /* ========================================================= QUOTE ========================================================= */ .quote { margin: 12px auto 8px; font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 14px; color: #806c5c; } /* ========================================================= BOTTOM ========================================================= */ .bottom-ornament { color: var(--gold); font-size: 13px; margin: 6px 0; } .rsvp { font-size: 9px; text-transform: uppercase; letter-spacing: .12em; color: #806f63; } .rsvp strong { display: block; margin-top: 3px; font-family: "Cormorant Garamond", serif; font-size: 15px; letter-spacing: normal; text-transform: none; color: var(--ink); } /* ========================================================= FAMILY GATHERING ========================================================= */ .family-section { position: relative; z-index: 3; margin: 18px auto 4px; padding: 15px 15px 14px; max-width: 350px; border: 1px solid rgba(200,163,91,.42); border-radius: 12px; background: rgba(255,255,255,.34); } .section-kicker { font-size: 8px; text-transform: uppercase; letter-spacing: .18em; color: var(--burgundy); margin-bottom: 4px; } .family-section h2 { margin: 0; font-family: "Cormorant Garamond", serif; color: var(--emerald); font-size: 21px; font-weight: 600; } .family-section p { margin: 5px auto 10px; max-width: 300px; font-family: "Cormorant Garamond", serif; color: #6c5b50; font-size: 14px; line-height: 1.35; } .family-location { display: flex; align-items: center; gap: 9px; text-align: left; padding: 9px; border-radius: 9px; background: rgba(255,255,255,.55); color: var(--emerald); } .family-location > span { flex: 0 0 auto; width: 29px; height: 29px; display: grid; place-items: center; border-radius: 50%; background: rgba(200,163,91,.16); color: var(--burgundy); font-size: 16px; } .family-location strong { display: block; font-family: "Jost", sans-serif; font-size: 10px; line-height: 1.25; } .family-location small { display: block; margin-top: 2px; color: #806f63; font-size: 8px; } /* ========================================================= GOOGLE MAP BUTTON ========================================================= */ .map-button { min-height: 44px; margin-top: 9px; padding: 10px 14px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border-radius: 999px; text-decoration: none; background: var(--emerald); color: var(--cream); font-size: 9px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; transition: transform .2s ease, background .2s ease; } .map-button:hover { transform: translateY(-2px); background: var(--emerald-dark); } .map-button:focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; } /* ========================================================= COUNTDOWN ========================================================= */ .countdown-bar { position: fixed; left: 50%; bottom: 14px; transform: translateX(-50%); z-index: 12; width: min(92vw, 500px); padding: 9px 14px; border: 1px solid rgba(228,202,138,.35); border-radius: 18px; background: rgba(7,27,24,.78); backdrop-filter: blur(10px); box-shadow: 0 12px 30px rgba(0,0,0,.22); text-align: center; } .countdown-label { display: flex; align-items: center; justify-content: center; gap: 6px; color: var(--gold-light); font-size: 8px; letter-spacing: .16em; text-transform: uppercase; } .countdown-heart { color: var(--gold); font-size: 14px; } .countdown-units { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 3px; } .countdown-units div { min-width: 42px; } .countdown-units strong { display: block; color: var(--cream); font-family: "Cormorant Garamond", serif; font-size: 22px; line-height: 1; } .countdown-units span { display: block; margin-top: 2px; color: rgba(255,249,237,.62); font-size: 7px; text-transform: uppercase; letter-spacing: .08em; } .countdown-units i { color: var(--gold); font-style: normal; font-size: 17px; margin-top: -9px; } /* ========================================================= REPLAY ========================================================= */ .replay-button { position: fixed; top: 20px; right: 20px; z-index: 20; padding: 8px 15px; border: 1px solid rgba(228,202,138,.45); border-radius: 30px; background: rgba(10,38,33,.35); color: var(--gold-light); font-family: "Jost", sans-serif; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; opacity: 0; pointer-events: none; transition: opacity .6s ease, background .2s ease; } .replay-button.show { opacity: .8; pointer-events: auto; } .replay-button:hover { background: rgba(228,202,138,.12); opacity: 1; } /* ========================================================= MOBILE ========================================================= */ @media (max-width: 520px) { .envelope-wrap { width: 86vw; max-width: 400px; } .invitation-card { width: 91vw; max-height: calc(100vh - 120px); padding: 29px 24px 25px; } .celebration-title { font-size: 24px; } .couple-container { transform: scale(.88); margin-top: -4px; margin-bottom: -13px; } .names { font-size: 28px; gap: 9px; } .lede { font-size: 15px; } .bismillah { font-size: 18px; } .replay-button { top: 12px; right: 12px; font-size: 8px; padding: 7px 11px; } .family-section { margin-top: 15px; padding: 14px 12px; } .map-button { width: 100%; font-size: 8px; } .countdown-bar { bottom: 8px; width: 94vw; padding: 8px 7px; } .countdown-label { font-size: 7px; } .countdown-units { gap: 4px; } .countdown-units div { min-width: 36px; } .countdown-units strong { font-size: 19px; } .countdown-units span { font-size: 6px; } .countdown-units i { font-size: 14px; } } /* ========================================================= VERY SMALL PHONES ========================================================= */ @media (max-width: 360px) { .invitation-card { width: 94vw; padding: 25px 18px 22px; } .couple-container { transform: scale(.78); margin-bottom: -28px; } .names { font-size: 25px; } .lede { font-size: 14px; } .countdown-units div { min-width: 31px; } .countdown-units strong { font-size: 17px; } } /* ========================================================= ACCESSIBILITY ========================================================= */ @media (prefers-reduced-motion: reduce) { .wedding-root *, .wedding-root *::before, .wedding-root *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } } `;
