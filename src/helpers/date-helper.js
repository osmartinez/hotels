
const get_edad = (fecha)=>{
    let millis = Date.now() - fecha
    return new Date(millis).getFullYear() -1970
}


module.exports.get_edad = get_edad