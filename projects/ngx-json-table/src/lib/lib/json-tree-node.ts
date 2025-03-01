import { JsonValue } from './types';

export type JsonValueType =
  | 'bigint'
  | 'number'
  | 'string'
  | 'object'
  | 'boolean'
  | 'function'
  | 'symbol'
  | 'undefined';

export class JsonTreeNode {
  id: string;
  key: string;
  prevKey: string;
  value: JsonValue;
  prevValue: JsonValue;
  level: number;
  type: JsonValueType;
  isArray: boolean;
  parent: JsonTreeNode | null;
  children: JsonTreeNode[];
  showChildren: boolean;
  edit = false;
  showEditPanel = false;
  error = false;
  isNew = false;

  constructor(
    key: string,
    value: JsonValue,
    type: JsonValueType,
    level?: number,
    isArray?: boolean,
    parent?: JsonTreeNode | null,
    children?: JsonTreeNode[],
    showChildren?: boolean
  ) {
    this.id = `${Math.random().toString(36).substr(2, 9)}`;
    this.key = this.prevKey = key;
    this.value = this.prevValue = value;
    this.type = type;
    this.level = level ?? 0;
    this.isArray = isArray ?? false;
    this.parent = parent ?? null;
    this.children = children ?? [];
    this.showChildren = showChildren ?? false;
  }

  toggleShowChildren(allLevels = false) {
    this.showChildren = !this.showChildren;
    if (allLevels) {
      const processAllLevels = (parent: JsonTreeNode) => {
        for (const child of parent.children) {
          child.showChildren = parent.showChildren;
          processAllLevels(child);
        }
      };
      processAllLevels(this);
    }
  }

  checkNotUniqueKey(): boolean {
    return (
      (this.key === '' ||
        (this.parent &&
          this.parent.children.filter(c => c.id !== this.id && c.key === this.key).length > 0)) &&
      (this.error = true) &&
      setTimeout(() => (this.error = false), 2000) !== null
    );
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  addChild(child: JsonTreeNode) {
    child.parent = this;
    this.children.push(child);
  }

  canAppear(): boolean {
    return this.canAppearCheck(this);
  }

  private canAppearCheck(child: JsonTreeNode) {
    if (!child.parent) return true;
    return child.parent.showChildren && this.canAppearCheck(child.parent);
  }

  get isComplex(): boolean {
    return this.type === 'object';
  }

  isKeyEditable() {
    return !this.parent?.isArray;
  }

  resetState() {
    this.key = this.prevKey;
    this.value = this.prevValue;
  }

  updateState() {
    this.prevKey = this.key;
    this.prevValue = this.value;
  }

  delete() {
    const parentIndex = this.parent.children.findIndex(node => node.id === this.id);
    this.parent.children.splice(parentIndex, 1);
    if (this.parent.isArray) {
      for (let i = parentIndex; i < this.parent.children.length; i++) {
        this.parent.children[i].key = `${parseInt(this.parent.children[i].key, 10) - 1}`;
      }
    }
    this.parent = null;
  }
}
