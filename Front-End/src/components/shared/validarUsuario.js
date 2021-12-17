import { fetchConToken } from "../../helpers/fetch"

export const revisarToken = async(userRol) => {
  const query = await fetchConToken('auth/renew',{})
  const resp = await query.json()
  if(resp.ok){
    if(resp.rol!==userRol){
      console.log('false')
      return false
    }
    else{
      console.log('true')
      return true
    }
  }
  else{
    console.log('nohay token')
    return false
  }
}