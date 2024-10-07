type Color = {
  r: number;
  g: number;
  b: number;
};

type Background = {
  type: string;
  visible: boolean;
  opacity: number;
  blendMode: string;
  color: Color;
  boundVariables: Record<string, any>;
};

type SerializedElement = {
  id: string;
};

type Parent = {
  id: string;
  type: string;
};

// type SerializedSceneNode = {

// }

type Fill = {
  type: string;
  visible: boolean;
  opacity: number;
  blendMode: string;
  color: Color;
  boundVariables: Record<string, any>;
};

type AbsoluteBoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type InferredAutoLayout = {
  layoutMode: string;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  counterAxisSizingMode: string;
  primaryAxisSizingMode: string;
  primaryAxisAlignItems: string;
  counterAxisAlignItems: string;
  layoutAlign: string;
  layoutGrow: number;
  itemSpacing: number;
  layoutPositioning: string;
};

type SerializedFrameNode = {
  id: string;
  type: string;
  name: string;
  isAsset: boolean;
  detachedInfo: null;
  visible: boolean;
  locked: boolean;
  stuckNodes: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  attachedConnectors: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  componentPropertyReferences: null;
  variableConsumptionMap: Record<string, any>;
  boundVariables: Record<string, any>;
  resolvedVariableModes: Record<string, string>;
  inferredVariables: Record<string, any>;
  explicitVariableModes: Record<string, any>;
  opacity: number;
  blendMode: string;
  isMask: boolean;
  maskType: string;
  effects: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  effectStyleId: string;
  relativeTransform: number[][];
  absoluteTransform: number[][];
  x: number;
  y: number;
  width: number;
  height: number;
  absoluteBoundingBox: AbsoluteBoundingBox;
  absoluteRenderBounds: AbsoluteBoundingBox;
  rotation: number;
  layoutAlign: string;
  constrainProportions: boolean;
  layoutGrow: number;
  layoutPositioning: string;
  minWidth: null;
  minHeight: null;
  maxWidth: null;
  maxHeight: null;
  layoutSizingHorizontal: string;
  layoutSizingVertical: string;
  exportSettings: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  fills: Fill[];
  fillStyleId: string;
  strokes: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  strokeStyleId: string;
  strokeWeight: number;
  strokeAlign: string;
  strokeJoin: string;
  dashPattern: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  strokeCap: string;
  strokeMiterLimit: number;
  fillGeometry: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  strokeGeometry: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  cornerRadius: number;
  cornerSmoothing: number;
  topLeftRadius: number;
  topRightRadius: number;
  bottomLeftRadius: number;
  bottomRightRadius: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  primaryAxisAlignItems: string;
  counterAxisAlignItems: string;
  primaryAxisSizingMode: string;
  layoutWrap: string;
  counterAxisSpacing: number;
  counterAxisAlignContent: string;
  strokeTopWeight: number;
  strokeBottomWeight: number;
  strokeLeftWeight: number;
  strokeRightWeight: number;
  inferredAutoLayout: InferredAutoLayout;
  layoutGrids: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  gridStyleId: string;
  backgrounds: Fill[];
  backgroundStyleId: string;
  clipsContent: boolean;
  guides: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  expanded: boolean;
  constraints: {
      horizontal: string;
      vertical: string;
  };
  layoutMode: string;
  counterAxisSizingMode: string;
  horizontalPadding: number;
  verticalPadding: number;
  itemSpacing: number;
  overflowDirection: string;
  numberOfFixedChildren: number;
  overlayPositionType: string;
  overlayBackground: {
      type: string;
  };
  overlayBackgroundInteraction: string;
  itemReverseZIndex: boolean;
  strokesIncludedInLayout: boolean;
  devStatus: null;
  reactions: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  playbackSettings: {
      autoplay: boolean;
      loop: boolean;
      muted: boolean;
  };
  parent: {
      id: string;
      type: string;
  };
  children: SerializedSceneNode[];
};

export type SerializedSceneNode = SerializedFrameNode;

export type SerializedPageNode = {
  id: string;
  type: string;
  name: string;
  isAsset: boolean;
  detachedInfo: null;
  guides: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  selection: SerializedElement[];
  selectedTextRange: null;
  backgrounds: Background[];
  exportSettings: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  prototypeStartNode: null;
  explicitVariableModes: Record<string, any>;
  flowStartingPoints: any[]; // Depending on your use case, you might want to specify a more specific type than 'any[]'
  prototypeBackgrounds: Background[];
  parent: Parent;
  children: SerializedSceneNode[],
};
