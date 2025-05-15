/**
 * 下划线转小驼峰
 * @example user_name -> userName
 */
export function snakeToCamel(str: string): string {
    return str.replace(/(_\w)/g, match => match[1].toUpperCase());
  }
  
  /**
   * 小驼峰转下划线
   * @example userName -> user_name
   */
  export function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  
  /**
   * 对象属性名从下划线转为小驼峰
   */
  export function convertKeysToCamelCase(obj: any): any {
    // 处理 null 或非对象情况
    if (!obj || typeof obj !== 'object') return obj;
    
    // 处理 Date 对象
    if (obj instanceof Date) return obj;
    
    // 处理数组
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToCamelCase(item));
    }
  
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = snakeToCamel(key);
        const value = obj[key];
        
        // 特殊处理 Date 对象
        newObj[newKey] = value instanceof Date ? value : convertKeysToCamelCase(value);
      }
    }
    return newObj;
  }
  
  /**
   * 对象属性名从小驼峰转为下划线
   */
  export function convertKeysToSnakeCase(obj: any): any {
    // 处理 null 或非对象情况
    if (!obj || typeof obj !== 'object') return obj;
    
    // 处理 Date 对象
    if (obj instanceof Date) return obj;
    
    // 处理数组
    if (Array.isArray(obj)) {
      return obj.map(item => convertKeysToSnakeCase(item));
    }
  
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = camelToSnake(key);
        const value = obj[key];
        
        // 特殊处理 Date 对象
        newObj[newKey] = value instanceof Date ? value : convertKeysToSnakeCase(value);
      }
    }
    return newObj;
  }