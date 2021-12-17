import { fetchConToken } from "../../helpers/fetch"

export const revisarToken = async(userRol) => {
  const query = await fetchConToken('auth/renew',{})
  const resp = await query.json()
  if(resp.ok){
    if(resp.rol!==userRol){
      localStorage.removeItem('uid')
      localStorage.removeItem('userToken')
      return false
    }
    else{
      return true
    }
  }
  else{
    return false
  }
}