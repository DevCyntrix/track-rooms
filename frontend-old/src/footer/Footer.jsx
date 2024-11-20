import React from 'react';
import './Footer.css'; // Importiere das CSS für die Styling-Regeln
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Links() {
    return (
      <ul className="Links">
        <li><a href="/impressum">Impressum</a></li>
        <li><a href="/datenschutz">Datenschutz</a></li>
        <li><a href="/cookies">Cookies</a></li>
      </ul>
    );
  }

  function Icons() {
    return (
      <ul className="Icons">
        <li><a href="https://www.instagram.com/officialhwrberlin/"><FaInstagram /></a></li>
        <li><a href="https://www.youtube.com/channel/UCl91CT5O62lr8JFIdozM7zw"><FaYoutube /></a></li>
        <li><a href="https://twitter.com/HWR_Berlin"><FaTwitter /></a></li>
      </ul>
    );
  }

function Footer() {
    return (
        <div className="Footer">
        <Links/>
        <Icons/>
        </div>
    );
}

export default Footer;