import { Flex, Img, Box, Link } from "@chakra-ui/react";
import { BtnNavbar } from "./BtnNavbar";

export function Navbar() {

    return (
        <Flex
            className="bg-slate-600"
            color='white'
            w='100%'
            h='6rem'
            justifyContent='space-between'
            alignItems='center'
            px='8rem'
            boxShadow='0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            >
            <Flex>
                <BtnNavbar nome='Home' direcionar='/' />
                <BtnNavbar nome='Reservar Sala' direcionar='/reserva' />
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    w='11rem'
                    px='2rem'>
                </Flex>
            </Flex>
        </Flex>
    )

}