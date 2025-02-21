export default (url: string, isDev: boolean) => {
  return {
    credentials: true,
    origin: (origin: string, cb: (a: null | Error, b?: boolean) => void) => {
      if ((origin && url) || (!origin && isDev)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
  };
};
