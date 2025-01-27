import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/models/User';

interface UserSchema {
  userId: number;
  flags: string[];
  data: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  authorizedApps: number[];
}

interface Request {
  json: any;
  body: {
    email: string;
    password: string;
  };
}

const loginHandler = async (request: Request) => {
  const { email, password } = await request.json();

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return new Response('Invalid input', { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response('Invalid input', { status: 400 });
  }

  const user = (await User.findOne({
    'data.email': email
  })) as UserSchema | null;

  if (!user) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.data.password);

  if (!passwordMatch) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const token = jwt.sign(
    {
      userId: user.userId,
      flags: user.flags,
      authorizedApps: user.authorizedApps
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '2h' }
  );

  return new Response(
    JSON.stringify({
      token,
      user: {
        userId: user.userId,
        username: user.data.username
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

export default loginHandler;
