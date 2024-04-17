import { Request, Response } from 'express';
import { AuthService, UserService }from '../services';
import { LoginInput } from '../schema/user';


async function getSessions(_req: Request, res: Response) {
  const sessions = await AuthService.findSessions();
  return res.status(200).send(sessions);
}


const loginHandler = async (
  req: Request<{}, {}, LoginInput>, 
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);
    if (!user) return res.status(401).send('User not found.');
    if (!user.verifyPassword(password)) {
      return res.status(401).send('Password is incorrect.');
    }

    let payload: any = {}
    payload['ip'] = req.ip;
    payload['user_agent'] = req.headers['user-agent'];

    const session = await AuthService.createSession({ user: user._id, ...payload });

    const access_token = await AuthService.signAccessToken(user, session);

    return res.status(200).send({ access_token });
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}


const logoutHandler = async (_req: Request, res: Response) => {
  try {
    const session_id = String(res.locals.user.session._id);

    const session = await AuthService.findSessionById(session_id);
    if (!session || !session.valid) {
      return res.status(401).send('Session not found or is invalid');
    }

    const destroyed = await AuthService.destroySession({ _id: session_id }, { valid: false });
    if (destroyed) return res.status(200).send('User loged out successfully.');

    return res.status(200).send('Failed to log out user.');
  } catch (error) {
    return res.status(500).send('Internal Server Error.');
  }
}


export default {
  loginHandler,
  getSessions,
  logoutHandler,
}
