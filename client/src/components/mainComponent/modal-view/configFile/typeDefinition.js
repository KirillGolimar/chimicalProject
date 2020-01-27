import typeModule from './typeFile'




function type (typeFile) {
  for(let typ in typeModule) {
    if(typeModule[typ].includes(typeFile)) {
      return typ
    }
  }
}

export default type;
