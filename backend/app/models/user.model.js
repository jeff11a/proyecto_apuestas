module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      firstName: {
        type: String, 
        required: [true, 'Nombre es requerido']
      },
      lastName: {
        type: String, 
        required: [true, 'Apellido es requerido']
      },
      email: {
        type: String, 
        unique: true,
        required: [true, 'Correo es requerido'],
      }, 
      password: {
        type: String, 
        required: [true, 'Contraseña es requerida'],
      },
      salt:{
        type: String,
        required: false
      },
      country: {
        type: String, 
        required: [true, 'País es requerido']
      },
      phoneNumber: {
        type: Number, 
        required: [true, 'Teléfono es requerido']
      },
      birthday: {
        type: Date, 
        required: [true, 'Fecha de nacimiento es requerida']
      },
      roles: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ,
      active: {
        type: Boolean, 
        required: false,
        default: true
      },
      balance: {
        type: Number, 
        required: false,
        default: 0
      },
      bets: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bet",
          value: Number,
          player: String
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const User = mongoose.model("user", schema);
  return User;
};



