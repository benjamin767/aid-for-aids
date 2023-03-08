const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El email ya esta registrado.'
      },
      validate: {
        isEmail: {
          msg: 'Email no valido.'
        },
        notEmpty: {
          msg: 'Ingrese un email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      }
    }
  },
  {
    timestamps: false,
  });

};