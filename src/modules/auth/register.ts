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
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

const registerHandler = async (request: Request) => {
  const { username, password, email, firstName, lastName } =
    await request.json();

  if (
    !username ||
    !password ||
    !email ||
    !firstName ||
    !lastName ||
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof email !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string'
  ) {
    return new Response('Invalid input', { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response('Invalid email format', { status: 400 });
  }

  const existingUser = await User.findOne({
    $or: [{ 'data.email': email }, { 'data.username': username }]
  });

  if (existingUser) {
    return new Response('User already exists', { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const lastUser = await User.findOne().sort({ userId: -1 });
  const newUserId = lastUser ? lastUser.userId + 1 : 1;

  const newUser = await User.create({
    userId: newUserId,
    flags: ['user'],
    data: {
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      picture: ''
    },
    authorizedApps: []
  });

  const token = jwt.sign(
    {
      userId: newUser.userId,
      flags: newUser.flags,
      authorizedApps: newUser.authorizedApps
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '2h' }
  );

  return new Response(
    JSON.stringify({
      token,
      user: {
        userId: newUser.userId,
        username: newUser.data.username
      }
    }),
    {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
};

export default registerHandler;
