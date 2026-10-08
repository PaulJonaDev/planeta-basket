import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Planeta Basket. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;