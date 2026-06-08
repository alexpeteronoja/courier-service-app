import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      required: [true, 'User Name is Required'],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },

    phoneNumber: {
      type: String,
      minlength: [11, 'Enter a Valid Phone Number'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Confirm Password is required'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords are not the same',
      },
    },

    role: {
      type: String,
      enum: ['admin', 'operator', 'coordinator'],
      default: 'operator',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    passwordChangedAt: Date,
  },
  { timestamps: true },
);

// encript password

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return null;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  // set Password Change Time
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});

// Check if password is correct

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Change password instance

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return jwtTimestamp < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

export { User };
