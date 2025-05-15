import { config } from '@/config/env';
import jwt from 'jsonwebtoken';

export class TokenService {
  /**
   * 生成访问令牌
   * @param userId 用户ID
   * @param payload 附加的有效载荷
   * @returns 生成的JWT令牌
   */
  static generateAccessToken(userId: number, payload: Record<string, any> = {}): string {
    return jwt.sign(
      {
        sub: userId, // 标准主题声明
        ...payload,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
        // issuer: config.jwt.issuer,
        // audience: config.jwt.audience,
      }
    );
  }

  /**
   * 生成刷新令牌
   * @param userId 用户ID
   * @returns 生成的刷新令牌
   */
  static generateRefreshToken(userId: number): string {
    return jwt.sign(
      {
        sub: userId,
        type: 'refresh',
      },
      config.jwt.secret,
      {
        expiresIn: '7d', // 刷新令牌通常有更长的有效期
      }
    );
  }

  /**
   * 验证令牌
   * @param token JWT令牌
   * @returns 解码后的令牌内容
   */
  static verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }

  /**
   * 解码令牌(不验证)
   * @param token JWT令牌
   * @returns 解码后的令牌内容
   */
  static decodeToken(token: string): any {
    return jwt.decode(token);
  }
}