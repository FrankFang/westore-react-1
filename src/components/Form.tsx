import styled from 'styled-components';

export const Form = styled.form`
  padding: 0 16px;
`;
export const FormRow = styled.div`
  margin: 8px 0;
  display:flex;
  > * + * {
    margin-left: 8px; 
  }
`;


