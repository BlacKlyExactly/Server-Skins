import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from "cookie";
import NextCors from 'nextjs-cors';

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    await NextCors(req, res, {
      	methods: ['GET'],
      	origin: 'https://sklep.how2kill.pl',
      	optionsSuccessStatus: 200,
    });

    res.setHeader('Set-Cookie', [
      serialize('token', '', {
        maxAge: -1,
        path: '/',
      }),
    ]);
  
    res.writeHead(302, { Location: '/' });
    res.end();
  }