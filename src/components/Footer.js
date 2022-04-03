import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-4" style={{ position: "sticky", bottom: 0 }}>
      <div className="content has-text-centered">
        <p>
          <strong>KKW Events</strong> by{" "}
          <a href="https://jgthms.com">Yash.k and Ajay.c</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
