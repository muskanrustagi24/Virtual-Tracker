import styled from 'styled-components'

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  background-color: lightpink;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px;
  padding: 60px;
  flex-direction: ${({ layout }) => layout || 'column'};
  img {
    width: 80%;
  }

`