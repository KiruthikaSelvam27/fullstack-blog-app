function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">
            <span>B</span>
          </div>
          <div>
            <p className="header__eyebrow">BlogSpace</p>
            <h1 className="header__title">
              Write. Share. <span>Inspire.</span>
            </h1>
          </div>
        </div>

        <p className="header__subtitle">
          A beautiful space to publish your thoughts and discover stories from the community.
        </p>
      </div>
    </header>
  );
}

export default Header;
