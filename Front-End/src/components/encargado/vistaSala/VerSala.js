import React from 'react'

export const VerSala = ({updateAccion, id}) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <button 
            className="btn btn-custom-primary" 
            style={{marginBottom:"20px"}}
            onClick={()=>updateAccion('crud')}
          >
            <i className="fa fa-arrow-left" style={{marginRight:"10px"}}></i>
            Atras
          </button>
        </div>
      </div>
      <div>
        <h3>Info Sala id: {id}</h3>
      </div>
    </div>
  )
}
