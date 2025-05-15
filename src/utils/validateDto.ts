import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
/**
 * 校验 DTO 的通用函数
 * @param dtoClass DTO 类
 * @param data 要校验的数据
 * @param skipMissingProperties 是否跳过缺失属性校验
 * @returns 校验错误数组
 */
export async function validateDto<T extends object>(
    dtoClass: new () => T,
    data: any,
    skipMissingProperties = false
): Promise<any> {
    const dtoInstance = plainToInstance(dtoClass, data);
    let errors =  await validate(dtoInstance, {
        skipMissingProperties,
        whitelist: false,
        forbidNonWhitelisted: false
    });
    if (errors.length > 0) {
        console.log(errors);
        const err = errors.map((item) => {            
            return `${item.property}: ${Object.values(item.constraints!).join(';')}`;
        }).join('<br/>');
        return {
            code: 500,
            message: err,
        };
    }
    return false;
}



