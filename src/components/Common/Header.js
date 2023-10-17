import { StyledHeader, Nav, Logo, Image } from '../Styles/Header.styled'
import { Container } from '../Styles/Container.styled'
//import { Flex } from './styles/Flex.styled'
import { Button } from '../Styles/Button.styled'

const Header = () => {
    return (
        <>
            <StyledHeader>
                <Container>
                    <Nav>
                        <Logo src='./images/logo.svg' alt='' />
                        <Button>Try It Free</Button>
                    </Nav>

                    {/* <Flex> */}
                    <div>
                        <h1>Build The Project Your Client Will Love</h1>

                        <p>
                            Plan smarter, collaborate better and ship faster with SprintOn Services
                        </p>

                        <Button bg='#ff0099' color='#fff'>
                            Get Started For Free
                        </Button>
                    </div>

                    <Image src='./images/illustration-mockups.svg' alt='' />
                    {/* </Flex> */}
                </Container>
            </StyledHeader>
        </>
    )
}

export default Header;