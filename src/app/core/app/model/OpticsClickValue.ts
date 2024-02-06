export enum OpticsUnit {
  MIL = 'MRAD',
  MOA = 'MOA'
}

export interface OpticsClickValueInterface {
  id: number;
  value: number;
  label: string;
  type: OpticsUnit;
}

export class OpticsClickValue {
  private static clickValuesMoa: OpticsClickValueInterface[] = [
    {
      id: 1,
      value: 0.125,
      label: '1/8 de MOA',
      type: OpticsUnit.MOA
    },
    {
      id: 2,
      value: 0.25,
      label: '1/4 de MOA',
      type: OpticsUnit.MOA
    },
    {
      id: 3,
      value: 0.5,
      label: '1/2 de MOA',
      type: OpticsUnit.MOA
    }
  ];

  private static clickValueMrad: OpticsClickValueInterface[] = [
    {
      id: 1,
      value: 1,
      label: '1 MRAD',
      type: OpticsUnit.MIL
    }
  ];

  public static getClickValuesMoa(): OpticsClickValueInterface[] {
    return this.clickValuesMoa;
  }
  public static getClickValuesMil(): OpticsClickValueInterface[] {
    return this.clickValueMrad;
  }
}
