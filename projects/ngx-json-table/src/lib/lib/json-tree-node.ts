export class JsonTreeNode {
  id: string;
  key: string;
  value: any;
  level: number;
  isComplex: boolean;
  isArray: boolean;
  parent: JsonTreeNode;
  children: JsonTreeNode[];
  showChildren: boolean;
  editKey: boolean = false;
  editValue: boolean = false;
  error: boolean = false;
  showAdd: boolean = false;
  showDelete: boolean = false;

  constructor(
    key: string,
    value: any,
    level?: number,
    isComplex?: boolean,
    isArray?: boolean,
    parent?: JsonTreeNode,
    children?: JsonTreeNode[],
    showChildren?: boolean,
  ) {
    this.id = `${Math.random().toString(36).substr(2, 9)}`;
    this.key = key;
    this.value = value;
    this.level = level ?? 0;
    this.isComplex = isComplex ?? false;
    this.isArray = isArray ?? false;
    this.level = level ?? 0;
    this.parent = parent;
    this.children = children ?? [];
    this.showChildren = showChildren ?? false;
  }

  toggleShowChildren(allLevels: boolean = false) {
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

  setError() {
    this.error = true;
    setTimeout(() => this.error = false, 2000);
  }

  toggleEditKey() {
    !this.parent?.isArray && (this.editKey = !this.editKey);
  }

  toggleEditValue() {
    !this.isComplex && !this.isArray && (this.editValue = !this.editValue);
  }

  addChild(child: JsonTreeNode) {
    this.children.push(child);
  }

  canAppear(): boolean {
    return this.canAppearCheck(this);
  }

  private canAppearCheck(child: JsonTreeNode) {
    if (!child.parent) return true;
    return child.parent.showChildren && this.canAppearCheck(child.parent);
  }

  changeValue(value) {
    this.value = value;
  }

  changeKey(key) {
    this.key = key;
  }

}
