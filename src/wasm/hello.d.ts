export type Add = (a: number, b: number) => number;

export type Point = {
  x: number;
  y: number;
};

export type VectorPoint = {
  new (): VectorPoint;
  push_back: (point: Point) => void;
};

export type Wasm = {
  my_add: Add;
  VectorPoint: VectorPoint;
  accumulatePoints: (array: VectorPoint) => Point;
};

type Input = {
  locateFile: () => void;
};

declare function hello(input: Input): Promise<Wasm>;

export default hello;
