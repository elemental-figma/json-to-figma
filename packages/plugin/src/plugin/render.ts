// import { ReactElement } from 'react';

// import { PlatformBridge } from './types';
// import { BOOLEAN_OP_FACTORIES, FACTORIES, SKIP_AUTO_PROPS, SKIP_GROUP_PROPS, SKIP_IN_INSTANCE_PROPS, mainNodeId } from './common';
import { SerializedPageNode } from './data/json-types';



type SerializedDocumentNode = {
  id: string,
  type: 'DOCUMENT',
  name: string,
  isAsset: boolean,
  detachedInfo: any,
  documentColorProfile: string,
  children: SerializedPageNode[],
  [key: string]: any, // FIXME:
}
type SerializedInstanceNode = {
  id: string,
  type: 'INSTANCE',
  name: string,
  // isAsset: boolean,
  // detachedInfo: any,
  // documentColorProfile: string,
  children: SerializedNode,
  [key: string]: any, // FIXME:
}
type SerializedGroupNode = {
  id: string,
  type: 'GROUP',
  [key: string]: any,
};
type SerializedBooleanOperation = {
  id: string,
  type: 'BOOLEAN_OPERATION',
  [key: string]: any,
};

type SerializedNode = SerializedDocumentNode | SerializedInstanceNode | SerializedGroupNode | SerializedBooleanOperation;

// function setProperties(node: SceneNode, obj: SerializedNode, isInInstance = false) {
//   let props = Object
//     .entries<PropertyDescriptor>(Object.getOwnPropertyDescriptors(node['__proto__']))
//     .filter(([name]) => !SKIP_AUTO_PROPS.has(name))
//     .sort(sortPropsForSet);
//   if (isInInstance) {
//     props = props.filter(([name]) => !SKIP_IN_INSTANCE_PROPS.has(name));
//   }
//   if (obj.type === 'GROUP' || obj.type === 'BOOLEAN_OPERATION') {
//     props = props.filter(([name]) => !SKIP_GROUP_PROPS.has(name));
//   }
//   for (const [name, prop] of props) {
//     if (name in obj && prop.set) {
//       // special case to avoid warnings around layoutAlign=CENTER being deprecated
//       if (name === 'layoutAlign' && obj[name] === 'CENTER') {
//         continue;
//       }

//       // set the property on the node
//       prop.set.call(node, obj[name]);
//     }
//   }

//   if ('resizeWithoutConstraints' in node && obj.width && obj.height) {
//     node.resizeWithoutConstraints(obj.width, obj.height);
//   }
// }

// async function deserializeChildren(obj: SerializedNode) {
//   return (await Promise.all((obj.children || []).map(c => deserializeInner(c)))).filter(n => !!n);
// }

// async function deserializeInstanceOverrides(
//   obj: SerializedNode,
//   overrideNode: SceneNode,
//   isRoot: boolean = false
// ): Promise<void> {
//   setProperties(overrideNode, obj, isRoot);
//   if ('children' in overrideNode) {
//     for (const child of obj.children || []) {
//       let childNode = overrideNode.findChild(n => mainNodeId(n.id) === child.id);
//       if (childNode) {
//         await deserializeInstanceOverrides(child, childNode, true);
//       }
//     }
//   }
// }

// async function deserializeInner(
//   obj: SerializedNode, // @ts-ignore
//   parent?: SceneNode
// ): Promise<SceneNode | null> {
//   const { type } = obj;
//   const factory = FACTORIES[type];

//   if (factory) {
//     // most common node types
//     const node: SceneNode = factory();
//     setProperties(node, obj);
//     if ('children' in node) {
//       for (let c of await deserializeChildren(obj)) {
//         node.appendChild(c);
//       }
//     }
//     return node;

//   } else if (type === 'GROUP' || type === 'BOOLEAN_OPERATION') {
//     // special handling for groups + booleans, which is currently very clumsy, inaccurate, and
//     // slow
//     const factory = (type === 'BOOLEAN_OPERATION')
//       ? BOOLEAN_OP_FACTORIES[obj.booleanOperation]
//       : figma.group;

//     // the following approach produces more accurate results but 10x slower for some reason... here,
//     // we start the group off with a throwaway node, and then append its actual children one by one,
//     // and later remove the throwaway node.

//     // let r = figma.createRectangle();
//     // const node: GroupNode = factory([r], figma.currentPage);
//     // for (let c of deserializedChildren) {
//     //   node.appendChild(c);
//     // }
//     // r.remove();

//     const node: GroupNode = factory(await deserializeChildren(obj), figma.currentPage);
//     setProperties(node, obj);
//     return node;

