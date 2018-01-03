export interface ColorHashData {
  hash: string;
}

export interface ColorSeparatedData {
  red: number;
  green: number;
  blue: number;
}

export type ColorModelData = ColorHashData | ColorSeparatedData;

export class ColorModel implements ColorSeparatedData{
  public red: number;
  public green: number;
  public blue: number;

  constructor(options: ColorModelData) {
    if (!options) {
      throw new Error(`Receive empty options in ${this.constructor.name}. Expects 'ColorModelData', receive '${typeof options}'.`);
    }
    const {red, green, blue} = options.hasOwnProperty('hash')
      ? ColorModel.colorHashDataToSeparatedData(options as ColorHashData)
      : options as ColorSeparatedData;

    this.red = parseInt(red.toString(), 10);
    this.green = parseInt(green.toString(), 10);
    this.blue = parseInt(blue.toString(), 10);
  }

  public static colorHashDataToSeparatedData(options: ColorHashData): ColorSeparatedData {
    if (!options.hasOwnProperty('hash')) {
      throw new Error(`Receive empty 'hash' field in ColorHashData.`);
    }
    const {hash} = options;
    const preparedHash: string = hash.length === 3 ? [hash[0], hash[0], hash[1], hash[1], hash[2], hash[2]].join('') : hash;
    const stabilizedHash: string = ColorModel.stabilizeHash(preparedHash);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(stabilizedHash);

    if (!result) {
      throw new Error(`Unexpected error: parsing color hash data failed.`);
    }

    return {
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16),
    };
  }

  public static colorSeparatedDataToHashData(options: ColorSeparatedData): ColorHashData {
    if (!options.hasOwnProperty('red')) {
      throw new Error(`Receive empty 'red' field in ColorSeparatedData.`);
    }
    if (!options.hasOwnProperty('green')) {
      throw new Error(`Receive empty 'green' field in ColorSeparatedData.`);
    }
    if (!options.hasOwnProperty('blue')) {
      throw new Error(`Receive empty 'blue' field in ColorSeparatedData.`);
    }

    const {red, green, blue} = options;
    const hash = ColorModel.getHashFromRgb(red, green, blue);
    return {hash};
  }

  public static stabilizeHash(hash: string = ''): string {
    let result: string[] = hash.split('');
    while (result.length !== 6) {
      result = ['0', ...result];
    }
    return result.join('');
  }

  public static getHashFromRgb(red: number = 0, green: number = 0, blue: number = 0): string {
    return `${ColorModel.componentToHex(red)}${ColorModel.componentToHex(green)}${ColorModel.componentToHex(blue)}`;
  }

  // @throwable
  public static componentToHex(color: number = 0): string {
    if (typeof color !== 'number') {
      throw new Error(`Color is not a number: ${color} (${typeof color})`);
    }
    if (color < 0 || color > 255) {
      throw new Error(`Wrong color number: ${color}. Color number must be between [0, 255]`);
    }
    const hex = color.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  public get hash(): string {
    return ColorModel.getHashFromRgb(this.red, this.green, this.blue);
  }

}
