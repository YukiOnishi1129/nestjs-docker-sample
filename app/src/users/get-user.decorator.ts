import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/* entities */
import { User } from './entities/user.entity';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
