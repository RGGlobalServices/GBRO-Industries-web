export default function Preloader({ visible }) {
  return (
    <div className={`preloader${visible ? '' : ' preloader--hidden'}`}>
      <div className="preloader__inner">
        <div className="preloader__logo">
          <span className="logo-g">G</span>
          <span className="logo-bro">BRO</span>
        </div>
        <div className="preloader__bar">
          <div className="preloader__fill" />
        </div>
        <p className="preloader__text">Initializing Digital Solutions…</p>
      </div>
    </div>
  );
}
