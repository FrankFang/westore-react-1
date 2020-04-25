import React, {ReactElement, ReactFragment, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {MainButton} from './button/MainButton';

interface Props {
  visible: boolean;
  mask?: {
    visible?: boolean;
    closeOnClick?: boolean;
  };
  title?: string;
  onClose: React.MouseEventHandler;
  buttons?: ReactFragment | ReactElement;
  container?: HTMLElement
}

const Mask = styled.div`
  position:fixed; 
  left: 0;width: 100%; top: 0; height: 100%;
  background: rgba(0,0,0,0.25);
`;
const Wrapper = styled.div`
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  z-index: 2;
  border-radius: 4px;
  min-width: 15em;
  min-height: 2em;
`;
const Header = styled.header`
  padding: 8px 16px; 
  font-size: 1.5em;
`;
const Main = styled.div`
  padding: 8px 16px; 
`;
const Footer = styled.footer`
  display:flex;
  padding: 8px 16px;
  > button{
    flex-grow: 1;
  }
`;
const Dialog: React.FC<Props> = (props) => {
  return props.visible ? (
    ReactDOM.createPortal(
      (
        <>
          {props.mask && (
            <Mask/>
          )}
          <Wrapper>
            <Header>{props.title || '提示'}</Header>
            <Main>{props.children}</Main>
            <Footer>{props.buttons}</Footer>
          </Wrapper>

        </>
      ), props.container ?? document.body
    )
  ) : null;
};
Dialog.defaultProps = {
  mask: {
    visible: true,
    closeOnClick: true
  }
};

const createModal = (content: ReactNode, buttons?: ReactFragment | ReactElement) => {
  const mount = (props: Props, children: ReactNode) => {
    ReactDOM.render(React.createElement(Dialog, props, children), container);
  };
  const onClose = () => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    return true;
  };
  const container = document.createElement('div');
  const props = {
    visible: true,
    container,
    onClose,
    buttons,
  };
  document.body.appendChild(container);
  mount(props, content);
  window.addEventListener('beforeunload', () => onClose);
  return onClose;
};

let latestAlert: ReturnType<typeof alert> | null = null;

const alert = (content: ReactNode, callback?: () => void): () => void => {
  latestAlert?.();
  const close = createModal(content,
    <MainButton onClick={() => {
      close();
      callback?.();
    }}>确定</MainButton>);
  return latestAlert = close;
};


export {Dialog, alert};
