module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: String, 
      password: String,
      country: String,
      phoneNumber: Number,
      birthday: Date,
      typeUser: String,
      active: Boolean,
      balance: Number,
      bets: [
        {
          id: String,
          status: String,
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



