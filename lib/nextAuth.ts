import GithubProvider from 'next-auth/providers/github';

const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  }),
];

export const authOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   jwt: true,
  // },
  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },
  // database: process.env.DATABASE_URL,
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error',
  // },
  // callbacks: {
  //   session: async (session, user) => {
  //     session.user.id = user.id;
  //     return Promise.resolve(session);
  //   },
  // },
};
