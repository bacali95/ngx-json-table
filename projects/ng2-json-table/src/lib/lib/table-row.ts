export class TableRow {
  id: string;
  key: string | number;
  value: any;
  level: number;
  isComplex: boolean;
  isArray: boolean;
  parent?: TableRow;
  children: TableRow[];
  showChildren: boolean;
  editKey: boolean;
  editValue: boolean;
  error: boolean;
  showAdd: boolean;
  showDelete: boolean;

  constructor(
    key: string | number,
    value: any,
    level?: number,
    isComplex?: boolean,
    isArray?: boolean,
    parent?: TableRow,
    children?: TableRow[],
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
    this.editKey = false;
    this.editValue = false;
    this.error = false;
    this.showAdd = false;
    this.showDelete = false;
  }

  toggleShowChildren(allLevels: boolean = false) {
    this.showChildren = !this.showChildren;
    if (allLevels) {
      const processAllLevels = (parent: TableRow) => {
        for (const child of parent.children) {
          child.showChildren = parent.showChildren;
          processAllLevels(child);
        }
      }
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

  addChild(child: TableRow) {
    this.children.push(child);
  }

  canAppear(): boolean {
    return this.canAppearCheck(this);
  }

  private canAppearCheck(child: TableRow) {
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
