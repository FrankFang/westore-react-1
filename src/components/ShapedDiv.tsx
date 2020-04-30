import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position:relative;
  height: 0;
  padding-top: 100%;
  > div{
    position:absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    img {max-width: 100%; max-height: 100%;}
  }
`;

interface Props {
  ratio?: number;
}

const ShapedDiv: React.FC<Props> = (props) => {
  const {children, ratio} = props;
  const paddingTop = ratio! * 100 + '%';

  return (
    <Wrapper style={{paddingTop}}>
      <div>
        {children}
      </div>
    </Wrapper>
  );
};


ShapedDiv.defaultProps = {
  ratio: 1
};

export {ShapedDiv};
