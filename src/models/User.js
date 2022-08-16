const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be longer than 3 characters'],
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    minLength: [5, 'Emails below 5 characters are impossible'],
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    minLength: [8, 'Create a stronger password'],
    required: [true],
  },
});

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  bcrypt.genSaltSync(saltRounds).then(salt => {
    bcrypt.hash(this.password, salt).then(hashedPassword => {
      this.password = hashedPassword;

      next();
    });
  });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
