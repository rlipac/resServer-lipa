const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolevalido = async (role = "") => {
  const rolExiste = await Role.findOne({ role });
 
  if (!rolExiste) {
    throw new Error(
      `El role ${role} NO ES VALIDO PORQUE NO ESTA REGISTRADO EL LA BD`
    );
  }
};

const emailExiste = async (email = "") => {
  // verificar su el coreo existe
  const emailRegistrado = await Usuario.findOne({ email });
  if (emailRegistrado) {
    throw new Error(`EL EMAIL ${email}  YA ESTA REGISTRADO `);
  }
};
const  usuarioIdExiste = async (id) => {
  // verificar su el id existe
  const userIdExiste =await Usuario.findById(id);
  if(!userIdExiste){
    throw new Error(`EL id ${id}  No EXISTE... `);
  }
 
};

module.exports = {
  esRolevalido,
  emailExiste,
  usuarioIdExiste 
};
