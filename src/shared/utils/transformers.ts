import { Transform } from 'class-transformer';

export const ToLowerCase = () =>
  Transform(({ value }: { value: string }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  );
