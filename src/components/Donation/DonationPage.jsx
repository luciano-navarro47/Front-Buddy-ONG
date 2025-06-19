import React from "react";
import { Box } from "@chakra-ui/react"
import OneTimeDonation from "./OneTimeDonation"
import Subscription from "./Subscription";

export default function DonationPage(){
    return (
        <Box minH="100vh" bg="brand.background" pb={5}>
            <OneTimeDonation />
            <Subscription />
        </Box>
    )
}