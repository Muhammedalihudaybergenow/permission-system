import { Injectable } from '@nestjs/common';
import { ConstantHelper } from 'src/helpers/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard(ConstantHelper.getJwtKey()) {}
