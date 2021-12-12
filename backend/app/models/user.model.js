module.exports = (mongoose, mongoosePaginate) => {
  var schema = mongoose.Schema(
    {
      firstName:   { type: String, required: true, minlength: 3, maxlength:50 },
      lastName:    { type: String, required: true, minlength: 3, maxlength:50 },
      email:       { type: String, required: true, minlength: 3, maxlength:50 },
      password:    { type: String, required: true, minlength: 3, maxlength:50 },
      country:     { type: String, required: true, minlength: 3, maxlength:50 },
      phoneNumber: { type: Number, required: false, minlength: 3, maxlength:15 },
      birthday:    { type: Date, required: true },
      typeUser:    { type: String, required: true, minlength: 3, maxlength:20 },
      active:      { type: Boolean, default: true},
      balance:     { type: Number, default: 0 },
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



