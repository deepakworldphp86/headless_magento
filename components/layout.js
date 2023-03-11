import Link from 'next/link';
import layOutCss from './layout.module.css';
import Navigation from './Navigation';
import HeadArea from './Head';
import Header from './Header';
import Footer from './Footer';


const name = 'Deepak Kumar';
export const siteTitle = 'Magento Headless Website';

export default function Layout({ children, home }) {
  return (
    <div className={layOutCss.container}>
      <HeadArea  />
      <Navigation />
      <Header home />
      <main>
        {children}
      </main>
      {!home && (
        <div className={layOutCss.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <Footer />
    </div>
  );
}