//   } else if (type === 'INSTANCE') {
//     // deserialize an instance node
//     let mainComponent: ComponentNode;
//     try {
//       mainComponent = await figma.importComponentByKeyAsync(obj._componentKey);
//     } catch (e) {
//       console.warn(`Couldn't instantiate an instance of ${obj._componentKey}`);
//       return null;
//     }

//     const node: InstanceNode = mainComponent.createInstance();
//     deserializeInstanceOverrides(obj, node, false);
//     return node;

//   } else {
//     console.warn(`Couldn't instantiate a node of type ${type}`);
//     return null;
//   }
// }

console.log(123)

// export async function deserializeNode(obj: SerializedNode): Promise<SceneNode | null> {
//   // Load all referenced fonts and import all referenced components in parallel
//   await Promise.all([
//     // ...[...gatherFonts(obj)]
//     []
//       .map(f => JSON.parse(f))
//       .map(font => figma.loadFontAsync(font)),
//     // ...[...gatherComponentKeys(obj)]
//       // .map(key => figma.importComponentByKeyAsync(key).catch(() => { })),
//   ]);

//   // Actually deserialize
//   return await deserializeInner(obj);
// }

// const PRIORITIZE_PROPERTIES = new Set([
//   'fontName' // set font before anything else to avoid layout issues
// ]);

// function sortPropsForSet(a: [string, PropertyDescriptor], b: [string, PropertyDescriptor]): number {
//   if (PRIORITIZE_PROPERTIES.has(a[0])) return -1;
//   if (PRIORITIZE_PROPERTIES.has(b[0])) return 1;
//   return a[0].localeCompare(b[0]);
// }

// function addNewGuide(page: PageNode, guide: Guide) {
//   // .concat() creates a new array
//   page.guides = page.guides.concat(guide)
// }

const applyBaseProps = (node, data) => {
  node.name = data.name;
}

// interface BaseFrameMixin
//   extends BaseNodeMixin,
//     SceneNodeMixin,
//     ChildrenMixin,
//     ContainerMixin,
//     DeprecatedBackgroundMixin,
//     GeometryMixin,
//     CornerMixin,
//     RectangleCornerMixin,
//     BlendMixin,
//     ConstraintMixin,
//     LayoutMixin,
//     ExportMixin,
//     IndividualStrokesMixin,
//     AutoLayoutMixin,
//     DevStatusMixin {
//   readonly detachedInfo: DetachedInfo | null
//   layoutGrids: ReadonlyArray<LayoutGrid>
//   gridStyleId: string
//   clipsContent: boolean
//   guides: ReadonlyArray<Guide>
//   inferredAutoLayout: InferredAutoLayoutResult | null
// }
interface BaseNodeProps {
  name?: string;
  pluginData?: {
      [key: string]: string;
  };
  sharedPluginData?: {
      [namespace: string]: {
          [key: string]: string;
      };
  };
  onNodeId?: (nodeId: string) => void;
}


const baseNodeMixin = (node: BaseNodeMixin) => (props: BaseNodeProps) => {
  if (props.name) {
      node.name = props.name;
  }

  if (props.pluginData) {
      Object.keys(props.pluginData).forEach(key => {
          node.setPluginData(key, props.pluginData[key]);
      });
  }

  if (props.sharedPluginData) {
      Object.keys(props.sharedPluginData).forEach(namespace => {
          Object.keys(props.sharedPluginData[namespace]).forEach(key => {
              node.setSharedPluginData(namespace, key, props.sharedPluginData[namespace][key]);
          });
      });
  }
};

interface LayoutProps {
  relativeTransform?: Transform;
  x?: number;
  y?: number;
  rotation?: number;
  width?: number;
  height?: number;
  isWithoutConstraints?: boolean;
  layoutAlign?: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT';
  layoutGrow?: number;
}

export const isValidSize = (size?: number) => {
  return size && size >= 0.01;
};

