import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: [true, "email can not be empty"],
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: props => `${props.value} is not a valid email`
    },
    maxlength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  videoCourses: [
    {
      type: Object
    }
  ],
  dataToInvoice: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    companyName: {
      type: String
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    taxNumber: {
      type: String
    }
  },
  isConfirmed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  updated_at: {
    type: Date
  }
},
  { strict: false }
);

UserSchema.pre('save', function (next) {
  var company = this;
  company.updated_at = Date.now();
  if (company.isModified('password')) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(company.password, salt, function (err, hash) {
        if (err) return next(err);
        company.password = hash;
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model("users", UserSchema);
