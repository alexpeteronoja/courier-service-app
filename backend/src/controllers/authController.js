import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User } from '../model/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';
import { successResponse } from '../utils/response.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  successResponse(
    res,
    201,
    { data: { token, user: newUser } },
    'Login Successfull',
  );
});

// Login

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check email and password exist

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 400));
  }

  // return token if everything is ok

  const token = signToken(user._id);

  successResponse(res, 200, { data: { token, user } }, 'Login Successfull');
});

// Protect Routes

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Check if token is in header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401),
    );
  }

  // Verifying token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError('The user belonging to this token does not exist', 401),
    );
  }

  // check if user changed password after token was issued.

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again', 401),
    );
  }

  req.user = user;

  next();
});

// Restrict Routes Access

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to access this route', 403),
      );
    }

    next();
  };
};

// Update Password(Self)

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body ?? {};

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new AppError('Please Provide Current and new password'));
  }

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Current Password is incorrect', 400));
  }

  user.password = newPassword;
  user.passwordConfirm = confirmNewPassword;

  await user.save();

  const token = signToken(user._id);

  successResponse(res, 200, { data: { token } }, 'Password Changed');
});
