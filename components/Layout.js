import Head from "next/head";

import Header from "./Header";
import NavBar from "./NavBar";

import "./Layout.scss";
import "./index.scss";

const Layout = props => {
  const appTitle = `> Dataline Group Oy`;

  return (
    <div className="Layout">
      <Head>
        <title>Dataline Group Oy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <Header appTitle={appTitle} />
      <div className="Content">{props.children}</div>
      <NavBar />
    </div>
  );
};

export default Layout;
