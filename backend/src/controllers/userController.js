import { User } from '../model/userModel.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { successResponse } from '../utils/response.js';

export const getAllUser = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

// Get User

export const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) return next(new AppError('User not found', 404));

  successResponse(res, 200, { data: { user } }, 'User Found');
});

// Get Me

export const getMe = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);

  if (!user) return next(new AppError('User not found', 404));

  successResponse(res, 200, { data: { user } }, 'Profile retrieved.');
});

// Update User(Self)

export const updateMe = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { password, passwordConfirm, role, email, isActive, ...updatedData } =
    req.body;

  const user = await User.findByIdAndUpdate(req.user._id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('User not found', 404));

  successResponse(res, 200, { data: { user } }, 'Updated Successful');
});
