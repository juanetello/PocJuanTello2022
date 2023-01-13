import bcrypt from "bcrypt";

const users = [
    {
        nombre:'desarrollo',
        apellido: 'test',
        email: 'desa@test.com',
        confirm: 1,
        password: bcrypt.hashSync('password', 13),
    }
]

export default users;