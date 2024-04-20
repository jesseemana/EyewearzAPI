import { Request, Response } from 'express';
import { ResetInput, UpdateUserInput, UserInput } from '../schema/user';
import { UserService } from '../services';
import { generateCode, log, sendEmail } from '../utils';


const getCurrentUserHandler = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    if (!user) return res.status(404).send('No user found.');
    log.info({ user });
    return res.status(200).send(user);
  } catch(error) {
    return res.status(500).send('Internal Server Error.');
  }
}


async function createUserHandler(
  req: Request<{}, {}, UserInput>, 
  res: Response
) {
  try {
    const data = req.body;
    const user = await UserService.registerUser(data);
    return res.status(201).send(`New user ${user.first_name} ${user.last_name} has been registered.`);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).send('Email already in use.');
    }
    return res.status(500).send('Internal Server Error.');
  }
}


async function updateUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, 
  res: Response
) {
  try {
    const { user_id } = req.params;
    const body = req.body;

    const user = await UserService.findUserById(user_id);
    if (!user) return res.status(404).send('User not found!');

    const updated = await UserService.updateUser({ _id: user_id }, { ...body });
    if (!updated) return res.status(400).send('Failed to update user');

    return res.status(200).send(updated);
  } catch (error: any) {
    return res.status(500).send('Internal Server Error.');
  }
}


async function manageAdmin(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>, 
  res: Response
) {
  try {
    const { user_id } = req.params;
    const { role } = req.body;

    const user = await UserService.findUserById(user_id);
    if (!user) return res.status(404).send('User not found!');

    const updated = await UserService.updateUser({ _id: user_id }, { role });
    if (!updated) return res.status(400).send('Failed to make admin');

    return res.status(200).send(updated);
  } catch (error: any) {
    return res.status(500).send('Internal Server Error.');
  }
}


async function forgotPasswordHandler(
  req: Request<{}, {}, ResetInput['body']>, 
  res: Response
) {
  try {
    const { email } = req.body;

    const user = await UserService.findByEmail(email);
    if (!user) return res.status(404).send('User not found.');

    const reset_code = generateCode();
    user.reset_code = reset_code;
    await user.save();

    // generate password reset link 
    const link = process.env.NODE_ENV === 'production' ? 
      `${process.env.PROD_URL}/${user._id}/reset/${reset_code}` : `${process.env.DEV_URL}/${user._id}/reset/${reset_code}`;

    log.info(`Password reset link: ${link}`);

    await sendEmail({
      to: email,
      from: 'test@example.com',
      subject: 'Reset Your Password.',
      text: `Follow the link to reset your password: ${link}`,
      html: `<b>Click <a href=${link}>here</a> to reset your password.<b/>`,
    });

    return res.status(200).send(`Password reset link sent to users' email.`);
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}


async function resetPasswordHandler(
  req: Request<ResetInput['params'], {}, ResetInput['body']>, 
  res: Response
) {
  try {
    const { id, reset_code } = req.params;
    const { password } = req.body;

    const user = await UserService.findUserById(id);
    if (!user) return res.status(404).send('User not found.');

    if (user.reset_code !== reset_code) 
      return res.status(400).send(`Invalid password reset code.`);

    user.password = password;
    user.reset_code = null;
    await user.save();

    return res.status(200).send(`Users' password has been updated successfully.`);
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}


export default {
  forgotPasswordHandler, 
  updateUserHandler,
  createUserHandler,
  manageAdmin, 
  getCurrentUserHandler, 
  resetPasswordHandler, 
}
