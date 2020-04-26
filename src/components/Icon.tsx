import React from 'react';
import {importAll} from 'lib/importAll';

try {importAll(require.context('icons', true, /\.svg$/));} catch (error) {console.log(error);}

interface Props extends React.SVGAttributes<SVGElement> {
  name?: string
}

const Icon: React.FC<Props> = (props) => {
  const {name, children, className, ...rest} = props;
  return (
    <svg className={`icon ${className}`} {...rest}>
      {props.name && <use xlinkHref={'#' + props.name}/>}
    </svg>
  );
};

export default Icon;
