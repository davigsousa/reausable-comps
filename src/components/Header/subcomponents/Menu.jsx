import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  MenuNormal, MenuNormalItem, ActionButton, SmallMenu, MenuBar,
} from './styles';

function Menu({
  links, actionButton, forwardRef, useSmall,
}) {
  const [clicked, setClicked] = useState(false);

  const handleMenu = () => {
    setClicked(!clicked);
  };

  const bar1 = { transform: 'rotate(-45deg) translate(-9px, 6px)' };
  const bar2 = { opacity: 0 };
  const bar3 = { transform: 'rotate(45deg) translate(-8px, -8px)' };

  return (
    <>
      {
        useSmall
          ? (
            <SmallMenu onClick={handleMenu}>
              <MenuBar style={clicked ? bar1 : {}} />
              <MenuBar style={clicked ? bar2 : {}} />
              <MenuBar style={clicked ? bar3 : {}} />
            </SmallMenu>
          )
          : (
            <MenuNormal ref={forwardRef}>
              {
            links.map((link) => (
              <MenuNormalItem key={link.name} to={link.to}>{link.name}</MenuNormalItem>
            ))
          }
              {
            actionButton
              ? (<ActionButton to={actionButton.to}>{actionButton.name}</ActionButton>)
              : ''
          }
            </MenuNormal>
          )
      }

    </>
  );
}

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired, to: PropTypes.string.isRequired,
  })).isRequired,
  actionButton: PropTypes.shape({
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  forwardRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  useSmall: PropTypes.bool.isRequired,
};

Menu.defaultProps = {
  actionButton: undefined,
};

export default Menu;