import React, {useRef} from 'react';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import {ShapedDiv} from '../components/ShapedDiv';
import {Img} from '../components/Img';
import {Loading} from '../components/Loading';
import styled from 'styled-components';
import {Panel} from '../components/Panel';
import {useGood} from '../hooks/useGood';
import {Money} from '../components/Money';
import vars from '_vars.scss';
import {Space} from '../components/Space';
import {CartBar} from '../components/CartBar';

const Cover = styled.div`
  background:white;
`;
const Price = styled.p`
  font-size: 18px;
  color: ${vars.colorDanger};
`;

const _Good: React.FC<RouteComponentProps<{ shopId: string, id: string }>> = (props) => {
  const {shopId, id} = props.match.params;
  const {good} = useGood(id);
  const cover = useRef<HTMLDivElement>(null);
  return (
    <Layout title={'商品详情'} action={
      <Link to={`/admin/shops/${shopId}/goods/${id}/edit`}><Icon name="edit"/></Link>
    }>
      {good ?
        <>
          <Cover ref={cover}>
            <ShapedDiv>
              <Img src={good.imgUrl} alt=""/>
            </ShapedDiv>
          </Cover>


          <Panel>
            <h1>{good.name}</h1>
            <Price><Money>{good.price}</Money></Price>
          </Panel>

          <Panel>
            <h2>详情</h2>
            <p>
              <strong>{good.description}</strong>
            </p>
            <p>
              {good.details}
            </p>
          </Panel>

          <Space/>
          <Space/>
          <Space/>
          <Space/>

        </>
        :
        <Loading/>
      }
    </Layout>

  );
};

export const AdminGood = withRouter(_Good);
