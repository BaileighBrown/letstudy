import React from 'react'
import { styled } from '@mui/system'
import DropdownMenu from './DropdownMenu'
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
    position: "absolute",
    right: "0",
    top: "0",
    height: "48px",
    borderBottom: "2px solid #ECD9BA",
    backgroundColor: "#FAF9F6",
    width: "calc(100% - 326px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
  
  });

const Appbar = () => {
  return (
    <MainContainer>
       <ChosenOptionLabel />
    <DropdownMenu
    
    />
    </MainContainer>
  )
}

export default Appbar