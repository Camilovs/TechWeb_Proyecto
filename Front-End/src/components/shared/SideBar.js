import React from 'react'

export const SideBar = ({MenuItems, setMenuSelect, menuSelected}) => {

  const handleSelectMenu = (e) => {
    e.preventDefault()
    const nombreMenu = e.target.name
    setMenuSelect(nombreMenu)
  }
  
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-white " 
    // <div className="d-flex flex-column flex-shrink-0 p-3 " 
      style={{
        height:'100%'
      }}>
      <a href="/encargado" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Bienvenido/a</span>
      </a>
      <hr/>
      <ul className="nav nav-pills red flex-column mb-auto w-100">
        {MenuItems.map((menu,i)=>{
          return(
            <li key={i}>
              <a
                href="#"
                name={menu.label}
                className={`nav-link link-dark`}
                onClick={handleSelectMenu}
                style={{
                  fontSize:18, 
                  fontWeight:"", 
                  height:50, 
                  cursor: 'pointer',
                  backgroundColor:`${(menuSelected === menu.label) ? "#E6E6E6" : "white"} `,
                  // color:`${(menuSelected === menu.label) ? "white" : "black"} `,
                  display:'flex',
                  alignItems:'center',
                  margin: 2
                }}
              >
                <i className={menu.icon} style={{marginRight:"10px"}}/>
              {menu.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
