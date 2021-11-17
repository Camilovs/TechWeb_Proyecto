import React from "react";

export const GestionSalas = () => {
  return (
    <div class="container-fluid" style={{ background: "white"}}>
      <div class="d-flex align-content-between flex-wrap ">
        Gestion Salas
        <button type="button" class="btn btn-primary" style={{margin:"10px"}}>
          Seleccionar plantilla
        </button>
        <button type="button" class="btn btn-secondary " style={{margin:"10px"}}>
          Crear Plantilla
        </button>
      </div>
      <div class="d-flex align-content-between flex-wrap justify-content-around">
        <div><div class="card" style={{ width: "20rem", height: "25rem" }}>
                <div class="card-body">
                  <h5 class="card-title">Propiedades plantilla</h5>
                  <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                  <h7>nombre:</h7>
                  <br />
                  <h7>Tipo:</h7>
                  <br />
                  <h7>Veces modificada:</h7>
                  <br />
                  <h7>Creada por: </h7>
                  <br />
                  <h7>Última edición:</h7>
                  <br />
                  <h7>Motivo edición:</h7>
                  <br />
                  <br />
                  <h6>Utilizado Actualmente: 25 veces</h6>
                </div>
              </div></div>
              <div
                class="card"
                style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
              >
                <div class="card-body">
                  <h5 class="card-title">Edición plantilla</h5>
                  <form>
                    <div class="form-group row-md-4">
                      <label for="inputState">State</label>
                      <select id="inputState" class="form-control">
                        <option selected>Aforo para salas</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                      </select>
                    </div>
                    <br />
                    <div class="form-group row-md-2">
                      <label for="inputZip">Aforo máximo</label>
                      <input type="text" class="form-control" id="inputZip" />
                    </div>
                    <br />
                    <div class="form-row">
                      <div class="col">
                        <label for="inputEmail4">Motivo edición</label>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Ultima vez editado por:</label>
                      <label>Alguien</label>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="card"
                style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
              >
                <div class="card-body">
                  <h5 class="card-title">Comentarios edicion</h5>
                  <form>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="10"
                      ></textarea>
                    </div>
                    <br />
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Guardar cambios
                    </button>
                  </form>



                </div>
                </div>
      </div>
      <div class="d-flex align-content-between flex-wrap">
        <button type="button" class="btn btn-danger" style={{margin:"10px"}}>
          Desactivar plantilla
        </button>
        <button type="button" class="btn btn-secondary" style={{margin:"10px"}}>
          Deshacer último cambio
        </button>
      </div>
    </div>
  );
};
/*
 <div >
      <div class="containter  " style={{ marginLeft: "10px" }}>
        <div class="row">
          <div class="col align-self-center">
            <button
              type="button"
              class="btn btn-light m"
              style={{ margin: "4px" }}
            >
              Seleccionar plantilla
            </button>
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "4px" }}
            >
              + Crear plantilla
            </button>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-start ">
        <br />
        <div class="container align-middle ">
          <div class="row">
            <div class="col-sm">
              <div class="card" style={{ width: "20rem", height: "25rem" }}>
                <div class="card-body">
                  <h5 class="card-title">Propiedades plantilla</h5>
                  <h6 class="card-subtitle mb-2 text-muted ">Card subtitle</h6>
                  <h7>nombre:</h7>
                  <br />
                  <h7>Tipo:</h7>
                  <br />
                  <h7>Veces modificada:</h7>
                  <br />
                  <h7>Creada por: </h7>
                  <br />
                  <h7>Última edición:</h7>
                  <br />
                  <h7>Motivo edición:</h7>
                  <br />
                  <br />
                  <h6>Utilizado Actualmente: 25 veces</h6>
                </div>
              </div>

    
                
            </div>
           
            <div class="col-sm">
              <div
                class="card"
                style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
              >
                <div class="card-body">
                  <h5 class="card-title">Edición plantilla</h5>
                  <form>
                    <div class="form-group row-md-4">
                      <label for="inputState">State</label>
                      <select id="inputState" class="form-control">
                        <option selected>Aforo para salas</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                      </select>
                    </div>
                    <br />
                    <div class="form-group row-md-2">
                      <label for="inputZip">Aforo máximo</label>
                      <input type="text" class="form-control" id="inputZip" />
                    </div>
                    <br />
                    <div class="form-row">
                      <div class="col">
                        <label for="inputEmail4">Motivo edición</label>
                      </div>
                      <div class="col">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label>Ultima vez editado por:</label>
                      <label>Alguien</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div
                class="card"
                style={{ width: "20rem", height: "25rem", marginTop: "5px" }}
              >
                <div class="card-body">
                  <h5 class="card-title">Comentarios edicion</h5>
                  <form>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="10"
                      ></textarea>
                    </div>
                    <br />
                    <button
                      type="submit"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Guardar cambios
                    </button>
                  </form>



                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="btn-group-vertical">
                <button type="button" class="btn btn-danger">Desactivar plantilla</button>

                    <button type="button" class="btn btn-warning">Deshacer el ultimo cambio</button>
                </div>
    </div>
*/
