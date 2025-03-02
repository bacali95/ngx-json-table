import { JsonTreeNode } from './json-tree-node';

describe('JsonTreeNode', () => {
  let node: JsonTreeNode;

  beforeEach(() => {
    node = new JsonTreeNode('testKey', 'testValue', 'string', 0, false, null, [], true);
  });

  it('should create an instance', () => {
    expect(node).toBeTruthy();
  });

  it('should initialize with correct properties', () => {
    expect(node.key).toBe('testKey');
    expect(node.value === 'testValue').toBe(true);
    expect(node.type).toBe('string');
    expect(node.level).toBe(0);
    expect(node.isArray).toBe(false);
    expect(node.parent).toBeNull();
    expect(node.children).toEqual([]);
    expect(node.showChildren).toBe(true);
  });

  it('should correctly identify complex nodes', () => {
    // String node (not complex)
    const stringNode = new JsonTreeNode('key', 'value', 'string', 0, false, null, [], true);
    expect(stringNode.isComplex).toBe(false);

    // Number node (not complex)
    const numberNode = new JsonTreeNode('key', 42, 'number', 0, false, null, [], true);
    expect(numberNode.isComplex).toBe(false);

    // Boolean node (not complex)
    const booleanNode = new JsonTreeNode('key', true, 'boolean', 0, false, null, [], true);
    expect(booleanNode.isComplex).toBe(false);

    // Object node (complex)
    const objectNode = new JsonTreeNode('key', '', 'object', 0, false, null, [], true);
    expect(objectNode.isComplex).toBe(true);

    // Array node (complex)
    const arrayNode = new JsonTreeNode('key', '', 'object', 0, true, null, [], true);
    expect(arrayNode.isComplex).toBe(true);
  });

  it('should add child nodes correctly', () => {
    const parentNode = new JsonTreeNode('parent', '', 'object', 0, false, null, [], true);
    const childNode = new JsonTreeNode('child', 'value', 'string', 1, false, null, [], true);

    parentNode.addChild(childNode);

    expect(parentNode.children.length).toBe(1);
    expect(parentNode.children[0]).toBe(childNode);
    expect(childNode.parent).toBe(parentNode);
  });

  it('should remove child nodes correctly', () => {
    const parentNode = new JsonTreeNode('parent', '', 'object', 0, false, null, [], true);
    const childNode1 = new JsonTreeNode(
      'child1',
      'value1',
      'string',
      1,
      false,
      parentNode,
      [],
      true
    );
    const childNode2 = new JsonTreeNode(
      'child2',
      'value2',
      'string',
      1,
      false,
      parentNode,
      [],
      true
    );

    parentNode.addChild(childNode1);
    parentNode.addChild(childNode2);

    expect(parentNode.children.length).toBe(2);

    childNode1.delete();

    expect(parentNode.children.length).toBe(1);
    expect(parentNode.children[0]).toBe(childNode2);
    expect(childNode1.parent).toBeNull();
  });

  it('should toggle expanded state', () => {
    const parentNode = new JsonTreeNode('parent', '', 'object', 0, false, null, [], true);

    // Initially expanded
    expect(parentNode.showChildren).toBe(true);

    // Toggle to collapsed
    parentNode.toggleShowChildren();
    expect(parentNode.showChildren).toBe(false);

    // Toggle back to expanded
    parentNode.toggleShowChildren();
    expect(parentNode.showChildren).toBe(true);
  });

  it('should handle array nodes correctly', () => {
    const arrayNode = new JsonTreeNode('array', '', 'object', 0, true, null, [], true);
    const item1 = new JsonTreeNode('0', 'item1', 'string', 1, false, arrayNode, [], true);
    const item2 = new JsonTreeNode('1', 'item2', 'string', 1, false, arrayNode, [], true);

    arrayNode.addChild(item1);
    arrayNode.addChild(item2);

    expect(arrayNode.isArray).toBe(true);
    expect(arrayNode.children.length).toBe(2);
    expect(arrayNode.children[0].key).toBe('0');
    expect(arrayNode.children[1].key).toBe('1');
  });

  it('should handle nested structures correctly', () => {
    const rootNode = new JsonTreeNode('root', '', 'object', 0, false, null, [], true);
    const childNode = new JsonTreeNode('child', '', 'object', 1, false, rootNode, [], true);
    const grandchildNode = new JsonTreeNode(
      'grandchild',
      'value',
      'string',
      2,
      false,
      childNode,
      [],
      true
    );

    rootNode.addChild(childNode);
    childNode.addChild(grandchildNode);

    expect(rootNode.children.length).toBe(1);
    expect(rootNode.children[0].children.length).toBe(1);
    expect(rootNode.children[0].children[0].key).toBe('grandchild');
    expect(rootNode.children[0].children[0].value === 'value').toBe(true);
    expect(grandchildNode.parent).toBe(childNode);
    expect(childNode.parent).toBe(rootNode);
  });

  it('should toggle show all children', () => {
    const parentNode = new JsonTreeNode('parent', '', 'object', 0, false, null);
    const childNode = new JsonTreeNode('child', '', 'object', 1, false, parentNode);
    const grandchildNode = new JsonTreeNode('grandchild', '', 'object', 2, false, childNode);

    parentNode.addChild(childNode);
    childNode.addChild(grandchildNode);

    parentNode.toggleShowChildren(true);

    expect(parentNode.showChildren).toBe(true);
    expect(childNode.showChildren).toBe(true);
    expect(grandchildNode.showChildren).toBe(true);
  });
});