export const layoutMixin = (node: LayoutMixin & BaseNode) => (props: LayoutProps & { preventResizing?: boolean }) => {
  if (props.preventResizing) {
      return;
  }
  if (props.relativeTransform) {
      node.relativeTransform = props.relativeTransform;
  }
  if (typeof props.x === 'number') {
      node.x = props.x;
  }
  if (typeof props.y === 'number') {
      node.y = props.y;
  }
  if (typeof props.rotation === 'number') {
      node.rotation = props.rotation;
  }
  if ((isValidSize(props.width) || isValidSize(props.height)) && node.type !== 'LINE') {
      if (props.isWithoutConstraints) {
          node.resizeWithoutConstraints(props.width, props.height);
      } else {
          node.resize(
              isValidSize(props.width) ? props.width : node.width,
              isValidSize(props.height) ? props.height : node.height
          );
      }
  }

  if (isValidSize(props.width) && node.type === 'LINE') {
      if (props.isWithoutConstraints) {
          node.resizeWithoutConstraints(props.width, 0);
      } else {
          node.resize(props.width, 0);
      }
  }

  node.layoutAlign = props.layoutAlign || 'INHERIT';
  node.layoutGrow = props.layoutGrow || 0;
};

const frameRenderer = (props) => {
  const node = figma.createFrame();
  baseNodeMixin(node)(props);
  layoutMixin(node)(props);
  // applyGeometryProps(node, props);
  /// etc

  return node;
}

const componentRenderer = (props) => {
  const node = figma.createComponent();
  baseNodeMixin(node)(props);
  layoutMixin(node)(props);
  // applyGeometryProps(node, props);
  /// etc

  return node;
}

const createNewGroup = () => {
  const rect = figma.createRectangle();
  rect.setPluginData('isGroupStubElement', 'true');
  return figma.group([rect], figma.currentPage);
};

const groupRenderer = (props) => {
  const node = createNewGroup();
  baseNodeMixin(node)(props);
  layoutMixin(node)(props);

  return node;
}

const textRenderer = async (props) => {
  const text = figma.createText();
  text.x = props.x;
  text.y = props.y;
  await figma.loadFontAsync(text.fontName as any)
  text.characters = props.characters || '';
  text.fontSize = props.fontSize || 18;

  // text.fontSize = 18
  
  text.fills = props.fills;

  return text;
  // Apply additional text-specific properties if needed
};


const renderers = {
  FRAME: frameRenderer,
  INSTANCE: frameRenderer,
  TEXT: textRenderer,
  GROUP: groupRenderer,
  COMPONENT: componentRenderer,
}

async function traverseAndRenderNode(node, parentNode) {
  // if (node.type === 'GROUP') {
  //   // If the node is a group, we recursively render its children
  //   if (node.children && node.children.length > 0) {
  //     let groupChildren = [];
  //     node.children.forEach(child => {
  //       const groupChild = traverseAndRenderNode(child, parentNode);
  //       groupChildren.push(groupChild);
  //     });
  //     figma.group(groupChildren, parentNode);
  //   }
  // } else {
    // Create frame for the current node
    let patchedNode = node.type === 'TEXT' ? { ...node, loadedFont: true } : node;
    const newNode = await renderers[node.type](patchedNode);
    if (!newNode) {
      return;
    }
    
    // Append the frame to the parent node
    parentNode.appendChild(newNode);

    // Recursively traverse children
    if (node.children && node.children.length > 0) {
      node.children.reverse().forEach(child => {
        traverseAndRenderNode(child, newNode);
      });
    }
    return newNode;
  // }
}

// const renderJSONSceneToFigma = async (data: SerializedSceneNode) => {
//   let node;
//   if (data.type === 'FRAME') {
//     node = await figma.createFrame();
//     node.name = data.name;
//     // frame.w
//   }

//   const nodes: SceneNode[] = Array(data.children.length)
//       .fill(0)
//       .map((_, i) => {
//         const rect = figma.createRectangle();
//         rect.x = i * 150;
//         rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
//         return rect;
//       });
  
//   for (const serializedChild of data.children) {
//     const childNode = renderJSONSceneToFigma(serializedChild);
    
//     node.appendChild(childNode);
//   }
//   return node;
// }

export const renderJSONRootToFigma = (data: SerializedDocumentNode) => {
  console.log({ data })
  const document = figma.root;
  for (const serializedPage of data.children) {
    let page;
    const existingPage = document.findChild((child) => child.id === serializedPage.id);
    if (existingPage) {
      page = existingPage
    } else {
      const newPage = figma.createPage();
      document.appendChild(newPage);
    }

    applyBaseProps(page, serializedPage);

    for (const serializedChild of serializedPage.children.reverse()) {
      console.log({ serializedChild })
      traverseAndRenderNode(serializedChild, page);
      // page.appendChild(childNode);
    }
  }

  // const data.children
  // const a = deserializeNode(data);
  // console.log({ a })
}

// renderJSONToFigma(test);


// export const render = (bridge: PlatformBridge) => ({
//   element,
//   container,
// }: { element: ReactElement, container: FrameNode }) => {
//   console.log({ bridge, element, container });
// }

