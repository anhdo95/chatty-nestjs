export class FloatTransformer {
  to(data: number): number {
    return data
  }
  from(data: string): number | null {
    return data ? parseFloat(data) : null
  }
}

export class IntTransformer {
  to(data: number): number {
    return data
  }
  from(data: string): number | null {
    return data ? parseInt(data, 10) : null
  }
}
