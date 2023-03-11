import React from "react";
import Image from "next/image";
import layOutCss from './layout.module.css';
var name = 'Deepak Kumar';

  const Header = (home) => {
  return (
     
    <header className={layOutCss.header}>
    {home ? (
      <>
        <Image
          priority
          src="/images/profile.jpg"
          className={layOutCss.borderCircle}
          height={144}
          width={144}
          alt=""
        />
        <h1 className={layOutCss.heading2Xl}>{name}</h1>
      </>
    ) : (
      <>
        <Link href="/">
          <Image
            priority
            src="/images/profile.jpg"
            className={layOutCss.borderCircle}
            height={108}
            width={108}
            alt=""
          />
        </Link>
        <h2 className={layOutCss.headingLg}>
          <Link href="/" className={layOutCss.colorInherit}>
            {name}
          </Link>
        </h2>
      </>
    )}
  </header>
  );
};
export default Header;