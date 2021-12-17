import React from 'react'
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const BoxLoading = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  `
;
export const Loading = () => {
  return (
    <BoxLoading>
        <CircularProgress color="inherit"/>  
        <h5 className="m-3" >Cargando...</h5>  
    </BoxLoading>
  )
}
