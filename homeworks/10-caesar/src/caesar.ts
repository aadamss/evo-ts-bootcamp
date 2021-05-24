import { Transform, TransformCallback } from 'stream';

export const caesar = (action: 'encode' | 'decode', shift: number) =>
  new (class extends Transform {
    constructor(
      private readonly action: 'encode' | 'decode',
      private readonly shift: number
    ) {
      super();
    }

    _transform(chunk: any, _: BufferEncoding, done: TransformCallback): void {
      const data: string = chunk.toString('utf8');

      this.push(
        {
          encode: () => this.encode(data),
          decode: () => this.decode(data),
        }[this.action]()
      );

      done();
    }

    private encode(data: string): string {
      return this.doTheMagicTrick(data, this.shift);
    }

    private decode(data: string): string {
      return this.doTheMagicTrick(data, -this.shift);
    }

    private doTheMagicTrick(data: string, mod: number): string {
      return data
        .split('')
        .map((c) => c.charCodeAt(0))
        .reduce((acc, v) => {
          let char: string;
          if (v >= 65 && v <= 90) {
            char = String.fromCharCode(
              ((((v - 65 + mod) % 26) + 26) % 26) + 65
            );
          } else if (v >= 97 && v <= 122) {
            char = String.fromCharCode(
              ((((v - 97 + mod) % 26) + 26) % 26) + 97
            );
          } else {
            char = String.fromCharCode(v);
          }
          return acc + char;
        }, '');
    }
  })(action, shift);
