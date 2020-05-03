import {MainButton} from './button/MainButton';
import {MinorButton} from './button/MinorButton';
import Icon from './Icon';
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import vars from '_vars.scss';
import {defaultHttpClient} from '../lib/HttpClient';
import {Link} from 'react-router-dom';
import {useCart} from '../hooks/useCart';

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
  > * + *{
    margin-left: 8px;
  }
`;

interface Props {
  goodId: number | string;
  shopId: number | string;
  number?: number;
  element?: MutableRefObject<HTMLElement | null>;
}

export const CartBar: React.FC<Props> = (props) => {
  const {shopId, goodId} = props;
  const button = useRef<HTMLButtonElement>(null);
  const {cart} = useCart();
  const [count, setCount] = useState<number | undefined>(0);

  const addToCart = useCallback(async (
    from: HTMLElement, to: HTMLElement,
    callback?: () => void) => {
    const found = cart?.filter(({shop, goods}) => {
      if (shop.id === shopId) {
        return goods.filter(g => g.id === goodId);
      } else {
        return false;
      }
    });
    await defaultHttpClient.post(`/shoppingCart`, {goods: [{id: goodId, number: 1}]}, {autoHandlerError: true});
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
      callback?.();
      clone.removeEventListener('transitionend', after);
      clone.remove();
    };
    clone.addEventListener('transitionend', after);
  }, [cart, shopId, goodId]);


  useEffect(() => {
    setCount(cart?.length || undefined);
  }, [cart]);
  const onClick = () => {
    addToCart(
      props.element!.current!,
      button.current!,
      () => {
        setCount(x => (x ?? 0) + 1);
      });
  };
  return (
    <Wrapper>
      <MainButton onClick={onClick}>加入购物车</MainButton>
      <Link to="/cart">
        <MinorButton ref={button} badge={count?.toString()}><Icon name="cart"/></MinorButton>
      </Link>
    </Wrapper>
  );
};
CartBar.defaultProps = {
  number: 1
};


