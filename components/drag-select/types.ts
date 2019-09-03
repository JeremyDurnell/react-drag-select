interface ToString {
  ToString: () => string;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface IRectangle {
  w: number;
  h: number;
}

export interface IAreaRectangle extends ToString {
  x: string;
  y: string;
  w: string;
  h: string;
}

export type HandleSelectionChanged = ({
  rectangle
}: {
  rectangle: IAreaRectangle;
}) => void;
