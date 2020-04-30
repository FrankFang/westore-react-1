import {MainButton} from './button/MainButton';
import {MinorButton} from './button/MinorButton';
import Icon from './Icon';
import React, {ElementRef, MutableRefObject, ReactNode, Ref, useRef} from 'react';
import styled from 'styled-components';
import vars from '_vars.scss';

const Wrapper = styled.div`
  position:fixed; bottom: 0; left: 0; width: 100%; padding: 8px 16px;
  display:flex; justify-content: space-between;
  background: white; box-shadow: 0 0 3px ${vars.colorShadow};
  > button:first-child{
    flex-grow: 1;
  }
  > button:nth-child(2){
    flex-grow: 0;
  }
  > button + button{
    margin-left: 8px;
  }
`;

interface Props {
  goodId: number | string;
  element?: MutableRefObject<HTMLElement | null>;
}

const addToCart = (from: HTMLElement, to: HTMLElement) => {
  const {left, top, width, height} = from.getBoundingClientRect();
  const clone = from.cloneNode(true) as HTMLElement;
  Object.assign(clone.style, {
    left: left + 'px', top: top + 'px', width: width + 'px', height: height + 'px',
    position: 'fixed', transition: 'transform 1000ms', borderRadius: '50%',
    transformOrigin: 'center center', zIndex: 1
  });
  const {left: left2, top: top2, width: width2, height: height2} = to.getBoundingClientRect();
  const deltaX = (left2 + width2 / 2) - (left + width / 2);
  const deltaY = (top2 + height2 / 2) - (top + height / 2);
  const ratio = Math.min(width2 / width, height2 / height) * 0.5;
  from.after(clone);
  clone.getBoundingClientRect();
  Object.assign(clone.style, {
    transform: `translate(${deltaX}px, ${deltaY}px) scale(${ratio})`,
  });
  const after = () => {
    clone.removeEventListener('transitionend', after);
    clone.remove();
  };
  clone.addEventListener('transitionend', after);
};
export const CartBar: React.FC<Props> = (props) => {
  const button = useRef<HTMLButtonElement>(null);
  return (
    <Wrapper>
      <MainButton onClick={() => addToCart(props.element!.current!, button.current!)}>加入购物车</MainButton>
      <MinorButton ref={button}><Icon name="cart"/></MinorButton>
    </Wrapper>
  );
};



