// import Joi from 'joi';
// import { CreateUserDto } from '@/models/user.model';

// export const registerSchema = Joi.object<CreateUserDto>({
//   username: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required()
// });

// export function validate(data: any) {
//   return registerSchema.validate(data, { abortEarly: false });
// }