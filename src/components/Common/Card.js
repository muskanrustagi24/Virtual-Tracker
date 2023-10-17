import { StyledCard } from "../Styles/Card.styled";


export default function Card({ item: { title, body } }) {
  return (
    <StyledCard>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>

      {/* <div>
        <img src={`./images/${image}`} alt='' />
      </div> */}
    </StyledCard>
  )
}