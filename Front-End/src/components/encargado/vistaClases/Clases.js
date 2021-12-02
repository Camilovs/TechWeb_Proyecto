import React, {useState } from 'react'
import styled from 'styled-components';
import { AsignarSala } from './AsignarSala';
import { Solicitudes } from './Solicitudes/Solicitudes';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const Box= styled.div`
  width: 98%;
  height: 100%;
  margin-top: 30px;
`;

const MyTabs = styled(Tabs)`
  &&{
    border-bottom: 1px solid #C4C4C4;
    color: red;
    margin-bottom: 20px;
    
    & .MuiTabs-indicator{
      background-color: #1890ff;
    }
  }
`
const MyTab = styled((props) => <Tab disableRipple {...props} />)`
  &&{
    text-transform: none;
    font-size: 17px;
  }
`;
export const Clases = () => {

  const [tabSeleccion, setTabSeleccion] = useState(0);
  const handleChange = (event, newValue) => {
    setTabSeleccion(newValue);
  };
  return (
    <Box>
      <div className=" container mt-3">
        <h3 >Clases</h3>
        <MyTabs value={tabSeleccion} onChange={handleChange}>
          <MyTab label='Solicitudes'/>
          <MyTab label='Asignar Sala'/>
        </MyTabs>
        {tabSeleccion === 0 ? (
          <Solicitudes/>
        ):(
          <AsignarSala/>
        )}
      </div>


    </Box>
  )
}
