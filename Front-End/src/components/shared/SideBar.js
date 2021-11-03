import React from 'react'

export const SideBar = ({MenuItems, setMenuSelect, menuSelected}) => {

  const handleSelectMenu = (e) => {
    e.preventDefault()
    const nombreMenu = e.target.name
    setMenuSelect(nombreMenu)
  }
  
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-white " style={{width: "280px", height:"100%"}}>
      <a href="/encargado" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        {/* <i className="fa fa-home" style={{width:"30px"}}></i> */}
        <span class="fs-4">Bienvenido/a</span>
      </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      {MenuItems.map((menu)=>{
        return(
          <li>
            <a
              href=""
              name={menu.label}
              className={`nav-link link-dark ${(menuSelected === menu.label) && "active"} `}
              onClick={handleSelectMenu}
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
