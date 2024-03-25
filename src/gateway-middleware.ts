import JWT from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {
  if(!req.headers?.gatewayToken) {
    throw new NotAuthorizedError('Invalid Request', 'verifyGatewayRequest() method: Request not coming from api Gateway');
  }

  const token: string = req.headers?.gatewayToken as string;
  if(!token) {
    throw new NotAuthorizedError('Invalid Request', 'verifyGatewayRequest() method: Request not coming from api Gateway');
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(token, '') as { id: string, iat: number };

    if(!tokens.includes(payload.id)) {
      throw new NotAuthorizedError('Invalid Request', 'verifyGatewayRequest() method: Request payload is invalid');
    }
  } catch (error) {
    throw new NotAuthorizedError('Invalid Request', 'verifyGatewayRequest() method: Request not coming from api Gateway');
  }
}

